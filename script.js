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

  let strResult = `<span class="sign">${displayBoolArrayToOneZero([float.sign])}</span>`.concat(
    `<span class="exponent">${displayBoolArrayToOneZero(float.exponent)}</span>`,
    `<span class="mantissa">${displayBoolArrayToOneZero(float.mantissa)}</span>`
  );


  document.getElementById("resultToBinary").innerHTML = strResult;
}

function createFloatWithBinary()
{
  let sign = document.getElementById("sign").value;
  let exponent = document.getElementById("exponent").value;
  let mantissa = document.getElementById("mantissa").value;

  let parameters = {sign: sign, exponent: exponent, mantissa: mantissa};
  let float = new Float(parameters, "binToDec");
}

function displayBoolArrayToOneZero(arrBooleans)
{
  let string = "";
  for(let i = 0; i < arrBooleans.length; i++)
  {
    if(arrBooleans[i])
    {
      string += "1";
    }
    else
    {
        string += "0";
    }
  }

  return string;
}
