import Express from "express";
import {
    deleteComentario,
    getComentario,
    postComentario,
    putComentario
} from '../controllers/controllerComentario.js';
const comentario = Express();



comentario.put('/comentario/:id', putComentario);
comentario.post('/comentario', postComentario);
comentario.delete('/comentario/:id', deleteComentario);
comentario.get('/comentario', getComentario);

export { comentario };
