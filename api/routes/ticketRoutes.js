const express = require('express');
const router = express.Router();

const {submitTicket} = require('../controllers/ticketController');


router.post('/submit', submitTicket);

module.exports = router;
