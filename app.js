require("dotenv").config();
const { render } = require("ejs");
const bodyparser = require('body-parser');
const express = require("express");
const app = express();
const path = require("path");
const alumani = require("./models")


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.urlencoded());

app.use('/static', express.static('static'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get('/alumani' ,(req,res) => {
    res.status(200).render('form.ejs')
});

app.post('/alumani' ,async (req,res) => {
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

app.get('**', (req,res) => {
    res.redirect('/alumani');
});




app.listen(process.env.port,() => {
    console.log("Server listening on port : ",process.env.port)
});

