const cellElements = document.querySelectorAll("[data-cell]"); //querySelect all pois e mais de uma celula
const board =document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]"
);
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restart-button]") //a função que faz reiniciar o jogo



let isCircleTurn;
//Array combinações de vitoria
const winningCombinations = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
];

const startGame = () => {
    isCircleTurn = false; // para sempre q o jogo iniciar defirnir como vez do x 
    for (const cell of cellElements) { // eventlist ,chama a função clique q so acontece uma vez,para não colocar x ou 0 mais de uma vez
        cell.classList.remove("circle");// quando clica em reiniciar e removido as celulas preenchidas
        cell.classList.remove("x");// quando clica em reiniciar e removido as celulas preenchidas
        cell.removeEventListener("click", handleClick);//chamado e execução da ação
        cell.addEventListener("click",handleClick, {once: true});
    }
    setBoardHoverClass()
    winningMessage.classList.remove("show-winning-message");
};
const endGame = (isdraw) => { //se for um empate e pegado o winningMessageTextelement e sai o resultado de empate
 if (isdraw) {
     winningMessageTextElement.innerText= "Empate!"
 } else{
     winningMessageTextElement.innerText= isCircleTurn ? 'Circulo Venceu!' : 'X Venceu!'; //se for circleturn circulo venceu se não x venceu
 }
 winningMessage.classList.add("show-winning-message");
}
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => { //o every vai ver se alguma dessas celulas estão de acordo com a vitoria descrita nos array
            return cellElements[index].classList.contains(currentPlayer);
        });
        }
        )    }

;

const checkForDraw = () => {
    return[...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains('circle')
    });
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove("circle");
    board.classList.remove("x");
    if (isCircleTurn) { //se for a vez do circulo ,bota -se o circulo
        board.classList.add("circle");
    } else { //se não bota- se o x 
        board.classList.add("x");
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn; //vai definir o circle turn pro inverso que ele era

   setBoardHoverClass();
    
};
const handleClick = (e) => { //esse cara vai ser executado em toda celula que for clicada
    //Colocar a marca (X ou Circulo)
    const cell = e.target;
    const classToAdd= isCircleTurn ? "circle" : "x"; //checa se é a vez do circulo se não é colocado o x
    placeMark(cell,classToAdd);
    //Verificar por Vitoria
    const isWin = checkForWin(classToAdd);
    //Verificar por empate
    const isdraw = checkForDraw ();
    if (isWin){
      endGame(false);
    } else if (isdraw) {
        endGame(true)
    } else {
   //mudar simbolo
   swapTurns(); //muda o turno
    }
    
 
};
for (const cell of cellElements){
    cell.addEventListener("click", handleClick, {once:true});
}

startGame();

restartButton.addEventListener("click", startGame);