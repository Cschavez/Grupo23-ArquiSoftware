# IIC2173 - Entrega 2 - Grupo 23

## Dominio 

[https://myfirstchatapp.me/](https://www.myfirstchatapp.me/)

## Sección mínima

### Autenticación

### CI/CD

### Documentación

Los documentos se encuentran en la carpeta docs

- \*\*RF1 Debe documentar con diagramas de componentes el sistema a fines de esta entrega. (LOGRADO)

- \*\*RF2 Debe documentar con diagramas de flujo los procesos de log in/sign up, envío de mensajes (considerando todos los procesos que ocurran a partirde ahí). (LOGRADO)

- \*\*RF3 Debe documentar con diagramas el proceso de despliegue. (LOGRADO)

- \*\*RF4 Debe documentar todas las posibles llamadas a sus APIs con algún estandar (Postman, Swagger u otra) (LOGRADO) (https://documenter.getpostman.com/view/10613962/TVejiqnR)

## Sección Variable

### CRUD Admin.

- \*\*RF1 Se implementa un menu para acceder a la información de los usuarios. Se puede revisar y modificar la información de éstos y bloquear el acceso("borrar"). De ser necesario, debe interactuar con el sistema de auth implementado en la sección de Autenticación. (LOGRADO)

- \*\*RF2 Se implementa el menú para manejar grupos. Se pueden cerrar grupos, dejar públicos o privados. (se pueden crear salas públicas, y eliminar salas)

- \*\*RF3 Se implementa el CRUD mensajes. Como admin puede enviar mensajes en grupos, ver y modificar los mensajes e incluye la censura de ellos. Almodificar o censurar los mensajes no se puede perder el mensaje original. (NO LOGRADO)

### CSS/Javascript injection

### Encriptación

- **RF1: Salas Privadas**
  Se crearon salas privadas donde un usuario deberá hacer click en el nombre y esperar a que el creador de aquella sala le de permiso para entrar. El permiso se manda como un mensaje en el chat que solo el creador puede ver y tiene dos botones: 'Aceptar' y 'Rechazar'. Si acepta, el usuario que pidió entrar será unido a la sala.

- **RF2: Encriptación end-to-end**
  Se implementó un servidor 'Vault' con una Transit Secrets Engine que funcionará como un servicio. Funciona de la siguiente manera:

  - Enprimer lugar se crea una policy para encriptar y desencriptar mensajes sin guardarlos en la máquina y se habilita la 'transit secret engine'.
  - Luego, dentro de la app se manda un request http 'pidiendo' una token de acceso como cliente al servidor de vault. Esta token solo permite encriptar y desencriptar algun mensaje, no permite borrar o crear 'secretos' ni modificar el servidor. El request utiliza una llave 'root' que permite crear tokens de cliente. Esta se encuentra en el docker-compose como `VAULT_TOKEN`.
  - Una vez teniendo la token se procede a realizar un último request http 'pidiendo' encriptar un mensaje a lo que el servidor de vault enviará como respuesta el mensaje codificado. Este mensaje es guardado en la BDD.

  Todo lo anterior se lleva a cabo en el backend y al frontend solo se envían los mensajes desencriptados.
