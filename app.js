require("dotenv").config();
const { render } = require("ejs");
const bodyparser = require('body-parser');
const express = require("express");
const multer = require("multer");
const app = express();
const path = require("path");
const alumani = require("./models");
const {branch} = require('./interfaces/branch');
const { generateUniqueId } = require("./services/uniqueId.service");

const port = process.env.PORT || 8080;


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        let id = req.headers.uniqueid;
      cb(null, `${id}${fileExtension}` );
    }
});
var upload = multer({ storage: storage });



app.get('/alumni' ,(req,res) => {
    res.status(200).render('form.ejs')
});

app.post('/alumni' ,async (req,res) => {
    try {
        let data = req.body;
        data.uniqueId = await generateUniqueId(data.admissionyear,branch[data.course]);
        alumani.create(data).then((d) => {
            res.status(200).json({
                data: d,
                status: 1,
                error : {
                    message : ''
                }
            })
        }).catch((error) => {
            console.log(error);
            res.status(501).json({
                data: '',
                status: 0,
                error : {
                    message : 'SERVER_ERR'
                }
            })
        })

    } catch (error) {
        res.status(501).json({
            data: error,
            status: 0,
            error : {
                message : 'SERVER_ERR'
            }
        })
    } 
});

app.post('/uploadImage',upload.single('file'),(req,res) => {
    console.log(req.body);
    res.status(200).send();
});

app.get('/alumnis',async (req,res)=>{
    data = await alumani.findAll({raw :true});
    res.status(200).json(data);
})

app.get('**', (req,res) => {
    res.redirect('/alumni');
});




app.listen(port,() => {
    console.log("Server listening on port : ",port)
});

