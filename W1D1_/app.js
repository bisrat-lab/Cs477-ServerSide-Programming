const makePizza = function () {
  return new Promise((resolve, reject) => {
    if (true) {
      resolve("Here is your pizza");
    } else {
      reject("Sorry no pizza");
    }
  });
};
makePizza()
  .then((data) => console.log(data))
  .catch((err) => console.error(err));

//* asy
async function orderPizza() {
  try {
    let result = await makePizza();
  } catch (error) {}
}

async function sendRequest() {
  try {
    let result = await fetch(url);
    let data = await result.json();
    let result2 = await fetch(url2);
    let data2 = await result.text();
  } catch (error) {}
}
