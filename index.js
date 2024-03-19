import cors from 'cors';
import Express from "express";
import { comentario } from "./routes/routeComentario.js";
import { publicacion } from "./routes/routePublicacion.js";
import { usuarios } from "./routes/routeUser.js";
const app = Express();


// Middleware 
app.use(Express.json());
const corsOptions = {
    origin : 'http://localhost:5173', 
    credentials : true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
// Rutas
app.use('/api/usuario', usuarios);
app.use('/api/publicacion', publicacion);
app.use('/api/comentario', comentario);


//Puerto
app.listen(3000, ()=>{

    console.log("Escuhando en el puerto 3000");

});