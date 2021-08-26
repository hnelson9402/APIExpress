## AUTH
---
>GET public/auth/:email/:password

Este **EndPoint** devuelve la siguiente información:

```JSON
{
  "status": "ok",
  "message": {
    "nombre": "hugo",
    "rol": 1,
    "keyToken": "b54ce0a98f2c59e0a1a57807ca8e95f944f5adbadd6fcd09fc855323d2a3845d2abb9f9148d8011a0babd681e556df4a7c9ea6b0adcfc29b2b410088f3814c87"
  }
}
```
***Nota:*** El **keyToken** lo deben almacenar para realizar las peticiones a la API, El **keyToken** tiene una duración de 6 horas, despues de ese tiempo debes iniciar sesión nuevamente.

## USUARIO
---
>GET public/usuario/:keyToken

>GET public/usuario/:keyToken/:cedula

>POST public/usuario/

**Nota:** Los siguientes datos son necesarios para registrar un nuevo usuario.

```JSON
{
	"keyToken": "b54ce0a98f2c59e0a1a57807ca8e95f944f5adbadd6fcd09fc855323d2a3845d2abb9f9148d8011a0babd681e556df4a7c9ea6b0adcfc29b2b410088f3814c87",
	"nombre": "hugo",
	"apellido": "apellido",
	"cedula": "1143",
	"correo": "prueba@prueba.com",
	"rol": "1",
	"estado": "activo",
	"password": "123456789",
	"confirmPassword": "123456789"	
}
```


