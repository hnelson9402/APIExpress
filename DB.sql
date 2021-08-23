create database pruebas

use pruebas

create table if not exists usuario(
    ID_USUARIO int auto_increment primary key,
	nombre varchar(20) not null,
    apellido varchar(20) not null,	
	cedula varchar(50) not null unique,	
	correo varchar(30) not null unique,
	rol int not null,
	estado varchar(10) not null,
	password varchar(500) not null,
	IDToken varchar(500) not null,
	fecha varchar(17) not null
)

create table if not exists token(    
	token varchar(500) not null,		
	fecha datetime not null,	
	FK_ID_USUARIO int not null 	
)


--Se crea relai�n entre la tabla usuario y token
ALTER TABLE token
   ADD CONSTRAINT FK_ID_USUARIO FOREIGN KEY (FK_ID_USUARIO)
      REFERENCES usuario (ID_USUARIO)
      ON DELETE RESTRICT
      ON UPDATE CASCADE


/*Insertar entrada de prueba*/
