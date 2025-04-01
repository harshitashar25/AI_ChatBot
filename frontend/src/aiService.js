// Use API key approach (OAuth is more complex for this use case)
const API_KEY = '{Your_API_Key}';

export async function queryAIStudio(prompt, context = {}) {
    try {
        // Updated Gemini API call
        return await callGeminiApi(prompt, context);
    } catch (error) {
        console.error("AI Studio API Error:", error);
        throw error;
    }
}

async function callGeminiApi(prompt, context) {
    // Updated to correct Gemini API endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
    
    // Format the context as a string
    const contextStr = `
    Current Directory: ${context.currentDirectory || 'Unknown'}
    Terminal Context: ${context.terminalContext || 'None'}
    
    Recent Commands: ${context.recentCommands || 'None'}
    `;
    
    console.log("Calling Gemini API with:", { 
        url, 
        contextLength: contextStr.length,
        hasScreenshot: !!context.screenshot
    });
    
    // Prepare request body based on whether screenshot is included
    const requestBody = {
        contents: [{
            role: "user",
            parts: []
        }],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        }
    };
    
    // Add text context
    requestBody.contents[0].parts.push({
        text: `${contextStr}\n\nUser Question: ${prompt}`
    });
    
    // If screenshot is available, add as image part
    if (context.screenshot) {
        // Remove the data:image/png;base64, prefix
        const base64Image = context.screenshot.split(',')[1];
        requestBody.contents[0].parts.push({
            inline_data: {
                mime_type: "image/png",
                data: base64Image
            }
        });
    }
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
        const error = await response.json();
        console.error("API Error Response:", error);
        throw new Error(error.error?.message || `API call failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log("API Success Response:", data);
    
    // Handle the updated response structure
    if (data.candidates && data.candidates.length > 0 && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts.length > 0) {
        return data.candidates[0].content.parts[0].text;
    }
    
    // Fallback message
    return "Sorry, I couldn't generate a response. Please try again.";
}
