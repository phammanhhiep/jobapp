(function (){
	angular
		.module ('App')
		.controller ('LoginCtrl', ['DataTransferService', LoginCtrl])

	function LoginCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}


})();