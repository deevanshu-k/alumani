const {Router} = require('express');
const { branch } = require('../interfaces/branch');
const { getAllCountries, getCountryNameByCode, getStateNameByCode } = require('../services/countrystatecity.service');
const { generateUniqueId } = require('../services/uniqueId.service');
const alumani = require("../models");
const multer = require('multer');
const router = Router();

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

router.get('' ,(req,res) => {
    let countries = getAllCountries();
    res.status(200).render('form.ejs',{countries})
});

router.post('' ,async (req,res) => {
    try {
        let data = req.body;
        let wl = String(data.workinglocation).split(',');
        data.workinglocation = `${getCountryNameByCode(wl[0])},${getStateNameByCode(wl[0],wl[1])},${wl[2]}`;
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

router.post('/uploadImage',upload.single('file'),(req,res) => {
    console.log(req.body);
    res.status(200).send();
});


module.exports =  router;