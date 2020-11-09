# IIC2173 - Entrega 0 - Domingo Ramírez Calvo

## Consideraciones Generales

Esta es la entrega 0 del ramo IIC2173 Arquitectura de Sistemas de Software cuyo objetivo es implementar un chat simple pero usando tecnicas avanzadas de virtualización y seguridad. Es por esto que en esta aplicación se enfoca más en los aspectos no funcionales que aspectos visuales.

La aplicación fue desarrollada usando el framework Node.JS con KOA para el routing y demases, el front está incorporado al framework, la base de datos utilizada es PostgreSQL 12. Para el routing y proxy inverso se utilizó Nginx. todos estos aspectos están dentro de containers de Docker unidos usando docker-compose.

El archivo `docker-compose.yaml` se encuentra en el root del directorio y el archivo `app.conf` se encuentra en la ruta `data/nginx/app.conf`

Debido a que mis creditos de AWS ya fueron previamente usados, la instancia EC2 se encunetra apagada, favor hacerme saber cuando se vaya a corregir para levantarla. mi correo es `djramirez@uc.cl` y telegram `@chuma9615`
## Nombre del dominio

El nombre de dominio de la aplicación es `battlechile.cl`, el cual redirecciona automaticamente al protocolo HTTPS


## Método de acceso al servidor

Para acceder al servidor, la forma más simple es a través de una sesion SSH desde un terminal. se debe usar una llave .pem para ingresar al servidor, la cual fue entregada por el formulario de CANVAS.

El comando para ingresar es `ssh -i <path/a/llave-secreta.pem> ubuntu@18.229.247.231`

## Requisitos Logrados

### Seccion mínima (50%) (30p)


* **RF1: (5p)** Se debe poder enviar mensajes y se debe registrar su timestamp. Estos mensajes deben aparecer en otro usuario, ya sea en tiempo real o refrescando la página. **El no cumplir este requisito completamente limita la nota a 3.9** ✅

* **RF2: (3p)** Se puede crear salas de chat. ✅

* **RF3: (2p)** Se debe utilizar un nickname para cada usuario, libremente. ✅

* **RNF1: (4p)** Debe haber un proxy inverso (como Nginx y Traefik) configurado. ✅

* **RNF2: (3p)** El servidor debe tener un nombre de dominio de primer nivel (tech, me, tk, ml, ga, com, cl, etc) ✅

* **RNF3: (5p)** El servidor debe estar corriendo en EC2. ✅

* **RNF4: (3p)** Debe haber una base de datos externa asociada a la aplicación para guardar mensajes y consultarlos. Debe estar hosteada en otro servidor o container. ✅

* **RNF5: (5p)** El servicio debe estar dentro de un container Docker. ✅




## Seccion variable


### Docker-compose (25%) (15p)


* **RNF1: (5p)** Lanzar su app desde docker-compose ✅

* **RNF2: (5p)** Integrar db desde docker-compose ✅

* **RNF3: (5p)** Configurar su proxy inverso desde docker-compose ✅


### HTTPS (25%) (15p)


* **RNF1: (7p)** El dominio debe estar asegurado por SSL con Let's Encrypt. ✅

* **RNF2: (3p)** Debe poder redireccionar HTTP a HTTPS. ✅ 

* **RNF3: (5p)** Se debe ejecutar el chequeo de expiracion del certificado SSL de forma automática 2 veces al día 🤔✅ (No lo he podido probar ya que no quiero gastar mi plata en probar este feature, pero está levantado un certbot en docker)


