// const { JSDOM } = require('jsdom');


// Create a new JSDOM instance and parse the HTML
// const dom = new JSDOM(textarea);

// Access the document object
// const document = dom.window.document;



const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
const { AzureKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
    // get endpoint and key from environment variables
    const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"];
    const key = process.env["CONTENT_SAFETY_KEY"];
    
    const credential = new AzureKeyCredential(key);
    const client = ContentSafetyClient(endpoint, credential);
    
    // replace with your own sample text string 
    const text = "kill you";
    const analyzeTextOption = { text: text };
    const analyzeTextParameters = { body: analyzeTextOption };
    
    const result = await client.path("/text:analyze").post(analyzeTextParameters);
    
    if (isUnexpected(result)) {
        throw result;
        
    }
    
    for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
    const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
    console.log(
      textCategoriesAnalysisOutput.category,
      " severity: ",
      textCategoriesAnalysisOutput.severity
    );
  }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});