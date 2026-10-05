import mongoose from 'mongoose';

const trafficLogSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      default: 'Unknown',
      index: true
    },
    countryCode: {
      type: String,
      required: true,
      default: 'UN',
      uppercase: true
    },
    flag: {
      type: String,
      default: '🌐'
    },
    region: {
      type: String,
      default: ''
    },
    city: {
      type: String,
      default: ''
    },
    ip: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      enum: ['blog', 'knowledge', 'page', 'inquiry'],
      default: 'blog'
    },
    slug: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    hour: {
      type: Number,
      min: 0,
      max: 23,
      required: true,
      default: () => new Date().getHours()
    },
    dayOfWeek: {
      type: String,
      enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      required: true,
      default: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()]
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  {
    timestamps: true
  }
);

const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);

export default TrafficLog;
