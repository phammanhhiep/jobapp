angular.module ('App', ['ngRoute']);

angular
	.module ('App')
	.config (['$routeProvider', config])

function config ($routeProvider){	
	$routeProvider
		.when ('/', {
			templateUrl: '/template/home',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'HomeCtrl',
			controllerAs: 'vm',					
		})
		.when ('/login', {
			templateUrl: '/template/login',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'LoginCtrl',
			controllerAs: 'vm',					
		})
		.when ('/register', {
			templateUrl: '/template/register',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'RegisterCtrl',
			controllerAs: 'vm',					
		})
		.when ('/publish', {
			templateUrl: '/template/publish',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'PublishCtrl',
			controllerAs: 'vm',					
		})
		.when ('/profile', {
			templateUrl: '/template/profile',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'ProfileCtrl',
			controllerAs: 'vm',					
		})	
		.when ('/content', {
			templateUrl: '/template/content',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'ContentCtrl',
			controllerAs: 'vm',					
		})						
		.otherwise ({redirectTo: '/'});	
};
