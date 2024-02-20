const {Router} = require('express');
const {check} = require('express-validator');

const {validarCampos} = require('../middlewares/validar-campos');

const {mascotaPost, 
        mascotaGet,
        getMascotaById,
        putMascotas,
        mascotaDelete} = require('../controllers/mascota.controller');
const { existenteUsuario, existenteMascota } = require('../helpers/db-validators');
const router = Router();

router.get("/", mascotaGet);

router.post(
    "/",
    [
        check("tipoMascota", "El tipo de mascota no puede estar vacio").not().isEmpty(),
        check("raza", "La raza de la mascota no puede estar vacia").not().isEmpty(),
        check("nombreMascota", "El nombre de la mascota no puede estar vacio").not().isEmpty(),
        check("nombrePropetario", "El nombre del propetario no puede estar vacio").not().isEmpty(),
        check("edadMascota", "La edad no puede quedar vacia").not().isEmpty(),
        validarCampos
    ], mascotaPost);

router.get(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteMascota),
        validarCampos
    ], getMascotaById);

router.put(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteMascota),
        validarCampos
    ], putMascotas);


router.delete(
    "/:id",
    [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existenteMascota),
        validarCampos
    ], mascotaDelete);

module.exports = router;