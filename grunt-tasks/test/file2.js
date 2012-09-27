var sss = "df";

function example2() {
	example1();
	var longVal = "sdfdf";
	return longVal.charAt(2);
}

var module = (function(){
	function someBigFunction() {
		alert('sd');
		return "sdf";
	}
	var someBigVar = someBigFunction();
	
	return  {
		getName: someBigFunction
	}
})();