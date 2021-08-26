class Player{

    constructor(ctx, posX, posY, imageL,imageR, width, height, canvasSize) {
        this.ctx = ctx 
        this.canvasSize = canvasSize
        this.posX = posX
        this.posY = posY
        this.size = { h: height, w : width }
        this.bullets = []
        this.direction = 'right'
       
        this.init(imageL,imageR)
        this.gravity = 7
        this.speedJump = 0
        this.moving = false
    }    

    init(imageL,imageR) {
        this.imageR = new Image()
        this.imageR.pathImage = `img/${imageR}`
        this.imageR.src = this.imageR.pathImage
        this.imageL = new Image()
        this.imageL.pathImage = `img/${imageL}`
        this.imageL.src = this.imageL.pathImage
        }

    draw() {
        if(this.direction === 'right'){
            this.ctx.drawImage(
                this.imageR,
                this.posX,
                this.posY,
                this.size.w,
                this.size.h)
                
        }else {
            this.ctx.drawImage(
                this.imageL,
                this.posX,
                this.posY,
                this.size.w,
                this.size.h)
        }
        
            this.bullets.forEach(bul => bul.draw())
            this.move()
    }

    move() {
        
        this.posY -= 0.1 * this.speedJump;
        this.speedJump > 0 ? this.speedJump -= this.gravity : null

        if(this.posY < this.canvasSize.h / 3 * 2){
            this.posY += 1 * this.gravity
        }
        else this.posY = this.canvasSize.h / 3 * 2 

        this.bullets.forEach(bul => bul.shoot())
        if(this.direction === 'right' && this.moving) {
            this.moveRight()
        
        } 
        if(this.direction === 'left' && this.moving) {
            this.moveLeft()
        }
    }
  

    jump() {
        if(this.posY >= this.canvasSize.h / 3 *2){
            this.speedJump = 280
        }
    }

    moveRight() {
        this.posX < this.canvasSize.w - this.size.w-50 ? this.posX += 10 : null 
        this.direction = 'right'
        
    }

    moveLeft() {
        this.posX > 50 ? this.posX -= 10 : null
        this.direction = 'left'
    }

    

    shoot() {
        this.bullets.push(new Bullet(this.ctx,this.posX, this.posY, this.canvasSize,this.direction))
       
        
    }

    cleanBullets() {
        this.bullets = this.bullets.filter(bul => bul.position.y > this.size.w)
    }

    

 }
