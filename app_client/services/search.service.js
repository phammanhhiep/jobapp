(function (){
angular
	.module ('App')
	.service ('SearchService', ['$http', SearchService])

	function SearchService ($http){
		this.search = function (input){
			return $http({
				method: 'GET',
				url: 'http://127.0.0.1:5000/api/search',
				params: {q: input}
			});
		}
	}

})();