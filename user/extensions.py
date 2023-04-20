from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.utils import OpenApiParameter, OpenApiTypes

class FirebaseAuthenticationExtension(OpenApiAuthenticationExtension):
    target_class = 'user.authentication.FirebaseAuthenticationBackend'
    name = 'Firebase'

    def get_security_definition(self, auto_schema):
        return {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'JWT',
            'description': 'Firebase ID token with the "Bearer" prefix',
        }

    def get_security_requirement(self, auto_schema):
            return {self.name: []}

    def get_additional_parameters(self, auto_schema):
        return [
        OpenApiParameter(
            name='Authorization',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.HEADER,
            required=True,
            description='Firebase ID token with the "Bearer" prefix',
        )
    ]
