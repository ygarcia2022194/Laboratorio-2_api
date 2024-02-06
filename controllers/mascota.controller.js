const bcryptjs = require('bcryptjs');

const Mascota = require('../models/mascota');
const {response, json} = require('express');

const mascotaPost = async (req, res) => {
    const {raza, nombre_Mascota, nombre_Propetario, edad_Mascota} = req.body;
    const mascota = new Mascota({raza, nombre_Mascota, nombre_Propetario, edad_Mascota});

    await mascota.save();
    res.status(202).json({
        mascota
    })
}

module.exports = {
    mascotaPost
}