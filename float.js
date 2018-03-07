/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
class Float
{

  constructor(num, bits)
  {
    this.sign = undefined;
    this.exponent = [];
    this.fraction = [];
    this.num = parseFloat(num);
    this.bits = bits;

    if(this.num >= 0)
    {
      this.sign = false;
    }
    else
    {
      this.sign = true;
    }


    let decBinaryPart = this.convertDecToBin();
    let intBinaryPart = this.convertIntToBin();

    console.log(intBinaryPart);
    console.log(decBinaryPart);
  }

  convertDecToBin()
  {
    let temp = this.num % 1;
    let binary = [];

    while(temp != 1)
    {
      temp *= 2;

      binary.push(temp >= 1);

      if(binary[binary.length-1] && temp != 1)
      {
        temp = temp-1;
      }
    }

    return binary;
  }

  convertIntToBin()
  {
    var binary = []
    var bool = false;
    var value = Math.floor(this.num);

    do
    {
      bool = (value & 1) == 1;
      binary.unshift(bool);
      value = value >> 1;
    }
    while(value != 0);

    return binary;
  }

  add(float)
  {

  }

  soustract(float)
  {

  }


}

function createFloat()
{
  let inputVal = document.getElementById("float").value;
  let nbBits = document.getElementById("nbBits").value;

  let float = new Float(inputVal, nbBits);

}
