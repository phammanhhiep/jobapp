(function (){
	angular
		.module ('App')
		.service ('DataTransferService', [DataTransferService])

	function DataTransferService (){
		this.data = {
			user: '',
			layout: ''
		};

		this.set = function (name, data){
			this.data[name] = data;
		};

		this.get = function (name){
			return this.data[name];
		};

		this.reset = function (name){
			this.data[name] = '';
		};
	};

})();


