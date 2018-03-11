/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : main script
*/
function createFloat()
{
  let inputVal = document.getElementById("float").value;
  let nbBits = document.getElementById("nbBits").value;

  let parameters = {number: inputVal, bits: nbBits};
  let float = new Float(parameters);
}
