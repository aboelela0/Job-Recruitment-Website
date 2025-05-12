const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
  title: String,
  type: String,
  company: String,
  location: String,
  description: String,
  salary: String,
  skills: [String],
  postedBy: String
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);