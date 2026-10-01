import Blog from '../models/Blog.js';
import { shouldTrackView, recordTrafficEvent } from '../utils/viewTracker.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const initialArticles = [
  {
    slug: 'what-size-solar-system-do-i-need',
    title: 'What Size Solar System Do You Actually Need in 2025?',
    excerpt: 'Forget the outdated 5kW rule. With electric vehicles, ducted heat pumps, and dropping panel costs, here is how to calculate your true sweet spot.',
    category: 'Solar Basics',
    readTime: '6 min read',
    publishDate: 'Jan 14, 2025',
    author: 'Trent Palmer',
    authorRole: 'Founder & Master Electrician',
    imageUrl: '/images/blog/solar-system-size.jpg',
    keyTakeaways: [
      '6.6kW is now the entry-level baseline for single-phase Australian residences.',
      'Upsizing to 8.8kW to 10kW costs only 15-20% more but generates up to 40% more harvest on cloudy days.',
      'If you plan to add a battery or EV within 3 years, maximize your roof footprint immediately.'
    ],
    content: [
      'Five years ago, a 5kW solar system was considered standard for an Australian 3-bedroom home. Today, that recommendation is thoroughly obsolete.',
      'Between high-efficiency ducted air conditioning, induction cooktops, swimming pool pumps, and the rapid arrival of home electric vehicle chargers, modern households consume between 22 and 35 kWh per day.',
      'Because STC government rebates heavily subsidize the first 100kW of panel capacity, the incremental cost of adding an extra 3kW of panels during initial installation is exceptionally low — typically under $1,200 to $1,800. Sizing up covers your winter dip and ensures your future battery will have enough daytime surplus to charge fully.'
    ],
    isPublished: true
  },
  {
    slug: 'tesla-powerwall-3-vs-sungrow-sbr',
    title: 'Tesla Powerwall 3 vs Sungrow SBR: Which Battery Wins in 2025?',
    excerpt: 'A comprehensive technical comparison of integrated inverters, LFP vs NMC chemistry, round-trip efficiency, and blackout emergency power supply.',
    category: 'Batteries',
    readTime: '8 min read',
    publishDate: 'Feb 02, 2025',
    author: 'Trent Palmer',
    authorRole: 'Founder & Master Electrician',
    imageUrl: '/images/blog/battery-comparison.jpg',
    keyTakeaways: [
      'Tesla Powerwall 3 includes its own 11.5kW inverter; Sungrow pairs with a separate hybrid inverter.',
      'Sungrow offers modular capacity from 9.6kWh to 25.6kWh; Powerwall is fixed at 13.5kWh per unit.',
      'Powerwall 3 features unmatched continuous surge power, capable of starting large ducted A/C units in a blackout.'
    ],
    content: [
      'The home battery market has shifted dramatically from luxury novelty to essential energy resilience. Two models dominate Australian quote requests: the newly released Tesla Powerwall 3 and the proven Sungrow SBR modular battery system.',
      'While Tesla Powerwall 3 integrates solar DC-coupled string inputs directly into its chassis, Sungrow offers modular high-voltage stackable units with cobalt-free Lithium Iron Phosphate (LiFePO4) chemistry.',
      'If whole-home backup and single-app convenience are your highest priorities, Tesla Powerwall 3 is hard to beat. If modular expansion or three-phase symmetry at an accessible entry price is paramount, Sungrow represents extraordinary value.'
    ],
    isPublished: true
  },
  {
    slug: 'solar-rebates-and-feed-in-tariffs-explained',
    title: 'Australian Solar Rebates & Feed-in Tariffs: The Unfiltered Truth',
    excerpt: 'How STCs reduce your upfront invoice, why feed-in tariffs have dropped to 5c/kWh, and how smart self-consumption flips the economics back in your favor.',
    category: 'Buying Solar',
    readTime: '5 min read',
    publishDate: 'Feb 18, 2025',
    author: 'Elena Vance',
    authorRole: 'Technical Energy Analyst',
    imageUrl: '/images/blog/solar-rebates.jpg',
    keyTakeaways: [
      'Federal STC rebates shave $2,200 to $3,400 off standard residential installations.',
      'Feed-in tariffs have dropped to 4-8c/kWh because daytime wholesale electricity prices often turn negative.',
      'Self-consumption is 6-7x more valuable than exporting: prioritize running heavy appliances between 10am and 2pm.'
    ],
    content: [
      'With electricity bills continuing to rise across Nationwide and New South Wales, understanding how solar economics actually work in 2025 is critical.',
      'The biggest misconception homeowners have is expecting a massive feed-in tariff credit on their power bill. The golden era of 44c/kWh feed-in tariffs is long gone. Today, the real financial return of solar comes from avoided grid consumption: every kilowatt-hour you produce and use directly behind your own meter avoids paying 32c to 42c to your energy retailer.',
      'Furthermore, the Small-scale Renewable Energy Scheme (SRES) which provides upfront STC discounts drops by one year every January 1st until it concludes in 2030. Locking in your installation sooner maximizes this federal subsidy.'
    ],
    isPublished: true
  },
  {
    slug: 'n-type-topcon-vs-perc-solar-panels',
    title: 'N-Type TOPCon vs P-Type PERC Panels: Is the Upgrade Worth It?',
    excerpt: 'Explore the technical physics behind modern N-Type panels, lower temperature degradation coefficients, and why they outperform in Australian summer heat.',
    category: 'Technical',
    readTime: '9 min read',
    publishDate: 'Mar 01, 2025',
    author: 'Elena Vance',
    authorRole: 'Technical Energy Analyst',
    imageUrl: '/images/blog/solar-panel-tech.jpg',
    keyTakeaways: [
      'N-type silicon cells exhibit zero Light-Induced Degradation (LID).',
      'Better temperature coefficients ensure panels lose less power when roof temperatures hit 65°C in midsummer.',
      'Dual-glass encapsulation protects internal silver busbars against salt mist in coastal regions.'
    ],
    content: [
      'For the last decade, P-type PERC panels ruled the residential market. However, recent manufacturing breakthroughs have made N-Type TOPCon (Tunnel Oxide Passivated Contact) and ABC (All-Back-Contact) technology the new gold standard.',
      'In Australia’s intense climate, roof temperatures frequently exceed 65°C on 35°C ambient summer afternoons. While older panels lose up to 0.40% of rated output for every degree above 25°C, high-grade N-type cells lose as little as 0.26%. This difference equates to an additional 800-1,200 kWh of harvest over the course of a hot year.'
    ],
    isPublished: true
  }
];

const autoSeedIfEmpty = async () => {
  try {
    const count = await Blog.countDocuments();
    if (count === 0) {
      await Blog.insertMany(initialArticles);
      console.log('✅ Auto-seeded initial blogs into MongoDB');
    }
  } catch (err) {
    console.error('Auto-seed Blog error:', err.message);
  }
};

/**
 * @desc    Get all published blogs (with category filtering, search, pagination)
 * @route   GET /api/blogs
 * @access  Public
 */
export const getPublishedBlogs = async (req, res, next) => {
  try {
    await autoSeedIfEmpty();
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
    await autoSeedIfEmpty();
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
    const blogs = await Blog.find().sort({ createdAt: -1 });

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
      imageUrl: imageUrl || '/images/blog/default.jpg',
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

    res.status(200).json({
      success: true,
      message: 'Article restored successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
};
