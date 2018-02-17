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
			{content: '- Thời gian thực tập : Có thể làm cả Part time và Full time - Được đào tạo, trang bị kiến thức thực tế về các kỹ năng chuyên môn cũng như các kỹ năng mềm phục vụ công việc trong môi trường chuyên nghiệp: + Kỹ năng máy tính văn phòng : word, excel, power point + Kỹ năng soạn thảo hợp đồng, biên bản, ...', path: '/#!/content/123456', title: 'Nghiên cứu, tìm hiểu các xu hướng marketing nội dung', user: {fullname: 'Pham Manh Hiep', profile: '', avatar: 'http://via.placeholder.com/40x40'}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k', comment: '100'}, cover: 'http://via.placeholder.com/400x170'},
			{content: '- Thời gian thực tập : Có thể làm cả Part time và Full time - Được đào tạo, trang bị kiến thức thực tế về các kỹ năng chuyên môn cũng như các kỹ năng mềm phục vụ công việc trong môi trường chuyên nghiệp: + Kỹ năng máy tính văn phòng : word, excel, power point + Kỹ năng soạn thảo hợp đồng, biên bản, ...', path: '/#!/content/123456', title: 'Nghiên cứu, tìm hiểu các xu hướng marketing nội dung', user: {fullname: 'Pham Manh Hiep', profile: '', avatar: 'http://via.placeholder.com/40x40'}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k', comment: '100'}, cover: ''},
			{content: '- Thời gian thực tập : Có thể làm cả Part time và Full time - Được đào tạo, trang bị kiến thức thực tế về các kỹ năng chuyên môn cũng như các kỹ năng mềm phục vụ công việc trong môi trường chuyên nghiệp: + Kỹ năng máy tính văn phòng : word, excel, power point + Kỹ năng soạn thảo hợp đồng, biên bản, ...', path: '/#!/content/123456', title: 'Nghiên cứu, tìm hiểu các xu hướng marketing nội dung', user: {fullname: 'Pham Manh Hiep', profile: '', avatar: 'http://via.placeholder.com/40x40'}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k', comment: '100'}, cover: 'http://via.placeholder.com/400x170'},
			{content: '- Thời gian thực tập : Có thể làm cả Part time và Full time - Được đào tạo, trang bị kiến thức thực tế về các kỹ năng chuyên môn cũng như các kỹ năng mềm phục vụ công việc trong môi trường chuyên nghiệp: + Kỹ năng máy tính văn phòng : word, excel, power point + Kỹ năng soạn thảo hợp đồng, biên bản, ...', path: '/#!/content/123456', title: 'Nghiên cứu, tìm hiểu các xu hướng marketing nội dung', user: {fullname: 'Pham Manh Hiep', profile: '', avatar: 'http://via.placeholder.com/40x40'}, createdAt: new Date (), reaction: {up: '10K', share: '101k', save: '21k', comment: '100'}, cover: 'http://via.placeholder.com/400x170'},
		],
		suggestions: [
			{content: 'compatibility will be removed in'},
			{content: 'compatibility will be removed in'},
			{content: 'compatibility will be removed in'},
		],

	};
}	


})();


