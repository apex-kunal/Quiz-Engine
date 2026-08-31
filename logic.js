// the app contains 3 main or you can say core object which the entire apps follows -> 

// Reference shape of a question object:
// {
//   id: "q1",
//   type: "mc",          // "mc" | "tf" | "short"
//   prompt: "What does === compare?",
//   choices: ["Value only", "Value and type"],
//   correct: "Value and type",
//   explanation: "Strict equality checks type too."
// }

// shape of the ovarall app 
// {
//   questions: [],       // shuffled copy for this run
//   currentIndex: 0,
//   score: 0,
//   attempts: [],
//   status: "playing",   // "loading" | "playing" | "review" | "done"
//   timeLeft: 60,        // add when you reach the timer step
//   passMark: 70
// }

// state of the running app after each question is submitted .. its a state when the user hits next or submit after each question 
// {
//   questionId: "q1",
//   given: "Value only",
//   isCorrect: false,
//   skipped: false
// }

// funtion to normalize a short question to lowercase 
function normalize(text){
 return String(text).trim().toLowerCase();
};

// const result = normalize("Paris");
// console.log(result);


// to check if the answer is correct 
function isCorrect(question,given){
  if (question.type === "short"){
    return normalize(given) === normalize(question.correct)
  } else {
    return given === question.correct;
  }
}
const mcQuestion = { type: "mc", correct: "Value and type" };
const tfQuestion = { type: "tf", correct: true };
const shortQuestion = { type: "short", correct: "Paris" };


// just some test cases
// console.log(isCorrect(mcQuestion, "Value and type"));
// console.log(isCorrect(mcQuestion, "Value only"));       
// console.log(isCorrect(tfQuestion, true));           
// console.log(isCorrect(tfQuestion, false));               
// console.log(isCorrect(shortQuestion, " paris "));         
// console.log(isCorrect(shortQuestion, "London"));   

// function to calculate the score out of total questions
function percent(score,total){
  // basic if to check if total {questions basically} is 0
  if (total === 0){
    return 0
  }
  return Math.round((score/total) *100);
}

// calculate the passing status of the user again the obeject property of the overall app -> passMark [default value = 70]
// reference from the app's object
function didPassed(score,total,passMark){
  return percent(score,total) >= passMark;
}
// CORE logic worth understanding 
// All the questions are in the form of an object we will be using a singleton array of objects {QUESTIONS_BANK} that will hold many question objects ... so a separate file will be used that will only hold the array of question object. 
// the main problem is that for each round a random question obejct should be drawn out of the the original array 
// to solve this probelm will be particulary using a copy of the original array and shuffling that copied array and then applying the "Fisher Yates" algorithm that will choose a random index of the copied array which will be having a particular question object {i.e., a question} for the user himself to answer 

function shuffle(arr){ // uses fisher yates algorithm
  console.log("Shuffling !"); 
  const copy_arr = arr.slice()
  for(let i = copy_arr.length - 1; i > 0; i--){ // start from the last index of the original array 
    const j = Math.floor(Math.random() * (i + 1)); // calculates a random index from 0 to i 
    // swap the copy[i] and copy[j]
    const temp = copy_arr[i]; // a temp variable to hold and save the current index value of the original array 
    copy_arr[i] = copy_arr[j]; // overwrite the index from the original to copied 
    copy_arr[j] = temp; // now finally save the the value into the index
  }
  return copy_arr; // return the copied array 
}
// just testing
console.log(shuffle([10,20,30,40]));




const state = {
  questions: QUESTION_BANK,
  currentIndex: 0,
  score: 0,
  attempts: [],
  status: "playing",
  passMark: 70
};

console.log(state.questions[0]);


