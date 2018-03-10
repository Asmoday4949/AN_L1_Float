/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
class Float
{

  constructor(num, bits)
  {
    this.exponent = []; //mantisse
    this.fraction = []; //nombre
    this.sign = undefined;
    this.bits = bits; // size
    this.sizeFraction = 0; //taille de la mantisse

    let intNum = num.split(".")[0];
    let decNum = num.split(".")[1];
    this.sign = !(parseInt(this.intNum) >= 0);


    let decExponent = this.mergeIntDecBin(this.convertIntToBin(intNum), this.convertDecToBin(decNum));
    this.convertExponentToBin(decExponent);

  }

  // convertit la partie décimale en binaire
  convertDecToBin(decNum)
  {
    let goalNumber = Math.pow(10, decNum.length)
    let temp = parseInt(decNum);
    let binary = [];

    while(temp != goalNumber)
    {
      temp *= 2;

      binary.push(temp >= goalNumber);

      if(binary[binary.length-1] && temp != goalNumber)
      {
        temp = temp-goalNumber;
      }
    }

    return binary;
  }

  //convertit la partie entière en binaire
  convertIntToBin(intNum)
  {
    var binary = []
    var bool = false;
    var value = Math.floor(intNum);

    do
    {
      bool = (value & 1) == 1;
      binary.unshift(bool);
      value = value >> 1;
    }
    while(value != 0);

    return binary;
  }

  //merge la partie décimale et entière pour faire la mantisse
  mergeIntDecBin(intPart, decPart)
  {
    let binary = intPart.concat(decPart);
    let exponent = 0;

    //seul cas ou decPart est [0] est quand le nombre ressemble à 0.XXXX et exposant sera négatif
    if(decPart.length === 1 && !decPart[0])
    {

    }
    else
    {
      exponent = decPart.length - 1;
      binary.shift();
    }

    this.fraction = binary;
    return exponent;
  }

  convertExponentToBin(exponent)
  {

  }

  add(float)
  {

  }

  soustract(float)
  {

  }

  changeToInfini(sign)
  {
    this.sign = sign;
    
  }

  static isSepcialNumber(input)
  {
    if(isNaN(input))
    {
      if(input.toLowerCase().search(/infini/))
      {
        if(input.search(/-/)) //s'il est explicitement negatif
        {

        }
        else //sinon on le considere positif
        {

        }
      }
      else if(input.toLowerCase().search(/pi/))
      {
        //Trouver codage de pi
      }
      else // correspond à NaN
      {
        //Contstruire un NaN
      }
    }
    //else if input vaut pi ou une approximation
    else
    {
      return false;
    }
  }
}
