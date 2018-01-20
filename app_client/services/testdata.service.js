/*
Provide data for experience (or testing) developed interface 
*/

(function (){
angular
	.module ('App')
	.service ('TestData', [TestData])

function TestData (){
	this.search = {
		results: [
			{content: 'Backward compatibility for using icon-* classes without .icons classes But please note that this backward compatibility will be removed in upcoming versions.', link: '', title: 'Foundation tutorial for newbie!', user: {fullname: 'Pham Manh Hiep', profile: ''}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k'}},
			{content: 'Backward compatibility for using icon-* classes without .icons classes But please note that this backward compatibility will be removed in upcoming versions.', link: '', title: 'Foundation tutorial for newbie!', user: {fullname: 'Pham Manh Hiep', profile: ''}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k'}},
			{content: 'Backward compatibility for using icon-* classes without .icons classes But please note that this backward compatibility will be removed in upcoming versions.', link: '', title: 'Foundation tutorial for newbie!', user: {fullname: 'Pham Manh Hiep', profile: ''}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k'}},
			{content: 'Backward compatibility for using icon-* classes without .icons classes But please note that this backward compatibility will be removed in upcoming versions.', link: '', title: 'Foundation tutorial for newbie!', user: {fullname: 'Pham Manh Hiep', profile: ''}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k'}},
		],
		suggestions: [
			{content: 'compatibility will be removed in'},
			{content: 'compatibility will be removed in'},
			{content: 'compatibility will be removed in'},
		],

	};
}	


})();


