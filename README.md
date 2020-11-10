# IIC2173 - Entrega 1 - Grupo 23

## Dominio

[https://myfirstchatapp.me/](https://www.myfirstchatapp.me/)

## Sección mínima

### BackEnd

* **RF1** Completo
* **RF2** Completo
* **RF3** Completo
* **RF4** Completo
* **RF5** Asegurado con Let's Encrypt y redirije HTTP a HTTPS

### FrontEnd

* **RF5 y RF6** Completo

## Mensajes en tiempo real

* **RF1 - Mostrar mensajes sin recargar la página:** se realiza usando una React App en el frontend, no hay ninguna limitación.
* **RF2 - Notificación en caso de que el usuario sea etiquetado:** cuando un usuario es llamado con @ se le envia un correo al usuario etiquetado. En el frontend, si algún mensaje contiene '@' antes del nombre de un usuario, se le envía un socket al backend indicando que hay una mención con el nombre de usuario. En el backend se busca el mail del usuario y se manda un post a un endpoint de API Gateway. Este último lo enruta a una función lambda que utiliza el servicio mailer de Sendgrid. Así se envía un request para que finalmente se envie el correo. Por lo tanto, las herramientas utilizadas son API Gateway, Sendgrid y Lambda.

## Trabajo delegado

* **Función Lambda para enviar mails:** cuando un usuario es llamado con @ se le envia un correo al usuario etiquetado. En el frontend, si algún mensaje contiene '@' antes del nombre de un usuario, se le envía un socket al backend indicando que hay una mención con el nombre de usuario. En el backend se busca el mail del usuario y se manda un post a un endpoint de API Gateway. Este último lo enruta a una función lambda que utiliza el servicio mailer de Sendgrid. Así se envía un request para que finalmente se envie el correo. Por lo tanto, las herramientas utilizadas son API Gateway, Sendgrid y Lambda.
