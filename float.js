/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
function Float(num, bits)
{
  this.sign = undefined;
  this.exponent = [];
  this.fraction = [];
  this.num = num;
  this.bits = bits;

  this.build();
}

Float.prototype = {
  /*calculate the float table of bits*/
  this.build: function()
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

  this.add: function(float)
  {

  }

  this.soustract: function(float)
  {

  }
}

function processFloat()
{
  let inputVal = document.getElementById("float");
  let nbBits = parseInt(document.getElementById("nbBits"));

  let float = new Float(inputVal, nbBits);

}
