from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient

# Create your tests here.
factory = APIRequestFactory()
request = factory.post('/notes/', {'title': 'new idea'})

class UserApiTestCase(TestCase):
    def test_user_register(self):
        client = APIClient()
        client.post('/api/user/', {
            'username': 'test1',
            'passwd': '123456',
            'first_name': 'aby',
            'last_name': 'yba',
            'email': 'cry@hh.com'
        }, format='json')
    
    
        
        
