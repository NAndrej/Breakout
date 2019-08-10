var canvas = document.getElementById('game')
var context = canvas.getContext('2d')
class Player{
	constructor(x,y,width,height,speed,dir){
		this.x=x;
		this.y=y;
		this.speed=speed;
		this.dir=dir // 0 for 'doesnt move', 1 for right, -1 for left
		this.width=width;
		this.height=height;
	}
}
p1 = new Player(500/2-50,470,100,20,8,0)
class Ball{
	constructor(x,y,radius){
		this.x=x;
		this.y=y;
		this.radius=radius
		this.flying=false;
		this.dir=0 // 0 for 'doesnt move', 1 for up, -1 for down
	}
	collidesWithPlayer(){
		return (b1.y == p1.y && (b1.x >= p1.x && b1.x <= p1.x+100))
	}
}
b1 = new Ball(500/2,455,15)
class Tile {
	constructor(x,y,w,h,active) {
		this.x=x;
		this.y=y;
		this.w=w;
		this.h=h;
		this.active=true
	}
	kill(){
		this.active = false
	}
}
var tiles = []
var x = 10
var y = 10
var w = 100
var h = 20
for (var x = 15; x<=500; x+=123){
	for(var y = 12; y<=110; y+=30){
		tile = new Tile(x,y,w,h)
		tiles.push(tile)
	}
}

function eventHandler(){
	window.addEventListener('keydown', function(event){

		 if(event.keyCode == 37) { // left
		 	if(canMove('L')) {
		 		p1.x-=p1.speed
		 		if(!b1.flying)
		 			b1.x-=p1.speed
		 	}
		 	
		 }
	     if(event.keyCode == 39) { // right
	     	if(canMove('R')) {
	     		p1.x+=p1.speed
		     	if(!b1.flying)
			 		b1.x+=p1.speed
			}
	     }

	     if (event.keyCode == 32) {
	     	if (!b1.flying) {
	     		b1.flying = true;
	     		b1.dir = 1
	     	}
	     }
	}, false);
}
function canMove(dir){
	if (dir == 'L')
		return p1.x >= 10
	if (dir == 'R')
		return p1.x <= 490 - p1.width
}
function drawCanvas(){
	context.fillStyle='lightblue'
	context.fillRect(0,0,500,500)
}
function drawPlayer(){
	context.fillStyle="white"
	context.fillRect(p1.x,p1.y,p1.width,p1.height)
}
function drawBall(){
	context.beginPath()
	context.arc(b1.x,b1.y,b1.radius,2 * Math.PI,0)
	context.fillStyle = "black"
	context.fill()
}
function drawTiles(){
	for (var i = 0; i<tiles.length; i++){
		if(tiles[i].active){
			context.fillStyle="white"
			context.fillRect(tiles[i].x,tiles[i].y,tiles[i].w,tiles[i].h)
		}
	}
}
function moveBall(){
	if (b1.y == 0 || b1.collidesWithPlayer()){
		b1.dir *= -1
	}
	b1.y -= b1.dir * 5
}
function game(){
	drawCanvas()
	drawBall()
	drawPlayer()
	if (b1.flying)
		moveBall()
	drawTiles()
}
fps=60;
setInterval(game,1000/fps);
eventHandler()