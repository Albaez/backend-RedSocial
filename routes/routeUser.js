import Express from "express";
const usuarios = Express();


import {
    actualizarContrasena,
    deleteUsuario,
    getAuth,
    getUsuario,
    postUsuario,
    putUsuario
} from "../controllers/controllerUser.js";

usuarios.use(Express.json());

usuarios.post('', postUsuario);

usuarios.get('/:usuario', getUsuario);

usuarios.get('/auth/:usuario/:contrasena', getAuth);

usuarios.put('/:usuario', putUsuario);

usuarios.put('/actualizar_contrasena/:usuario', actualizarContrasena);

usuarios.delete('/:usuario', deleteUsuario);

export {
    usuarios
};
