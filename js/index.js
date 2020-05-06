let d = document;

//this is gonna be the feedback text in the top left
let feedBack = d.createElement("p");
//throw feedBack into the DOM
d.body.prepend(feedBack);
//feedback Styling
feedBack.style.position = "fixed";
feedBack.style.zIndex = "100";
feedBack.style.top = "10%";
feedBack.style.fontSize = "5rem";




//feed() updates the feedback innerhtml when called
//this timer ID is so we can override setTimeOut if it gets called b4 the timer completes
let timerID;
function feed(input){
    // checks for mouse wheel events
    checkWheel(input);
    //if a mousewheel event just got passed through this function dont let a scroll event through
    if (isWheel && input === "scroll") {console.log(`sorry`); return } 

    feedBack.innerHTML = `feedback: ${input}`;

    clearTimeout(timerID);
    timerID = setTimeout(()=>{ feedBack.innerHTML = `feedback: <mark>${input}</mark>`;
    d.querySelector(`mark`).style.background = `none`;
    d.querySelector(`mark`).style.color = `gainsboro`;
    }, 500);

}

//all this junk is me trying to seperate scrollwheel scrolling from bar scrolling
let isWheel = false;
let isWheelTimer;
function checkWheel(input){
    if (input.includes('wheel')){
        isWheel = true;
        clearTimeout(timerID);
        isWheelTimer = setTimeout(()=>{isWheel = false }, 500);
    }
}








//keydown event
window.addEventListener('keydown', e => {feed(String.fromCharCode(e.keyCode))})

//wheel event
window.addEventListener('wheel', e => {
    e.wheelDeltaY > 0 ? feed("wheel-up"): feed("wheel-down");
})
window.addEventListener('resize', e => {feed("windowResize")})

//scroll
window.addEventListener('scroll', e => { if (!isWheel) {feed("scroll")} })

//select
d.querySelector('textarea').addEventListener('select', e => {
    const selection = e.target.value.substring(e.target.selectionStart, e.target.selectionEnd);  
    feed(`selection:${selection}`);
})

//focus
d.querySelector('textarea').addEventListener('focus', e => {e.target.innerHTML="event focus was just triggered"});
d.querySelector('textarea').addEventListener('blur', e => {e.target.innerHTML="event blur was just triggered"});

//click and dblclick
window.addEventListener("click", e => {feed("singleclick")})
window.addEventListener("dblclick", e => {feed("doubleclick")})

// load event
//create <p class ="loading-text">Loading image!</p>
let loadingText = d.createElement('p');
loadingText.className = "loading-text"
loadingText.innerHTML = "Loading image!"
//create <div class ="loading-ani"></div>
//this is the loading circle animation
let loadingAni = d.createElement('div');
loadingAni.className = "loading-ani";
//throw those 2 on the dom attached to image parent
let firstImg = d.querySelector(`.content-section img`);
firstImg.parentNode.appendChild(loadingText);
firstImg.parentNode.appendChild(loadingAni);
//destroy them on image load
firstImg.addEventListener('load', e => {
    e.target.parentNode.lastChild.remove();
    e.target.parentNode.lastChild.remove();
    e.stopPropagation;
});
//disable all nav links cuz why not
let navLink = d.querySelectorAll(".nav-link");
navLink.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        alert("nope!");
    });
});
//mouseEnter/Exit opacity changes for all images
let imgs = d.getElementsByTagName("img");
Array.from(imgs).forEach(el => {
    el.style.opacity = ".5";
    el.style.transition = '.5s';
    el.addEventListener("mouseover", (e)=>{
        feed('mouseover');
        e.target.style.opacity = '1';
        e.stopPropagation();
        e.target.onmouseleave = ()=>{
            feed('mouseexit');
            e.target.style.opacity = '.5';
            e.stopPropagation();
        }
    })
});
//selection document wide
document.addEventListener("selectionchange", e => {
    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
    feed(`selection: <mark>${selection}</mark>`);
  })