# Lang

> Este proyecto busca crear un servidor web para estudiar vocabulario

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

# Hoja de Ruta

- Crear el modelo de datos en el servidor de FLASK [listo]
- Terminar de documentar la API [pendiente]
- Crear el servidor API en desarrollo con gnix [pendiente]
- Crear un servicio de front-end usando REACT JS [pendiente]
- Actualizar el Volumen de Persistencia para que guarde bien los datos [pendiente]

# Actualizaciones
