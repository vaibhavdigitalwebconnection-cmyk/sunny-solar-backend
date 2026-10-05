import Blog from '../models/Blog.js';
import { shouldTrackView, recordTrafficEvent } from '../utils/viewTracker.js';
import { uploadToCloudinary } from '../config/cloudinary.js';
import { invalidateStatsCache } from './admin.controller.js';

/**
 * @desc    Get all published blogs (with category filtering, search, pagination)
 * @route   GET /api/blogs
 * @access  Public
 */
export const getPublishedBlogs = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;

    const query = { isPublished: true, isDeleted: { $ne: true } };

    if (
      category &&
      category !== 'All Articles' &&
      category !== 'All Categories' &&
      category !== 'All' &&
      category.toLowerCase() !== 'all'
    ) {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Blog.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      count: blogs.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single blog by slug (and increment view count)
 * @route   GET /api/blogs/:slug
 * @access  Public
 */
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const isPreview = req.query.preview === 'true';
    const cleanSlug = slug.toLowerCase().trim();

    const query = {
      $or: [
        { slug: cleanSlug },
        { slug: cleanSlug.replace(/^-+|-+$/g, '') }
      ],
      isDeleted: { $ne: true }
    };

    if (!isPreview) {
      query.isPublished = true;
    }

    const shouldIncrement = !isPreview && shouldTrackView(req, 'blog', cleanSlug);

    const blog = shouldIncrement
      ? await Blog.findOneAndUpdate(query, { $inc: { views: 1 } }, { returnDocument: 'after' })
      : await Blog.findOne(query);

    if (shouldIncrement && blog) {
      recordTrafficEvent(req, 'blog', blog.slug, blog.title);
    }

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: `Article not found with slug '${slug}'`
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all blogs for Admin (includes drafts/unpublished)
 * @route   GET /api/blogs/admin/all
 * @access  Private (Admin)
 */
export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new blog article
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
export const createBlog = async (req, res, next) => {
  try {
    let {
      slug,
      title,
      excerpt,
      category,
      readTime,
      publishDate,
      author,
      authorRole,
      imageUrl,
      content,
      keyTakeaways,
      metaTitle,
      canonicalUrl,
      keywords,
      metaDescription,
      schema,
      longContent,
      isPublished
    } = req.body;

    if (!title || !excerpt) {
      return res.status(400).json({
        success: false,
        message: 'Title and excerpt are required'
      });
    }

    // Auto-generate slug if not provided
    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    } else {
      slug = slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    // Check slug uniqueness
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Upload base64 image to Cloudinary if provided
    if (imageUrl && imageUrl.startsWith('data:image/')) {
      try {
        const uploadRes = await uploadToCloudinary(imageUrl, 'sunny-solar/blogs');
        imageUrl = uploadRes.url;
      } catch (uploadErr) {
        console.error('Failed to upload blog image to Cloudinary:', uploadErr.message);
      }
    }

    // Ensure keyTakeaways is array if string provided
    if (typeof keyTakeaways === 'string') {
      keyTakeaways = keyTakeaways.split('\n').map(k => k.trim()).filter(Boolean);
    }

    const blog = await Blog.create({
      slug,
      title,
      excerpt,
      category: category || 'Solar Basics',
      readTime: readTime || '5 min read',
      publishDate:
        publishDate ||
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      author: author || 'Trent Palmer',
      authorRole: authorRole || 'Founder & Master Electrician',
      imageUrl: imageUrl || '/images/blog/default.webp',
      content: content || 'Article content coming soon.',
      keyTakeaways: keyTakeaways || [],
      metaTitle: metaTitle || '',
      canonicalUrl: canonicalUrl || '',
      keywords: keywords || '',
      metaDescription: metaDescription || '',
      schemaMarkup: req.body.schemaMarkup || req.body.schema || '',
      longContent: longContent || '',
      isPublished: isPublished !== undefined ? isPublished : true
    });

    invalidateStatsCache();
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a blog article
 * @route   PUT /api/blogs/:id
 * @access  Private (Admin)
 */
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    if (updateData.views !== undefined) {
      updateData.views = Math.max(0, parseInt(updateData.views) || 0);
    }

    // Upload base64 image to Cloudinary if provided
    if (updateData.imageUrl && updateData.imageUrl.startsWith('data:image/')) {
      try {
        const uploadRes = await uploadToCloudinary(updateData.imageUrl, 'sunny-solar/blogs');
        updateData.imageUrl = uploadRes.url;
      } catch (uploadErr) {
        console.error('Failed to upload updated blog image to Cloudinary:', uploadErr.message);
      }
    }

    // Format keyTakeaways if passed as string
    if (typeof updateData.keyTakeaways === 'string') {
      updateData.keyTakeaways = updateData.keyTakeaways
        .split('\n')
        .map((k) => k.trim())
        .filter(Boolean);
    }

    // Map schema to schemaMarkup to prevent Mongoose schema collision
    if (updateData.schema !== undefined) {
      updateData.schemaMarkup = updateData.schema;
      delete updateData.schema;
    }

    // Format slug if provided
    if (updateData.slug) {
      updateData.slug = updateData.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, {
      returnDocument: 'after',
      runValidators: true
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found'
      });
    }

    invalidateStatsCache();
    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle blog published status
 * @route   PATCH /api/blogs/:id/publish
 * @access  Private (Admin)
 */
export const togglePublishBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found'
      });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { isPublished: !blog.isPublished } },
      { returnDocument: 'after' }
    );

    invalidateStatsCache();
    res.status(200).json({
      success: true,
      message: `Blog ${updatedBlog.isPublished ? 'published' : 'unpublished'} successfully`,
      isPublished: updatedBlog.isPublished,
      data: updatedBlog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Soft-delete a blog article (keeps permanently in database, removes from website/admin)
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Soft delete: keep permanently in MongoDB, mark as deleted, unpublished, and reset views to 0
    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true, deletedAt: new Date(), isPublished: false, views: 0 } },
      { returnDocument: 'after' }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found'
      });
    }

    invalidateStatsCache();
    res.status(200).json({
      success: true,
      message: 'Article removed from website and admin view (safely preserved in database)',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Restore a soft-deleted blog article
 * @route   PATCH /api/blogs/:id/restore
 * @access  Private (Admin)
 */
export const restoreBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(
      id,
      { $set: { isDeleted: false, deletedAt: null } },
      { returnDocument: 'after' }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog article not found'
      });
    }

    invalidateStatsCache();
    res.status(200).json({
      success: true,
      message: 'Article restored successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};
