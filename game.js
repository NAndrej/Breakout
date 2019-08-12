var canvas = document.getElementById('game')
var context = canvas.getContext('2d')
var width=500
var height=500
var leftArr = false;
var rightArr = false
var tiles = []
var lives = 3
var score = 0
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
		this.dirX=0 // 0 for 'doesnt move', 1 for right, -1 for left
		this.dirY=0 // 0 for 'doesnt move', 1 for up, -1 for down
	}
	collidesWithPlayer(){
		return (this.y+10 == p1.y && (this.x >= p1.x && this.x <= p1.x+p1.width))

		//todo: CollidesWithPlayer() shaize performance 
	}
	draw(){
		context.beginPath()
		context.arc(this.x,this.y,this.radius,2 * Math.PI,0)
		context.fillStyle = "black"
		context.fill()
	}
	checkCollision(){
		// HANDLES WALL AND PLAYER COLLISION
		if(this.y-this.radius <= 0 || this.collidesWithPlayer()){
			this.dirY*=-1
		}
		if(this.x-this.radius <= 0 || this.x+this.radius >= width){
			this.dirX*=-1
		}
		
		if(this.y >= height){
			if(lives == 1){
				context.font = "70px Arial"
				context.fillStyle = "red"
				context.fillText("GAME OVER",width/2-210,height/2)
				return 0;
			}
			else{
				lives--;
				this.respawn()
			}
		}
	}
	respawn(){
		this.x=p1.x+(p1.width/2)
		this.y=p1.y-p1.height
		b1.flying=false
	}
	move(){
		this.checkCollision()
		//todo: bouncing off of player when it hits the ends of the paddle
		this.x += this.dirX * 5
		this.y += this.dirY * 5
	}
	killTiles(){
		for (var i = 0; i < tiles.length; i ++){
			if(tiles[i].active)
				if(this.x 	 >= tiles[i].x && this.x <= tiles[i].x+tiles[i].w && this.y-this.radius >= tiles[i].y && this.y-this.radius <= tiles[i].y+tiles[i].h){
					tiles[i].kill()
					this.dirY*=-1
					score++;
				}
		}	
	}
}
b1 = new Ball(width/2,455,15)
 // TILE CLASS
class Tile {
	constructor(x,y,w,h) {
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

var x = 10
var y = 10
var w = 100
var h = 20
for (var x = 15; x<=500; x+=123){	
	for(var y = 30; y<=130; y+=30){
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
function drawText(){
	context.font = "20px Arial"
	context.fillStyle = "red"
	context.fillText("Lives: "+lives,20,20)

	context.font = "20px Arial"
	context.fillStyle = "black"
	context.fillText("Score: "+score,410,20)
}
function checkFinish(){
	// var count = 0;
	// for (var i = 0; i<tiles.length; i++){
	// 	if (tiles[i].active)
	// 		count++
	// }
	// if (count == 0){
	// 	context.font = "70px Arial"
	// 	context.fillStyle = "red"
	// 	context.fillText("WELL DONE",width/2-210,height/2)
	// 	return 0;
	// }
}
function game(){
	checkFinish();
	drawCanvas()
	drawText()
	p1.draw()
	p1.move()
	b1.draw()
	if (b1.flying)
		b1.move()
	b1.killTiles()
	drawTiles()
}
fps=60;
setInterval(game,1000/fps);
eventHandler()
