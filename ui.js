// DOM manipulation to be done here to change the state of the overall app 
const app = document.getElementById('app');

function renderQuestion(state){

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

  if (state.status === "done") {
  renderResults(state);
} else {
  renderQuestion(state);
}
console.log(state);
}

function renderResults(state){

  app.innerHTML = ""

  const percentScore = percent(state.score,state.questions.length);
  const passed = didPassed(state.score,state.questions.length,state.passMark);

  const heading = document.createElement('h2');
  heading.textContent = `You scored ${state.score} out of ${state.questions.length}`
  const score = document.createElement('h2');
  score.textContent = `${percentScore}%`;
  const result = document.createElement('h3');
  if(passed){
    result.textContent = "Passed"
  } else {
    result.textContent = "Failed"
  }

  const reviewBtn = document.createElement('button');
  reviewBtn.textContent = "Review mistakes";
  reviewBtn.onclick = function(){
    state.status = "reivew"
    renderReview(state);
  };

  app.appendChild(heading)
  app.appendChild(score)
  app.appendChild(result)
  app.appendChild(reviewBtn)
}

function renderReview(state){
  app.innerHTML = "";
  const wrong = wrongAttempts(state.attempts);

  for(let i = 0;i < wrong.length; i++){
    const attempt = wrong[i];
    const matchingQuestion = state.questions.find(q => q.id === attempt.questionId);
    const heading = document.createElement('h3')
    heading.textContent = matchingQuestion.prompt
    const para = document.createElement('p')
    para.textContent = `You answered: ${attempt.given}, but the correct answer was: ${matchingQuestion.correct}, here's a brief explanation: ${matchingQuestion.explanation}`;

    app.appendChild(heading);
    app.appendChild(para);
  }

  const backBtn = document.createElement('button');
  backBtn.textContent = "Back to results"
  backBtn.onclick = function() {
    state.status = "done";
    renderResults(state);
  };
  app.appendChild(backBtn);
}

renderQuestion(state)

