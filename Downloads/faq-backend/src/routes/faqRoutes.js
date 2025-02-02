const express = require('express');
const { createFAQ, getFAQs } = require('../controllers/faqController');

const router = express.Router();

router.post('/faqs', createFAQ); // Create FAQ
router.get('/faqs', getFAQs);    // Get FAQs

module.exports = router;