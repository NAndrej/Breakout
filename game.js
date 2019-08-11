var canvas = document.getElementById('game')
var context = canvas.getContext('2d')
var width=500
var height=500
var leftArr = false;
var rightArr = false

function drawCanvas(){
	context.fillStyle='lightblue'
	context.fillRect(0,0,500,500)
}
 // PLAYER CLASS 
class Player{
	constructor(x,y,width,height,speed,dir){
		this.x=x;
		this.y=y;
		this.speed=speed;
		this.dir=dir // 0 for 'doesnt move', 1 for right, -1 for left
		this.width=width;
		this.height=height;
	}
	canMove(dir){
		if (dir == 'L')
			return this.x >= 10
		if (dir == 'R')
			return this.x <= 490 - this.width
	}
	draw(){
		context.fillStyle="white"
		context.fillRect(this.x,this.y,this.width,this.height)
	}
	move(){
		if(leftArr) {
			if(this.canMove('L')) {
			 	this.x-=this.speed
			 	if(!b1.flying)
			 		b1.x-=this.speed
			}
		}
		if(rightArr){
			if(this.canMove('R')) {
	     		this.x+=this.speed
		     	if(!b1.flying)
			 		b1.x+=this.speed
			}
		}
	}
}
p1 = new Player(500/2-50,470,100,20,8,0)
 // BALL CLASS 
class Ball{
	constructor(x,y,radius){
		this.x=x;
		this.y=y;
		this.radius=radius
		this.flying=false;
		this.dirX=0 // 0 for 'doesnt move', 1 for up, -1 for down
		this.dirY=0 // 0 for 'doesnt move', 1 for up, -1 for down
	}
	collidesWithPlayer(){
		return (this.y+10 == p1.y && (this.x >= p1.x && this.x <= p1.x+100))

		//todo: CollidesWithPlayer() shaize performance 
	}
	draw(){
		context.beginPath()
		context.arc(this.x,this.y,this.radius,2 * Math.PI,0)
		context.fillStyle = "black"
		context.fill()
	}
	checkCollision(){
		if(this.y-this.radius <= 0 || this.collidesWithPlayer()){
			this.dirY*=-1
		}
		if(this.x-this.radius <= 0 || this.x+this.radius >= width){
			this.dirX*=-1
		}

	}
	move(){
		this.checkCollision()
		//todo: bouncing off of player when it hits the ends of the paddle
		this.x += this.dirX * 5
		this.y += this.dirY * 5
	}
}
b1 = new Ball(width/2,455,15)
 // TILE CLASS
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
/////////////////////////////////
function drawTiles(){
	for (var i = 0; i<tiles.length; i++){
		if(tiles[i].active){
			context.fillStyle="white"
			context.fillRect(tiles[i].x,tiles[i].y,tiles[i].w,tiles[i].h)
		}
	}
}

function eventHandler(){
	window.addEventListener('keydown', function(event){
		 if(event.keyCode == 37) // left
		 	leftArr = true
	     if(event.keyCode == 39) // right
	     	rightArr = true
	     if (event.keyCode == 32) {  //space -> 'start game'
	     	if (!b1.flying) {
	     		b1.flying = true;
	     		var dir = Math.round(Math.random()) // 0 for left, 1 for right (direction of the ball when user presses space)
				if (dir == 0){
					b1.dirX = -1	
					b1.dirY = -1
				}
				else{
					b1.dirX = 1
					b1.dirY = -1
				}
	     	}
	     }
	},false);
	window.addEventListener('keyup', function(event){
		if(event.keyCode == 37) // left
		 	leftArr = false
	     if(event.keyCode == 39) // right
	     	rightArr = false
	},false)
}

function game(){
	drawCanvas()
	p1.draw()
	p1.move()
	b1.draw()
	if (b1.flying)
		b1.move()
	drawTiles()
}
fps=60;
setInterval(game,1000/fps);
eventHandler()
