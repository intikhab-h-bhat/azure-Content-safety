fetch("https://api.openai.com/v1/completions")
  .then(res => {
    if(res.ok){
      console.log("Success")
      res.json()
    }
    else{
      console.log("Error")
    }
   })
  .then(data => console.log(data));
