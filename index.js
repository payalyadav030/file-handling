// multer - is a node js middleware for handling multipart/form-data, which is primarly used for uploading files.
// multipart - type of data that is send from front end to back end
// dest - it is nothing but destination directory
const fs = require('fs')
const chalk= require('chalk');
const express = require('express');
const exphbs = require('express-handlebars')
const app = express();
const multer = require('multer');


// // for want the pic to be in jpg format
const fileStorage = multer.diskStorage({
    destination : function(req, file, cb){
        //console.log(req.url);
        var url = req.url;
        var mimeType = file.mimetype;
        if(url == '/profile/upload-files'){
            var allowedType =[
                'image/jpeg',
                'image/jpg',
                'image/png',
                'application/pdf'
            ];
            if(allowedType.indexOf(mimeType) == -1){
                return cb("invalied file!!!!")
            }
        }
        var uploadPath = 'public/uploads/';
        return cb(null, uploadPath);
    },
    filename : function(req, file, cb){
        //console.log(file);
        var filename = (new Date().getTime()) + file.originalname
        return cb(null, filename )
    }
});

const upload = multer({
    //dest : 'uploads/',
    storage : fileStorage
});

const PORT = 7889;

// import the controllers
var ProfileController = require('./route/profile.js');
//console.log(ProfileController);


app.use(express.json());
//app.use(express.urlencoded());
app.use( '/public',  express.static('public'));

const hbs = exphbs.create({
    extname : '.hbs'
})
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.get('/', function(req, res){
    return res.render('homepage');
})

app.post('/profile/register', upload.single('avatar'),  ProfileController.register);
// for uploading multiple files
app.post('/profile/upload-pictures', upload.array('pictures', 5), ProfileController.uploadPictures);

// if i want to add cover pic and wallpaper
var fields = [
    {name : 'pictures', maxCount:5,},
    {name : 'pdfFiles', maxCount:2}
]; // fileds accepts array
app.post('/profile/upload-files', upload.fields(fields), ProfileController.uploadFiles);



app.listen(PORT, function(){
    console.log("application is started on port:", PORT);
})