(function (){
	angular
		.module ('App')
		.controller ('ConnectionCtrl', ['DataTransferService', ConnectionCtrl])

	function ConnectionCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}
})();