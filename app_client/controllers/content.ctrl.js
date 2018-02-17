(function (){
	angular
		.module ('App')
		.controller ('ContentCtrl', ['DataTransferService', '$scope', '$routeParams', '$location', 'TestData', ContentCtrl])

	function ContentCtrl (DataTransferService, $scope, $routeParams, $location, TestData){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
		
		vm.dom = new function (){
			this.model = {};

			this.ready = function (){
				Layout.dom.showOtherPageNavBar ();
			}
		}

		vm.content = new function (){
			this.model = {
				_id: $routeParams.contentid,
				content: null,
				comments: null,
			};

			// FAKE DATA
			this.fetch = function (){
				var data = TestData.search.results[0];
				this.model.content = data;
			};

			this.save = function (){

			};

			this.share = function (){

			};

			this.thumbup = function (){

			};

			this.comment = function (){

			};
		}();

		vm.jobPosting = new function (){
			this.model = {};
			this.apply = function (){

			};
		}();

		vm.blog = new function (){

		}();

		angular.element(document.getElementById ('mainContentContainer'))
			.ready(function () {
				vm.dom.ready ();
				vm.content.fetch ();
				$scope.$apply ();
			}
		);

	};

})();