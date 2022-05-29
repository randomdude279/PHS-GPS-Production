


//helper
function gebid(id) {
  return document.getElementById(id);
}

//uses XMLHTTP and calls a function when it is all done
function http_get(url, cbf) {
var xhr = new XMLHttpRequest();
console.log('XMLHTTP call...')
xhr.open('GET', url, true);
xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
					console.log(xhr.responseText);
					cbf(xhr.responseText);
  } else {
    console.log(xhr.readyState)
  }
}
xhr.send(null);
}

//what happens when you click the submit button on the homepage
function obtainRoutings() {
  startingPoint = gebid('fname').value;
  endingPoint = gebid('lname').value;
  requestURL = "https://phsgps.charleshu.repl.co/link_nodes.dpy?end="+endingPoint+"&start="+startingPoint+"";
  http_get(requestURL, initialCallbackForRouting);
}

function initialCallbackForRouting(response) {
  //parse the response and show all available routes
  response = response.replaceAll('[','');
  response = response.replaceAll(']','');
  console.log(response)

  if (response.length <= 7) {
    gebid('routeselector').style.display = 'none';
    gebid('routeselectormsg').innerHTML = '<b style="color:red; background: black; padding: 4px; border: 1px solid red">Unable to route. Check that all location codes/room #s are valid.</b>'
    return null;
  }

  var newInnerHTML = '';

  routes = response.split('\n');
  for (let i = 0; i < routes.length - 1; i++) {
    //option #
    newInnerHTML = newInnerHTML + '<tr><td>'+(i + 1)+'</td>';
    newInnerHTML = newInnerHTML + '<td>';
    routing = routes[i].split(':');
    //Routing List
    for (let j = 0; j < routing.length; j++) {
      newInnerHTML = newInnerHTML + '' + routing[j].split('=')[0] + '→';
    }
    newInnerHTML = newInnerHTML.substring(0, newInnerHTML.length - 1);
    
    newInnerHTML = newInnerHTML + '</td>';
    //Number of Nodes
    newInnerHTML = newInnerHTML + '<td>' + routing.length + '</td>';
    //Select
    newInnerHTML = newInnerHTML + '<td><a href="javascript:void(0);" id="' + routes[i] + '" onclick="plotRoute(this.id)">Select</a></td>' 
}
    gebid('routeselectormsg').innerHTML = 'Here are the available routings:'
    gebid('routeselector').style.display = '';
    gebid('routeselector').innerHTML = `<tr><td><b>#</b></td><td>Routing List</td><td># of nodes</td><td>Select</td></tr>` + newInnerHTML;
}

function plotRoute(routestr) {
gebid('mapoutput').src = ('canvas.html?navigational_route=' + routestr + "&start_point=" + gebid('fname').value + "&end_point=" + gebid('lname').value);
gebid('mapoutput').style.display = 'block';
} 
