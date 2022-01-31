const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const JobPosting = sequalize.define('jobposting', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3,200]
        }
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = JobPosting;
