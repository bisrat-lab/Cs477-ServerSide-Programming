//console.log(process.env);
/**!
* ! 1.nextTick
* ! 2.Microtask ==>promise
* ! 3.timers setTimeout() and setInterval().
* ! check ==>setImmediate() 
 */
//check 
setImmediate(() => { 
    console.log("immediate");
  }); 

  //timer if the time is 0 run as ques order 
setTimeout(() => { 
  console.log("timeout");
},0); 

//nextTick always run 1st 
process.nextTick(() => console.log("nexttick"));//1
//! the order of the queas are important 


setImmediate(function A() {
	console.log("1st immediate");
});

setImmediate(function B() {
	console.log("2nd immediate");
});

process.nextTick(function C() {
	console.log("1st nextTick");
});

process.nextTick(function D() {
	console.log("2nd nextTick");
});

// First event queue ends here
console.log("program started");
