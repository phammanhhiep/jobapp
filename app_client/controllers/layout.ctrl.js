(function (){
	angular
		.module ('App')
		.controller ('LayoutCtrl', ['$rootScope','$scope','$window', '$location','authentication', 'DataTransferService', 'TestData', LayoutCtrl]);

	function LayoutCtrl ($rootScope, $scope, $window, $location, authentication, DataTransferService, TestData) {
		$scope.vm = {};
		var vm = $scope.vm;

		vm.dom = new function (){
			this.model = {
				backbtn: {
					display: false,
					lastPage: null,
				},
				mobileNavMenu: {
					display: true,
					logo: {display: true},
					search: {display: true},
					noti: {display: true},
					sidemenu: {display: true},
				},
				publishbtn:{
					display: false,
				},

			};

			this.resetMobileNavBarMenu = function (){
				this.model.mobileNavMenu.display = true;
				this.model.mobileNavMenu.logo.display = true;
				this.model.mobileNavMenu.search.display = true;
				this.model.mobileNavMenu.noti.display = true;
				this.model.mobileNavMenu.sidemenu.display = true;
				this.model.publishbtn.display = false;
				this.model.backbtn.display = false;
			}

			this.hideNavBar = function (){
				this.model.mobileNavMenu.display = false;
			}

			this.hideNavBarMenu = function (){
				this.model.mobileNavMenu.logo.display = false;
				this.model.mobileNavMenu.search.display = false;
				this.model.mobileNavMenu.noti.display = false;
				this.model.mobileNavMenu.sidemenu.display = false;
			};			

			this.showBackBtn = function (){
				this.model.backbtn.display = true;
				// this.model.backbtn.lastPage = ''; // last page id or sth
			};

			this.showPublishNavBar = function (){
				this.resetMobileNavBarMenu ();
				this.model.publishbtn.display = true;
				this.showBackBtn ();
				this.hideNavBarMenu ();
			};

			this.showOtherPageNavBar = function (){
				this.resetMobileNavBarMenu ();
				this.showBackBtn ();
				this.hideNavBarMenu ();
				this.model.mobileNavMenu.search.display = true;
			};

			this.showSearchNavBar = function (){
				this.resetMobileNavBarMenu ();
				this.hideNavBar ();
			}

			this.lastPage = function (){
				// navigate to the last page
			};

			this.ready = function (){
			}
		}

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
							{name: 'Trang chủ', link: '/#!/'},
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
							{name: 'Đăng tin tuyển dụng', link: '/#!/publish'},
							{name: 'Tìm việc', link: '/#!/search'}
						],
						bizFocus: ['Đăng tin tuyển dụng'],
						mngtFocus: ['Trang chủ'],
					}
				},
			}
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
			$("body").foundation();
			$scope.$apply();
		});

	}

})();
