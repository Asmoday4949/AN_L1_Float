/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
class Float
{
  let sign = undefined;
  let exponent = [];
  let fraction = [];
  let num = num;
  let bits = bits;

  constructor(num, bits)
  {
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
}

function processFloat()
{
  let inputVal = document.getElementById("float");
  let nbBits = parseInt(document.getElementById("nbBits"));

  let float = new Float(inputVal, nbBits);

}
