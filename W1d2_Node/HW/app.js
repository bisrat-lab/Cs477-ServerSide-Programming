Array.prototype.even = function() {
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      if (this[i] % 2 === 0)  {
        arr.push(this[i]);
      }
    }
    return arr;
  }

  Array.prototype.even = function() {
    this.filter((item)=>{
      return
    })
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

/**1. Use setImmediate() when you want to execute some function asynchronously, but as soon as possible and after finishing the current block. 
 * setTimeout()
Use setTimeout() when you want to execute some function asynchronously, after a specified delay and after finishing the current block.
 setTimeout is simply like calling the function after delay has finished.
setImmediate is similar in this regard except that it doesn’t use queue of functions.

2. nextTick vs setImmediate
nextTick() run before any other I/O event is fired, while with setImmediate(), the execution is queued behind any I/O event that is already in the queue.

3. 10 global modules/method 
1.Class: Buffer

2.file System

3.process

4.global

5.HTTP

6.OS

7.Path

8.Query String

9.Stream

10. URL
*/

// Fix the slow function to be asynchronous/non-blocking
function slow(callback){
  for(let i=0; i<= 5e8; i++){} if (Math.random() > 0.5) {
  return callback("Error",null) callback(null, {id:12345})
  function exec(fn){
     let obj ={};
   fn(function (err,data){
     
   })
      obj.done = function(fn){

      },
      fail: function(fn){

      }
  
  }
   } }
  exec(slow).done(function(data){ console.log(data); }) .fail(function(err){ console.log("Error: " + err); });