'use strict';

// Declare app level module which depends on views, and components
angular.module('webApp', [
  'ngRoute',
  'ngMaterial',
  'ngMessages',
  'webApp.home',
  'webApp.register',
  'webApp.welcome',
  'webApp.addPost',
  'ngTextTruncate'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $routeProvider.otherwise({redirectTo: '/home'});
}]);
