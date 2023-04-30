require("dotenv").config();
const bodyparser = require('body-parser');
const express = require("express");
const app = express();
const path = require("path");
const alumani = require("./models");
const countrystatecityRouter = require("./routes/countrystatecity.route");
const alumniRouter = require("./routes/alumni.route");
const port = process.env.PORT || 8080;


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.urlencoded({extended:true}));

app.use('/static', express.static('static'));
app.use('/alimage', express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use('/v1/api',countrystatecityRouter);
app.use('/alumni',alumniRouter);


app.get('/alumnis',async (req,res)=>{
    data = await alumani.findAll({raw :true});
    res.status(200).json(data);
});

app.get('**', (req,res) => {
    res.redirect('/alumni');
});


app.listen(port,() => {
    console.log("Server listening on port : ",port)
});

