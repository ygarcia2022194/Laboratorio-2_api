const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');
class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.mascotaPath = '/api/mascotas';
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuarioPath, require('../routes/user.routes'));
        this.app.use(this.mascotaPath, require('../routes/mascota.routes'));
    }

    
    async conectarDB(){
        await dbConnection();
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor ejecutandose y escuchando el puerto', this.port);
        });
    }
}

module.exports = Server;