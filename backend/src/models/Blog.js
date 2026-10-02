import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
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
      default: '5 min read'
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
      default: '/images/blog/default.webp'
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
    longContent: {
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
blogSchema.pre('init', function (data) {
  if (data && data.schema && !data.schemaMarkup) {
    data.schemaMarkup = data.schema;
  }
});

// Helper to generate a slug if none provided
blogSchema.pre('validate', function () {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
