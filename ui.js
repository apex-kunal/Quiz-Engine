// DOM manipulation to be done here to change the state of the overall app 
const app = document.getElementById('app');

// grab the timer 
const timerDisplay = document.getElementById('timer')

// bluprint for a 60 second timer countdown for per question 
// function startQuiz(){
//   state.timerId = setInterval(function() {
//     state.timeLeft -= 1;
//     if (state.timeLeft === 0){
//       state.status = "done";
//       renderResults(state);
//       clearInterval(state.timeLeft);
//     }
//     console.log(state.timeLeft)
//   }, 1000);

//   renderQuestion(state)
// }

function renderQuestion(state){

  // timer logic goes here at the top of render question 

  clearInterval(state.timerId)
  state.timeLeft = 20;

  state.timerId = setInterval(function() {
    state.timeLeft -= 1;
    timerDisplay.textContent = state.timeLeft

    if(state.timeLeft === 0){
      clearInterval(state.timerId);
      skipQuestion();
    }
  }, 1000);


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

  // clear the timer 
  clearInterval(state.timerId);

  const currentQuestion = state.questions[state.currentIndex];
  const correct = isCorrect(currentQuestion,given);
  const attempt = { // create an attempt obj for each round
    questionId: currentQuestion.id,
    given,
    isCorrect: correct,
    skipped: false
  }
  // update the score per attempt
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

function skipQuestion(){
  const currentQuestion = state.questions[state.currentIndex];
  const attempt = {
    questionId: currentQuestion.id,
    given: null,
    isCorrect: false,
    skipped: true
  };
  state.attempts.push(attempt);
  // no need to change the score since the question here is begin skipped

  if(state.currentIndex + 1 >= state.questions.length){
    state.status = "done"
  } else {
    state.currentIndex += 1;
  }

  if(state.status === "done"){
    renderResults(state);
  } else {
    renderQuestion(state)
  }
}

function renderResults(state){
  // clear the displayy timer 
  timerDisplay.textContent = ""

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

  // added the review button 
  const reviewBtn = document.createElement('button');
  reviewBtn.textContent = "Review mistakes";
  reviewBtn.onclick = function(){
    state.status = "reivew"
    renderReview(state);
  };

  // add the play again button to reset the overall state
  const playAgainBtn = document.createElement('button');
  playAgainBtn.textContent = "Play again";
  playAgainBtn.onclick = function(){
    state.questions = shuffle(QUESTION_BANK);
    state.currentIndex = 0;
    state.score = 0;
    state.attempts = [];
    state.status = "playing";
    renderQuestion(state);
  }

  app.appendChild(heading)
  app.appendChild(score)
  app.appendChild(result)
  app.appendChild(reviewBtn)
  app.appendChild(playAgainBtn)
}

function renderReview(state){

  // clear the display timer 
  timerDisplay.textContent = ""
  
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

