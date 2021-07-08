const url = `http://localhost:3004/products/`;
function displayHome(){
  document.getElementById('product-container').style.display = 'none';
  document.getElementById('username').style.display = 'block';
  document.getElementById('password').style.display = 'block';
  document.getElementById('logout-btn').style.display = 'none';
  document.getElementById('login-btn').style.display = 'block';
}
function displayProductContent(){
  fetchProduct();
    document.getElementById('product-container').style.display = 'block';
    document.getElementById('username').style.display = 'none';
    document.getElementById('password').style.display = 'none';
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'block'
}

window.onload = function () {

  if(sessionStorage.getItem('accessToken')){
    displayProductContent();
  }else{
    displayHome(); 
  }

  //const url = `http://localhost:3004/products/`;
  const prodForm = document.getElementById("prodForm");
  const formTitle = document.getElementById("form-title");

  document.getElementById('login-btn').onclick = async function(e){
    e.preventDefault()
   const result = await fetch('http://localhost:3004/login',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById('username').value,
        password : document.getElementById('password').value
      })
    }).then(res=> res.json());
    console.log(result)
    if(result.jwtToken){
      sessionStorage.setItem('accessToken', result.jwtToken);
      
      displayProductContent()

    }else{
      document.getElementById('username').value ="";
      document.getElementById('password').value ="";
    }
  }
  

  document.getElementById("addBtn").onclick = function (event) {
    event.preventDefault();
    const productID = this.dataset.id;
    if (productID) {
      fetch(url + productID, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          title: document.getElementById("title").value,
          price: document.getElementById("price").value,
          info: document.getElementById("info").value,
        }),
      })
        .then((data) => data.json())
        .then((updatedProd) => {
          console.log(updatedProd);
          formTitle.innerText = "Add a Product";
          prodForm.reset();
          document.getElementById("addBtn").dataset.id = "";
          location.reload();
        });
    } else {
      createNewProduct();
    }
  };

  function createNewProduct() {
    // const prodForm = document.getElementById('prodForm');
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const info = document.getElementById("info").value;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        title: title,
        price: price,
        info: info,
      }),
    })
      .then((data) => data.json())
      .then((prod) => {
        prodForm.reset();
        attachSingleProduct(document.getElementById("product-list-body"), prod);
      });
  }

 
  function attachSingleProduct(parentNode, product) {
    const tr = document.createElement("tr");
    const titleTd = document.createElement("td");
    titleTd.textContent = product.title;
    tr.appendChild(titleTd);

    const priceTd = document.createElement("td");
    priceTd.textContent = product.price;
    tr.appendChild(priceTd);

    const infoTd = document.createElement("td");
    infoTd.textContent = product.info;
    tr.append(infoTd);

    const actionTd = document.createElement("td");

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList = "btn btn-danger";
    deleteButton.dataset.id = product.id;
    actionTd.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList = "btn btn-primary";
    editButton.style.marginLeft = '10px';
    // editButton.style.padding = '3px';
    editButton.dataset.id = product.id;
    actionTd.appendChild(editButton);

    tr.appendChild(actionTd);

    //!Delete Event
    deleteButton.addEventListener("click", () => {
      fetch(url + product.id, {
        method: "DELETE",
        headers :{
          "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
        }
      }).then((data) => {
        tr.remove();
      });
    });
    //!Edit Event
    editButton.addEventListener("click", () => {
      fetch(url + product.id,{
        headers: {
          "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
        }
      })
        .then((data) => data.json())
        .then((data) => {
          formTitle.innerText = "Edit a Product";
          document.getElementById("title").value = data.title;
          document.getElementById("price").value = data.price;
          document.getElementById("info").value = data.info;
          document.getElementById("addBtn").dataset.id = data.id;
        });
    });

    parentNode.appendChild(tr);
  }

  document.getElementById('logout-btn').addEventListener('click',()=>{
        sessionStorage.removeItem('accessToken');
        location.reload();
  })
};

async function fetchProduct() {
  const products = await (await fetch(url,{
      headers : {
        "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
      }
    }
    )).json();
  console.log(products);
  const tbody = document.getElementById("product-list-body");
  products.forEach((prod) => {
    attachSingleProduct(tbody, prod);
  });
}
