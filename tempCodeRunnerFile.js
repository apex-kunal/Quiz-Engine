// DOM manipulation to be done here to change the state of the overall app 
const app = document.getElementById('app');

function renderQuestion(state){
  const currentQuestion = state.questions[state.currentIndex]

  app.innerHTML = "";


  const question = document.createElement('h2');
  question.textContent = currentQuestion.prompt
  console.log(question);

  app.appendChild(question);
}

renderQuestion()