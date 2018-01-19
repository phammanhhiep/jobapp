(function (){
	angular
		.module ('App')
		.controller ('LayoutCtrl', ['$rootScope','$scope','$window', '$location','authentication', 'DataTransferService', LayoutCtrl]);

	function LayoutCtrl ($rootScope, $scope, $window, $location, authentication, DataTransferService) {
		$scope.vm = {};
		var vm = $scope.vm;
		vm.user = {
			fullname: 'Pham Manh Hiep',
			profile: '#'
		};	

		vm.dom = new function (){
			this.model = {
				mobile: {
					menu: [
						{name: 'Interest', link: '#'},
						{name: 'Bookmark', link: '#'},
						{hr: true},
						{name: 'Đăng tin', link: '#'},
						{name: 'Viết blog', link: '#'},
					]
				}
			}
		}();

		vm.search = new function (){
			this.model = {
				query: '',
				results: null,
				suggestions: null,
				lastTermNum: 2
			};

			this.suggestions = function (input){
				return [
					{content: 'suggestion 1', 'link': '#'},
					{hr: true},
					{content: 'suggestion 2', 'link': '#'},
					{hr: true},
					{content: 'suggestion 3', 'link': '#'},
				]
			};

			this.handleChange = function (){
				var curTermNum = this.model.query.split (' ').length
				if (this.model.lastTermNum > 2 && !this.model.query){
					this.model.lastTermNum = 2;
					this.model.suggestions = null
				}
				if (curTermNum >= this.model.lastTermNum){
					this.model.suggestions = this.suggestions (this.model.query);
					this.model.lastTermNum++;
				}
			};

		}();


		vm.utility = {
			showLoader: function (){
				$(".loader").fadeIn("fast");
			},
			hideLoader: function (){
				$(".loader").fadeOut("slow");
			},
		};					

		DataTransferService.set ('layout', vm);

		angular.element(document).ready(function () {
			vm.utility.hideLoader ();
			$("body").foundation();
			$scope.$apply();
		});

	}

})();
