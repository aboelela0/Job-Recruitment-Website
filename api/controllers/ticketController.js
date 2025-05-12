const Ticket = require('../models/ticketModel');

// Submit a new support ticket
const submitTicket = async (req, res) => {
  try {
    console.log('Received ticket submission:', req.body);
    const { name, email, subject, message } = req.body;
   

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const ticket = new Ticket({ name, email, subject, message });
    await ticket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket submitted successfully',
      ticketId: ticket._id
    });
  } catch (error) {
    console.error('Error submitting ticket:', error);
    res.status(500).json({ success: false, message: 'y3m eftah ana 3omdaa' });
  }
};

module.exports = {
  submitTicket,
};
