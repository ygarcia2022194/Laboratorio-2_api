const bcryptjs = require('bcryptjs');

const Mascota = require('../models/mascota');
const {response, json} = require('express');

const mascotaPost = async (req, res) => {
    const {tipoMascota, raza, nombreMascota, nombrePropetario, edadMascota} = req.body;
    const mascota = new Mascota({tipoMascota, raza, nombreMascota, nombrePropetario, edadMascota});

    await mascota.save();
    res.status(202).json({
        mascota
    })
}

const mascotaGet = async(req, res= response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, mascota] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        mascota
    })
}

const getMascotaById = async (req, res) =>{
    const {id} = req.params;
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({
        mascota
    });
}

const putMascotas = async (req, res = response)=>{
    const {id} = req.params;
    const{_id, ...resto} = req.body;
    const mascota = await Mascota.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Su mascota ah sido actualizada exitosamente',
        mascota
    })
}

const mascotaDelete = async (req, res)=>{
    const{id}= req.params;
    const mascota = await Mascota.findByIdAndUpdate(id, {estado: false});
    res.status(200).json({
        msg: 'Mascota eliminado exitosamente!!!',
        mascota
    })
}

module.exports = {
    mascotaPost,
    mascotaGet,
    getMascotaById,
    putMascotas,
    mascotaDelete
}