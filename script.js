
const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍌'];
const moneyHTML = document.querySelector("h2");
const slots = document.querySelectorAll(".game > div");
const firstSlot = document.querySelector(".firstSlot");
const secondSlot = document.querySelector(".secondSlot");
const thirdSlot = document.querySelector(".thirdSlot");
const inputValue = document.getElementById("betAmount");
const spinButton = document.querySelector(".btn");

const symbolsId =[];
let money = 1000;

// Populate symbols and slots
symbols.forEach((symbol, index) => {
    symbolsId.push({
        icon: symbol,
        id: index
    });
    slots.forEach(slot => slot.innerHTML += `<div class="icon" id="${index}">${symbol}</div>`);
});

// Function to start spinning
function startSpin() {
    const int = setInterval(() => {
        // Randomly select symbols for all slots
        const firstSymbols = Array.from({ length: 3 }, () => symbolsId[Math.floor(Math.random() * symbolsId.length)]);
        const secondSymbols = Array.from({ length: 3 }, () => symbolsId[Math.floor(Math.random() * symbolsId.length)]);
        const thirdSymbols = Array.from({ length: 3 }, () => symbolsId[Math.floor(Math.random() * symbolsId.length)]);

        // Update all slots with the selected symbols
        updateSlot(firstSlot, firstSymbols);
        updateSlot(secondSlot, secondSymbols);
        updateSlot(thirdSlot, thirdSymbols);
    }, 10); // Adjust the spinning speed here (lower value means faster spinning)

    // Return the interval ID to be used for clearing the interval later
    return int;
}

// Function to stop spinning
function stopSpin() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000); // Adjust the time it takes for spinning to stop
    });
}

// Function to update a slot with symbols
function updateSlot(slot, symbols) {
    slot.innerHTML = symbols.map(symbol => `<div class="icon" id="${symbol.id}">${symbol.icon}</div>`).join('');
}
spinButton.onclick = () => {
    const betAmount = inputValue.value;
    if (betAmount <= money && betAmount > 0) {
        money -= betAmount;
        moneyHTML.textContent = "Player Money: " + money;

        const int = startSpin();

        // Stop spinning after 3 seconds and resolve promise
        stopSpin().then(() => {
            clearInterval(int);

            // Now you can check the result of the spin and update player money accordingly
            let won = false;
            let halfPrize = false

            for (let i = 0; i < 3; i++) {
                // Check if all symbols in the same position match
                if (firstSlot.children[i].innerHTML === secondSlot.children[i].innerHTML &&
                    secondSlot.children[i].innerHTML === thirdSlot.children[i].innerHTML) {
                    won = true;
                    break;
                }
                else if (i < 2 && // Check if i + 1 and i + 2 are within range
                    (firstSlot.children[i].innerHTML === firstSlot.children[i + 1].innerHTML &&
                        firstSlot.children[i].innerHTML === firstSlot.children[i + 2].innerHTML ||
                        secondSlot.children[i].innerHTML === secondSlot.children[i + 1].innerHTML &&
                        secondSlot.children[i].innerHTML === secondSlot.children[i + 2].innerHTML ||
                        thirdSlot.children[i].innerHTML === thirdSlot.children[i + 1].innerHTML &&
                        thirdSlot.children[i].innerHTML === thirdSlot.children[i + 2].innerHTML)) {
                    halfPrize = true;
                    break; // Exit loop, no need to check further
                }
            }

            if (won) {
                money += betAmount * 10;
                moneyHTML.textContent = "Player Money: " + money;
            } else if (halfPrize) {
                money += betAmount * 5;
                moneyHTML.textContent = "Player Money: " + money;
            } else {
                alert("YUO LOST")
            }
        });
    }}