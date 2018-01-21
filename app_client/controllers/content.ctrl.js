(function (){
	angular
		.module ('App')
		.controller ('ContentCtrl', ['DataTransferService', '$scope', 'TestData', ContentCtrl])

	function ContentCtrl (DataTransferService, $scope, TestData){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;

		vm.dom = new function (){
			this.model = {};

			this.ready = function (){
				Layout.dom.showBackBtn ();
			}
		}

		vm.content = new function (){
			this.model = {
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