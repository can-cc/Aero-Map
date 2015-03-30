from django.conf.urls import patterns, include, url
from django.contrib import admin

'''
Use: Home View

'''

urlpatterns = []

'''
Use: Api Auth [login | logout]

'''
urlpatterns += [
    url(r'^api/api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]

'''
Use: UserManager Urls

'''
import UsersManager.views as UM
urlpatterns += [
    url(r'^api/user/$', UM.User.as_view()),
]
