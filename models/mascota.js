const {Schema, model} = require('mongoose');

const MascotaSchema = Schema({
    raza:{
        type: String,
        required: [true, 'La raza es obligatoria']
    },
    nombre_Mascota:{
        type: String,
        required: [true, 'El nombre de su mascota es obligatorio']

    },
    nombre_Propetario:{
        type: String,
        required: [true, 'El nombre del dueño es obligatorio']
    },
    edad_Mascota:{
        type: String,
        required: [true, 'La edad de la mascota es obligatorio']
    },
    estado:{
        type: Boolean,
        default: false
    }
});