const {Schema, model} = require('mongoose');

const MascotaSchema = Schema({
    tipoMascota:{
        type: String,
        required: [true, 'El tipo de mascota es obligatorio']
    },
    raza:{
        type: String,
        required: [true, 'La raza de mascota es obligatorio']   
    },
    nombreMascota:{
        type: String,
        required: [true, 'El nombre de su mascota es obligatorio']

    },
    nombrePropetario:{
        type: String,
        required: [true, 'El nombre del dueño es obligatorio']
    },
    edadMascota:{
        type: String,
        required: [true, 'La edad de la mascota es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Mascota', MascotaSchema);