(function (){
	angular
		.module ('App')
		.controller ('HomeCtrl', ['DataTransferService', '$scope', 'TestData', HomeCtrl])

	function HomeCtrl (DataTransferService, $scope, TestData){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
		vm.utility = Layout.utility;
		vm.content = new function (){
			this.model = {
				content: [],
			};

			vm.dom = new function (){
				this.model = {};

				this.ready = function (){
					Layout.dom.resetMobileNavBarMenu ();
				};
			}			

			// FAKE DATA
			this.fetch = function (){
				var data = TestData.search.results;
				this.model.content = data;
			};

			this.loadMore = function (){

			};

			this.save = function (index){

			};

			this.share = function (index){

			};

			this.thumbup = function (index){

			};

			this.comment = function (story_index, comment_index, comment_level){

			};			

		}();



		angular.element(document.getElementById ('mainContentContainer'))
			.ready(function () {
				vm.dom.ready ()
				vm.content.fetch ();
				$scope.$apply ();
			}
		);
	};



})();