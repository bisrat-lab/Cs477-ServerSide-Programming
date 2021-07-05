fetch('http://localhost:3002/api/v1/books/')
.then(res => res.json())
.then(data=>{
    let bookArray = data.data
     table(bookArray);    
})

function table(arr){
    let tableBody = document.getElementById('myTable')
    let id = document.getElementById('bookId')
    console.log(id)
     let data ='';
  
    for (let i = 0; i < arr.length; i++) {
         data += `<tr>`;
         data += `<td>` + arr[i].id + '</td>';
         data += '<td>'+ arr[i].title + '</td>';
         data += '<td>'+ arr[i].ISBN + '</td>';
         data += '<td>'+ arr[i].publisherDate + '</td>';
         data += '<td>'+ arr[i].author + '</td>'
         data += '<td><button onclick="bookEdit(' + i + ')">Edit</button></td>';
         data += '<td><button onclick="bookDelete(' + i + ')">Delete</button></td>'
         data += `</tr>`;
        
    }
    tableBody.innerHTML = data;
}

 function bookDelete(item){
  fetch('http://localhost:3002/api/v1/books/')
  .then(res => res.json())
  .then(data=>{
      let bookArray = data.data
       table(bookArray); 
       let idIndex = bookArray[item].id;  


       fetch(`http://localhost:3002/api/v1/books/${idIndex}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        });
  })
 }
 function bookEdit(item){
   fetch('http://localhost:3002/api/v1/books/')
   .then(res => res.json())
   .then(data=>{
     let bookArray = data.data
     let idIndex = bookArray[item].id;  
     
     console.log(bookArray);
    

    
     let idbody = document.getElementById('id');
     let titlebody = document.getElementById('title');
     let isbnBody = document.getElementById('isbn');
     let pub = document.getElementById('publishedDate');
     let author = document.getElementById('author');
     idbody.value = bookArray[item].id; 
     titlebody.value = bookArray[item].title;
     isbnBody.value = bookArray[item].ISBN;
     pub.value = bookArray[item].publisherDate;
     author.value = bookArray[item].author;

     

     document.getElementById('upbtn').addEventListener('click',()=>{
       
       fetch(`http://localhost:3002/api/v1/books/${idIndex}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
         let bookArray = data.data
         let idIndex = bookArray[item].id;  
         bookArray[idIndex]={
           id :  bookArray[item].id,
           title : bookArray[item].title,
   
         }
        });
    })
    })
  }
  
document.getElementById("savebtn").addEventListener("click", () => {
  const newBook = {};
  newBook.id = document.getElementById("id").value;
  newBook.title = document.getElementById("title").value;
  newBook.ISBN = document.getElementById("isbn").value;
  newBook.publisherDate = document.getElementById("publishedDate").value;
  newBook.author = document.getElementById("author").value;
  console.log(newBook);

  fetch("http://localhost:3002/api/v1/books/", {
    headers: {
      "Content-Type": "Application/json",
    },
    method: "POST",
    body: JSON.stringify(newBook),
  })
    .then((res) => res.json())
    .then((data) => {});
});
