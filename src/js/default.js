
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

boardGeneration(size);

function mineGeneration () {
    let bombs = new Array(size * size).fill(0);
    bombs = bombs.map((a, index) => {
        return a = index;
    });
    bombs.sort((a, b) => {
        return 0.5 - Math.random()
    });
    bombs.splice(ratio);
    bombs.map((a) => {
    HTMLboard.children[a].setAttribute("data-ismine", true); 
    });
    return bombs;
}

function numGen(bombs) {
    bombs.map(a => {
        let area;
        if ((a + 1) % size === 0) {
            area = [a - 1, a + size, a - size, a + size - 1, a - size - 1];
        } else if (a % size === 0) {
            area = [a + 1, a + size, a - size, a + size + 1, a - size + 1];
        } else {
            area = [a + 1, a - 1, a + size, a - size, a + size - 1, a - size - 1, a + size + 1, a - size + 1];
        }
        area.map(b => {
            if ((b < (size * size) && b >= 0) && (HTMLboard.children[b].getAttribute("data-ismine") == "false")){
                let num = HTMLboard.children[b].getAttribute("data-touching");
                HTMLboard.children[b].setAttribute("data-touching", parseInt(num) + 1);
            }
        });

    });
}


numGen(mineGeneration());

// left click HTMLboard.addEventListener("click", funciton , true);
HTMLboard.addEventListener("contextmenu", function (e){
    // be able to remove flag if clicked again...Ternary?
    let flag = (e.target.getAttribute("data-flag") == "false") ? true : false,
        clickable = (e.target.getAttribute("data-clickable") == "true") ? false: true;
    e.preventDefault();

    e.target.setAttribute("data-flag", flag);
    e.target.setAttribute("data-clickable", clickable);
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


