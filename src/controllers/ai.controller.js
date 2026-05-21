import { model } from "../configs/gemini.js";

export const chatWithAi = async (req, res, next) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ message: "No message Provided" });
        }
        
        const systemPrompt = `You are "The Archivist," the sophisticated AI assistant for 
"The Velvet Hideaway," a private sanctuary for modern mixologists.

Your personality: Elegant, helpful, slightly mysterious, and calm. 
Your expertise: Cocktail recipes, history of spirits, and mood-setting.

Guidelines:
1. Keep responses concise but evocative.
2. If asked about cocktails, provide professional advice.
3. Use a tone that matches a dimly lit, cozy jazz bar.
4. Refer to the user as "Guest" or "Traveler".

User says: "${message}"`;

        const result = await model.generateContent(systemPrompt);
        const responseText = result.response.text();
        res.status(200).json({
            answer: responseText,
            persona: "The Archivist"
        });
    } catch (err) {
        console.error("AI Error:", err);
        res.status(500).json({ message: "There is a problem in the AI function" });
    }
};