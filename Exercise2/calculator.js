/**Let's add another function to the calculator.js file and call it "addNumbers". 
 * This function can accept any number of values. Use spread operators to help you here. 
 * As with the first exercise call this function from index.html and lot the result.
*/


export function addNumbers(...array) {
  let total = 0;
  
  for(let i=0; i < array.length; i++){
    total += array[i];
  } 
  return total;
}

