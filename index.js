import Express from "express";
import { publicacion } from "./routes/routePublicacion.js";
import { usuario } from "./routes/routeUser.js";
const app = Express();
//import { usuarioCrud } from "./routes/routeUserCRUD.js";//
import cors from 'cors';


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
app.use('/api/usuario', usuario);
app.use('/api/publicacion', publicacion);
//app.use('/api/usuarioCrud', usuarioCrud);//


//Puerto
app.listen(4000, ()=>{

    console.log("Esuchando en el puerto 4000");

});