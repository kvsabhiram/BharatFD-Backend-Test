const FAQ = require('../models/FAQ');
const { getFromCache, setToCache } = require('../utils/cache');
const { translateText } = require('../utils/translate');

// Create FAQ
exports.createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Auto-translate question into Hindi and Bengali
    const translations = {
      hi: await translateText(question, 'hi'),
      bn: await translateText(question, 'bn'),
    };

    const faq = new FAQ({ question, answer, translations });
    await faq.save();
    res.status(201).json(faq);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get FAQs
exports.getFAQs = async (req, res) => {
  try {
    const { lang } = req.query;
    const cacheKey = `faqs:${lang || 'en'}`;

    // Check cache first
    const cachedData = await getFromCache(cacheKey);
    if (cachedData) return res.json(JSON.parse(cachedData));

    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      id: faq._id,
      question: faq.getTranslatedQuestion(lang),
      answer: faq.answer,
    }));

    // Cache the result
    await setToCache(cacheKey, JSON.stringify(translatedFAQs), 3600); // Cache for 1 hour
    res.json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};