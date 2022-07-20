const Sequelize = require("sequelize");
const connection = require("./mysql")

const options = {
    timestamps: false,
    freezeTableName: true,
}

const fivem = connection.define('swervin_requests', {
    id: {
        type: Sequelize.INTEGER,
        Allownull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    requests: {
        type: Sequelize.STRING,
        Allownull: true
    }
}, options)

const userData = connection.define('vrp_user_data', {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    dkey: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dvalue: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, options)

var usuario = connection.define('vrp_user_identities', {
    user_id: {
        type: Sequelize.STRING,
        Allownull: true,
        primaryKey: true
    },
    registration: {
        type: Sequelize.STRING,
        Allownull: true
    },
    firstname: {
        type: Sequelize.STRING,
        Allownull: true
    },
    name: {
        type: Sequelize.STRING,
        Allownull: true
    },
    age: {
        type: Sequelize.STRING,
        Allownull: true
    },
    phone: {
        type: Sequelize.STRING,
        Allownull: true
    }
}, options)

module.exports = { fivem, userData, usuario }