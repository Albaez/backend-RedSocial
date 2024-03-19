-- Active: 1707881043212@@localhost@5432
CREATE DATABASE red_social

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  usuario VARCHAR(255) NOT NULL,
  correo_electronico VARCHAR(255) NOT NULL,
  contrasena VARCHAR(255) NOT NULL,
  nombre_completo VARCHAR(255),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publicaciones(
    id SERIAL NOT NULL,
    contenido varchar(280) NOT NULL,
    fecha_publicacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    usuario_id integer,
    usuario varchar(255),
    PRIMARY KEY(id),
    CONSTRAINT publicaciones_usuario_id_fkey FOREIGN key(usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
  id SERIAL PRIMARY KEY,
  publicacion_id INT NOT NULL,
  usuario_id INT NOT NULL,
  contenido TEXT NOT NULL,
  fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO usuarios (usuario, correo_electronico, contrasena, nombre_completo)
VALUES ('albaz', 'albaz@gmail.com', 'test', 'alba zuniga');