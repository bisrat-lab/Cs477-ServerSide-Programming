const http = require("http");
const fs = require('fs');

http.createServer((req,res)=>{
    if(req.method ==='GET' && req.url==='/users'){
//*strem
        // const readStream = fs.createReadStream("./users.txt")
        // readStream.pipe(res);
//*sync
        // const read =fs.readFileSync("./users.txt");
        // res.end(read);

//*Async
        const readsync = fs.readFile("./users.txt",(err,data)=>{
            console.log(data.toString())
            res.end(data);

        })
    }else if(req.method ==='POST' && req.url==='/users'){
        const randomUser = {id:4,firstName:'John',lastName: 'Doe'};

        const fileUsers = fs.readFileSync('./users.txt');
    
        const lines = fileUsers.toString().split('\n')
        const userObject = [];
        console.log(lines)
        lines.forEach((line)=>{
            
            const token = line.split('-');
            const user ={
                id: token[0],
                firstName: token[1],
                lastName: token[2]
            }
            userObject.push(user)
        })
        
        for(let i=0; i<userObject.length;i++){
            if(userObject[i].id == randomUser.id){
                res.end("user Exist in the System")
            }
        }
        const writeNewUser = fs.createWriteStream('./users.txt',{flags:'a'});
        writeNewUser.write(randomUser.id + '-' + randomUser.firstName +'-' + randomUser.lastName + '\n')
        writeNewUser.end();
        res.end("sucess")
         
    }else if(req.method ==='GET' && req.url==="/products"){
        const readStream = fs.createReadStream('./products.txt');
        readStream.pipe(res);
    }else if(req.method ==='POST' && req.url==="/products"){
        const newProduct = {id:3,price: 60, name: "Mouse"};

        const fileProduct = fs.readFileSync("./products.txt");
       
        const lineBreak = fileProduct.toString().split('\n')
        const productObj = [];
        lineBreak.forEach((line)=>{
            const token2 = line.split('-')
            const product = {
                id: token2[0],
                price: token2[1],
                name: token2[2]
            }
            productObj.push(product)
            console.log(productObj)
        })
        for(let i=0; i<productObj.length;i++){
            if(newProduct.id == productObj[i].id){
                res.end("file allready exist")
            }
        }
        const writeStream = fs.createWriteStream('./products.txt',{
            flags:'a+'
        });
        writeStream.write(newProduct.id + '-' +newProduct.price+'-'+newProduct.name+'\n');
        writeStream.end()
        res.end("new Product added")
    }
}).listen(3001)


