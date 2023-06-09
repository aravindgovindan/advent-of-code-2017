var rules = {};
input.split('\n').forEach(d => {
	var tokens = d.split(' => ');
	rules[tokens[0]] = tokens[1];
})

var grid;

function doProblem(totalReps) {
	grid = ['.#.','..#','###'];
	for(var loop=0; loop<totalReps; loop++) {
		var sub = getSubgrids();
		for(var l=0; l<sub.length; l++) {
		 	sub[l] = rule(sub[l]);
		}
		grid = reform(sub);
	}
}

function rule(str) {
	for(var i=0; i<2; i++)
		for(var j=0; j<4; j++) {
			var s = morph(str, j, i)
			if(rules.hasOwnProperty(s))
				return rules[s];
		}
}

function morph(str,rotate,flip) {
	var s = str.split('/');
	if(flip) s.reverse();

	for(var r=0; r<rotate; r++) {
		var n = [];
		for(i=0; i<s.length; i++) {
			var news = "";
			for(var j=s.length-1; j>=0; j--)
				news += s[j][i];
			n.push(news)
		}
		s = n;
	}
	return s.join('/')
}

function getSubgrids() {
	var num = grid.length % 2 == 0 ? 2 : 3;
	var strs = [];
	for(var i=0; i<grid.length; i += num)
		for(var j=0; j<grid.length; j += num) {
			var str = "";
			for(var k=0; k<num; k++)
				str += grid[i+k].substring(j,j+num) + "/"
			strs.push(str.substr(0,str.length-1));
		}
	return strs;
}

function reform(arr) {
	var g = [];
	var num = Math.sqrt(arr.length);
	var strlen = arr[0].match(/\//g).length+1;
	for(var i=0; i<arr.length; i+=num)
		for(var j=0; j<strlen; j++) {
			var str = "";
			for(var k=0; k<num; k++)
				str += arr[i+k].split('/')[j];
			g.push(str);
		}
	return g;
}

doProblem(5);
var count=grid.reduce((a,b) => a + b.match(/#/g).length,0)
console.log('number of # is:',count);

doProblem(18);
var count=grid.reduce((a,b) => a + b.match(/#/g).length,0)
console.log('number of # is:',count);