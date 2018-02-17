(function (){
	angular
		.module ('App')
		.controller ('InterestCtrl', ['DataTransferService', InterestCtrl])

	function InterestCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}
})();