const express = require('express');
const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Parse JSON request body
app.use(express.json());

app.post('/analyze', async (req, res) => {
    try {
        const { text } = req.body;
    
    // get endpoint and key from environment variables
    const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"];
    const key = process.env["CONTENT_SAFETY_KEY"];
    
    const credential = new AzureKeyCredential(key);
    const client = new ContentSafetyClient(endpoint, credential);
    
    const analyzeTextOption = { text };
    const analyzeTextParameters = { body: analyzeTextOption };

    const result = await client.path("/text:analyze").post(analyzeTextParameters);
    // console.log(result.status,"Helloooo")
    if (result.status === '200') {
        const categoriesAnalysis = result.body.categoriesAnalysis.map(category => ({
            category: category.category,
            severity: category.severity
        }));
        res.json({ success: true, categoriesAnalysis });
    } else {
        throw new Error('Failed to analyze text');
    }
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: error.message });
}
});

app.listen(port, () => {
console.log(`Server running on port ${port}`);
});