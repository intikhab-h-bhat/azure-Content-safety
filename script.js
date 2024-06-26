async function analyzeText() {
    const text = document.getElementById('textInput').value;

    const apiKey = "key"
    //const endpoint = 'https://<your-region>.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?classify=true';
    //const endpoint = 'https://eastus.api.cognitive.microsoft.com/contentmoderator/moderate/v1.0/ProcessText/Screen?classify=true';
    const endpoint ="endpoint"
   
    // const response = await fetch(endpoint + '/analyze', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Ocp-Apim-Subscription-Key': apiKey
    //     },
    //     body: JSON.stringify({ text: content })
    // });

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/analyze',
            'Ocp-Apim-Subscription-Key': apiKey
        },
        body: text
    });

    const moderationResult = await response.json();
    displayResult(moderationResult);
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Analysis Result</h2>
        <p>Classification: ${result.Classification.Category1.Score}</p>
        <p>Is Toxic: ${result.Classification.Category2.Score}</p>
        <p>Is Offensive: ${result.Classification.Category3.Score}</p>
    `;
}
