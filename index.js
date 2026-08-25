// funtion to normalize a short question to lowercase 
function normalize(text){
 return String(text).trim().toLowerCase();
};

const result = normalize("Paris");
console.log(result);


