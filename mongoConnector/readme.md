# ESTRUCTURA DEL SERVICIO

# EJECUTAR EL SERVICIO

## 1. Crear la imagen de docker

    docker build -t flask-app:v0.0 .

## 2. Lanzar los servicios de Kubernetes

    kubectl apply -f .

# Ejecutar el servicio en local (debug)

    python run.py

# API [en proceso]

## /api/group

- get
- post

## /api/group/\<string:Id\>

## /api/word
