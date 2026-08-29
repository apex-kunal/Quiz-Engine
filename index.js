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