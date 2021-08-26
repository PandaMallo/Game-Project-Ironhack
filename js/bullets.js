class Bullet  {
    
        constructor(ctx, posX,posY,sizeCanvas, direction, size = 30, speed = 8) {
            this.ctx = ctx
            this.posX = posX
            this.posY = posY
            this.size = size
            this.speedX = speed
            this.sizeCanvas = sizeCanvas 
            this.direction = direction
            this.imageBull = undefined 
            this.bullSound = undefined
            this.init()
            
        }
       
    
        shoot() {
          if(this.direction === 'right'){
            this.posX += this.speedX  
        } else {
            this.posX -= this.speedX 
        }
       
    }
         init() {
            this.imageBull = new Image()
            this.imageBull.pathImage = `img/bullets.png`
            this.imageBull.src = this.imageBull.pathImage
            this.bullSound = new Audio(`mp3/sonido bala.mp3`)
            this.bullSound.play()
    }
    
        draw() {
            this.ctx.drawImage(
                this.imageBull,
                this.posX + 60, 
                this.posY + 150, 
                this.size, 
                this.size)
        }
        
            
            
        
}