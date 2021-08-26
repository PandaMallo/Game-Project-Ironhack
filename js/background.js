class Background {

    constructor(ctx, w, h, imgPath, x=0, y=0) {
        this.ctx = ctx;
        this.image = null;
        this.backgroundSize = {h: h, w: w}
        this.position = {x: x, y: y}
        this.imgPath = `img/${imgPath}`
        this.init()
    }

    init() {
        this.image = new Image();
        this.image.src = this.imgPath;
    }

  
    draw() {
      this.ctx.drawImage(this.image, this.position.x, this.position.y, this.backgroundSize.w, this.backgroundSize.h);
    }
  
    
}