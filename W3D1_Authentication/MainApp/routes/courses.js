const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const CoursesModel = require('../courseModel');

function fileReader(){
    const courseArr = [];
    const readfile = fs.readFileSync(path.join(__dirname,'courses.txt')).toString();
    const line = readfile.split('\n');
    line.forEach((item)=>{
        const attribuit = item.split('-'); 
        const course = new CoursesModel(
            attribuit[0],
            attribuit[1],
            attribuit[2]
        )
        courseArr.push(course);
    })
   return courseArr;
}


router.get('/', function(req, res, next) {
    const courseData = fileReader();
 res.json({status: "sucess",result:courseData })
});

router.get('/:id', function(req, res, next) {
    const courseData = fileReader();
    const index = courseData.map((item)=>item.id).indexOf(req.params.id);
    if(index !== -1){
        res.json({status:"sucess", result:courseData[index]})
    }else{
        res.json({status: "sucess",result:"Not_Found" })
    }
});

router.post('/', function(req, res, next) {
    const courseData = fileReader();
    const index = courseData.map((item)=>item.id).indexOf(req.body.id );
    if(index == -1){
        const writeS = fs.createWriteStream(path.join(__dirname,'courses.txt'),{
            flags: 'a'
        })
        writeS.write('\n');
        writeS.write(req.body.id + '-'+req.body.name+'-'+req.body.code);
        writeS.end();
        res.json({status: "sucess",result:courseData})
    }else{
        res.json({status: "sucess",result:"ID_Exist"})
    }
});

router.put('/:id', function(req, res, next) {
    const courseData = fileReader();
    const index = courseData.map((item)=>item.id).indexOf(req.body.id );
    if(index !== -1){
        courseData[index]={
           id: req.body.id,
            name: req.body.name,
            code: req.body.code
        }
        const writeS = fs.createWriteStream(path.join(__dirname,'courses.txt'));
        courseData.forEach((item)=>{
            writeS.write(item.id+'-'+item.name+'-'+item.code);
            writeS.write('\n');
        })
        writeS.end();
        res.json({status: "sucess",massage:"Course_Updatted"})
    }else{
        res.json({status: "sucess",result:"Not_Found" })
    }
 
});

router.delete('/:id', function(req, res, next) {
    const courseData = fileReader();
    const index = courseData.map((item)=>item.id).indexOf(req.body.id );
    if(index !== -1){
        courseData.splice(index,1);
        const writeS = fs.createWriteStream(path.join(__dirname,'courses.txt'));
        
        courseData.forEach((item)=>{
            console.log(item.name)
            writeS.write(item.id+'-'+item.name+'-'+item.code);
            
            writeS.write('\n');
        })
        writeS.end();
        res.json({status: "sucess",massage:"Course_Deleted"});
    }else{
        res.json({status:"sucess",massage:"Course_not_found"});
    }
 
});
module.exports = router;
