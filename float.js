/*
Authors : Biloni Kim, Fleury Malik, Bulloni Lucas
Description : float class
*/
function Float(num, bits)
{
  this.sign = undefined;
  this.exponent = [];
  this.fraction = [];

  this.build();
}

Float.prototype = {
  /*calculate the float table of bits*/
  this.build: function()
  {

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
