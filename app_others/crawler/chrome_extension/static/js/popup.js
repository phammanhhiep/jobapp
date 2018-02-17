if (jQuery){
	document.addEventListener('DOMContentLoaded', function() {
		$('#crawlAllbBtn').click (function (e){
			chrome.extension.getBackgroundPage ().init ();
		});
	});
}
else{
	console.log ('not found jquery') 
}







