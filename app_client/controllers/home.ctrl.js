(function (){
	angular
		.module ('App')
		.controller ('HomeCtrl', ['DataTransferService', HomeCtrl])

	function HomeCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}


})();