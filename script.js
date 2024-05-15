const symbols = ['🍒', '🍋', '🍉', '🍇', '🍓', '🍌'];
const money =document.querySelector("h2")
const slots =document.querySelectorAll(".game > div")
const firstSlot = document.querySelector(".firstSlot")
const secondSlot = document.querySelector(".secondSlot")
const thirdSlot = document.querySelector(".thirdSlot")
const inputValue = document.getElementById("betAmount")
const spinButton =document.querySelector(".btn")


symbols.forEach(symbol =>{
    let rndSymbol = symbols[Math.floor(Math.random()*symbols.length)]
    slots.forEach(slot => slot.innerHTML += `<div class="icon">${rndSymbol}</div> ` )

})
