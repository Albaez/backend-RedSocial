import { json } from "express";
import { db } from "../db/conn.js";

const getAuth = async (req, res) => {
  const { usuario, contrasena } = req.params;

  const sql = ` select usuario from usuarios 
                    where usuario = $1 
                    and contrasena = $2  `;

  const result = await db.query(sql, [usuario, contrasena]);

  if (result.length === 0) {
    res.status(404).json({ mensaje: "Usuario y Contraseña no coinciden" });
  } else {
    res.json(result);
  }
};

const postUsuario = async (req, res) => {
  try {
    const {
      usuario,
      correo_electronico,
      contrasena,
      nombre_completo,
      confirmacion_con,
    } = req.body;

    const params = [usuario, correo_electronico, contrasena, nombre_completo, 2];

    const sql = ` insert into usuarios 
                    (usuario, 
                    correo_electronico, 
                    contrasena,
                    nombre_completo)
                    values 
                    ($1, $2, $3, $4, 2) returning usuario, 'creado con exito' mensaje `;

    if (contrasena === contrasena) {
      const result = await db.query(sql, params);
      res.status(200).json(result);
    } else {
      res.status(400).json({ mensaje: "Las contraseñas no coinciden" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsuario = async (req, res) => {
  try {
    const usuario = req.params.usuario;

    const sql = `select correo_electronico,
                            nombre_completo
                        from usuarios where usuario = $1`;

    const result = await db.query(sql, [usuario]);

    if (result.length === 0) {
      res.status(404).json({ mensaje: "No hay registros" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const putUsuario = async (req, res) => {
  try {
    const { correo_electronico, nombre_completo } = req.body;
    const usuario = req.params.usuario;

    const params = [correo_electronico, nombre_completo, usuario];

    const sql = `update usuarios 
                set correo_electronico = $1, 
                    nombre_completo = $2 
                where usuario = $3 returning usuario, 'actualizado con exito' mensaje `;

    const result = await db.query(sql, params);

    if (result.length === 0) {
      res
        .status(404)
        .json({ mensaje: "Registro no existe no puede ser actualizado" });
    } else {
      res.status(200).json(result);
    }
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const actualizarContrasena = async (req, res) => {
  try {
    const usuario = req.params.usuario;

    const { contrasena, confirmacion_con } = req.body;

    const params = [contrasena, usuario];

    const sql = `update usuarios 
                    set contrasena = $1
                where usuario = $2 returning usuario , 'actualizacion exitosa' mensaje`;

    if (contrasena === confirmacion_con) {
      const result = await db.query(sql, params);

      if (result.length === 0) {
        res.status(404).json({ mensaje: "Usuario no existente" });
      } else {
        res.status(200).json(result);
      }
    } else {
      res.status(404).json({ mensaje: "Contraseñas no coinciden" });
    }
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const deleteUsuario = (req, res) => {};

export {
  postUsuario,
  getUsuario,
  putUsuario,
  deleteUsuario,
  actualizarContrasena, 
  getAuth
}
