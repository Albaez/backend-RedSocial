-- Active: 1707881043212@@localhost@5432
CREATE DATABASE redsocial

create table tbl_rol 
(
    id serial PRIMARY key,
    nombre_rol varchar(200), 
    fecha_creacion TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true
);

create table tbl_usuarios 
(
    nombre_usuario  varchar(20) primary key,
    correo_electronico varchar(50),
    contrasena varchar(20),
    nombre varchar(200),
    apellido varchar(200),
    foto_perfil bytea,
    id_rol int,
    fecha_creacion TIMESTAMP DEFAULT current_timestamp, 
    activo BOOLEAN DEFAULT true, 
    constraint fk_id_rol FOREIGN key (id_rol) REFERENCES tbl_rol (id)
);

create table tbl_publicacion
(
    id SERIAL PRIMARY key,
    imagen bytea , 
    mime_type varchar(500), 
    nombre_archivo varchar(500),
    caption varchar(250), 
    nombre_usuario varchar(20) REFERENCES tbl_usuarios(nombre_usuario), 
    fecha_post TIMESTAMP DEFAULT current_timestamp, 
    activo bool DEFAULT true
);

