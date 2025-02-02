const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }, // Rich text content
  translations: {
    type: Map,
    of: String, // Example: { hi: "Hindi Question", bn: "Bengali Question" }
  },  
}, { timestamps: true });

// Method to retrieve translated text dynamically
FAQSchema.methods.getTranslatedQuestion = function (lang) {
  return this.translations[lang] || this.question; // Fallback to English
};

module.exports = mongoose.model('FAQ', FAQSchema);