// DOM manipulation to be done here to change the state of the overall app 
const app = document.getElementById('app');

function renderQuestion(){
  const currentQuestion = state.questions[state.currentIndex]

  app.innerHTML = "";


  const question = document.createElement('h2');
  question.textContent = currentQuestion.prompt;
  // console.log(question);
   app.appendChild(question);

  if(currentQuestion.type === "mc" || currentQuestion.type === "tf"){
    for(let i = 0;i < currentQuestion.choices.length;i++){
      const btn = document.createElement('button');
      btn.textContent = currentQuestion.choices[i];
      app.appendChild(btn);
    }
  }

  if (currentQuestion.type === "short"){
  const inp = document.createElement('input');
  inp.type = "text";
  const inpBtn = document.createElement('button');
  inpBtn.textContent = "submit";
  app.appendChild(inp);
  app.appendChild(inpBtn);
}

 
  
}

renderQuestion(state)