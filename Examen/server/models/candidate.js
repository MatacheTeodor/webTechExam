const sequalize = require('../sequelize')
const { DataTypes } = require('sequelize');


const Candidate = sequalize.define('candidate', {
    id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5,200]
        }
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10,200]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [10,200]
        }
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Candidate;
