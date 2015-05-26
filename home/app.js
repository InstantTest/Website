(function () {
	var app = angular.module('home',['ngRoute']);
	
	app.controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
     
     $scope.$on('$viewContentLoaded', function(event) {
	    ga('send', 'pageview', $location.path());
	  });
     
 	});
	

	app.controller('TestController', function ($scope, $http) {
		//loads the data for the test, but for now we are using a dummy data
				$('#load').modal('toggle');
		  $http.get("http://it.addybs.com/API/TestAPI.php?action=get_test_list").
		    success(function(data, status, headers, config) {
		     $scope.tests = data;
		     	$('#load').modal('toggle');
		    }).
		    error(function(data, status, headers, config) {
		      console.log(data);
		    });
		  
		//$scope.tests = tests;    
		$scope.selected = -1;
		$scope.see = function(j) {
				$scope.selected = j;
			$('#modal').modal('toggle');
		};
		
		$scope.free = function(price) {
          if (price == "0.00"){
          	return "FREE";
          }else{
          	return "¢ " + price;
          }
		};
		
		
		$scope.initials = function(name) {
          return name.replace(/[^A-Z]/g, '');                                              
		};
		
		$scope.buy = function(id) {
			void(open('http://it.addybs.com/dashboard.html#/buy/' + id,'_self'));
		};
		
		$scope.client = function(id) {
			void(open('http://it.addybs.com/client.html#/subtest/' + id,'_self'));
		};
	});
	
	
	app.controller('DownloadController', function ($scope, $http) {
		$scope.download = function() {
			//alert("yes");
           ga('send', 'event', 'button', 'click', 'download-client');                                          
		};
	});
	
	
	

	
	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		  .when('/', {
		    templateUrl: 'http://it.addybs.com/home/home.html',
		  })
		  
		  .when('/home/', {
		    templateUrl: 'http://it.addybs.com/home/home.html',
		  })
		  
		  .when('/downloads/', {
		    templateUrl: 'http://it.addybs.com/home/downloads.html',
		    controller: 'DownloadController'
		  })
		  
		  .when('/market/', {
		    templateUrl: 'http://it.addybs.com/home/market.html',
		    controller: 'TestController'
		  })
		  
		  .when('/contact/', {
		    templateUrl: 'http://it.addybs.com/home/contact.html',
		  })
		  
		  .when('/about/', {
		    templateUrl: 'http://it.addybs.com/home/about.html',
		  });
	
	  // configure html5 to get links working on jsfiddle
	  //$locationProvider.html5Mode(true);
	});

	var tests = [
	{
		ID:"0000000",
		Title:"This is a Dummy Test",
		Description:"N\/A",
		Author:"Prof. Someone",
		Tag:"Field",
		Price:"0.00",
		Date:"2000-01-01"}];
})();


