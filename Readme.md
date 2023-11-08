Entrega 5)

Punto 1) ->  completo.
Haciendo uso del id de usuario 25801, realizar la petición web a la URL donde se encuentra un carrito de compras, ya con un producto precargado, y mostrar en HTML la información del mismo: nombre, costo, cantidad (como valor de un input), moneda, imagen y subtotal (costo por cantidad).


Punto 2) -> Completo - Camila

Incluir los controles gráficos necesarios para seleccionar tipo de envío y dirección (calle, número y esquina). La funcionalidad a dichos controles la trabajaremos en una entrega posterior.


Punto 3) -> Completo 

Modificar el subtotal de la compra del artículo, en tiempo real, si se modifica la cantidad. Recuerda que el subtotal se calcula como el precio unitario del producto multiplicado por la cantidad.


Punto 4) -> Completo

Asegurar que todas las pantallas del proyecto trabajadas hasta el momento (products.html, product-info.html, login.html) se adapten de manera efectiva a dispositivos móviles y de escritorio, permitiendo una experiencia óptima en diferentes dispositivos. 
Realizar pruebas exhaustivas en varios dispositivos y navegadores para verificar la coherencia de la experiencia del usuario. Documentar los cambios realizados mediante capturas de pantalla e incluirlas en un PDF como parte de la entrega.


Pauta 5) -> Completo!!! - Federico

¡Desafiate!
-Nuestro carrito de compras ya trae un producto precargado, pero para completar la funcionalidad de la página, haz que el usuario pueda agregar los productos que quiera al carrito.

-Todos deben mostrarse tal como el que viene del servidor, y también deben modificar su subtotal según varíe la cantidad.


Entrega 5:
--------------------

Tareas bonus

1) Prodcuts.html - en mobile se rompe el coso del filtro

2) Product-info - Terminar carrusel

3) Cart.js - Boton para borrar productos

4) En carrito, en resumen de compra mostrar precio total.

5) Arreglar darkmode

6) En carrito, en mobile, al hacer click se le podria dar al usuario mas info del item en la tabla. Mas info como por ejemplo poder aumentar la cantidad y poder borrar el item.


Entrega 6
================================================================================

Participantes de esta entrega:
1) Nahuel  - Punto - Punto 2 - - Completo
2) Hernan  - Punto - Punto 3 - agregar validaciones, alerts de bootstrap
3) Chiara  - Punto - Punto 1 - Completado
4) Ignacio - Punto - Desafiate - Completado

Pautas
En esta entrega continuaremos con el carrito de compras para terminar de implementar las funcionalidades del mismo:

1) Agrega un espacio donde se visualicen:
El subtotal general: la suma de los subtotales (costo por cantidad) de todos los artículos
El costo de envío: calculado a partir del envío seleccionado por el usuario (5%, 7% o 15%) y siendo un porcentaje del valor anterior (el subtotal).
El total a pagar: la suma de los dos valores anteriores

Los 3 valores deberán actualizarse en tiempo real cuando se modifique el tipo de envío o los artículos en el carrito.

Todos los valores deberán ser mostrados en dólares.


2) Añadir un modal que permita establecer una forma de pago e introducir los datos de la misma
Las mismas deberán ser tarjeta de crédito o transferencia bancaria, y deberán desactivarse los campos de la opción no seleccionada


3) Añade también un botón para confirmar la compra

Al presionarlo deberán ejecutarse las siguientes validaciones (dando el feedback correspondiente al usuario):

Los campos calle, número y esquina, no podrán estar vacíos.
Deberá estar seleccionada la forma de envío.
La cantidad para cada artículo deberá estar definida y ser mayor a 0
Deberá haberse seleccionado una forma de pago
Los campos, para la forma de pago seleccionada, no podrán estar vacíos

¡Desafiate!
A nuestro carrito solamente le falta la funcionalidad de eliminar artículos.
Desarróllala teniendo en cuenta que se deberán actualizar los totales cada vez que se elimine un artículo.


Entrega 7:
================================================================================

Puntos:
1) 
Se deberán mostrar campos para:
Nombre*
Segundo nombre
Apellido*
Segundo apellido
E-mail*
Teléfono de contacto

Solamente se podrá ingresar al perfil si el usuario se encuentra logueado. Además, al momento de ingresar por primera vez, todos los campos se deben encontrar vacíos, excepto E-mail, que debe contener el ingresado por el usuario al momento del login.

2) 
Al presionar el botón para guardar los datos, se debe validar que los 
campos obligatorios (*) se encuentren con valor, y de ser así, guardar en el almacenamiento local.

3) 
Luego del primer ingreso, las siguientes veces que se ingrese al perfil ya se 
deben encontrar los datos cargados en los input listos para ser modificados por el usuario.

4) 
¡Desafiate!
¿Sabías que también podemos guardar imágenes y otros archivos binarios a nivel local?

Ofrece al usuario la posibilidad de guardar una imagen de perfil y muéstrasela. En caso de que no seleccione una muestra una imagen por defecto. 

5) 
Pauta Extra
Teniendo en cuenta que esta será la última entrega en que trabajen a nivel de cliente, 
es momento de revisar todo el sitio y realizarle las mejoras que consideremos adecuadas. 

Dejamos algunas preguntas a modo de ejemplo:

¿Mi código es legible y prolijo?
¿Está ordenado y los nombres de variables y funciones son los adecuados?
¿Dejé comentarios y documentación?
¿Aplico las buenas prácticas trabajadas en clase?
¿Cumple mi sitio con los criterios responsive design, los distintos componentes y listados se adaptan correctamente?
¿Puedo hacer mejor algo que en las primeras pautas resolví de otra manera?

Ten presente que esta pauta extra no será calificable, pero es importante lograr que el código se encuentre lo mejor posible ya que será un insumo importante para los tutores a la hora de calificar el Proyecto Final.


Hacen video:
Camila      -> Punto 1
Franco      -> Punto 1
Federico    -> Punto 3
Gaston      -> Punto 2


No hacen video:
Hernan y Chiara -> Desafiate (Punto 4)


-----------------------------------------------------


## Los archivos q ya estan comentados bien:
Cart.js
Products.js
my-profile.js
sell.js
dropzone.js
---------------------------------------------------------

## Para arreglar
product-info.js
init.js 
index.js --> OK
comments.js    ->  chiara  OK 
categories.js  ->  chiara  OK 
register.js    ->  chiara  ok 
navbar.js  ->  Camila oka (?)
footer.js? --> 

## El punto 2 hay q hacer hoy -> Federico T