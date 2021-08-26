const Game = {
    canvasDom : null,
    ctx: null,
    canvasSize : {h: null, w: null},
    background: null,
    enemies: [],
    bullets: [],
    player: null,
    posX : null,
    posY : null,
    keys: {
        jump: 'w',
        left: 'a',
        right: 'd',
        shoot: 'm'
    },
    framesCounter:0,
    lifeCounter: 5,
    score: 0,
    bonus: undefined,
    bonused: false,
    slowed: false,
    bullSound: undefined,
    gameSound: undefined, 
    imageLife : undefined,
    imageGameOver: undefined,
    clear: undefined,

    init() {
        this.canvasDom = document.getElementById('myCanvas')
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.setListener()
        this.posX = this.canvasSize.w / 2
        this.posY = this.canvasSize.h / 3 * 2
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h,`fondo1.png`)
        this.player = new Player(this.ctx,this.posX , this.posY, 'gatoL.png','gatoR.png', 100, 200, this.canvasSize)        
        this.imageLife = new Image()
        this.imageLife.pathImage = `img/life.png`
        this.imageLife.src = this.imageLife.pathImage

        this.start()
    },

    setDimensions() {
        this.canvasDom.setAttribute('width',window.innerWidth)
        this.canvasDom.setAttribute('height', window.innerHeight)
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
    },

    start(){
        this.gameSound = new Audio(`mp3/cancion game.mp3`)

        this.gameSound.play()
        
        
        this.createEnemies()
        
        this.clear = setInterval(() => {
            let random = Math.floor(Math.random()* 3000)
            if (this.framesCounter >= random){
                this.createEnemies()
                this.framesCounter = 0
            } 
            if(this.score >= 180 && !this.bonused){
                this.bonused = true
                this.bonus = new Bonus(this.ctx, 0, 0, 'bonus.png',this.canvasSize, 60, 60 )
            }
            this.drawAll()
            this.collisions()
            this.bonusFx()
            this.framesCounter++
            
        }, 1000/100)
    },

    clearAll() {
        this.ctx.clearRect(0,0, this.canvasSize.w, this.canvasSize.h)
        this.cleanEnemies()
    },

    drawAll(){
        this.background.draw()  
        this.player.draw()
        this.drawEnemies()
        this.drawScore()
        this.drawLife()
        this.bonus?.draw()
        this.winGame()
        this.gameOver()
        
    },

    setListener() {
        document.onkeydown = e => {
            switch (e.key){
                case this.keys.jump:
                    this.player.jump()
                    break;
                case this.keys.shoot:
                    this.player.shoot()
                    
                    break;
                case this.keys.left:
                    this.player.moving = true
                    this.player.direction = 'left'
                    break;
                case this.keys.right:
                    this.player.moving = true
                    this.player.direction = 'right'
                    break;    
            }
        }
        document.onkeyup = e => {
            switch (e.key){
                case this.keys.left:
                    this.player.moving = false
                    this.player.direction = 'left'
                    break;
                case this.keys.right:
                    this.player.moving = false
                    this.player.direction = 'right'
                    break; 
            }
        }
    },

    drawScore(){
        this.ctx.font = '50px joystix'
        this.ctx.fillText(`Score : ${this.score}`,this.canvasSize.w /2 - 200,50,)
    },

    drawLife(){
       
       for (let i= 0; i < this.lifeCounter;i++){
        this.ctx.drawImage(
            this.imageLife,
            this.canvasSize.w /2 - 100 + 30*i,
            100,
            30,
            30)
       }
    },

    createEnemies() {
        this.enemies.push(new Enemies(this.ctx,this.canvasSize.w, this.posY, '../img/pikaR.png', `../img/pikaL.png`, Math.random()>=0.5?'right':'left', this.slowed ? 1 : 10))

    },

    drawEnemies() {
        this.enemies.forEach(ene => ene.draw())

    },
    cleanEnemies() {
        this.enemies.forEach((ene, i) => {
        if ( !ene || ene.posX > this.canvasSize.w || ene.posX <= 0 ){
            delete this.enemies.splice(i, 1)[0]
        }
        })
    },

    collisions() {
        this.playerCollision()
        this.bulletsCollision()
        this.bonusCollision()
        
    },

    playerCollision(){
       
       
         this.enemies.forEach((ene, i )=> {
             if (
    
               this.player.posX + this.player.size.w >= ene.posX &&
               this.player.posX < ene.posX + ene.size.w &&
               this.player.posY + this.player.size.h >= ene.posY + 120 &&
               this.player.posY < ene.posY + ene.size.h
             ){
               this.lifeCounter--
               console.log(this.lifeCounter);
               delete this.enemies[i]
             }
           })
    },
        
     bulletsCollision() {
        
         this.enemies.forEach((ene,i )=> {
             this.player.bullets.forEach((bul,j) => {
                if (
                    bul.posX + bul.size >= ene.posX &&
                    bul.posX < ene.posX + ene.size.w - 70 &&
                    bul.posY + bul.size >= ene.posY &&
                    bul.posY < ene.posY + ene.size.h
                ){
                    this.score += ene.speed
                    delete this.enemies[i]
                    delete this.player.bullets[j]
                }
            })

        })           
    },

    bonusCollision(){
        
            if (
                this.bonus &&
                this.player.posX + this.player.size.w >= this.bonus.posX &&
                this.player.posX < this.bonus.posX + this.bonus.width &&
                this.player.posY + this.player.size.h >= this.bonus.posY &&
                this.player.posY < this.bonus.posY + this.bonus.height
              ){
                delete this.bonus
                this.enemies.forEach(el => el.speed = 1)
                this.slowed = true;
              }
              
            
    },

    bonusFx (){
        if (this.score >= 200){
            this.slowed = false;
            this.enemies.forEach(el => el.speed = el.initialSpeed)
        }
    },

    winGame() {
        this.imageWin = new Image()
        this.imageWin.pathImage = `img/you-win-8bit.gif`
        this.imageWin.src = this.imageWin.pathImage
        if(this.score >= 500){
            this.ctx.drawImage(
                this.imageWin,
                0,
                0,
                this.canvasSize.w,
                this.canvasSize.h)
                clearInterval(this.clear)
        }
    },

     gameOver() {
        this.imageGameOver = new Image()
        this.imageGameOver.pathImage = `img/image.png`
        this.imageGameOver.src = this.imageGameOver.pathImage
        if (this.lifeCounter <= 0){
            this.ctx.drawImage(
                this.imageGameOver,
                0,
                0,
                this.canvasSize.w,
                this.canvasSize.h
            )
            clearInterval(this.clear)
        }
    }

}

 
