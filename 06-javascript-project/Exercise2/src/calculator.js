
export function addNumbers(...array){
    return array.reduce( (accumulator, currentValue, currentIndex, array) => accumulator + currentValue);
}
