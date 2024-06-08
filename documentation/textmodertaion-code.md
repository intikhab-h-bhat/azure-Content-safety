# Text Moderation API using JavaScript  (Azure ContentSafety API)
   Azure AI content safety detects harmful user-generated and AI-generated content in applications and services. It includes text and image APIs that allow you to detect harmful or inappropriate material.
**Text Moderation:** Detects and filters out harmful content in text, such as hate speech, violence, or inappropriate language.

## Prerequisite
* Azure subscription
* nodejs
* Text Editor

## Steps to Access the ContentSafety API (Text Moderation)

* open gitbash and create a folder using command **mkdir textmoderation**
* then write **cd textmoderation**
* Install the Azure AI Content Safety REST client REST client library for JavaScript with **npm install @azure-rest/ai-content-safety**
* Also install the dotenv module to use environment variables:  **npm install dotenv**
* To set the environment variable for your key and endpoint
   1. setx CONTENT_SAFETY_KEY 'YOUR_CONTENT_SAFETY_KEY'
   2. setx CONTENT_SAFETY_ENDPOINT 'YOUR_CONTENT_SAFETY_ENDPOINT'
* After finishing above steps  write command **code .**  to open folder in  the VS code editor
* create a .js file eg **text-mod.js** in the textmoderation folder.

  **textm-mod.js**

  ```JavaScript
  const ContentSafetyClient = require("@azure-rest/ai-content-safety").default,
  { isUnexpected } = require("@azure-rest/ai-content-safety");
  const { AzureKeyCredential } = require("@azure/core-auth");
  // Load the .env file if it exists
  require("dotenv").config();
  const endpoint = process.env["CONTENT_SAFETY_ENDPOINT"]
  const key = process.env["CONTENT_SAFETY_API_KEY"]

  const credential = new AzureKeyCredential(key);
  const client = ContentSafetyClient(endpoint, credential);

  const text = "hate you";
  const analyzeTextOption = { text: text };
  const analyzeTextParameters= {
     body: analyzeTextOption

   };

  async function someFunction() {
  const result = await client.path("/text:analyze").post(analyzeTextParameters);

  // if (isUnexpected(result)) {
  //   throw result;
  // }
  //console.log(result.body.categoriesAnalysis)

  console.log("Hate severity: ", result.body.categoriesAnalysis.find(item => item.category === 'Hate')?.severity);
  console.log("SelfHarm severity: ", result.body.categoriesAnalysis.find(item => item.category === 'SelfHarm')?.severity);
  console.log("Sexual severity: ", result.body.categoriesAnalysis.find(item => item.category === 'Sexual')?.severity);
  console.log("Violence severity: ", result.body.categoriesAnalysis.find(item => item.category === 'Violence')?.severity);

  // for (let i = 0; i < result.body.categoriesAnalysis.length; i++) {
  //   const textCategoriesAnalysisOutput = result.body.categoriesAnalysis[i];
  //   console.log(
  //     textCategoriesAnalysisOutput.category,
  //     " severity: ",
  //     textCategoriesAnalysisOutput.severity
  //   );
  // }

  }
  // Call the function
  someFunction();

  ```
* Run the application with the node command  **node text-mod.js**

## output

1. Hate severity:  2
2. SelfHarm severity:  0
3. Sexual severity:  0
4. Violence severity:  0
