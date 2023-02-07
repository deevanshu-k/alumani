require("dotenv").config();
const { render } = require("ejs");
const bodyparser = require('body-parser');
const express = require("express");
const app = express();
const path = require("path");
const alumani = require("./models");

const port = process.env.PORT || 8080;


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.urlencoded());

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get('/alumni' ,(req,res) => {
    res.status(200).render('form.ejs')
});

app.post('/alumni' ,async (req,res) => {
    try {
        console.log(req.body);
        let data = req.body;
        alumani.create(data).then((d) => {
            res.status(200).send({
                data: d,
                status: 1,
                error : {
                    message : ''
                }
            })
        }).catch((error) => {
            console.log(error);
            res.status(501).send({
                data: '',
                status: 0,
                error : {
                    message : 'SERVER_ERR'
                }
            })
        })

    } catch (error) {
        res.status(501).send({
            data: d,
            status: 0,
            error : {
                message : 'SERVER_ERR'
            }
        })
    }
   
    
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

