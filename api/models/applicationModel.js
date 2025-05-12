const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  position: { type: String, required: true, trim: true },
  resumePath: { type: String, required: true },
  additionalInfo: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'interviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
