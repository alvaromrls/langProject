# Lang

Este proyecto busca crear un servidor web para estudiar vocabulario y volcar mis conocimentos en Kubernetes en él.

## Ejecutar el namespace (necesario)

`kubectl -f namespace.yaml`

# 1. mongoDB

Servicio de Mongo para guardar los datos. Se encuentra en el directorio **mongoDB**. Está formado por:

- kubernetes: Carpeta donde se guardan los .yaml de kubernetes.
- readme: Contiene información de como ejecutar este servicio.

# 2. mongoConnector

Servicio de un servidor API rest usando Flask para el acceso a la base de datos. Se encuentra en el directorio **mongoConnector**. Está formado por:

- code: Se encuentra el código principal del servicio.
- kubernetes: Carpeta donde se guardan los .yaml de kubernetes.
- readme: Contiene información de como ejecutar este servicio.
- Dockerfile: Fichero de Docker para crear la imagen.
- requirements.txt: Dependencias de python del servicio.

# 3. frontend

Cliente web para acceder a la información del servidor. Se encuentra en el directorio **frontend** y esta basado en arquitectura react. Está organizado de la siguiente manera:

- src: Se encuentra el código principal del servicio.
- Dockerfile: Fichero de Docker para crear la imagen.
- .dockerignore: Fichero de Docker para ignorar ciertos archivos no necesarios para la imagen
- package.json / package-lock.json: Dependencias de JS del servicio.
- readme: Contiene información de como ejecutar este servicio.

Una captura del frontend:
![Ejemplo FrontEnd](./img/ejemplo_frontend.png)

# Hoja de Ruta

- Añadir POST/DELETE/PUT al front-end [pendiente]
- Crear el modelo básico de datos en el servidor de FLASK [listo]
- Terminar de documentar la API [pendiente]
- Crear el servidor API en desarrollo con gnix [pendiente]
- Crear un servicio de front-end usando REACT JS [listo]
- Actualizar el Volumen de Persistencia para que guarde bien los datos [listo]
- Añadir Readiness y Liveness a los contenedores [pendiente]
- Acceder a la api desde la petición de navegador de manera correcta [pendiente]
- Crear todo en entornos de Produccion [futuro]
- Añadir proceso de autentificación-perfiles [futuro]

# Apreciaciones

- Tras mucho tiempo sin usar React, se olvidan cosas

# Actualizaciones

- 17/05/2022: Almacenamiento permanente en mi PC
- 17/05/2022: Primera versión operativa de React
- 16/05/2022: React funciona en kubernetes y se comunica con Flask
- 16/05/2022: Creado el back end con Mongo y Flask
