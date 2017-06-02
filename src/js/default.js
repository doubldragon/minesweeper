
// HTML
let HTMLboard = document.getElementById("board");

// board variables
let size = 10,
    board = [],
    ratio = Math.pow(size, 2) * .2;


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
            board[i].push([div]);
        }
    }  
}
console.log(board);
boardGeneration(size);

function mineGeneration () {
    let randNums = new Array(size * size).fill(0);
    randNums = randNums.map((a, index) => {
        return a = index;
    });
    randNums.sort((a, b) => {
        return 0.5 - Math.random()
    });
    randNums.splice(ratio);
    randNums.map((a) => {
    HTMLboard.children[a].setAttribute("data-ismine", true); 
    });
}

mineGeneration();



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


