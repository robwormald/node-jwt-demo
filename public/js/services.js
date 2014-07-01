'use strict';

// controllers
angular.module('authDemo.services', [])

.constant('AppUrl','http://localhost:9000')

.factory('User',['$http','AppUrl',function($http,appUrl){

    //user profile object;
    var _user = {};

    var _auth = {};


    function _register(newUser){
        //post to API
        return $http.post(appUrl + '/api/sign-up',newUser).then(function(res){
            console.log(res.data);
        })
    }

    function _getToken(user){
        return $http.post(appUrl + '/api/getToken',user).then(function(res){
            _auth.token = res.data.token;
            return res.data;
        })
    }

    function _getTokenInfo(token){
        return $http.get(appUrl + '/api/tokenInfo',{params: { token : _auth.token }}).then(function(res){
            angular.extend(_user,res.data);
            return _user;
        })
    }


    return {
        user: _user,
        register : _register,
        login : _getToken,
        getProfile : _getTokenInfo
    }
}])
