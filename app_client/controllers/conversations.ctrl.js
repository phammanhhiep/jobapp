(function (){
	angular
		.module ('App')
		.controller ('ConversationCtrl', ['DataTransferService', ConversationCtrl])

	function ConversationCtrl (DataTransferService){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;
	}
})();