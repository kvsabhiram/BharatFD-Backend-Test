const translate = require('google-translate-api-x');

exports.translateText = async (text, targetLang) => {
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error('Translation failed:', error.message);
    return null; // Fallback to English
  }
};