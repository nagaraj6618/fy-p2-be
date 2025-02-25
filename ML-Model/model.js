const axios = require('axios');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCk911b262Z87eptMb8zUFwxgcwMoa3nHo";
const GEMINI_API_URL = process.env.GEMINI_API_URL || "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

async function checkGrammar(text) {
   try {
       const requestBody = {
           contents: [
               {
                   role: "user",
                   parts: [{ text: `Analyze the following text for grammar mistakes and word errors, but do not check punctuation errors. 
                    Also, give a reason for each error and assign a score from 0 to 100 based on grammatical correctness:

                   Text: "${text}"

                   Response Format (JSON):
                   {
                       score: [A score out of 100],
                       suggestion: ["List all suggestions as an array"],
                       correctedSentence: "[Full corrected version]",
                       voiceMessage: [A user-friendly message summarizing the score and a key suggestion with appreciation and motivational words]
                   }
                   ` }]
               }
           ]
       };

       const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, requestBody, {
           headers: { 'Content-Type': 'application/json' }
       });

       if (response.data && response.data.candidates) {
         //   console.log("Grammar Check Result:");
         //   console.log((response.data.candidates[0].content.parts[0].text));
           return extractJson(response.data.candidates[0].content.parts[0].text)
       } else {
           console.log("Error: No response from Gemini API");
       }
   } catch (error) {
       console.error("Error checking grammar:", error.response?.data || error.message);
   }
}

// Example usage


function extractJson(formattedJsonString) {
   try {
       const cleanedJsonString = formattedJsonString.replace(/```json\n|\n```/g, '');
       const jsonData = JSON.parse(cleanedJsonString);
      //  console.log("Extracted JSON:", jsonData);
       return jsonData;
   } catch (error) {
       console.error("Error parsing JSON:", error);
       return null;
   }
}

async function optimizePrompt(prompt) {
    try {
        if (!prompt || prompt.length < 5 || /[^a-zA-Z0-9?!.\s]/.test(prompt)) {
            return `# Error\n\n## Issue with Prompt\n- The provided prompt is invalid, incomplete, or contains random/unrecognized text.\n- Please provide a clear and meaningful prompt.`;
        }
        
        const response = await axios.post(
            `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: `Optimize this prompt for better AI response. Format the response in README-style:

# Optimized Prompt

## Simple Version
- Provide a concise and clear version of the prompt.

## Detailed Version
- Offer an in-depth version of the prompt with additional context.

## Specific Version
- Make the prompt more targeted and specific for precise AI responses.

Prompt: ${prompt}` }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        
        const optimizedText = response.data.candidates[0].content.parts[0].text;
        console.log(optimizedText);
        return optimizedText;
    } catch (error) {
        console.error('Error optimizing prompt:', error);
        return `# Optimized Prompt\n\n## Original Prompt\n${prompt}\n\n*Error occurred while optimizing the prompt.*`;
    }
}

module.exports = {checkGrammar,extractJson,optimizePrompt};