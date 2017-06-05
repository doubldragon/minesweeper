
// HTML
let HTMLboard = document.getElementById("board"),
    restartButton = document.getElementById("NewGame");

// board variables
let size = 10, // size will equal what size the grid will be. Maybe changeable.
    board = [], //empty array to fill in the board
    ratio = Math.pow(size, 2) * .2; // How many bombs to create? 20% of size

// Creating a grid with each cell having data attributes and unique ids for easier calling
// and manipulation throughout the rest of the game. 

function boardGeneration (x) {
    
    for (var i = 0; i < x; i++) {
         board.push([]); 
        for (var j = 0; j < x; j++) {
            let div = document.createElement("div");
            div.setAttribute("data-ismine", false);
            div.setAttribute("data-revealed", false);
            div.setAttribute("data-clickable", true);
            div.setAttribute("data-flag", false);
            div.setAttribute("data-question", false);
            div.setAttribute("data-touching", 0);
            HTMLboard.appendChild(div).id = i + "_" + j;
            board[i].push([div]);
        }
    }  
}

//called function to create board. Maybe add to new function at the top for game initialization?
boardGeneration(size);


// Random generation of mine placement upon load and upon game reset.
function mineGeneration () {
    let bombs = new Array(size * size).fill(0); // create an array with same amount of cells
    bombs = bombs.map((a, index) => {
        return a = index;
    });

    // randomized the placement of the new array of numbers (in this case it is 100)
    bombs.sort((a, b) => {
        return 0.5 - Math.random()
    });

    // set a new array of the first set of numbers to set the bomb placements based on ratio
    bombs.splice(ratio);

    // mapped through the array to change attribute of the cell to contain the bomb
    bombs.map((a) => {
    HTMLboard.children[a].setAttribute("data-ismine", true); 
    });
    console.log(bombs);
    return bombs;
}


// Generation of the numbers that represent each of the blocks that will touch the bomb

function numGen(bombs) {
    bombs.map(a => {
        let area;

        // defining how to look at each cell and determine whether to add a number

        // specific for right side of the grid to not add numbers to cells on next line
        
        if ((a + 1) % size === 0) {
            area = [a - 1, a + size, a - size, a + size - 1, a - size - 1];
        } 
        
        // specific for left side of the grid to not add numbers to cells on next line

        else if (a % size === 0) {
            area = [a + 1, a + size, a - size, a + size + 1, a - size + 1];
        } 

        // gets all the cells in the middle that arent on the edges

        else {
            area = [a + 1, a - 1, a + size, a - size, a + size - 1, a - size - 1, a + size + 1, a - size + 1];
        }

        // iterates through the area within the board and the non-mine cells and increments each number
        // in the cell based on the number of mines it is touching.
        area.map(b => {
            if ((b < (size * size) && b >= 0) && (HTMLboard.children[b].getAttribute("data-ismine") == "false")){
                let num = HTMLboard.children[b].getAttribute("data-touching");
                HTMLboard.children[b].setAttribute("data-touching", parseInt(num) + 1);
            }
        });

    });
}

// calls number generation by passing bombs through it as the array in question
numGen(mineGeneration());

// left click HTMLboard.addEventListener("click", function , true);

// adding an eventlistener for a right-click (contextmenu) to denote where to place flags 
HTMLboard.addEventListener("contextmenu", function (e){
    // be able to remove flag if clicked again...Ternary?
    let flag = e.target.getAttribute("data-flag"),
        clickable = e.target.getAttribute("data-clickable");
    e.preventDefault(); // prevents the menu from displaying on right click
    e.target.setAttribute("data-flag", true); 
    e.target.setAttribute("data-clickable", false);
});

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


let min    = 0,
    zeroPlaceholder = 0,
    second = 00;

function countUP () {
        second++;
        if(second == 59){
            second = 00;
            min = min + 1;
          }
          if(second == 10){
              zeroPlaceholder = '';
          }else
          if(second == 00){
              zeroPlaceholder = 0;
          }
        setTimeout ("countUP()", 1000 );//runs itsself after 1000 miliseconds
        document.getElementById("timer").innerText = min+':'+zeroPlaceholder+second;
      };

function StartGame(){
    document.getElementById("board").addEventListener('click', startTimer, true);
    function startTimer() {
        countUP();
        document.getElementById("board").removeEventListener('click', startTimer, true);
        };
};

StartGame();

