/*
- Create a function that adds two numbers and returns the result. This function should be in a file called calculator.js and exported using es6 modules. 
- In the index.html file, import the add function and execute it with any two numbers fed to the functions parameters. 
- Print the result using the "console.log" function. When you open your browser's developer tools you should see your result in the console.
*/

let add = 0;
add = (number1,number2) => number1 + number2;
export {add};