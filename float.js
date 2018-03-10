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
    this.sizeMantissa = 23; //taille de la mantisse
    this.sizeExponent = this.bits - 1 - this.sizeMantissa;

if(!isSpecialNumbers(this, num))
{
    //ne prend pas en compte les ","
    let stringSplit = num.split(".");
    let intNum = stringSplit[0];
    let decNum = "";
    if(stringSplit.length === 2)
    {
      decNum = stringSplit[1];
    }
    else
    {
      decNum = "0";
    }

    this.sign = !(parseInt(this.intNum) >= 0);


    let decExponent = this.mergeIntDecBin(this.convertIntToBin(intNum), this.convertDecToBin(decNum));
    this.convertExponentToBin(decExponent);
    }
  }

  // convertit la partie décimale en binaire
  convertDecToBin(decNum)
  {
    let temp = parseInt(decNum);
    if(temp === 0)
    {
      return [false];
    }
    else
    {
      let goalNumber = Math.pow(10, decNum.length)
      let binary = [];

      while(temp != goalNumber && binary.length < this.sizeMantissa)
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
    while(value != 0 && binary.length < this.sizeMantissa);

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
    binary = this.fill(false, binary, this.sizeMantissa);
    this.fraction = binary;

    return exponent;
  }

  //convertit l'exposant en binaire avec le décalage pour les nombres négatifs
  convertExponentToBin(exponent)
  {
    exponent += Math.pow(2, this.sizeExponent-1) - 1 ;
    this.exponent = this.convertIntToBin(exponent);
    this.fill(false, this.exponent, this.sizeExponent);
  }

  //fill the binary array until the end
  fill(value, binaryNumber, wantedSize)
  {
    for(let i = binaryNumber.length - 1; i < wantedSize-1; i++)
    {
      binaryNumber.push(value); //True : 1, False : 0
    }

    return binaryNumber;
  }

   //convertit le binaire de la partie entière en entier
   convertBinToInt(binary)
   {
     var nbits = binary.length-1;
     var value = 0;
     var factor = 1;

     for(var i = nbits;i >= 0; --i)
     {
   	value += binary[i] * factor;
   	factor *= 2;
     }

     return value;
   }

   //convertit le binaire de la partie décimale en entier
   convertBinToDec(binary)
   {
     var nbits = binary.lastIndexOf(true)+1;
     var factor = Math.pow(10, nbits);
     var divisor = 2;
     var value = 0;

     for(var i = 0;i < nbits; ++i)
     {
   	value += binary[i] * factor/divisor;
   	divisor *= 2;
     }

     // TODO : nécessite d'ajouter des zéros : 0.0625 --> 0.625 (bug)
     // Je vais fix ça demain :)

     return value;
   }

   // Permet d'obtenir la partie entière et la partie décimale en binaire à partir de la convention SEM
   // La fonction retourne un tableau contenant aux index :
   // 0 --> le signe
   // 1 --> la partie entière en binaire (tableau)
   // 2 --> la partie décimale en binaire (tableau)
   SEMToIntDec(sign, exponent, mantissa)
   {
     var totalBits = 1 + sizeExponent + sizeMantissa;      // S + E + M (bit signe, bits exposants, bits mantisse)
     var exponentOffset = Math.pow(2,sizeExponent)/2 - 1;  // Décalage de l'exposant

     var realExponent = convertBinToInt(exponent) - exponentOffset;

     // Découpe la mantisse en partie entière et en partie décimale
     // Copies profondes
     var binIntPart = Array.from(mantissa.slice(0,realExponent));
     var binDecPart = Array.from(mantissa.slice(realExponent));

     // Ajout du bit implicite (ou caché WHATEVER !)
     binIntPart.unshift(true);

     return [sign, binIntPart, binDecPart];
   }

   //Permet d'obtenir sous la forme d'une string le float
   toString(sign, binIntPart, binDecPart)
   {
      var floatStr = "";

      if(sign)
      {
      floatStr += "-";
      }
      else
      {
      floatStr += "+";
      }

      floatStr += binToInt(intBin);
      floatStr += ",";
      floatStr += binToDec(decBin);

      return floatStr;
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
    this.fill(true, this.exponent, this.sizeExponent);
    this.fill(false, this.fraction, this.sizeMantissa);
  }

  changeToNaN()
  {
    this.sign = true;
    this.fill(true, this.exponent, this.sizeExponent);
    this.fill(undefined, this.fraction, this.sizeMantissa); // Faire un test si fonctionnel
  }

  changeToPi(sign)
  {
    this.sign = sign;
    //Trouvez l'encodage
  }

  static isSepcialNumber(num, input)
  {
    if(isNaN(input))
    {
      if(input.toLowerCase().search(/infini/))
      {
        if(input.search(/-/)) //s'il est explicitement negatif
        {
          this.changeToInfini(false);
        }
        else //sinon on le considere positif
        {
          this.changeToInfini(true);
        }
      }
      else if(input.toLowerCase().search(/pi/))
      {
        if(input.search(/-/)) //s'il est explicitement negatif
        {
          this.changeToPi(false);
        }
        else  //sinon on le considere positif
        {
          this.changeToPi(true);
        }
      }
      else // correspond à NaN
      {
        this.changeToNaN();
      }
      return true;
    }
    //else if input vaut pi ou une approximation
    else
    {
      return false;
    }
  }
}
