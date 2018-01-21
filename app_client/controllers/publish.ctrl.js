(function (){
	angular
		.module ('App')
		.controller ('PublishCtrl', ['DataTransferService', '$scope', 'TestData', PublishCtrl])

	function PublishCtrl (DataTransferService, $scope, TestData){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;

		vm.dom = new function (){
			this.model = {
				placeholder: {
					content: 'Bạn muốn viết về điều gì?',
					title: 'Tiêu đề',
				}
			};

			this.ready = function (){
				Layout.dom.showPublishNavBar ();
			};
		}

		angular.element(document.getElementById ('mainContentContainer'))
			.ready(function () {
				vm.dom.ready ();
				$scope.$apply ();
			}
		);		

	}

})();