const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');

const {mascotaPost} = require('../controllers/mascota.controller');
const router = Router();

router.post(
    "/",
    [
        check("raza", "La raza no puede estar vacia").not().isEmpty(),
        check("nombre_Mascota", "El nombre de la mascota no puede estar vacio").not().isEmpty(),
        check("nombre_Propetario", "El nombre del propetario no puede estar vacio").not().isEmpty(),
        check("edad_Mascota", "La edad no puede quedar vacia").not().isEmpty()
    ]
    );

module.exports = router;