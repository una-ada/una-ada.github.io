function variance(data){
	var total = 0,
		sqTotal = 0;
	for(var i = 0; i < data.length; i++){
		total += data[i];
		sqTotal += Math.pow(data[i],2);
	}
	return (sqTotal / data.length) - (Math.pow(total / data.length,2));
}
function testVariance(){
	var data = [],
		n = 2;
	while(1){
		for(var m = 1; m < 11; m++)
			data[m - 1] = 1 + (m * Math.pow(10,-n));
		console.log(data);
		v = variance(data);
		// v -= 8 * Math.exp(10,(-2*n)+1);
		console.log(v);
		console.log(8 * Math.exp(10,(-2*n)+1));
		if(v != 2 * Math.pow(10,-2*n))
			break;
		else
			n++;
	}
	return n;
}
console.log(testVariance());