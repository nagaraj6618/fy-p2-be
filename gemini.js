const axios = require('axios');

// Replace with your Gemini AI API key
const API_KEY = "AIzaSyCk911b262Z87eptMb8zUFwxgcwMoa3nHo";
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function getGeminiResponse(prompt) {
    try {
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching response from Gemini AI:', error);
    }
}

// Example usage
const prompt = "Give Addtion program in python";
// getGeminiResponse(prompt).then(response => console.log(response));

async function optimizePrompt(prompt) {
   try {
       const response = await axios.post(
           `${GEMINI_API_URL}?key=${API_KEY}`,
           {
               contents: [{ parts: [{ text: `Optimize this prompt for better AI response: ${prompt}` }] }]
           },
           {
               headers: {
                   'Content-Type': 'application/json'
               }
           }
       );
       console.log(response.data.candidates[0].content.parts[0].text)
       return response.data.candidates[0].content.parts[0].text;
   } catch (error) {
       console.error('Error optimizing prompt:', error);
       return prompt;
   }
}
optimizePrompt("Explain how quantum computing works in simple terms.")
// console.log(data);