(function (){
	angular
		.module ('App')
		.controller ('NotificationCtrl', ['DataTransferService', NotificationCtrl])

	function NotificationCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}
})();