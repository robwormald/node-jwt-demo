'use strict';


// Declare app level module which depends on filters, and services
angular.module('getHired', [
  // 'ngRoute',
  'getHired.services',
  'getHired.controllers',
   'ui.router'
]).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

    //using ui-router over ngRouter. uses "states" vs "routes" - states are more akin to "screens" in a mobile app. decoupled from the URL, since in an SPA we're faking it anyway.

    //top level application state. useful for protecting secure portions of the app
    $stateProvider.state('app',{
        //all content will render into this ui-view
        template: '<div ui-view></div>',
        controller: function(){
            console.log('hello world');
        }
    });

    //home page
    $stateProvider.state('app.home',{
        url: '/home', //which is actually #/home
        controller: 'HomeController',
        //fetch a template from the server
        templateUrl: 'views/home.html'
    });

    $stateProvider.state('app.login',{
        url: '/login', //which is actually #/login
        controller: 'LoginController',
        //fetch a template from the server
        templateUrl: 'views/login.html'
    });

    $stateProvider.state('app.signup',{
        url: '/signup', //which is actually #/signup
        controller: 'SignupController',
        //fetch a template from the server
        templateUrl: 'views/signup.html'
    });

    $stateProvider.state('app.profile',{
        url: '/profile', //which is actually #/signup
        controller: 'ProfileController',
        //fetch a template from the server
        templateUrl: 'views/profile.html'
    });

    //if none of our routes match, redirect to home
    $urlRouterProvider.otherwise('/home');




}])
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
//   $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);
