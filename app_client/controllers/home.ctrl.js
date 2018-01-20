(function (){
	angular
		.module ('App')
		.controller ('HomeCtrl', ['DataTransferService', '$scope', 'TestData', HomeCtrl])

	function HomeCtrl (DataTransferService, $scope, TestData){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;

		vm.stories = new function (){
			this.model = {
				stories: [],
			};

			// FAKE DATA
			this.fetch = function (){
				var data = TestData.search.results;
				this.model.stories = data;
			};

			this.loadMore = function (){

			};

			this.open = function (index){

			};

			this.save = function (index){

			};

			this.share = function (index){

			};

		}();

		angular.element(document.getElementById ('mainContentContainer'))
			.ready(function () {
				vm.stories.fetch ();
				$scope.$apply ();
			}
		);
	};



})();