function sayHi() {
  console.log("hi");
}
function sayHello() {
  console.log("hello");
}
const play = function () {
  console.log("First Violin is playing!");
};
//! using class
class Person {
  constructor(name = "Josh Edward") {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}

module.exports = Person;

// module.exports = {
//     sayhi : sayHi,
//     sayHello : sayHello
// }

//* exporting object
module.exports = { sayHi, sayHello, play };
