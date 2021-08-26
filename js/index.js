//window.onload = () => Game.init()
const button=document.getElementById('start')
 button.addEventListener('click', () => {
     Game.init()
    document.getElementById('hiddengame1').classList.add ('hidden') 
    document.getElementById('start').classList.add ('hidden')
    document.getElementById('hiddengame3').classList.add ('hidden')
    document.getElementById('myCanvas').classList.remove ('hidden') 
    })

