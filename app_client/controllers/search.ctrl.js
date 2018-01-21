(function (){
	angular
		.module ('App')
		.controller ('SearchCtrl', ['DataTransferService', '$scope', 'TestData', SearchCtrl])

	function SearchCtrl (DataTransferService, $scope, TestData){
		var vm = this;
		Layout = DataTransferService.get ('layout');
		vm.user = Layout.user;

		vm.dom = new function (){
			this.model = {
				categories: {
					exist: true,
					categories: ['Việc làm', 'Blog', 'Cá nhân', 'Tổ chức'],
				},				
			};

			this.ready = function (){
				Layout.dom.showSearchNavBar ();
			}
		}

		vm.search = new function (){
			this.model = {
				query: '',
				results: null,
				suggestions: null,
				lastTermNum: 2,
				notFound: {
					status: false,
					content: '',
				}
			};

			this.close = function (){
				/*
				Close the search div and reset all component of the search div.
				*/
				this.model.query = '';
				this.model.results = '';
				this.model.suggestions = null;
				this.model.lastTermNum = 2;
			};

			this.resetSuggestions = function (){
				this.model.lastTermNum = 2;
				this.model.suggestions = null;
			};

			this.resetQuery = function (){
				if (this.model.query){
					this.model.query = '';
					this.handleChange ();					
				}
			};

			this.resetNotFound = function (){
				this.model.notFound.status = false;
				this.model.notFound.content = '';
			}

			this.setQuery = function (input){
				this.model.query = input;
			}

			// FAKE data
			this.suggestions = function (input){
				return TestData.search.suggestions;
			};

			this.selectSuggestion = function (input){
				this.setQuery (input);
				this.search ();
			}

			this.handleChange = function (){
				var curTermNum = this.model.query.split (' ').length;

				if (this.model.lastTermNum > 2 && !this.model.query){
					this.resetSuggestions ();
				}
				if (curTermNum >= this.model.lastTermNum){
					this.model.suggestions = this.suggestions (this.model.query);
					this.model.lastTermNum++;
				}
			};


			// FAKE data
			this.search = function (catIndex){
				/*

				*/
				this.resetNotFound ();
				if (this.model.query){
					this.resetSuggestions ();
					if (catIndex){
						// 
					}else{
						this.model.results = TestData.search.results;
					}
					if (!this.model.results){
						this.model.notFound.status = true;
						this.model.notFound.content = 'Không tìm thấy kết quả cho "' + 
							this.model.query + '"';
					}
				}
			};
		}();


		angular.element(document.getElementById ('mainContentContainer'))
			.ready(function () {
				vm.dom.ready ();
				$scope.$apply ();
			}
		);

	};

})();