import Knowledge from '../models/Knowledge.js';
import { shouldTrackView, recordTrafficEvent } from '../utils/viewTracker.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

// Default initial Knowledge guides for seamless startup
const initialKnowledgeGuides = [
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
    blueprintTitle: '2025 Residential Solar Sizing Decision Matrix',
    blueprintBadge: 'Engineering Sizing Guide',
    quickStats: [
      { label: 'Baseline Sizing', value: '6.6 kW' },
      { label: 'Modern Sweet Spot', value: '8.8 kW' },
      { label: 'Avg Daily Output', value: '26 - 38 kWh' },
      { label: 'Typical Payback', value: '2.8 - 3.4 Yrs' }
    ],
    matrixHeaders: ['Metric / Requirement', 'Entry: 6.6 kW', 'Sweet Spot: 8.8 kW', 'Electrified: 10-13.2 kW'],
    matrixRows: [
      {
        feature: 'Number of Panels',
        col1: '15 - 16 Panels (440W)',
        col2: '20 - 22 Panels (440W)',
        col3: '24 - 30 Panels (440W)'
      },
      {
        feature: 'Inverter AC Capacity',
        col1: '5.0 kW (1-Phase)',
        col2: '6.6 kW (1-Phase)',
        col3: '8.2 - 10 kW (3-Phase)'
      },
      {
        feature: 'Required Roof Area',
        col1: 'Approx. 32 m²',
        col2: 'Approx. 44 m²',
        col3: 'Approx. 58 - 65 m²'
      },
      {
        feature: 'Ideal Household Profile',
        col1: '1-2 people, gas hot water, no ducted A/C',
        col2: '3-5 people, ducted A/C, electric heat pump',
        col3: 'Large family, pool, EV charging, future battery'
      }
    ],
    faqs: [
      {
        question: 'Can I install more panels than my inverter AC rating?',
        answer: 'Yes! Under Clean Energy Council rules, you can oversize panel capacity by up to 133% of your inverter AC output rating (e.g. 8.8kW of panels on a 6.6kW inverter). This provides earlier morning yield and better performance in cloudy weather.'
      },
      {
        question: 'What is the network export limit in South East Nationwide?',
        answer: 'Most Energex networks allow a standard 5kW single-phase feed-in limit. However, dynamic export controls allow you to install larger systems up to 10kW while optimizing self-consumption.'
      }
    ],
    content: `<h3>The Death of the 5kW Residential System</h3><p>Five years ago, a 5kW solar system was considered standard for an Australian 3-bedroom home. Today, that recommendation is thoroughly obsolete.</p><p>Between high-efficiency ducted air conditioning, induction cooktops, swimming pool pumps, and the rapid arrival of home electric vehicle chargers, modern Nationwide households consume between 22 and 35 kWh per day.</p><p>Because federal STC government rebates heavily subsidize panel capacity upfront, the incremental cost of adding an extra 2.2kW of panels during initial installation is exceptionally low. Sizing up covers your winter dip and ensures your future battery will have enough daytime surplus to charge fully.</p>`,
    metaTitle: 'What Size Solar System Do You Need in 2025? | Sizing Guide',
    metaDescription: 'Expert sizing guide for Australian homes: baseline 6.6kW vs sweet spot 8.8kW with EV and battery planning.',
    isPublished: true,
    views: 42
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
    blueprintTitle: 'Battery Architecture & Surge Comparison Matrix',
    blueprintBadge: 'Hardware Benchmark',
    quickStats: [
      { label: 'Tesla Usable Capacity', value: '13.5 kWh' },
      { label: 'Sungrow Scalability', value: '9.6 - 25.6 kWh' },
      { label: 'Continuous Output', value: '11.5 kW vs 5-10 kW' },
      { label: 'Blackout Switchover', value: '< 20ms' }
    ],
    matrixHeaders: ['Technical Metric', 'Tesla Powerwall 3', 'Sungrow SBR Stack', 'Field Verdict'],
    matrixRows: [
      {
        feature: 'Inverter Type',
        col1: 'Integrated 11.5kW (6 MPPTs)',
        col2: 'Separate Hybrid Inverter (2-3 MPPTs)',
        col3: 'Tesla cleaner look; Sungrow easier modular replacement'
      },
      {
        feature: 'Cell Chemistry',
        col1: 'NMC (Liquid Glycol Cooled)',
        col2: 'LiFePO4 / LFP (Prismatic)',
        col3: 'LFP provides higher thermal safety margin in hot garages'
      },
      {
        feature: 'Surge Capability (LRA)',
        col1: '185 LRA Locked-Rotor Surge',
        col2: 'Standard Inverter Inrush',
        col3: 'Tesla easily starts 16kW ducted compressors without tripping'
      }
    ],
    faqs: [
      {
        question: 'Can Tesla Powerwall 3 be added to an existing solar array?',
        answer: 'Yes! It can either replace your existing inverter entirely or be AC-coupled to your existing system with a Tesla Gateway 2.'
      },
      {
        question: 'Can I add more battery capacity later to Sungrow?',
        answer: 'Yes, Sungrow modular bricks can be added within the first 2-3 years, expanding from 9.6kWh up to 25.6kWh.'
      }
    ],
    content: `<h3>Integrated vs Modular Architecture</h3><p>The home battery market has shifted from a novelty to an essential energy resilience asset. Two models dominate Australian quote requests: the Tesla Powerwall 3 and the Sungrow SBR modular battery system.</p><p>While Tesla Powerwall 3 integrates solar DC-coupled string inputs directly into its chassis, Sungrow offers modular high-voltage stackable units with cobalt-free Lithium Iron Phosphate (LiFePO4) chemistry.</p>`,
    metaTitle: 'Tesla Powerwall 3 vs Sungrow SBR Battery Review 2025',
    metaDescription: 'Detailed technical comparison of Tesla Powerwall 3 and Sungrow SBR battery storage systems for Australian homes.',
    isPublished: true,
    views: 68
  },
  {
    slug: 'solar-rebates-and-feed-in-tariffs-explained',
    title: 'Australian Solar Rebates & Feed-in Tariffs: The Unfiltered Truth',
    excerpt: 'How STCs reduce your upfront invoice, why feed-in tariffs have dropped to 5c/kWh, and how smart self-consumption flips the economics back in your favor.',
    category: 'Buying Solar',
    readTime: '5 min read',
    publishDate: 'Feb 18, 2025',
    author: 'Trent Palmer',
    authorRole: 'Founder & Master Electrician',
    imageUrl: '/images/blog/solar-rebates.jpg',
    keyTakeaways: [
      'STC rebates decrease by roughly 7% every January 1st until phase-out in 2030.',
      'Feed-in tariffs of 4c-6c/kWh mean daytime exports earn modest returns compared to 36c/kWh retail rates.',
      'Shifting hot water heat pumps, pool filtration, and EV charging to solar daylight hours generates 6x higher savings.'
    ],
    blueprintTitle: 'STC Deeming & Grid Avoidance Economics Matrix',
    blueprintBadge: 'Financial ROI Analysis',
    quickStats: [
      { label: 'Avg STC Discount', value: '$2,400 - $3,600' },
      { label: 'Feed-in Tariff', value: '4 - 7c / kWh' },
      { label: 'Avoided Grid Cost', value: '34 - 38c / kWh' },
      { label: 'Deeming Expiry', value: 'Dec 31, 2030' }
    ],
    matrixHeaders: ['Financial Parameter', 'Exporting to Grid', 'Direct Self-Consumption', 'Financial Multiplier'],
    matrixRows: [
      {
        feature: 'Effective Value per kWh',
        col1: 'Approx. 5.0 cents',
        col2: 'Approx. 36.0 cents',
        col3: 'Self-consumption is ~7x more profitable'
      },
      {
        feature: 'Annual Value (2000 kWh)',
        col1: '$100 credit on bill',
        col2: '$720 avoided retail cost',
        col3: '+$620 annual net difference'
      }
    ],
    faqs: [
      {
        question: 'Do I need to apply for the STC solar rebate myself?',
        answer: 'No. As a Clean Energy Council Approved Solar Retailer, Sunny Solar assigns and claims the STCs on your behalf, providing the full rebate as an instant point-of-sale deduction on your invoice.'
      }
    ],
    content: `<h3>Understanding the True Value of Daytime Solar</h3><p>With feed-in tariffs hovering around 5c/kWh across Nationwide, customers often ask if solar still makes financial sense. The answer is an emphatic yes — provided you understand the shift from feed-in credits to avoided retail grid costs.</p>`,
    metaTitle: 'Australian Solar Rebates & Feed-in Tariffs Explained 2025',
    metaDescription: 'Discover how STC rebates work, why feed-in tariffs dropped, and how self-consumption saves 36c/kWh.',
    isPublished: true,
    views: 31
  }
];

/**
 * Auto-seed initial knowledge items if collection is empty
 */
const autoSeedIfEmpty = async () => {
  try {
    const count = await Knowledge.countDocuments();
    if (count === 0) {
      await Knowledge.insertMany(initialKnowledgeGuides);
    }
  } catch (err) {
    console.error('Auto-seed Knowledge error:', err.message);
  }
};

/**
 * @desc    Get all published Knowledge Hub guides
 * @route   GET /api/knowledge
 * @access  Public
 */
export const getPublishedKnowledge = async (req, res, next) => {
  try {
    await autoSeedIfEmpty();

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
    await autoSeedIfEmpty();
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
      imageUrl: imageUrl || '/images/blog/solar-system-size.jpg',
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
