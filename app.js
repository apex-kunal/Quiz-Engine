// the main QUESTION_BANK + the overall app's state goes here

// QUESTION BANK to be fetch locally from data/question.json

// example data 
// const QUESTION_BANK = [
//   {
//     id: "q1",
//     type: "short",
//     prompt: "is this a short question type ?",
//     choices: [],
//     correct: "Yes it is",
//     explanation: "This is an example of short question"
//   },
//   {
//     id: "q2",
//     type: "tf",
//     prompt: "is this a tf question type ?",
//     choices: [true,false],  
//     correct: true,
//     explanation: "make the answer true"
//   },
//   {
//     id: "q3",
//     type: "mc",
//     prompt: "is this a mc question type ?",
//     choices: ["A","B","C","D"],   // mc/tf only
//     correct: "A",
//     explanation: "yes A is correct"
//   },
// ]

// the overal state of the web app after each round the state will be updated
const state = {
  // call shuffle function from logic js to shuffle the question bank array
  questions: [], // empty from now 
  currentIndex: 0,
  score: 0,
  attempts: [],
  status: "loading", // state changed from playing to loading
  passMark: 70,
  timeLeft: 20,
  timerId: null, // new for timer 
};

// async function to fetch the data from the local json file 
async function loadQuestions(){
  try {
    const response = await fetch("data/questions.json")
    const data = await response.json()

    state.questions = shuffle(data); // now load the real data
    state.status = "playing"; // change the status to playing
    renderQuestion(state); // now render the first question
    // console.log(data)
  } catch (error) {
    console.log("Counldn't load the questions:",error)
  }
}
loadQuestions();

// attempt obj 
// {
//   questionId: "q1",
//   given: "Value only",
//   isCorrect: false,
//   skipped: false
// }

// just testing
// console.log(state.questions[0]);
