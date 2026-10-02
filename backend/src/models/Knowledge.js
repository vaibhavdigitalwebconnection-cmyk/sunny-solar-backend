import mongoose from 'mongoose';

const quickStatSchema = new mongoose.Schema(
  {
    label: { type: String, default: '' },
    value: { type: String, default: '' }
  },
  { _id: false }
);

const matrixRowSchema = new mongoose.Schema(
  {
    feature: { type: String, default: '' },
    col1: { type: String, default: '' },
    col2: { type: String, default: '' },
    col3: { type: String, default: '' }
  },
  { _id: false }
);

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, default: '' },
    answer: { type: String, default: '' }
  },
  { _id: false }
);

const knowledgeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Solar Basics',
      trim: true
    },
    readTime: {
      type: String,
      default: '6 min read'
    },
    publishDate: {
      type: String,
      default: () => {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
      }
    },
    author: {
      type: String,
      default: 'Trent Palmer'
    },
    authorRole: {
      type: String,
      default: 'Founder & Master Electrician'
    },
    imageUrl: {
      type: String,
      default: '/images/blog/solar-system-size.webp'
    },
    content: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Content is required'],
      default: ''
    },
    keyTakeaways: {
      type: [String],
      default: []
    },
    // Technical Blueprint & Decision Matrix specs
    blueprintTitle: {
      type: String,
      default: ''
    },
    blueprintBadge: {
      type: String,
      default: ''
    },
    quickStats: {
      type: [quickStatSchema],
      default: []
    },
    matrixHeaders: {
      type: [String],
      default: []
    },
    matrixRows: {
      type: [matrixRowSchema],
      default: []
    },
    faqs: {
      type: [faqSchema],
      default: []
    },
    // SEO & Meta Tags
    metaTitle: {
      type: String,
      default: '',
      trim: true
    },
    canonicalUrl: {
      type: String,
      default: '',
      trim: true
    },
    keywords: {
      type: String,
      default: '',
      trim: true
    },
    metaDescription: {
      type: String,
      default: '',
      trim: true
    },
    schemaMarkup: {
      type: String,
      default: ''
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    views: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.schema = ret.schemaMarkup || ret.schema || '';
        return ret;
      }
    },
    toObject: {
      transform: (doc, ret) => {
        ret.schema = ret.schemaMarkup || ret.schema || '';
        return ret;
      }
    }
  }
);

// Map legacy 'schema' field to 'schemaMarkup' upon document initialization
knowledgeSchema.pre('init', function (data) {
  if (data && data.schema && !data.schemaMarkup) {
    data.schemaMarkup = data.schema;
  }
});

// Auto slug generation helper if not provided
knowledgeSchema.pre('validate', function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

const Knowledge = mongoose.model('Knowledge', knowledgeSchema);

export default Knowledge;
