// HTML

let HTMLboard = document.getElementById("board"),
    restartButton = document.getElementById("NewGame");

// board variables
let size = 10, // size will equal what size the grid will be. Maybe changeable.
    board = [], //empty array to fill in the board
    ratio = Math.pow(size, 2) * .15; // How many bombs to create? 20% of size

// Creating a grid with each cell having data attributes and unique ids for easier calling
// and manipulation throughout the rest of the game. 
let bombs;

let min    = 0,
    zeroPlaceholder = 0,
    second = 00;
    let t;



function boardGeneration(x) {
    let count = 0;
    for (var i = 0; i < x; i++) {
        board.push([]);
        for (var j = 0; j < x; j++) {
            let div = document.createElement("div");
            div.setAttribute("location", count);
            div.setAttribute("data-ismine", false);
            div.setAttribute("data-revealed", false);
            div.setAttribute("data-clickable", true);
            div.setAttribute("data-flag", false);
            div.setAttribute("lost", false);
            div.setAttribute("data-touching", 0);
            div.addEventListener("click", clickSquare);
            div.addEventListener("contextmenu", toggleFlag);
            HTMLboard.appendChild(div).id = i + "_" + j;
            // HTMLboard.appendChild(div).id = count;
            count++;
            board[i].push([div]);
        }
    }
}

//called function to create board. Maybe add to new function at the top for game initialization?
boardGeneration(size);


// Random generation of mine placement upon load and upon game reset.
function mineGeneration () {
    bombs = new Array(size * size).fill(0); // create an array with same amount of cells
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
            if ((b < (size * size) && b >= 0) && (HTMLboard.children[b].getAttribute("data-ismine") == "false")) {
                let num = HTMLboard.children[b].getAttribute("data-touching");
                HTMLboard.children[b].setAttribute("data-touching", parseInt(num) + 1);
            }
        });

    });
}

// calls number generation by passing bombs through it as the array in question
numGen(mineGeneration());


function clickSquare(evt) {
    //check for bomb
    //open up appropriate squares
    if (evt.target.getAttribute("data-ismine") === 'true') {
        gameLost();
    } else {
        reveal(parseInt(evt.target.getAttribute("location")));
        didWeWin();
    };
    
}

function toggleFlag(evt) {
    if (evt.target.getAttribute("data-flag") === 'true') {
        evt.target.setAttribute("data-flag", false);
        evt.target.addEventListener("click", clickSquare);
    } else {
        evt.target.setAttribute("data-flag", true);
        evt.target.removeEventListener("click", clickSquare);
    };

}

function lookup(a) { //find the 8 surrounding tiles
    size = parseInt(size);
    console.log("looking up: " + a + '  size = ' + size);
    let gridLookup = [a + 1, a + size + 1, a - size + 1,
        a + size, a - size,
        a - 1, a + size - 1, a - size - 1
    ];
    if ((a + 1) % size === 0) {
        gridLookup = gridLookup.slice(3); //[a - 1, a + size, a - size, a + size - 1, a - size - 1];
    } else if (a % size === 0) {
        gridLookup = gridLookup.slice(0, 5); //[a + 1, a + size, a - size, a + size + 1, a - size + 1];
    } else {
        gridLookup = gridLookup; //[a + 1, a - 1, a + size, a - size, a + size - 1, a - size - 1, a + size + 1, a - size + 1];
    };
    return gridLookup;
}

function reveal(square) {
    square = parseInt(square);
    HTMLboard.children[square].setAttribute("data-revealed", true)
    if (HTMLboard.children[square].getAttribute("data-touching") !== '0') {
        HTMLboard.children[square].innerHTML = "<p>" + HTMLboard.children[square].getAttribute("data-touching") + "</p>";
        HTMLboard.children[square].removeEventListener("click", clickSquare);
        HTMLboard.children[square].removeEventListener("contextmenu", toggleFlag);
    } else {
        HTMLboard.children[square].removeEventListener("contextmenu", toggleFlag);
    }
    if (HTMLboard.children[square].getAttribute("data-touching") === '0') {
        let neighbors = lookup(square);
        neighbors.map(function(a) {
            if ((a < (size * size) && a >= 0) &&
                HTMLboard.children[a].getAttribute("data-revealed") === 'false') {
                reveal(a);
            };
        });
    };



}

function gameLost() {
    bombs.map(a => {
        HTMLboard.children[a].setAttribute("lost", true);
    });
    for (var i = 0; i< (size*size); i ++) {
        HTMLboard.children[i].removeEventListener("click", clickSquare);
        HTMLboard.children[i].removeEventListener("contextmenu", toggleFlag);
    }
    clearTimeout(t);
    //show all the bombs
    //show game lost message
    //ask for new game
}

function didWeWin () {
    let count = 0;
    console.log("Did We Win?");
    for (var i = 0; i < (size*size); i++) {
        if ((HTMLboard.children[i].getAttribute("data-revealed") === 'false') && 
            HTMLboard.children[i].getAttribute("data-ismine")) {
            count++;
        }
    }
    if (count === bombs.length) {
        gameWon();
    };  
}

function gameWon() {
    for (var i = 0; i < (size*size); i++) {
        if ((HTMLboard.children[i].getAttribute("data-ismine")) === 'false') {
           HTMLboard.children[i].innerHTML = "<p>😎</p>";
    };
    HTMLboard.children[i].removeEventListener("click", clickSquare);
    HTMLboard.children[i].removeEventListener("contextmenu", toggleFlag);
    HTMLboard.children[i].setAttribute("data-clickable", false);
    clearTimeout(t);
};
}

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
        t = setTimeout ("countUP()", 1000 );//runs itsself after 1000 miliseconds
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


