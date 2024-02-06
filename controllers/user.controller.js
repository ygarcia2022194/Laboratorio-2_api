const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { response, json } = require('express');


const usuariosGet = async(req, res=response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.status(200).json({
        total,
        usuarios
    })
}

const putUsuarios = async (req, res = response) =>{
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        resto.password = bcryptjs.hashSync(password, salt);
    }
    

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Usuario actualizado exitosamente', 
        usuario
    });
}

const getUsuarioById = async (req, res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findOne({_id: id});

    res.status(200).json({
        usuario
    });
}

const usuariosDelete = async (req, res) =>{
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.status(200).json({
        msg: 'Usuario eliminado exitosamente!!!',
        usuario
    });
}
const usuariosPost = async (req, res) =>{
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(202).json({
        usuario
    })
}

module.exports = {
    usuariosPost,
    usuariosGet,
    getUsuarioById,
    putUsuarios,
    usuariosDelete
}