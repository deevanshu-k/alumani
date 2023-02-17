const {Router} = require('express');
const { getAllCountries, getStatesByCountry, getCitiesByCodes } = require('../services/countrystatecity.service');
const router = Router();

router.get('/countries', (req,res) => {
    let data = [];
    getAllCountries().forEach((c) => {
        data.push({
            name : c.name,
            isoCode : c.isoCode
        });
    })
    
    res.status(200).json(data);
});

router.get('/states/:countryCode',(req,res) => {
    let countryCode = req.params.countryCode;
    let data = [];
    getStatesByCountry(countryCode).forEach((s) => {
        data.push({
            name : s.name,
            isoCode : s.isoCode
        });
    })
    res.send(data);
});

router.get('/cities/:countryCode/:stateCode',(req,res) => {
    let countryCode = req.params.countryCode;
    let stateCode =  req.params.stateCode;
    let data = [];
    getCitiesByCodes(countryCode,stateCode).forEach((ci) => {
        data.push(ci.name);
    })
    res.send(data);
})

module.exports = router;