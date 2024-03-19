import { db } from "../db/conn.js";

const putComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { contenido } = req.body;

        const params = [contenido, id];
        const sql = `
            UPDATE comentarios
            SET contenido = $1
            WHERE id = $2
            RETURNING id, 'Actualización Exitosa' AS mensaje
        `;
        const result = await db.query(sql, params);

        // Envía la respuesta al cliente
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
}

const postComentario = async (req, res) => {
    try {
        const { publicacion_id, usuario_id, contenido } = req.body;
        const params = [publicacion_id, usuario_id, contenido];
        const sql = `
            INSERT INTO comentarios 
            (publicacion_id, usuario_id, contenido)
            VALUES 
            ($1, $2, $3)
            RETURNING id, 'Comentario creado con éxito' AS mensaje
        `;
        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
}

const deleteComentario = async (req, res) => {
    try {
        const params = [req.params.id];
        const sql = `
            DELETE FROM comentarios 
            WHERE id = $1 
            RETURNING id, 'Comentario borrado' AS mensaje
        `;
        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
}

const getComentario = async (req, res) => {
    try {
        const sql = `
            SELECT id, publicacion_id, usuario_id, contenido, fecha_comentario  
            FROM comentarios 
            ORDER BY fecha_comentario DESC
        `;
        const result = await db.query(sql);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ mensaje: "Sin datos que mostrar" });
        }
    } catch (err) {
        res.status(500).json({ mensaje: "Error en búsqueda de comentarios" });
    }
}

export {
    putComentario,
    postComentario,
    deleteComentario,
    getComentario
};