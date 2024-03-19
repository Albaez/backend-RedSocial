import Express from "express";
const publicacion = Express();

import {
    getPublicacion,
    postPublicacion
} from "../controllers/controllerPublicacion.js";

publicacion.post ('', postPublicacion )
publicacion.get('', getPublicacion);

export { publicacion };

