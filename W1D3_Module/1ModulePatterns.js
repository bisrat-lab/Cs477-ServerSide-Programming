//! Creating our Module
//* play/violin.js
const play = function(){
  console.log("First Violin is playing!");
}
module.exports = play;

//* play/clarinet.js
const play = function() { 
  console.log("Clarinet is playing!"); 
} 
module.exports = play;

//* play/index.js
const violin = require('./violin');
const clarinet = require('./clarinet');
module.exports = {
   'violin': violin, 'clarinet': clarinet };

 //* app.js
const play = require('./play'); 
play.violin();
play.clarinet();

//!Using Modules – Pattern 1
// Pattern1 - pattern1.js
module.exports = function () {//it become function
   console.log('Josh Edward');
};
// app.js
const getName = require('./pattern1'); 
getName(); // Josh Edward

//!Using Modules – Pattern 2
module.exports.getName = function () { 
  console.log('Josh Edward');
};
const getName = require('./pattern2').getName; getName(); // Josh Edward
//getName is an object 

//!Using Modules – Pattern 3
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
