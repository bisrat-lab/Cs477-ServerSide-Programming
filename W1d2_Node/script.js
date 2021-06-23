//console.log(process.env);
//check 
setImmediate(() => { 
    console.log("immediate");
  }); //3 

  //timer if the time is 0 run as ques order 
setTimeout(() => { 
  console.log("timeout");
}, 200); //2 if the time is not 0 //3

//nextTick always run 1st 
process.nextTick(() => console.log("nexttick"));//1
// the order of the queas are important 


setImmediate(function A() {
	console.log("1st immediate");
});

setImmediate(function B() {
	console.log("2nd immediate");
});

process.nextTick(function C() {
	console.log("1st process");
});

process.nextTick(function D() {
	console.log("2nd process");
});

// First event queue ends here
console.log("program started");
