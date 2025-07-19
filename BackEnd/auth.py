from functools import wraps
from flask import request, jsonify
from jose import jwt
import requests
import os

AUTH0_DOMAIN = os.environ["AUTH0_DOMAIN"]
API_IDENTIFIER = os.environ["API_IDENTIFIER"]
ALGORITHMS = os.environ["ALGORITHMS"]

class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

def get_token_auth_header():
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing"}, 401)

    parts = auth.split()

    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "token_missing"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header"}, 401)

    return parts[1]

def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()

        jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
        jwks = requests.get(jwks_url).json()
        unverified_header = jwt.get_unverified_header(token)

        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if not rsa_key:
            raise AuthError({"code": "key_not_found"}, 401)

        try:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=[ALGORITHMS],
                audience=API_IDENTIFIER,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
        except Exception as e:
            raise AuthError({"code": "invalid_token", "message": str(e)}, 401)

        return f(*args, **kwargs)

    return decorated
