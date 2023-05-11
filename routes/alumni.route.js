const { Router } = require('express');
const fs = require("fs");
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
        cb(null, `${id}${fileExtension}`);
    }
});
var upload = multer({ storage: storage });

router.get('', async (req, res) => {
    try {
        let data = await alumani.findAll({
            raw: true,
            where: {
                display_for_review: true
            }
        });
        fs.readdir('./uploads/', (err, files) => {
            files.forEach(file => {
                let id = (file.split("."))[0];
                let index = data.indexOf(data.find(e => e.id == id));
                if (index != -1) {
                    data[index].img = file;
                }
            });
            res.status(200).render('main.ejs', { alumni: data })
        });
    } catch (error) {
        let data = await alumani.findAll({ raw: true });
        res.status(200).render('main.ejs', { alumni: data })
    }
});
router.get('/rgform', (req, res) => {
    let countries = getAllCountries();
    res.status(200).render('form.ejs', { countries })
});
router.get('/about', (req, res) => {
    res.status(200).render('vission.ejs')
});
router.get('/president', (req, res) => {
    res.status(200).render('president.ejs')
});
router.get('/spotlight', async (req, res) => {
    try {
        let data = await alumani.findAll({ raw: true });
        fs.readdir('./uploads/', (err, files) => {
            files.forEach(file => {
                let id = (file.split("."))[0];
                let index = data.indexOf(data.find(e => e.id == id));
                if (index != -1) {
                    data[index].img = file;
                }
            });
            console.log(data);
            res.status(200).render('alumnispotlight.ejs', { alumni: data,totalal:data.length })
        });

    } catch (error) {
        let data = await alumani.findAll({ raw: true });
        res.status(200).render('alumnispotlight.ejs', { alumni: data,totalal:data.length })
    }
});
router.get('/association', (req, res) => {
    res.status(200).render('association_profile.ejs')
});
router.get('/contact', (req, res) => {
    res.status(200).render('contact.ejs')
});
router.get('/detail/:alid', async (req, res) => {
    try {
        let data = await alumani.findOne({
            raw: true,
            where: {
                uniqueId: req.params.alid
            }
        });
        if(data){
            fs.readdir('./uploads/', (err, files) => {
                files.forEach(file => {
                    let id = (file.split("."))[0];
                    if (id == data.id) {
                        data.img = file;
                    }
                });
                res.status(200).render('common/alumnidetail.ejs', { alumni: data });
            });
        }
        else {
            throw new Error("Wrong id passed.");
        }
    } catch (error) {
        console.log(error);
        res.redirect('/alumni');
    }
});

router.post('', async (req, res) => {
    try {
        let data = req.body;
        let wl = String(data.workinglocation).split(',');
        data.workinglocation = `${getCountryNameByCode(wl[0])},${getStateNameByCode(wl[0], wl[1])},${wl[2]}`;
        data.uniqueId = await generateUniqueId(data.admissionyear, branch[data.course]);
        alumani.create(data).then((d) => {
            res.status(200).json({
                data: d,
                status: 1,
                error: {
                    message: ''
                }
            })
        }).catch((error) => {
            console.log(error);
            res.status(501).json({
                data: '',
                status: 0,
                error: {
                    message: 'SERVER_ERR'
                }
            })
        })

    } catch (error) {
        res.status(501).json({
            data: error,
            status: 0,
            error: {
                message: 'SERVER_ERR'
            }
        })
    }
});

router.post('/uploadImage', upload.single('file'), (req, res) => {
    console.log(req.body);
    res.status(200).send();
});


module.exports = router;