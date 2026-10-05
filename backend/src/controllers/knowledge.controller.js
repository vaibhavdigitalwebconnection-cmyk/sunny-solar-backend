import Knowledge from '../models/Knowledge.js';
import { shouldTrackView, recordTrafficEvent } from '../utils/viewTracker.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

/**
 * @desc    Get all published Knowledge Hub guides
 * @route   GET /api/knowledge
 * @access  Public
 */
export const getPublishedKnowledge = async (req, res, next) => {
  try {

    const { category, search, page = 1, limit = 50 } = req.query;
    const query = { isPublished: true, isDeleted: { $ne: true } };

    if (
      category &&
      category !== 'All Guides' &&
      category !== 'All Categories' &&
      category !== 'All Articles' &&
      category.toLowerCase() !== 'all'
    ) {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { blueprintTitle: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [guides, total] = await Promise.all([
      Knowledge.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Knowledge.countDocuments(query)
    ]);

    res.status(200).json({
      success: true,
      count: guides.length,
      total,
      data: guides
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single Knowledge guide by slug
 * @route   GET /api/knowledge/:slug
 * @access  Public
 */
export const getKnowledgeBySlug = async (req, res, next) => {
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

    const shouldIncrement = !isPreview && shouldTrackView(req, 'knowledge', cleanSlug);

    const guide = shouldIncrement
      ? await Knowledge.findOneAndUpdate(query, { $inc: { views: 1 } }, { returnDocument: 'after' })
      : await Knowledge.findOne(query);

    if (shouldIncrement && guide) {
      recordTrafficEvent(req, 'knowledge', guide.slug, guide.title);
    }

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: `Knowledge guide not found with slug '${slug}'`
      });
    }

    res.status(200).json({
      success: true,
      data: guide
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all Knowledge guides for Admin Panel
 * @route   GET /api/knowledge/admin/all
 * @access  Private (Admin)
 */
export const getAllKnowledgeAdmin = async (req, res, next) => {
  try {
    const guides = await Knowledge.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: guides.length,
      data: guides
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new Knowledge Hub guide
 * @route   POST /api/knowledge
 * @access  Private (Admin)
 */
export const createKnowledge = async (req, res, next) => {
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
      blueprintTitle,
      blueprintBadge,
      quickStats,
      matrixHeaders,
      matrixRows,
      faqs,
      metaTitle,
      canonicalUrl,
      keywords,
      metaDescription,
      schema,
      isPublished
    } = req.body;

    if (!title || !excerpt) {
      return res.status(400).json({
        success: false,
        message: 'Title and excerpt are required'
      });
    }

    // Auto-generate slug
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

    const existing = await Knowledge.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    // Upload base64 image to Cloudinary if provided
    if (imageUrl && imageUrl.startsWith('data:image/')) {
      try {
        const uploadRes = await uploadToCloudinary(imageUrl, 'sunny-solar/knowledge');
        imageUrl = uploadRes.url;
      } catch (uploadErr) {
        console.error('Failed to upload knowledge guide image to Cloudinary:', uploadErr.message);
      }
    }

    if (typeof keyTakeaways === 'string') {
      keyTakeaways = keyTakeaways.split('\n').map((k) => k.trim()).filter(Boolean);
    }

    const guide = await Knowledge.create({
      slug,
      title,
      excerpt,
      category: category || 'Solar Basics',
      readTime: readTime || '6 min read',
      publishDate:
        publishDate ||
        new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
      author: author || 'Trent Palmer',
      authorRole: authorRole || 'Founder & Master Electrician',
      imageUrl: imageUrl || '/images/blog/solar-system-size.webp',
      content: content || 'Guide content coming soon.',
      keyTakeaways: keyTakeaways || [],
      blueprintTitle: blueprintTitle || '',
      blueprintBadge: blueprintBadge || '',
      quickStats: Array.isArray(quickStats) ? quickStats : [],
      matrixHeaders: Array.isArray(matrixHeaders) ? matrixHeaders : [],
      matrixRows: Array.isArray(matrixRows) ? matrixRows : [],
      faqs: Array.isArray(faqs) ? faqs : [],
      metaTitle: metaTitle || '',
      canonicalUrl: canonicalUrl || '',
      keywords: keywords || '',
      metaDescription: metaDescription || '',
      schemaMarkup: req.body.schemaMarkup || req.body.schema || '',
      isPublished: isPublished !== undefined ? isPublished : true
    });

    res.status(201).json({
      success: true,
      message: 'Knowledge guide created successfully',
      data: guide
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a Knowledge Hub guide
 * @route   PUT /api/knowledge/:id
 * @access  Private (Admin)
 */
export const updateKnowledge = async (req, res, next) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    if (updateData.views !== undefined) {
      updateData.views = Math.max(0, parseInt(updateData.views) || 0);
    }

    // Upload base64 image to Cloudinary if provided
    if (updateData.imageUrl && updateData.imageUrl.startsWith('data:image/')) {
      try {
        const uploadRes = await uploadToCloudinary(updateData.imageUrl, 'sunny-solar/knowledge');
        updateData.imageUrl = uploadRes.url;
      } catch (uploadErr) {
        console.error('Failed to upload updated knowledge guide image to Cloudinary:', uploadErr.message);
      }
    }

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

    if (updateData.slug) {
      updateData.slug = updateData.slug
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const guide = await Knowledge.findByIdAndUpdate(id, updateData, {
      returnDocument: 'after',
      runValidators: true
    });

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge guide not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Knowledge guide updated successfully',
      data: guide
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle Knowledge published status
 * @route   PATCH /api/knowledge/:id/publish
 * @access  Private (Admin)
 */
export const togglePublishKnowledge = async (req, res, next) => {
  try {
    const { id } = req.params;
    const guide = await Knowledge.findById(id);

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge guide not found'
      });
    }

    const updatedGuide = await Knowledge.findByIdAndUpdate(
      id,
      { $set: { isPublished: !guide.isPublished } },
      { returnDocument: 'after' }
    );

    res.status(200).json({
      success: true,
      message: `Guide ${updatedGuide.isPublished ? 'published' : 'unpublished'} successfully`,
      isPublished: updatedGuide.isPublished,
      data: updatedGuide
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Soft-delete a Knowledge guide (keeps permanently in database, removes from website/admin)
 * @route   DELETE /api/knowledge/:id
 * @access  Private (Admin)
 */
export const deleteKnowledge = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Soft delete: keep permanently in MongoDB, mark as deleted, unpublished, and reset views to 0
    const guide = await Knowledge.findByIdAndUpdate(
      id,
      { $set: { isDeleted: true, deletedAt: new Date(), isPublished: false, views: 0 } },
      { returnDocument: 'after' }
    );

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge guide not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Guide removed from website and admin view (safely preserved in database)',
      data: guide
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Restore a soft-deleted Knowledge guide
 * @route   PATCH /api/knowledge/:id/restore
 * @access  Private (Admin)
 */
export const restoreKnowledge = async (req, res, next) => {
  try {
    const { id } = req.params;

    const guide = await Knowledge.findByIdAndUpdate(
      id,
      { $set: { isDeleted: false, deletedAt: null } },
      { returnDocument: 'after' }
    );

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: 'Knowledge guide not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Knowledge guide restored successfully',
      data: guide
    });
  } catch (error) {
    next(error);
  }
};
