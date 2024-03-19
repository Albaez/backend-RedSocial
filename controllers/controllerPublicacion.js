import { db } from "../db/conn.js";

const postPublicacion = async (req, res) => {

  try {
    const { usuario_id, usuario, contenido } = req.body;
    const params = [usuario_id, usuario, contenido];
    const sql = `INSERT INTO Publicaciones 
                    (usuario_id, usuario, contenido)
                    VALUES 
                    ($1, $2, $3)
                  RETURNING contenido, usuario, 'Insercion Exitosa' AS mensaje`;

    const result = await (db.query(sql, params));
   
    res.json(result);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const getPublicacion = async (req, res) => {
  try {
    const sql = `SELECT contenido, usuario_id, usuario  
                    FROM publicaciones 
                    ORDER BY fecha_publicacion DESC`;

    const result = await db.query(sql);

    if (result.length > 0) {
    
      res.json(result);
    } else {
      res.status(404).json({ mensaje: "Sin datos que mostrar" });
    }
  } catch (err) {
    res.status(500).json({ mensaje: "Error en busqueda" });
  }
}

export { getPublicacion, postPublicacion };

