angular.module('Aero', [
        'ui.router',
        'leaflet-directive',
        'Aero.controllers',
        'mm.foundation',
        'ngImgCrop',
        'btford.socket-io',
        'ngStorage',
        'Aero.config'
    ])
    .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/map');
        $stateProvider
        // .state('app', {
        //   url: '/app',
        //   abstract: true,
        //   templateUrl: setting.server_domain + 'templates/skeleton.html',
        //   controller: 'SkeletonCtrl'
        // })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html',
                controller: 'RegCtrl'
            })
            .state('message', {
                url: '/message',
                templateUrl: 'templates/message.html',
                controller: 'MessageCtrl'
            })
            .state('detail', {
                url: '/detail',
                templateUrl: 'templates/user_detail.html',
                controller: 'DetailCtrl'
            })
            .state('avatar', {
                url: '/avatar',
                templateUrl: 'templates/avatar.html',
                controller: 'AvatarCtrl'
            })
            .state('map', {
                url: '/map',
                templateUrl: 'templates/map.html',
                controller: 'MapCtrl'
            })
        .state('timemap', {
          url: '/timemap',
          templateUrl: 'templates/timemap.html',
          controller: 'TimeMapCtrl'
        })
        .state('friendsmap', {
          url: '/friendsmap',
          templateUrl: 'templates/friendsmap.html',
          controller: 'FriendsMapCtrl'
        })
            .state('post', {
                url: '/post',
                templateUrl: 'templates/post.html',
                controller: 'PostCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            })
            .state('search_user', {
                url: '/searchuser',
                templateUrl: 'templates/searchuser.html',
                controller: 'SearchUserCtrl'
            })
            .state('friends', {
                url: '/friends',
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            })
            .state('markpost', {
                url: '/markpost/:markPostId',
                templateUrl: 'templates/markpost.html',
                controller: 'MarkPostCtrl'
            })
            .state('user', {
                url: '/user/:userId',
                templateUrl: 'templates/user.html',
                controller: 'UserCtrl'
            })
            .state('usermarkposts', {
                url: '/user/:userId/markposts',
                templateUrl: 'templates/user_markpost.html',
                controller: 'UserMarkpostCtrl'
            })
            .state('reqmsg', {
                url: '/reqmsg',
                templateUrl: 'templates/reqmsg.html',
                controller: 'ReqMsgCtrl'
            })
        .state('changepassword', {
          url: '/changepassword',
          templateUrl: 'templates/changepassword.html',
          controller: 'ChangePasswordCtrl'
        })
            .state('chat', {
                url: '/chat/:userId',
                templateUrl: 'templates/chat.html',
                controller: 'ChatCtrl'
            })
            .state('setting', {
                url: '/setting',
                templateUrl: 'templates/setting.html',
                controller: 'SettingCtrl'
            })
            .state('comment', {
                url: '/comment/:markpostId',
                templateUrl: 'templates/comment.html',
                controller: 'CommentCtrl'
            });


    });