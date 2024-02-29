const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint for translating English text to French
app.post('/translate', async (req, res) => {
  try {
    // Check if the request body contains the "text" key
    if (!req.body.text) {
      return res.status(400).json({ error: 'Text to translate is missing in the request body' });
    }

    // Prepare request parameters for translation
    const encodedParams = new URLSearchParams();
    encodedParams.set('from', 'en');
    encodedParams.set('to', 'fr');
    encodedParams.set('text', req.body.text);

    // Configure options for the translation request
    const options = {
      method: 'POST',
      url: 'https://google-translate113.p.rapidapi.com/api/v1/translator/text',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '5025c95860msh3c97b0a14a9a5fap1b8536jsnc66c7055d18a',
        'X-RapidAPI-Host': 'google-translate113.p.rapidapi.com'
      },
      data: encodedParams,
    };

    // Send translation request to RapidAPI
    const response = await axios.request(options);

    // Extract translated text from the response
    const translatedText = response.data.translation.trans;

    // Respond with the translated text
    res.json({ translation: translatedText });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while translating the text' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
