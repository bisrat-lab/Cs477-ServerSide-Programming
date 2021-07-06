const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const ProductModel = require('../productModel');

function fileReader(){
    const productArr = [];
    const readfile = fs.readFileSync(path.join(__dirname,'products.txt')).toString();
    let readfile2 = readfile.split(/^\r\n/).join('')
    const line = readfile2.split('\n');
    line.forEach((item)=>{
        const attribuit = item.split('-'); 
        const product = new ProductModel(
            attribuit[0],
            attribuit[1],
            attribuit[2]
        )
        productArr.push(product);
    })
   return productArr;
}


router.get('/', function(req, res, next) {
    const productData = fileReader();
 res.json({status: "sucess",result:productData })
});

router.get('/:id', function(req, res, next) {
    const productData = fileReader();
    const index = productData.map((item)=>item.id).indexOf(req.params.id);
    if(index !== -1){
        res.json({status:"sucess", result:productData[index]})
    }else{
        res.json({status: "sucess",result:"Not_Found" })
    }
});

router.post('/', function(req, res, next) {
    const productData = fileReader();
    const index = productData.map((item)=>item.id).indexOf(req.body.id );
    if(index == -1){
        const writeS = fs.createWriteStream(path.join(__dirname,'products.txt'),{
            flags: 'a'
        })
        writeS.write('\n');
        writeS.write(req.body.id + '-'+req.body.name+'-'+req.body.price);
        writeS.end();
        res.json({status: "sucess",result:productData})
    }else{
        res.json({status: "sucess",result:"ID_Exist"})
    }
});

router.put('/:id', function(req, res, next) {
    const productData = fileReader();
    const index = productData.map((item)=>item.id).indexOf(req.body.id );
    if(index !== -1){
        productData[index]={
           id: req.body.id,
            name: req.body.name,
            price: req.body.price
        }
        const writeS = fs.createWriteStream(path.join(__dirname,'products.txt'));
        productData.forEach((item)=>{
            writeS.write(item.id+'-'+item.name+'-'+item.price);
            writeS.write('\n');
        })
        writeS.end();
        res.json({status: "sucess",massage:"Product_Updatted"})
    }else{
        res.json({status: "sucess",result:"Not_Found" })
    }
 
});

router.delete('/:id', function(req, res, next) {
    const productData = fileReader();
    const index = productData.map((item)=>item.id).indexOf(req.body.id );
    if(index !== -1){
        productData.splice(index,1);
        const writeS = fs.createWriteStream(path.join(__dirname,'products.txt'));
        
        productData.forEach((item)=>{
            console.log(item.name)
            writeS.write(item.id+'-'+item.name+'-'+item.price);
            
            writeS.write('\n');
        })
        writeS.end();
        res.json({status: "sucess",massage:"Product_Deleted"});
    }else{
        res.json({status:"sucess",massage:"Book_not_found"});
    }
 
});
module.exports = router;
