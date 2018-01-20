(function (){
	angular
		.module ('App')
		.controller ('LayoutCtrl', ['$rootScope','$scope','$window', '$location','authentication', 'DataTransferService', 'TestData', LayoutCtrl]);

	function LayoutCtrl ($rootScope, $scope, $window, $location, authentication, DataTransferService, TestData) {
		$scope.vm = {};
		var vm = $scope.vm;
		vm.user = new function (){
			this.model = {
				fullname: 'Pham Manh Hiep',
				profile: '#',				
			};

			this.follow = function (){

			}

			this.unfollow = function (){

			};

			this.connect = function (){

			};

			this.unconnect = function (){

			};

			this.profile = function (user){

			}
		}();

		vm.actionMenu = new function (){
			this.model = {
				menu:{
					mobile: {
						management:[
							{name: 'Trang chủ', link: '#'},
							{name: 'Lĩnh vực ưu thích', link: '#'},
							{name: 'Nội dung đã lưu', link: '#'},						
						],						
						social: [
							{name: 'Danh sách đối tác', link: '#'},
							{name: 'Nhắn tin', link: '#'},
							{name: 'Viết blog', link: '#'},
							{name: 'Hỏi đáp nghề nghiệp', link: '#'},
						],
						business:[
							{name: 'Đăng tin tuyển dụng', link: '#'},
							{name: 'Tìm việc', link: '#'}
						],
						bizFocus: ['Đăng tin tuyển dụng'],
						mngtFocus: ['Trang chủ'],
					}
				},

			}
		}();

		vm.search = new function (){
			this.model = {
				query: '',
				results: null,
				suggestions: null,
				lastTermNum: 2,
				categories: {
					exist: true,
					categories: ['Việc làm', 'Blog', 'Cá nhân', 'Tổ chức'],
				},
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

		vm.utility = new function (){
			this.showLoader = function (){
				$(".loader").fadeIn("fast");
			};

			this.hideLoader = function (){
				$(".loader").fadeOut("slow");
			};
		}();					

		DataTransferService.set ('layout', vm);

		angular.element(document).ready(function () {
			vm.utility.hideLoader ();
			$("body").foundation();
			$scope.$apply();
		});

	}

})();
