const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 10; // start position X
let adjustY = 0; // start position Y

//handle mouse
const mouse = {
  x: null,
  y: null,
  radius: 100
}

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
  
  //console.log(mouse.x, mouse.y)
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('CONNECTIONS', 0, 30);
const textCoordinates = ctx.getImageData(0,0, 1000, 1000); // field size

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 2;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 40) + 5; // around speed
  }
  draw(){
    ctx.fillStyle = '#0f6fec'
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update(){
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    }
    else {
      if(this.x !== this.baseX){
        let dx = this.x - this.baseX;
        this.x -= dx / 30; //particle return speed X
      }
      if(this.y !== this.baseY){
        let dy = this.y - this.baseY;
        this.y -= dy / 30; //particle return speed Y
      }
    }
  }
}

function init() {
  particleArray = [];
  /*
  for (let i = 0; i < 1000; i++){
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y))
  }
  */
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
    for(let x = 0, x2 = textCoordinates.width; x < x2; x++){
      if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128){
        let positionX = x + adjustX - 4;
        let positionY = y + adjustY;
        particleArray.push(new Particle(positionX * 8, positionY * 8));
      }
    }
  }
}

init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  //connect();
  requestAnimationFrame(animate);
}
animate();
/*
function connect() {
  let opacity = 1;
  for (let i = 0; i < particleArray.length; i++){
    for ( let j = i; j < particleArray.length; j++){
      let dx = particleArray[i].x - particleArray[j].x;
      let dy = particleArray[i].y - particleArray[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      opacity = 0.1
      ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
      if( distance < 10 ){
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particleArray[i].x, particleArray[i].y);
        ctx.lineTo(particleArray[j].x, particleArray[j].y);
        ctx.stroke();
      }
    }
  }
}
*/