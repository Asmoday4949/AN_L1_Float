/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
class Float
{
  //parameters est un objet -> either {num, bits} or {sign, mantissa, exponent}
  constructor(parameters, option = "decToBin")
  {
    this.exponent = []; //mantisse
    this.mantissa = []; //nombre
    this.sign = undefined;
    this.bits = 0; // size
    this.sizeExponent = 0;
    this.sizeMantissa = 0;
    this.sizeIntPart = 0; // utilisé pour ne pas dépassé la taille de bits autorisé lors du calcule de la partie décimale

    if(option === "decToBin")
    {
      this.bits = parameters.bits;
      this.findSizeExponent();
      this.sizeMantissa = this.bits - 1 - this.sizeExponent; //taille de la mantisse

      if(!this.isSpecialNumber(this, parameters.number))
      {
        //ne prend pas en compte les ","
        let stringSplit = parameters.number.split(".");
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

        this.sign = !(parseInt(intNum) >= 0);
        let decExponent = this.mergeIntDecBin(this.convertIntToBin(intNum), this.convertDecToBin(decNum));
        this.convertExponentToBin(decExponent);
      }
    }
    else if(option === "binToDec")
    {
      this.exponent = parameters.exponent;
      this.sign = parameters.sign;
      this.mantissa = parameters.mantissa;

      this.bits = this.exponent.length + this.sign.length + this.mantissa.length;
      this.sizeMantissa = this.mantissa.length;
      this.sizeExponent = this.exponent.length;
    }

    // Code de test afin de vérifier le bon fonctionnement de la conversion SEM to SED
    // Valeur encodée : +10.5
    //this.sign = [false];
    //this.exponent = [true, false, false, false, false, false, true, false];
    //this.mantissa = [false, true, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false];
  }

  //calcule la taille de l'exposant.
  //valeur trouvé en mettant la de l'exposant en fonction de la taille en bits du type et en interpollant la fonction
  findSizeExponent()
  {
    this.sizeExponent = Math.ceil(5*Math.log(0.15*this.bits));
  }

  // convertit la partie décimale en binaire
  convertDecToBin(decNum)
  {
    let temp = Math.abs(parseInt(decNum));
    if(temp === 0)
    {
      return [false];
    }
    else
    {
      //TODO : GERER la taille max de goalNumber
      //length d'un nombre est un moyen simple de faire un log10 sans la virgule
      let goalNumber = Math.pow(10, decNum.length);
      let binary = [];

      while(temp != goalNumber && binary.length < this.sizeMantissa-this.sizeIntPart)
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
  //En insérant le MSB en premier (Raison de la complication) pour avoir les bits les plus importants si le nombre est trop grand
  convertIntToBin(intNum, size = -1)
  {
    intNum = Math.abs(parseInt(intNum));

    if(intNum === 0)
    {
      return [false];
    }
    else
    {
      let power2 = 0;
      if(size === -1)
      {
        power2 = this.searchBiggestSmaller2Pow(intNum);
      }
      else
      {
        power2 = Math.pow(2, size - 1);
      }
      let binary = [];

      while(power2 > 0 && binary.length < this.sizeMantissa)
      {
        binary.push(power2 <= intNum);
        if(binary[binary.length-1])
        {
          intNum -= power2;
        }

        power2 = power2 >> 1;
      }

      this.sizeIntPart = binary.length;
      return binary;
    }
  }

  //recherche la puissance  de 2 la plus grande ppossible inférieur à number
  //number doit être positif
  searchBiggestSmaller2Pow(number)
  {
    let power2 = 1;
    while(power2 <= number)
    {
      power2 = power2 << 1;

    }
    return power2 >> 1;
  }

  //merge la partie décimale et entière pour faire la mantisse
  mergeIntDecBin(intPart, decPart)
  {
    let binary = [];
    let exponent = 0;

    //seul cas ou decPart[0] est [0] est quand le nombre ressemble à 0.XXXX et exposant sera négatif
    if(intPart.length === 1 && !intPart[0])
    {
      let i = 0;
      binary = intPart.concat(decPart);

      // recherche le premier 1 dans la partie décimale
      while(!binary[i])
      {
        exponent--;
        i++;
      }

      //garde tous les éléments de la partie décimale du premier 1 non inclu jusqu'à la fin
      binary = binary.slice(i+1);
    }
    else
    {
      //si le nombre >= 1 alors on concatène les deux tableaux et on supprime le premier 1
      //si le nombre >= 1 le premier bit de intpart sera toujours 1
      binary = intPart.concat(decPart);
      exponent = intPart.length - 1;
      binary.shift();
    }

    //ajoute des 0 à droite
    binary = this.fill(false, binary, this.sizeMantissa);
    this.mantissa = binary;

    return exponent;
  }

  //convertit l'exposant en binaire avec le décalage pour les nombres négatifs
  convertExponentToBin(exponent)
  {
    exponent += Math.pow(2, this.sizeExponent-1) - 1 ;
    this.exponent = this.convertIntToBin(exponent, this.sizeExponent);
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
    let nbits = binary.length-1;
    let value = 0;
    let factor = 1;

    for(var i = nbits;i >= 0; --i)
    {
      value += binary[i] * factor;
      factor *= 2;
    }

    return value;
  }

  // Convertit le binaire en partie décimale
  // La fonction retourne un tableau comportant aux index :
  // [0] --> le nombre de 0 devant la valeur
  // [1] --> la valeur de la partie décimale
  convertBinToDec(binary)
  {
    let nbits = binary.lastIndexOf(true)+1;
    let factor = Math.pow(10, nbits);
    let divisor = 2;
    let value = 0;

    for(let i = 0;i < nbits; ++i)
    {
      value += binary[i] * 1/divisor;
      divisor *= 2;
    }

    return value;
  }

  // Permet d'obtenir la partie entière et la partie décimale en binaire à partir de la convention SEM
  // La fonction retourne un tableau contenant aux index :
  // 0 --> le signe
  // 1 --> la partie entière en binaire (tableau)
  // 2 --> la partie décimale en binaire (tableau)
  convertSEMToIntDec()
  {
    let totalBits = 1 + this.sizeExponent + this.sizeMantissa;    // S + E + M (bit signe, bits exposants, bits mantisse)
    let exponentOffset = Math.pow(2, this.sizeExponent)/2 - 1;    // Décalage de l'exposant

    let realExponent = this.convertBinToInt(this.exponent) - exponentOffset;

	let binIntPart;
	let binDecPart;

	// Si l'exposant est positif
	if(realExponent >= 0)
	{
		// Découpe la mantisse en partie entière et en partie décimale
		// Copies profondes
		binIntPart = Array.from(this.mantissa.slice(0,realExponent));
		binDecPart = Array.from(this.mantissa.slice(realExponent));

		// Ajout du bit implicite (ou caché WHATEVER !)
		binIntPart.unshift(true);
	}
	// Si l'exposant est négatif
	else
	{
		realExponent = Math.abs(realExponent) - 1;

		binIntPart = [false];
		binDecPart = Array.from(this.mantissa);
		binDecPart.unshift(true);

		// Ajout de zéros devant le bit implicite (caché)
		for(let i = 0;i < realExponent; i++)
		{
			binDecPart.unshift(false);
			binDecPart.pop();
		}
	}

    return [this.sign, binIntPart, binDecPart];
  }

  //Permet d'obtenir sous la forme d'une string le float
  toString()
  {
    let floatStr = "";

    // Signe | entier | décimal (SED)
    let SED = this.convertSEMToIntDec();
    let sign = SED[0];
    let binInt = SED[1];
    let binDec = SED[2];

    if(sign == true)
    {
      floatStr += "-";
    }
    else
    {
      floatStr += "+";
    }

    floatStr += (this.convertBinToInt(binInt) + this.convertBinToDec(binDec));

    return floatStr;
  }

  //https://www.youtube.com/watch?v=mKJiD2ZAlwM
  add(float)
  {
    let bigExponent = this.findBiggestExponent(this, float);
    let smallExponent = bigExponent === this ? this : float;

    let newMantissa = this.shiftExponentTo(this.convertBinToInt(bigExponent.exponent)-this.convertBinToInt(smallExponent.exponent), smallExponent.mantissa);
    let  resAdd = this.binaryIntAdd(bigExponent.mantissa, newMantissa);
    let exponent = bigExponent.exponent;
    console.log(resAdd);
    newMantissa = resAdd.result;
    if(resAdd.carry)
    {
      exponent = this.binIntAdd(exponent, createArrSizeNEqual1(exponent.length));
    }


    let parameters = {sign: bigExponent.sign, exponent: exponent, mantissa: newMantissa};

    return new Float(parameters, "binToDec");
  }

  findBiggestExponent(float1, float2)
  {
    for(let i = 0; i < float1.exponent.length; i++)
    {
      if(float1[i] && !float2[i])
      {
        return float1;
      }
      else if(!float1[i] && float2[i])
      {
        return float2;
      }
    }
    return float1;
  }

  // Permet d'effecter le décalage d'exposant
  shiftExponentTo(offset, mantissa)
  {
    let arrNewMantissa = mantissa;

    for(let i = 0; i < offset; i++)
    {
      if(i == 0)
        mantissa.unshift(true);
      else
        mantissa.unshift(false);

      mantissa.pop();
    }

    return mantissa;
  }

  //addition binaire
  binaryIntAdd(arr1, arr2)
  {
    let result = [];
    let supp = false;
    for(let i = 0; i < arr1.length; i++)
    {
      result.push((arr1[i] ^ arr2[i]) ^ supp);

      if(arr1[i] && arr2[i])
      {
        supp = true;
      }
      else
      {
        supp = false;
      }
    }

    return {result: result, carry: supp};
  }

  // crée un tableau de taille N qui est égale à 1 décimal
  createArrSizeNEqual1(n)
  {
    let arr = [true];
    for(let i = 0; i < n - 1; i++)
    {
      arr.unshift(false);
    }

    return arr;
  }

  complement2(arr)
  {
    for(let i = 0; i < arr.length; i++)
    {
      arr[i] = !arr[i];
    }
    return binaryIntAdd(arr, createArrSizeNEqual1(size.length)).result;
  }

  changeToInfinity(sign)
  {
    //BUG : JavaScript dit que ce n'est pas une fct :c
    this.sign = sign;
    this.fill(true, this.exponent, this.sizeExponent);
    this.fill(false, this.mantissa, this.sizeMantissa);
    return this;
  }

  isInfinity()
  {
    this.exponent.forEach(function(item){
      if(item != true)
        return false;
    });
    this.fraction.forEach(function(item){
      if(item != false)
        return false;
    });
    return true;
  }

  changeToNaN()
  {
    this.sign = true;
    this.fill(true, this.exponent, this.sizeExponent);
    this.fill(undefined, this.mantissa, this.sizeMantissa); // Faire un test si fonctionnel
    return this;
  }

  isNotaN() //isNaN is est un fct du langage Javascript -> nom occupe
  {
    this.exponent.forEach(function(item){
      if(item != true)
        return false;
    });
    this.fraction.forEach(function(item){
      if(item != undefined)
        return false;
    });
    return sign;  // sign doit etre a vrai
  }

  changeToPi(sign)
  {
    this.sign = sign;
    //Trouvez l'encodage
    return this;
  }

  isSpecialNumber(num, input)
  {
    if(isNaN(input))
    {
      if(input.search(/infini/i) != -1)
      {
        if(input.search(/-/) != -1) //s'il est explicitement negatif
        {
          this.changeToInfinity(false);
        }
        else //sinon on le considere positif
        {
          this.changeToInfinity(true);
        }
      }
      else if(input.toLowerCase().search(/pi/i) != -1)
      {
        if(input.search(/-/) != -1) //s'il est explicitement negatif
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
