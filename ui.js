// DOM manipulation to be done here to change the state of the overall app 
const app = document.getElementById('app');

function renderQuestion(){

  // get the current question from the state obj
  const currentQuestion = state.questions[state.currentIndex]

  app.innerHTML = "";


  const question = document.createElement('h2');
  question.textContent = currentQuestion.prompt;
  // console.log(question);
   app.appendChild(question);


  // render question specifically for each type 
  if(currentQuestion.type === "mc" || currentQuestion.type === "tf"){
    for(let i = 0;i < currentQuestion.choices.length;i++){
      const btn = document.createElement('button');
      btn.textContent = currentQuestion.choices[i];
      btn.onclick =  function() {

        // call the submitAnswer() removed the result variable since we dont need to return a vlaue from isCorrect() 
        submitAnswer(currentQuestion.choices[i]);
        // console.log(result);
        // Testing -> console.log(currentQuestion.choices[i])
      }
        
      app.appendChild(btn);
    }
  }

  if (currentQuestion.type === "short"){
    const inp = document.createElement('input');
    inp.type = "text";
    const inpBtn = document.createElement('button');
    inpBtn.textContent = "submit";
    inpBtn.onclick = function() {
      submitAnswer(inp.value);
      // console.log(result);
      // Testing-> console.log(inp.value);
    }
      
    
    app.appendChild(inp);
    app.appendChild(inpBtn);
}

}

function submitAnswer(given){
  const currentQuestion = state.questions[state.currentIndex];
  const correct = isCorrect(currentQuestion,given);
  const attempt = {
    questionId: currentQuestion.id,
    given,
    isCorrect: correct,
    skipped: false
  }

  state.attempts.push(attempt);
  if(correct){
    state.score += 1
  }

  if(state.currentIndex + 1 >= state.questions.length){
    state.status = "done"
  } else {
    state.currentIndex += 1;
  }

  renderQuestion(state)
}

