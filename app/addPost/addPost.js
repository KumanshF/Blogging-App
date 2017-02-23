'use strict';

angular.module('webApp.addPost', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/addPost', {
		templateUrl: 'addPost/addPost.html',
		controller: 'AddPostCtrl'
	});
}])

.controller('AddPostCtrl', ['$scope', '$firebaseArray', '$location', 'CommonProp','$firebaseAuth', function($scope, $firebaseArray, $location, CommonProp,$firebaseAuth){

	$scope.username = CommonProp.getUser();

	if(!$scope.username){
		$location.path('/home');
	}

	var ref = firebase.database().ref().child('Articles');
	$scope.articles = $firebaseArray(ref);
	$scope.createPost = function(){
		var title = $scope.article.titleTxt;
		var post = $scope.article.postTxt;
		var currentdate= new Date().toLocaleString();
		var postdate= 0 - new Date().getTime();
		var authdata=$firebaseAuth().$getAuth();
		var user=authdata.email;
		console.log(currentdate)
		$scope.articles.$add({
			title: title,
			post: post,
			currentdate: currentdate, 
			postdate:postdate,
			user:user
		}).then(function(ref){
			console.log(ref);
			$scope.success = true;
			window.setTimeout(function() {
				$scope.$apply(function(){
					$scope.success = false;
				});
			}, 2000);
		}, function(error){
			console.log(error);
		});
	};

}]);
