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
  console.log(float);
}

function createFloatWithBinary()
{
  let sign = document.getElementById("sign").value;
  let exponent = document.getElementById("exponent").value;
  let mantissa = document.getElementById("mantissa").value;

  let parameters = {sign: sign, exponent: exponent, mantissa: mantissa};
  let float = new Float(parameters, "binToDec");

}
