const { Router } = require("express");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");


const router = Router();

router.get("/", usuariosGet);

router.post("/",[
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe ser más de 6 dígitos').isLength({ min: 6 }),
  check('correo').custom( emailExiste ),
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom( esRolValido ),
  validarCampos
], usuariosPost);

router.put("/:id", [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId),
  check('rol').custom( esRolValido ),
  validarCampos
], usuariosPut);

router.patch("/", usuariosPatch);

router.delete("/:id",[
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId),
  validarCampos
], usuariosDelete);

module.exports = router;
