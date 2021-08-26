class Bonus {
    constructor(ctx, posX, posY, image,canvasSize, width = 60, height= 60){
        this.ctx = ctx
        this.posX = Math.random() * canvasSize.w
        this.posY = posY
        this.width = width
        this.height = height
        this.init(image)
        this.gravity = 3
        this.canvasSize = canvasSize
    }

    init(image) {
        this.image = new Image()
        this.image.pathImage = `img/${image}`
        this.image.src = this.image.pathImage
    }

    draw() {
        console.log(this);
        this.ctx.drawImage(
            this.image,
            this.posX,
            this.posY,
            this.width,
            this.height)
        this.move()
    }

    move() {
        this.posY >= 0 ? this.posY += this.gravity : null
    }


}