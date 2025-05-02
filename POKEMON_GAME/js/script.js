// . classes
// # ids
// nome do elemento
// div h1 => elemento dentro de outro elemento

//querySelector => seleciona apenas um elemento (o primeiro que ele encontrar)
//querySelectorAll => seleciona todos os elementos e coloca dentro de uma array

const body = document.querySelector('body');
const game = document.querySelector('.game');

const count = document.querySelector('h1');
const reset = document.querySelector('#reset');

const ash = document.querySelector('#ash');
const charmander = document.querySelector('#charmander');
const pikachu = document.querySelector('#pikachu');
const zubat = document.querySelector('#zubat');

let findCharmader = false;
let findPikachu = false;
let findZubat = false;

const audio = document.querySelector('audio');
audio.volume = 0.9;

const musicControl = document.querySelector(".music-control");

let velo = 8;

musicControl.addEventListener('click', (event)=>{
    event.stopPropagation()

    event.target.src = `${event.target.src}`.includes('on.png')
        ?'../assets/icons/off.png'
        :'../assets/icons/on.png';

        `${event.target.src}`.includes('on.png')
        ?audio.play()
        :audio.pause();

})

reset.addEventListener('click', () => {
    window.location.reload();
    reset.style.display = "none";
})

function clearCharacter(){
    ash.style.display="none";
    charmander.style.display="none";
    pikachu.style.display="none";
    zubat.style.display="none";

    reset.style.display = "block";
    count.textContent = '';

    velo=0;
}

let currentCount = 60;

const interval = setInterval(() => {

    currentCount--; 
    count.textContent = currentCount;

    if(currentCount<=0){
        game.style.backgroundImage = "url('../assets/game-over.jpg')";
        
        clearInterval(interval);
        clearCharacter();
    }
}, 1000)

function finishGame(){
    if(findCharmader && findPikachu && findZubat){

        clearCharacter();

        const timeOut = setTimeout(()=>{
            game.style.backgroundImage = "url('../assets/winner.jpg')";

            clearTimeout(timeOut);
            clearInterval(interval);

            audio.pause();
        },1000);
    }
}

function getRightPosition(){
    return parseInt(ash.style.right.split("px"))||2;
}
function getTopPosition(){
    return parseInt(ash.style.top.split("px"))||2;
}

function verifyLookPokemon(to){
    finishGame();

    const pokemonRightPosition = to === 'ArrowLeft' 
        ? `${getRightPosition()-64}px`
        :`${getRightPosition()+64}px`;
    

    //Charmander
    if(
        getTopPosition()>=2 && 
        getTopPosition()<=98 && 
        getRightPosition()>=130 &&
        getRightPosition()<=216 &&
        findCharmader==false
        ){
            charmander.style.display = "block";
            findCharmader=true;
            return;
    }
    if(findCharmader){
        const newTopPosition = (to = "ArrowUp" 
            ? `${getTopPosition()+8}px`
            : `${getTopPosition()-8}px`);

        charmander.style.right = pokemonRightPosition;
        charmander.style.top = newTopPosition;
    }

    //pikachu
    if(
        getTopPosition()>=266 && 
        getTopPosition()<=394 && 
        getRightPosition()>=546 &&
        getRightPosition()<=650 && 
        findPikachu==false
        ){
            pikachu.style.display = "block";
            findPikachu=true;
            return;
    }
    if(findPikachu){
        const newTopPosition = (to = "ArrowUp" 
            ? `${getTopPosition()+40}px`
            : `${getTopPosition()-40}px`);

        pikachu.style.right = pokemonRightPosition;
        pikachu.style.top = newTopPosition;
    }

    //zubat
    if(
        getTopPosition()>=474 && 
        getTopPosition()<=594 && 
        getRightPosition()>=42 &&
        getRightPosition()<=138 && 
        findZubat==false
        ){
            zubat.style.display = "block";
            findZubat=true;
            return;
    }
    if(findZubat){
        const newTopPosition = (to = "ArrowUp" 
            ? `${getTopPosition()+72}px`
            : `${getTopPosition()-72}px`);

        zubat.style.right = pokemonRightPosition;
        zubat.style.top = newTopPosition;
    }
}

body.addEventListener('keydown',(event)=>{
    event.stopPropagation();

    console.log(event.code);
    switch(event.code){
        case 'ArrowLeft':
            if(getRightPosition()<770){
                ash.style.right = `${getRightPosition()+velo}px`;
            }
            ash.src='../assets/left.png';
            break;
        case 'ArrowRight':
            if(getRightPosition()>2){
                ash.style.right = `${getRightPosition()-velo}px`;
            }
            ash.src='../assets/right.png';
            break;
        case 'ArrowDown':
            if(getTopPosition()<625){
                ash.style.top = `${getTopPosition()+velo}px`;
            }
            ash.src='../assets/front.png';
            break;
        case 'ArrowUp':
            if(getTopPosition()>2){
                ash.style.top = `${getTopPosition()-velo}px`;
            }
            ash.src='../assets/back.png';
            break;
        default:
            break;
    }


    verifyLookPokemon(event.code);
});