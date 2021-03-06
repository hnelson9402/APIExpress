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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRFRva2VuIjoiZjkzM2ViMzgxMzUyZjhkZWVlOWEzNDZlMzQ4OWJmNWMwMWU1M2VlNzgyNDhjMDQ5OWM1YTc3NmI3MWE4MThkOCIsImlhdCI6MTYzMDI3NjMwOCwiZXhwIjoxNjMwMjk3OTA4fQ.yfhWIkIFQVsUsu7gdWlh4g4AX-993p-xQQvP_W9H8SY"
  }
}
```
***Nota:*** El **Token** lo deben almacenar para realizar las peticiones a la API, y enviarlo en la cabezera(**Header**), con la **key**: Authorization y **value**: Bearer token, más información en: https://jwt.io/ , El **Token** tiene una duración de 6 horas, despues de ese tiempo debes iniciar sesión nuevamente.

## USUARIO
---
>GET public/usuario/

>GET public/usuario/:cedula

>POST public/usuario/

**Nota:** Los siguientes datos son necesarios para registrar un nuevo usuario.

```JSON
{	
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
>PATCH  public/usuario/reset-password
```JSON
{
 "newResetPassword":"12345678",
 "confirmNewResetPassword":"12345678",                   
"IDToken":"f933eb381352f8deee9a346e3489bf5c01e53ee78248c0499c5a776b71a818d8"  
}
```

>PATCH public/usuario/password

```JSON
{
 "oldPassword": "123456789*",
 "newPassword": "123456789",
 "confirmNewPassword": "123456789"
}
```

>PATCH public/usuario/update-user

```JSON
{
 "userRol":"3",
 "userStatus":"activo",
"IDToken":"8424d4a6e442401c32707abdbb41d490ede0276b73c42ded5413040372c5efbd869c8797a85ba831ca6b5c9a7a766b563156b14899362f6e6c7bec2b7fdb9a19"
}
```

