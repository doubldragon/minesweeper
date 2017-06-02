// HTML
let HTMLboard = document.getElementById("board");

// board variables
let size = 10,
    board = [];

// // cell constructor function
// let Cell = (() => {
//   let nextId = 0;
//    return function Cell() {
//       this.id = nextId++;
//       this.revealed = false;
//       this.clickable = true;
//       this.isMine = false;
//       this.touchingMines;
//       this.flag = false; 
//       this.mineCheck = () => {
//         if (this.isMine){
//             console.log("boom");
//         } 
//       };
//    }
// })();

function boardGeneration (x) {
    
    for (var i = 0; i < x; i++) {
        board.push([]); 
        for (var j = 0; j < x; j++) {
            let div = document.createElement("div");
            div.setAttribute("data-isMine", false);
            div.setAttribute("data-revealed", false);
            div.setAttribute("data-flag", false);
            div.setAttribute("data-question", false);
            div.setAttribute("data-touching", 0);
            HTMLboard.appendChild(div).id = i + "_" + j;
            board[i].push([]);
        }
    }  
}
console.log(board);
boardGeneration(size);




