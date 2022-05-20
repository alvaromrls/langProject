import requests
import os


def get_user_from_bearer(request):
    """
    FUNCIÓN QUE PERMITE OBTENER LOS DATOS DEL USUARIO DE AUTH0
    """
    validate_domain = os.environ.get("VALIDATE_DOMAIN_URL")

    token = request.headers.get("Authorization")  # OBTENER EL BEARER TOKEN
    if token:  # HAY TOKEN !
        info = requests.get(
            validate_domain, headers={"Authorization": token}
        )  # VERIFICAMOS EN EL SERVIDOR DE AUTH0
        if info.status_code == 200:  # HA SIDO CORRECTO
            return info.json()  # DEVOLVEMOS LA INFORMACIÓN
    return None  # HUBO ALGUN FALLO
