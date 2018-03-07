/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
class Float
{

  constructor(num, bits)
  {
    this.exponent = [];
    this.fraction = [];
    this.bits = bits;
    this.build(num, bits);


    console.log(intBinaryPart);
    console.log(decBinaryPart);
  }

  build(num, bits)
  {
    let intNum = num.split(".")[0];
    let decNum = num.split(".")[1];
    this.sign = !(parseInt(this.intNum) >= 0);

    let decBinaryPart = this.convertDecToBin(intNum);
    let intBinaryPart = this.convertIntToBin(decNum);
  }

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

      console.log(binary);
    }

    return binary;
  }

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
