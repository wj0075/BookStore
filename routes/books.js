const express = require('express');
const fs = require('fs');
function readBooks(callback) {
    fs.readFile('./books.json','utf8',function (err, data) {
        if (err||data==''){
            callback([])
        }else {
            callback(JSON.parse(data))
        }
    })
}
function writeBooks(data, callback) {
    fs.writeFile('./books.json',JSON.stringify(data),callback)
}
const router = express.Router();
router.get('/',function (req, res) {
   readBooks(function (data) {
       res.send(data);
   })
});
router.get('/:id',function (req, res) {
   let bid = req.params.id;
    readBooks(function (data) {
    let book = data.find(item=>{
        return item.id==bid
    });
        res.send(book)
    })
});
router.post('/',function (req, res) {
   let book = req.body;
    readBooks(function (data) {
        book['id']=data.length==0?1:parseInt(data[data.length-1]['id'])+1;
        data.push(book);
        writeBooks(data,function () {
            res.send(book);
        })
    })
});
router.delete('/:id',function (req, res) {
   let bid = req.params.id;
    readBooks(function (data) {
        data=data.filter(item=>{
            return item.id!=bid
        });
        writeBooks(data,function () {
            res.send({})
        })
    })
});
router.put('/:id',function (req, res) {
    let bid = req.params.id;
    let book = req.body;
    readBooks(function (data) {
        data = data.map(item=>{
            if (item.id==bid){
                return book
            }
            return item;
        });
        writeBooks(data,function () {
            res.send(book);
        })
    })
});
module.exports = router;