
// Globals
var
  xMax = 300,
  yMax = 300,
  zMax = 300,
  collideZone = 20;
  flies = null,
  ctx = null


// Main function
function run()
{

	 function Fly()
	 {
	    this.x=0;
	    this.y=0;
	    this.z=0;
	    this.blink=0;
	 }

	 Fly.prototype.paint = function ()
	 {
      // Randomize the direction
      var tmp = this.x + Math.floor((Math.random()*(2+2+1)-2));
      if( tmp > 0 && tmp < xMax ) this.x = tmp;

      tmp = this.y + Math.floor((Math.random()*(2+2+1)-2));
      if( tmp > 0 && tmp < yMax ) this.y = tmp;

      tmp = this.z + Math.floor((Math.random()*(10+10+1)-10));
      if( tmp > 0 && tmp < zMax ) this.z = tmp;

      //  blinks every x times
      this.blink = Math.floor((Math.random()*300));

      // Size is portional to dept
      var size = (this.z / 10);
      // Adjust the collition zone as well
      var adjustCollideZone = collideZone;
      if( size < collideZone)
        adjustCollideZone = collideZone - size;

      // Loop the flies from the array for collection detection
      var collision = false;
      for (var i = 0; i < flies.length; i++)
      {
        // Can't collide with itself
        if( flies[i] != this )
          if( flies[i].x - this.x > -adjustCollideZone && flies[i].x - this.x < adjustCollideZone &&
              flies[i].y - this.y > -adjustCollideZone && flies[i].y - this.y < adjustCollideZone &&
              flies[i].z - this.z > -adjustCollideZone && flies[i].z - this.z < adjustCollideZone )
                collision = true
      }

      //  Begin and set color, only using green, both outline and fill
      ctx.beginPath();
      // Collition detected, then red, otherwise green
      if( collision == true )
        ctx.strokeStyle = ctx.fillStyle = '#CC0000';
      else
        ctx.strokeStyle = ctx.fillStyle = '#00CC00';


      // Left wing
      ctx.moveTo(this.x, this.y);
      ctx.arc( this.x, this.y, size,
            Math.PI * 0.9, Math.PI * 1.1 );
      ctx.lineTo(this.x, this.y);

      // Right wing
      ctx.moveTo(this.x, this.y);
      ctx.arc( this.x, this.y, size,
            Math.PI * 1.9, Math.PI * 0.1 );
      ctx.lineTo(this.x, this.y);
      // Finish off the wings
      ctx.stroke();


      // The body starts above the wings, adjust portionally
      var bodyStartOffset = (this.z/30);
      // New path in order to be able to blink / fill just the body
      ctx.beginPath();
      // Body
      ctx.moveTo(this.x, this.y-bodyStartOffset);
      ctx.arc( this.x, this.y, size,
            Math.PI * 0.4, Math.PI * 0.6 );
      ctx.lineTo(this.x, this.y-bodyStartOffset);

      // blink once in a while
      if( this.blink % 75 == 0 )
        ctx.fill();

      // Finish off the body
      ctx.stroke();
	  }

    Fly.prototype.publicMethod = function ()
    {
      alert(this.x);
    };
    Fly.prototype.publicMethod = function ()
    {
      alert(this.y);
    };
    Fly.prototype.publicMethod = function ()
    {
      alert(this.z);
    };
    Fly.prototype.publicMethod = function ()
    {
      alert(this.blink);
    };
    Fly.prototype.publicMethod = function ()
    {
      alert(this.paint);
    };

    // Get a hold of the context
    ctx = document.getElementById('scene').getContext('2d');
    xMax = ctx.canvas.width  = window.innerWidth-25;
    yMax = ctx.canvas.height = window.innerHeight-25;

    // create flies
    flies = new Array();
    for (var i = 0; i < 50; i++)
    {
    	flies.push(new Fly());
      flies[i].x = (Math.random()*xMax);
      flies[i].y = (Math.random()*yMax);
      flies[i].z = (Math.random()*zMax);
    }

    //
    renderFrame();
  }

  // Render
  function renderFrame()
  {
	  // clear
    ctx.clearRect(0, 0, xMax, yMax);

    // Loop the flies from the array
    for (var i = 0; i < flies.length; i++)
      flies[i].paint();

    // Call me
    window.setTimeout(renderFrame, 1000 / 50);
  }

