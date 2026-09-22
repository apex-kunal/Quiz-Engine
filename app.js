// the main QUESTION_BANK + the overall app's state goes here only 

// QUESTION_BANK
// QUESTION BANK
const QUESTION_BANK = [
  {
    id: "q1",
    type: "short",
    prompt: "is this a short question type ?",
    choices: [],
    correct: "Yes it is",
    explanation: "This is an example of short question"
  },
  {
    id: "q2",
    type: "tf",
    prompt: "is this a tf question type ?",
    choices: [true,false],  
    correct: true,
    explanation: "make the answer true"
  },
  {
    id: "q3",
    type: "mc",
    prompt: "is this a mc question type ?",
    choices: ["A","B","C","D"],   // mc/tf only
    correct: "A",
    explanation: "yes A is correct"
  },
]

// the overal state of the web app after each round the state will be updated
const state = {
  // call shuffle function from logic js to shuffle the question bank array
  questions: shuffle(QUESTION_BANK),
  currentIndex: 0,
  score: 0,
  attempts: [],
  status: "playing",
  passMark: 70,
};

// attempt obj 
// {
//   questionId: "q1",
//   given: "Value only",
//   isCorrect: false,
//   skipped: false
// }

// just testing
// console.log(state.questions[0]);
