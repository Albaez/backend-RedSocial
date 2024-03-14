import Express from "express";
import multer from "multer";
import {
    deletePublicacion,
    getPublicaciones,
    postPublicacion,
    putPublicacion
} from "../controllers/controllerPublicacion.js";
const publicacion = Express();
const storage = multer.memoryStorage();
const upload = multer( {storage : storage} );

publicacion.post ('', upload.single('imagen'), postPublicacion )

publicacion.get ('' , getPublicaciones);

publicacion.delete ('/:id' , deletePublicacion);

publicacion.put ('/:id' , putPublicacion);

export { publicacion };
