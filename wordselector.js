//This portion of code will format and remove any special characters, leaving 5 character words.

let words = ` ` //insert words here

let withoutCharact = words.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
let wordsOrder = withoutCharact.replace(/(\r\n|\n|\r)/gm, " ");
let separatedWords = wordsOrder.split(' ');
let ordered = [];

separatedWords.forEach((elem) => {
  if (elem.length == 5){
    ordered.push(elem);
  } 
});

console.log(ordered);