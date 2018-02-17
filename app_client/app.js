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
		.when ('/profile/:userid', {
			templateUrl: '/template/profile',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'ProfileCtrl',
			controllerAs: 'vm',					
		})	
		.when ('/content/:contentid', {
			templateUrl: '/template/content',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'ContentCtrl',
			controllerAs: 'vm',					
		})
		.when ('/search', {
			templateUrl: '/template/search',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'SearchCtrl',
			controllerAs: 'vm',					
		})
		.when ('/business/:buisnessid', {
			templateUrl: '/template/business',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'BusinessCtrl',
			controllerAs: 'vm',					
		})
		.when ('/notifications/', {
			templateUrl: '/template/notifications',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'NotificationCtrl',
			controllerAs: 'vm',					
		})
		.when ('/save/', {
			templateUrl: '/template/save',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'SaveCtrl',
			controllerAs: 'vm',					
		})
		.when ('/interests/', {
			templateUrl: '/template/interests',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'InterestCtrl',
			controllerAs: 'vm',					
		})
		.when ('/conversations/', {
			templateUrl: '/template/conversations',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'ConversationCtrl',
			controllerAs: 'vm',					
		})
		.when ('/connections', {
			templateUrl: '/template/connections',
			// resolve: {
			// 	'checkAuth': ['$q', 'authentication','$location', '$rootScope', checkAuth]
			// },			
			controller: 'ConnectionCtrl',
			controllerAs: 'vm',					
		})													
		.otherwise ({redirectTo: '/'});	
};
