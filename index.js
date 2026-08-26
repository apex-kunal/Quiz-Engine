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

console.log(isCorrect(mcQuestion, "Value and type"));  // expect: ?
console.log(isCorrect(mcQuestion, "Value only"));       // expect: ?
console.log(isCorrect(tfQuestion, true));                // expect: ?
console.log(isCorrect(tfQuestion, false));               // expect: ?
console.log(isCorrect(shortQuestion, " paris "));         // expect: ?
console.log(isCorrect(shortQuestion, "London"));          // expect: ?