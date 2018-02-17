(function (){
	angular
		.module ('App')
		.controller ('SaveCtrl', ['DataTransferService', SaveCtrl])

	function SaveCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}
})();