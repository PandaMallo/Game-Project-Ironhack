class Enemies {

    constructor(ctx, posX, posY, imageR,imageL, direction, speed = 10, h = 90, w = 150) {
        //normalizar altura objetos
        
        if (direction === 'right'){
            this.posX = -150
        }else {
            this.posX = posX
        }
        this.posY = posY
        this.speed = Math.floor(Math.random() * speed) + 1
        this.initialSpeed = this.speed
        this.size = {h: h, w:w}
        this.ctx = ctx
        this.direction = direction
        this.init(imageR, imageL)
    }

    init(imageR, imageL) {
        this.imageR = new Image()
        this.imageR.pathImage = `img/${imageR}`
        this.imageR.src = this.imageR.pathImage
        this.imageL = new Image()
        this.imageL.pathImage = `img/${imageL}`
        this.imageL.src = this.imageL.pathImage
    }

    draw() {
        if(this.direction === 'left' ){
        this.ctx.drawImage(
            this.imageL,this.posX,630,
            this.size.w,
            this.size.h
        )} else{
            this.ctx.drawImage(
                this.imageR,this.posX,630,
                this.size.w,
                this.size.h
            )}
        this.move()
    }


    move() {
        if (this.direction === 'left'){
        this.posX -= this.speed
        } else{
            this.posX += this.speed
        }
    }

}