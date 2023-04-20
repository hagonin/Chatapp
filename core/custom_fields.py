from rest_framework.fields import DateTimeField


class CustomDateTimeField(DateTimeField):
    def to_representation(self, value):
        formatted_time = value.strftime('%H:%M:%S %d-%m-%Y')
        return formatted_time
