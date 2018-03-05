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
    while(!(temp >= 0.5 && temp < 1))
    {
      console.log(temp);
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

function createFloat()
{
  let inputVal = document.getElementById("float").value;
  let nbBits = document.getElementById("nbBits").value;

  let float = new Float(inputVal, nbBits);

}
