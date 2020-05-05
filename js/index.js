let d = document;

//selecting things as well as creating the feedback element
let imgs = d.getElementsByTagName("img");
let navLink = d.querySelectorAll(".nav-link");
let feedBack = d.createElement("p");
//throw feedBack into the DOM
d.body.prepend(feedBack);
//feedback Styling
feedBack.style.position = "fixed";
feedBack.style.zIndex = "100";
feedBack.style.top = "10%";
feedBack.style.fontSize = "5rem";
//feed updates the feedback innerhtml when called
//this timer ID is so we can override setTimeOut if it gets called b4 the timer completes
let timerID;
function feed(input){
    if (input){feedBack.innerHTML = `feedback: ${input}`};
    clearTimeout(timerID);
    timerID = setTimeout(()=>{ feedBack.innerHTML = `feedback: <mark>${input}</mark>`;
    d.querySelector(`mark`).style.background = `none`;
    d.querySelector(`mark`).style.color = `gainsboro`;
    }, 500);
}
//keydown event
window.addEventListener('keydown', e => {feed(String.fromCharCode(e.keyCode))})
//wheel event
window.addEventListener('wheel', e => {e.wheelDeltaY > 0 ? feed("wheel-up"): feed("wheel-down");})//feed(String.fromCharCode(e.keyCode))})
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
navLink.forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        alert("nope!");
    });
});
//mouseEnter/Exit opacity changes for all images
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
