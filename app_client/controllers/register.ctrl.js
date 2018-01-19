(function (){
	angular
		.module ('App')
		.controller ('RegisterCtrl', ['DataTransferService', RegisterCtrl])

	function RegisterCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}


})();