const mongoose = require('mongoose');


const ticketSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email:  { type: String, required: true },
  subject: { type: String, required: false },
  message:  { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);