const { DataTypes } = require("sequelize");
const sequelize = require('../config/sequelize')



const alumaniData = sequelize.define("Alumni",
    {
        uniqueId:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        enrollementno: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        admissionyear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        },
        passoutyear: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0

        },
        college: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        course: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        // branch: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     defaultValue: ''

        // },
        // specilization: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     defaultValue: ''

        // },
        mobileno: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        facebookid: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        linkedinid: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        companyname: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        workinglocation: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        permanentaddress: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        localaddress: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''

        },
        msg: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        display_for_review: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: false
        }
    });



module.exports = alumaniData;
