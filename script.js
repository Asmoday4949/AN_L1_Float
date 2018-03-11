/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : main script
*/
//traitement du premier formulaire
function createFloat()
{
  let inputVal = document.getElementById("float").value;
  let nbBits = document.getElementById("nbBits").value;

  let parameters = {number: inputVal, bits: nbBits};
  let float = new Float(parameters);

  let strResult = `<span class="sign">${boolArrayToOneZero([float.sign])}</span>`.concat(
    `<span class="exponent">${boolArrayToOneZero(float.exponent)}</span>`,
    `<span class="mantissa">${boolArrayToOneZero(float.mantissa)}</span>`
  );


  document.getElementById("resultToBinary").innerHTML = strResult;
  document.getElementById("resultToDecimalFromBinary").innerHTML = float.toString();
}

//traitement du deuxième formulaire
function createFloatWithBinary()
{
  let sign = Boolean(document.getElementById("sign").value);
  let exponent = document.getElementById("exponent").value;
  let mantissa = document.getElementById("mantissa").value;

  let parameters = {sign: sign, exponent: oneZeroToBoolArray(exponent), mantissa: oneZeroToBoolArray(mantissa)};
  let float = new Float(parameters, "binToDec");
  document.getElementById("resultToDecimal").innerHTML = float.toString();
}

//convertit un tableau de booléen en chaine de charactère
function boolArrayToOneZero(arrBooleans)
{
  let string = "";
  for(let i = 0; i < arrBooleans.length; i++)
  {
    if(arrBooleans[i])
    {
      string += "1";
    }
    else if(arrBooleans[i] === undefined)
    {
        string += "X";
    }
    else
    {
        string += "0";
    }
  }

  return string;
}
//convertit un chaine de charactère de 1 et 0 en tableau de booléen
function oneZeroToBoolArray(string)
{
  let arrBool = [];

  for(let i = 0; i < string.length; i++)
  {
    arrBool.push(Boolean(parseInt(string.charAt(i))));
  }

  return arrBool;
}
