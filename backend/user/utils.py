import requests
from .exceptions import SocialLoginError

def get_social_user_info(access_token, provider):
    """Fetch user info from social provider."""
    headers = {'Authorization': 'Bearer {0}'.format(access_token)}

    if provider.lower() == 'google':
        url = 'https://www.googleapis.com/oauth2/v2/userinfo'
    elif provider.lower() == 'facebook':
        url = 'https://graph.facebook.com/me?fields=id,name,email,picture'
    else:
        raise ValueError('Provider must be either Google or Facebook')

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise SocialLoginError(
            'Failed to fetch user info from {0}.'.format(provider))

    return response.json()
