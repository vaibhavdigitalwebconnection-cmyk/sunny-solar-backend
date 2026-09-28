import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Blog from '../models/Blog.js';
import Knowledge from '../models/Knowledge.js';

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET ,
    {
      expiresIn: process.env.JWT_EXPIRES_IN 
    }
  );
};

/**
 * @desc    Admin login
 * @route   POST /api/admin/login
 * @access  Public
 */
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    let admin = await Admin.findOne({ email: email.toLowerCase() });

    const envEmail = process.env.ADMIN_EMAIL || '';
    const envPassword = process.env.ADMIN_PASSWORD || '';

    // If admin record does not exist yet for this email, auto-create if matching .env
    if (!admin && envEmail && email.toLowerCase() === envEmail.toLowerCase()) {
      admin = await Admin.create({
        name: 'Master Admin',
        email: envEmail,
        password: envPassword,
        role: 'admin'
      });
    }

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    let isMatch = await admin.comparePassword(password);

    // If password in MongoDB does not match, auto-sync if candidate password matches process.env.ADMIN_PASSWORD
    if (!isMatch && envPassword && password === envPassword) {
      admin.password = envPassword;
      await admin.save();
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in admin
 * @route   GET /api/admin/me
 * @access  Private (Admin)
 */
export const getAdminProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get admin dashboard stats
 * @route   GET /api/admin/stats
 * @access  Private (Admin)
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      archivedBlogs,
      allStoredBlogs,
      totalKnowledge,
      publishedKnowledge,
      draftKnowledge,
      archivedKnowledge,
      allStoredKnowledge
    ] = await Promise.all([
      Blog.countDocuments({ isDeleted: { $ne: true } }),
      Blog.countDocuments({ isPublished: true, isDeleted: { $ne: true } }),
      Blog.countDocuments({ isPublished: false, isDeleted: { $ne: true } }),
      Blog.countDocuments({ isDeleted: true }),
      Blog.countDocuments({}),
      Knowledge.countDocuments({ isDeleted: { $ne: true } }),
      Knowledge.countDocuments({ isPublished: true, isDeleted: { $ne: true } }),
      Knowledge.countDocuments({ isPublished: false, isDeleted: { $ne: true } }),
      Knowledge.countDocuments({ isDeleted: true }),
      Knowledge.countDocuments({})
    ]);

    // Aggregate views and category counts for active items
    const [categoryCounts, knowledgeCategoryCounts, totalViewsResult, totalKnowledgeViewsResult] = await Promise.all([
      Blog.aggregate([
        { $match: { isDeleted: { $ne: true } } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Knowledge.aggregate([
        { $match: { isDeleted: { $ne: true } } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]),
      Blog.aggregate([
        { $match: { isDeleted: { $ne: true } } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
      ]),
      Knowledge.aggregate([
        { $match: { isDeleted: { $ne: true } } },
        { $group: { _id: null, totalViews: { $sum: '$views' } } }
      ])
    ]);

    const totalViews = totalViewsResult.length > 0 ? totalViewsResult[0].totalViews : 0;
    const totalKnowledgeViews = totalKnowledgeViewsResult.length > 0 ? totalKnowledgeViewsResult[0].totalViews : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        archivedBlogs,
        allStoredBlogs,
        totalKnowledge,
        publishedKnowledge,
        draftKnowledge,
        archivedKnowledge,
        allStoredKnowledge,
        totalViews,
        totalKnowledgeViews,
        categoryCounts,
        knowledgeCategoryCounts
      }
    });
  } catch (error) {
    next(error);
  }
};
