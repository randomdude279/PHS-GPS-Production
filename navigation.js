var ctx = null;
var background = null;

function gebid(id) {
  return document.getElementById(id);
}


 

function startNavigation() {
      const urlParams = new URLSearchParams(window.location.search);
      console.log('Starting nav...');
      ctx = gebid('map').getContext("2d");
      background = new Image();
      background.src = "https://poolesville-hacks-for-dumbies.isabela7574.repl.co/improved_navigational_map.png";
      
      background.onload = function() {
      ctx.globalCompositeOperation = 'destination-over'
      ctx.drawImage(window.background,0,0);   
      ctx.stroke();
      }

      gebid('map').width = 1000;
      gebid('map').height = 500;

  gebid('map').addEventListener("mousemove", function(e) { 
    var cRect = gebid('map').getBoundingClientRect();        // Gets CSS pos, and width/height
    var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make  
    gebid('posX').innerHTML = 'X:' + canvasX;
    gebid('posY').innerHTML = 'Y:' + canvasY;
});

    
    routestr = urlParams.get('navigational_route')
    points = routestr.split(':');
    console.log('Canvas has been cleared.');

    ctx.font = '20px Courier New'
    ctx.fillText("Route: "+urlParams.get('start_point') +" to "+urlParams.get('end_point'), 30, 30);
    ctx.stroke();
  
    for (let i = 0; i < points.length; i++) {
      // then connect the dots
      coordset = points[i].split('=');
      x = coordset[1].split(',')[0];
      y = coordset[1].split(',')[1];
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#FF0000";
      ctx.font = "20px Arial";

      if (i == 0) {
        ctx.moveTo(x,y);
      }
      
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillText(coordset[0], x, y);
      ctx.stroke();
      console.log('Drew line to: '+x+','+y+'')

    
  
}
}

window.addEventListener('load', (event) => {
  console.log('page is fully loaded');
  startNavigation();
});
// Make sure the image is loaded first otherwise nothing will draw.
