## Entrega 8
======================================


1)Levantar el servidor y devolver todos los JSON descargados previamente:

Utilizar Node.js y Express para levantar un servidor.
Descargar los datos en archivos JSON previamente mencionados.

Crear rutas en el servidor para devolver estos archivos JSON al ser solicitados por el frontend.
Modificar las url que tomamos en nuestro archivo init.js para que apunten a nuestro servidor local.

2)Endpoint /login y autenticación mediante usuario y contraseña:

Crear un endpoint POST /login donde reciba el usuario y contraseña en el cuerpo de la petición.
Utilizar la librería jsonwebtoken para generar un token después de autenticar al usuario y devolverlo como respuesta al frontend.

// Falta devolver json web token

3)Middleware de autorización para la ruta /cart:

Crear un middleware que verifique la presencia y validez del token en las peticiones a la ruta /cart.
Solo permitir que usuarios autenticados realicen peticiones a esta ruta.

4)¡Desafiate!
En /cart debemos programar la funcionalidad para que permita recibir los ítems del carrito y los guarde en el servidor (puede ser en un archivo utilizando FileSystem, en una base de datos como MariaDB o MongoDB, o la herramienta que les sea más práctica).

front end -> 


Borrar read me
