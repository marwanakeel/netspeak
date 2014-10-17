var links, 
	nodes,
	width = 960,
    height = 500,
	force,
	v,
	svg,
	path,
	node,
	jsonArr=[],
	freqArr = [],
	posArrLevel = [],
	posArrRankInLevel = [],
	posInWholeArray = [],
	verticalArr = [],
	verticalSizeArr = [];
/*================================================D3JS======================================*/
// add the curvy lines
function shadeColor(color, percent) {

    var num = parseInt(color,16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    G = (num >> 8 & 0x00FF) + amt,
    B = (num & 0x0000FF) + amt;
    return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
function tick(e) {
	verticalArr = [];
	factorIncrease = [];
	verticalSizeArr = [];
	maxValueLevel = Math.max.apply(Math,posArrLevel);
	for(var i = 0;i<=maxValueLevel;i++){
		verticalArr[i] = 0;
		factorIncrease[i] = 0;
		numOccurencesInLevel = $.grep(posArrLevel, function(elem){return elem === i;}).length;
		if(numOccurencesInLevel == 1){
			verticalSizeArr[i] = height/2;
		}else{
			verticalSizeArr[i] = (height-20)/numOccurencesInLevel;
		}
	}
	var percentColor = 10;
	var bluecolor = "0033CC";
	var greencolor = "003300";
	var redcolor = "FF0000";
	var magcolor = "FF00FF";
	var bluePer = percentColor;
	var greenPer = percentColor;
	var redPer = percentColor;
	var magPer = percentColor;
	node.attr("transform", function(d) {
		portionX = (width-60)/maxValueLevel;
		damper = 0.1;
		for (var i = 0; i <= maxValueLevel; i++) {
			if(posArrLevel[d.index]==i){
					//console.log(posInWholeArray[i]+" "+posArrLevel[i]+" "+posArrRankInLevel[i]+" "+freqArr[i]);
					d.x = portionX*(i);
					var sizeCircle = 15/(factorIncrease[i]+1);
					switch(i) {
						case 0:
						 d3.select(this).select("circle").attr("r", sizeCircle);
							break;
						case 1:
						 d3.select(this).select("circle").style("fill", shadeColor(redcolor,redPer)).attr("r", sizeCircle);
							d3.select(this).select("text")
							.attr("y", 10)
							.attr("x", 15)
							.style("fill", shadeColor(redcolor,redPer));
							redPer+=Math.floor(percentColor/((height-20)/verticalSizeArr[i]));
							break;
						case 2:
						 d3.select(this).select("circle").style("fill", shadeColor(greencolor,greenPer)).attr("r", sizeCircle);
							d3.select(this).select("text")
							.attr("y", 10)
							.attr("x", 15)
							.style("fill", shadeColor(greencolor,greenPer));
							greenPer+=Math.floor(percentColor/((height-20)/verticalSizeArr[i]));
							break;
						case 3:
						 d3.select(this).select("circle").style("fill", shadeColor(bluecolor,bluePer)).attr("r",sizeCircle);
							d3.select(this).select("text")
							.attr("y", 10)
							.attr("x", 15)
							.style("fill", shadeColor(bluecolor,bluePer));
							bluePer+=Math.floor(percentColor/((height-20)/verticalSizeArr[i]));
							break;
						case 4:
						 d3.select(this).select("circle").style("fill", shadeColor(magcolor,magPer)).attr("r", sizeCircle);
							d3.select(this).select("text")
							.attr("y", 10)
							.attr("x", 15)
							.style("fill", shadeColor(magcolor,magPer));
							magPer+=Math.floor(percentColor/((height-20)/verticalSizeArr[i]));
							break;
					}
					if(document.getElementById('typeOfControl1').checked){
						
						//d.y = height - (verticalSizeArr[i]*(verticalArr[i])+20);
						d.y = (height/2) + (factorIncrease[i] * verticalSizeArr[i] * Math.pow(-1,verticalArr[i]));
						//alert(d.y);
						}
					if(verticalArr[i]%2 == 0)
						factorIncrease[i] = factorIncrease[i] + 1;
					verticalArr[i] = verticalArr[i] + 1;
			}
		}
        r = d.name.length;
        //these setting are used for bounding box, see [http://blockses.appspot.com/1129492][1]
        d.x = Math.max(r, Math.min(width - r, d.x));
        d.y = Math.max(r, Math.min(height - r, d.y));

            return "translate("+d.x+","+d.y+")";            

     }
    );
   

  node.attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
   path.attr("d", function(d) {
   
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            //dr = Math.sqrt(dx * dx + dy * dy);
			dr = 0;
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
    });

    node
       .attr("transform", function(d) { 
		    return "translate(" + d.x + "," + d.y + ")"; });
			
			
}

// action to take on mouse click
function click(d) {

  //  d3.select(this).select("text").transition()
 //       .duration(750)
  //      .attr("x", 22)
        //.style("fill", "steelblue")
       //.style("stroke", "lightsteelblue")
       // .style("stroke-width", ".5px")
 //       .style("font", "20px sans-serif");
 //   d3.select(this).select("circle").transition()
 //       .duration(750)
 //       .attr("r", 16);
       // .style("fill", "lightsteelblue");
	d3.select(this).classed("fixed", d.fixed = true);
}

// action to take on mouse double click
function dblclick(d) {

 //   d3.select(this).select("circle").transition()
  //      .duration(750)
  //      .attr("r", 6);
      //  .style("fill", "#ccc");
 //   d3.select(this).select("text").transition()
  //      .duration(750)
  //      .attr("x", 0)
        //.style("stroke", "none")
        //.style("fill", "black")
        //.style("stroke", "none")
   //    .style("font", "12px sans-serif");
	d3.select(this).classed("fixed", d.fixed = false);
	
}

function updateData(){
links = jsonArr;
	/*
	links = [
  {source: "Microsoft", target: "Amazon", type: "licensing"},
  {source: "Microsoft", target: "HTC", type: "licensing"},
  {source: "Samsung", target: "Microsoft", type: "suit"}
];
*/

 nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link,i) {
    link.source = nodes[link.source] || 
        (nodes[link.source] = {name: link.source.substring(0,link.source.length-1)});
    link.target = nodes[link.target] || 
        (nodes[link.target] = {name: link.target.substring(0,link.target.length-1)});
    link.value = +link.value;
});

 force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(260)
    .charge(-700).chargeDistance(100)
	.gravity(0.1)
	.friction(0.7)
	.alpha(.8)
    .on("tick", tick)
    .start();
	

	// Set the range
  v = d3.scale.linear().range([0, 100]);

// Scale the range of the data
v.domain([0, d3.max(links, function(d) { return d.value; })]);

// asign a type per value to encode opacity
links.forEach(function(link) {
	if (v(link.value) <= 25) {
		link.type = "twofive";
	} else if (v(link.value) <= 50 && v(link.value) > 25) {
		link.type = "fivezero";
	} else if (v(link.value) <= 75 && v(link.value) > 50) {
		link.type = "sevenfive";
	} else if (v(link.value) <= 100 && v(link.value) > 75) {
		link.type = "onezerozero";
	}
});
d3.select("svg").remove();
 svg = d3.select("#divSVG").append("svg")
    .attr("width", width+100)
    .attr("height", height+50);

// build the arrow.
svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");

// add the links and the arrows
 path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
    .attr("class", function(d) { return "link " + d.type; });
   // .attr("marker-end", "url(#end)");

// define the nodes
 node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
    .on("click", click)
    .on("dblclick", dblclick)
    .call(force.drag);

// add the nodes
node.append("circle")
    .attr("r", 5);

// add the text 
node.append("text")
    .attr("x", 0)
    .attr("dy", ".35em")
    .text(function(d) { return d.name; });
}
/*================================================Marwan=======================================*/
function parserMain(){
	jsonArr = [];
	//That's the level
	posArrLevel = [];
	posArrRankInLevel = [];
	posInWholeArray = [];
	freqArr = [];
	existArr = [];
	count = 0;
	countE = 0;
    var dataSent = $("#inputBox").val().toLowerCase().replace(/~/g, "#");
	var numberResults = $("#textInput").val();
$.ajax({
   type: 'GET',
    url: 'http://api.netspeak.org/netspeak3/search',
    async: false,
    jsonpCallback: 'jsonCallback',
    contentType: "application/json",
    dataType: 'jsonp',
	data: {query:dataSent, format: "json",topk:numberResults},
    success: function(json) {
	//console.log(json);
	//console.log(json[4].length);
   var jsonParsed = json;
	for (var i = 0; i < jsonParsed[4].length; i++) {
		for (var j = 0; j < jsonParsed[4][i][3].length -1; j++) {
		//console.log(existArr.indexOf(jsonParsed[4][i][3][j+1][2]+(j+1)));
			if($.inArray(jsonParsed[4][i][3][j][2]+j, existArr) == -1){
				posInWholeArray[count] = count;
				//console.log(jsonParsed[4][i][3][j][2]+j);
				posArrLevel[count] = j;
				if(freqArr[count] == null){
					freqArr[count] = 0;
				}
				freqArr[count] =  freqArr[count] + jsonParsed[4][i][2];
				posArrRankInLevel[count] = $.grep(posArrLevel, function(elem){return elem === j;}).length;
				count ++;
			}
			if($.inArray(jsonParsed[4][i][3][j+1][2]+(j+1), existArr) == -1){
				//console.log(jsonParsed[4][i][3][j+1][2]+(j+1));
				posInWholeArray[count] = count;
				posArrLevel[count] = j+1;
				if(freqArr[count] == null){
					freqArr[count] = 0;
				}
				freqArr[count] =  freqArr[count] + jsonParsed[4][i][2];
				posArrRankInLevel[count] = $.grep(posArrLevel, function(elem){return elem === j+1;}).length;
				//console.log(posArrRankInLevel[count]);
				count ++;
			}
			jsonArr.push({
				source: jsonParsed[4][i][3][j][2]+j,
				target: jsonParsed[4][i][3][j+1][2]+(j+1),
			});
			existArr[countE++] = jsonParsed[4][i][3][j][2]+j;
			existArr[countE++] = jsonParsed[4][i][3][j+1][2]+(j+1);
		}
	}
	for (var i = 0; i < jsonArr.length; i++) {
	//	console.log(jsonArr[i].source + " "+jsonArr[i].type );
	}
	//console.log("Before");
	for (var i = 0; i < posArrRankInLevel.length; i++) {
		//console.log(posInWholeArray[i]+" "+posArrLevel[i]+" "+posArrRankInLevel[i]+" "+freqArr[i]);
	}
	//Sorting
	for (var i = 0; i < freqArr.length-1; i++) {
		var max = i;
		for (var j = i+1; j < freqArr.length; j++)
			if (freqArr[j] > freqArr[max] && posArrLevel[j] == posArrLevel[max]) 
				max = j;
		var tempposArrLevel = posArrRankInLevel[i];
		var tempFreqArr = freqArr[i];
		posArrRankInLevel[i] = posArrRankInLevel[max];
		freqArr[i] = freqArr[max];
		posArrRankInLevel[max] = tempposArrLevel;
		freqArr[max] = tempFreqArr;
	}
	//console.log("After");
	for (var i = 0; i < posArrLevel.length; i++) {
		//console.log(posInWholeArray[i]+" "+posArrLevel[i]+" "+posArrRankInLevel[i]+" "+freqArr[i]);
	}
	updateData();
    },
    error: function(e) {
   //    console.log(e.message);
    }
});
}

function updateTextInput(val) {
	document.getElementById('textInput').value=val; 
}
  