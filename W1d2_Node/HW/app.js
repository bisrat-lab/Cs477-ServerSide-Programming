Array.prototype.even = function() {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      if (this[i] % 2 === 0)  {
        arr.push(this[i]);
      }
    }
    return arr;
  }

console.log([1,2,3,4,5,6,7,8].even());

Array.prototype.odd = function() {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      if (this[i] % 2 !== 0)  {
        arr.push(this[i]);
      }
    }
    return arr;
  }

console.log([1,2,3,4,5,6,7,8].odd());
