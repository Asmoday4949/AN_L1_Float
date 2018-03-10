/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : main script
*/
function createFloat()
{
  let inputVal = document.getElementById("float").value;
  let nbBits = document.getElementById("nbBits").value;

  let float = new Float(inputVal, nbBits);
}
