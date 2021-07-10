// challenge 5:Blackjack
let blackjackGame = {
    'you': { 'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}
const You = blackjackGame['you'];
const Dealer = blackjackGame['dealer'];
const hitSound = new Audio('/Sound/hit.wav');
const winSound = new Audio('/Sound/win.mp3');
const lossSound = new Audio('/Sound/aww.wav');
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
function blackjackhit() {
    if (blackjackGame['isStand'] === false) {
        let card = randomCard();
        showCard(card, You);
        updateScore(card, You);
        console.log(You['score']);
        showScore(You);


    }


}
function showCard(card, activePlayer) {
    if (activePlayer['score'] <= 21) {
        let cardImage = document.createElement('img');
        cardImage.src = `/Goldlatz/Blackjack-Game/blob/master/Images/${card}.png`
        hitSound.play();
        document.querySelector(activePlayer['div']).appendChild(cardImage);


    }


}
function blackjackDeal() {
    //  showResult( computeWinner());
    if (blackjackGame['turnsOver'] === true) {
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        You['score'] = 0;
        Dealer['score'] = 0;
        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = 'white';
        document.querySelector('#dealer-blackjack-result').style.color = 'white';
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = 'black';
        // check this
        blackjackGame['turnsOver'] = true;
    }

}
function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}
function updateScore(card, activePlayer) {
    if (card === 'A') {
        // score update logic to handle ace
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];

    }
}
function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
async function dealerLogic() {

    blackjackGame['isStand'] = true;
    while (Dealer['score'] < 16 && blackjackGame['isStand'] == true) {
        let card = randomCard();
        showCard(card, Dealer);
        updateScore(card, Dealer);
        showScore(Dealer);
        await sleep(1000);
    }


    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
    console.log(blackjackGame['turnsOver'])


}
//  compute winner and who just won
function computeWinner() {
    let winner;
    if (You['score'] <= 21) {
        if (You['score'] > Dealer['score'] || (Dealer['score'] > 21)) {
            blackjackGame['wins']++;
            winner = You;

        }
        else if (You['score'] < Dealer['score']) {
            blackjackGame['losses']++
            winner = Dealer;
        }
        else if (You['score'] === Dealer['score']) {
            blackjackGame['draws']++;

        }
    }
    else if (You['score'] > 21 && Dealer['score'] <= 21) {
        blackjackGame['losses']++
        winner = Dealer;
    }
    else if (You['score'] > 21 && Dealer['score'] > 21) {
        blackjackGame['draws']++;

    }
    console.log('winner is', winner);
    return winner;
}
function showResult(winner) {
    if (blackjackGame['turnsOver'] === true) {
        let message, messageColor;
        if (winner === You) {
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === Dealer) {
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'you drew!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;

    }

}
