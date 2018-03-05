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
    this.num = num;
    this.bits = bits;


    if(this.num >= 0)
    {
      this.sign = false;
    }
    else
    {
      this.sign = true;
    }

    let temp = this.num;
    while(!(this.num >= 0.5 && this.num < 1))
    {

      temp /= 2;
    }
  }

  add(float)
  {

  }

  soustract(float)
  {

  }

  intToBin(value)
  {
    var binArray = [];

    do
    {
      binArray.unshift(value%2);
      value = parseInt(value/2);
    }
    while (value >= 1);

    return binArray;
  }
}

function processFloat()
{
  let inputVal = document.getElementById("float");
  let nbBits = parseInt(document.getElementById("nbBits"));

  let float = new Float(inputVal, nbBits);

}
