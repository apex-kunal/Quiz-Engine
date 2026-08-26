// Reference shape of a single question object:
// {
//   id: "q1",
//   type: "mc",          // "mc" | "tf" | "short"
//   prompt: "What does === compare?",
//   choices: ["Value only", "Value and type"],
//   correct: "Value and type",
//   explanation: "Strict equality checks type too."
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