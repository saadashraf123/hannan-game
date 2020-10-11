const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let FirstCard, SecondCard;

function flipCard() {
    sound();
    if (lockBoard) return;
    if(this === FirstCard) return;
    
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first Click
        hasFlippedCard = true;
        FirstCard = this;
        return;
    }
    // second click
    SecondCard = this;

    checkForMatch();
    
};

function checkForMatch() {
    
    if (FirstCard.dataset.framework === SecondCard.dataset.framework) {
        disableCards();
    }
    else {
        unFlipCards();
    }
};

function disableCards() {
    FirstCard.removeEventListener("click", flipCard);
    SecondCard.removeEventListener("click", flipCard);
    resetBoard();
};

function unFlipCards() {
    lockBoard = true ;
    setTimeout(() => {
        FirstCard.classList.remove("flip");
        SecondCard.classList.remove("flip");
        resetBoard();
    }, 1000);
};

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

//  immediately invoked function expression that means function would be called right after its definition
/*    syntax -> ( function (){
        piece of code
    }
    )();
*/
(function shuffle(){
    cards.forEach( card => {
        let randomPosition = Math.floor(Math.random()*12);
        card.style.order = randomPosition ;
    });
})();

cards.forEach(card => {
    card.addEventListener("click", flipCard);
})

function sound(){
    var audio = new Audio();
    audio.src = "click.mp3";
    audio.play();
};

// let msg = document.querySelectorAll("flip");
// console.log(msg.length);
