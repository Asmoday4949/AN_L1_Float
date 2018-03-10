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
    this.sizeFraction = 20; //taille de la mantisse
    this.sizeExponent = this.bits - 1 - this.sizeFraction;

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
    let binary = [];
    let exponent = 0;

    //seul cas ou decPart est [0] est quand le nombre ressemble à 0.XXXX et exposant sera négatif
    if(decPart.length === 1 && !decPart[0])
    {
      let i = -1;

      // recherche le premier 1 dans la partie décimale
      do
      {
        exponent--;
        i++;
      } while(!decPart[i]);

      //garde tous les éléments de la partie décimale du premier 1 non inclu jusqu'à la fin
      binary = decPart.slice(i+1);
    }
    else
    {
      //si le nombre >= 1 alors on concatène les deux tableaux et on supprime le premier 1
      //si le nombre >= 1 le premier bit de intpart sera toujours 1
      binary = intPart.concat(decPart);
      exponent = decPart.length - 1;
      binary.shift();
    }

    //ajoute des 0 à droite
    binary = this.fillZero(binary, this.sizeFraction);
    this.fraction = binary;

    return exponent;
  }

  //convertit l'exposant en binaire avec le décalage pour les nombres négatifs
  convertExponentToBin(exponent)
  {
    exponent += Math.pow(2, this.sizeExponent-1) - 1 ;
    this.exponent = this.convertIntToBin(exponent);
    this.fillZero(this.exponent, this.sizeExponent);
  }

  //fill the binary array until the end
  fillZero(binaryNumber, wantedSize)
  {
    for(let i = binaryNumber.length - 1; i < wantedSize-1; i++)
    {
      binaryNumber.push(false);
    }

    return binaryNumber;
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
