//window.onload = () => Game.init()
const button=document.getElementById('start')
 button.addEventListener('click', () => {
     Game.init()
    document.getElementById('hiddengame1').classList.add ('hidden') 
    document.getElementById('start').classList.add ('hidden')
    document.getElementById('hidden3').classList.add ('hidden')
    document.getElementById('myCanvas').classList.remove ('hidden') 
    document.getElementById('hidden4').classList.add ('hidden')
    document.getElementById('hidden5').classList.add ('hidden')
    
    let picaSound = new Audio ('./mp3/pikachu_pi_pikachu.mp3')
    picaSound.play()
 })

