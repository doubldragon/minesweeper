
// HTML
let HTMLboard = document.getElementById("board");
let bombs;
// board variables
let size = 10,
    selection,
    board = [],
    ratio = Math.pow(size, 2) * .1,
    toSearch;


function boardGeneration (x) {
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

boardGeneration(size);

function mineGeneration () {
    bombs = new Array(size * size).fill(0);
    bombs = bombs.map((a, index) => {
        return a = index;
    });
    bombs.sort((a, b) => {
        return 0.5 - Math.random()
    });
    // console.log(bombs);
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

// // left click HTMLboard.addEventListener("click", funciton , true);
// HTMLboard.addEventListener("contextmenu", function (e){
//     // be able to remove flag if clicked again...Ternary?
//     let flag = e.target.getAttribute("data-flag"),
//         clickable = e.target.setAttribute("data-clickable");
//     e.preventDefault();
//     e.target.setAttribute("data-flag", true);
//     e.target.setAttribute("data-clickable", false);
// });

function clickSquare(evt) {
  //check for bomb
  //open up appropriate squares
   if (evt.target.getAttribute("data-ismine") === 'true'){
        gameLost();
    }; 
  checkSpace(evt.target.getAttribute("location"));
  console.log("left click");
  evt.target.setAttribute("data-revealed", true);
  if (evt.target.getAttribute("data-touching") !== '0'){
    evt.target.innerHTML = evt.target.getAttribute("data-touching");
    evt.target.removeEventListener("click", clickSquare);
    evt.target.removeEventListener("contextmenu", toggleFlag);
  } else {
    evt.target.removeEventListener("contextmenu", toggleFlag);
  }
}

function toggleFlag(evt) {
  console.log("right click");
  if (evt.target.getAttribute("data-flag") === 'true'){
    evt.target.setAttribute("data-flag", false);
    evt.target.addEventListener("click", clickSquare);
  } else {
    evt.target.setAttribute("data-flag", true);
    evt.target.removeEventListener("click", clickSquare);
  };

}

function lookup(a) {
 
 // cells.map(a => {
        console.log("looking up: " + a + '  size = ' + size);
        let gridLookup = [a + 1, a + size + 1, a - size + 1, 
                          a + size, a - size, 
                          a - 1, a + size - 1, a - size - 1];
        // console.log(gridLookup)
        if ((a + 1) % size === 0) {
            gridLookup = gridLookup.slice(3); //[a - 1, a + size, a - size, a + size - 1, a - size - 1];
        } else if (a % size === 0) {
            gridLookup = gridLookup.slice(0,5); //[a + 1, a + size, a - size, a + size + 1, a - size + 1];
        } else {
            gridLookup = gridLookup; //[a + 1, a - 1, a + size, a - size, a + size - 1, a - size - 1, a + size + 1, a - size + 1];
        };
        // console.log(gridLookup);

        return gridLookup;
//         gridLookup.map(b => {
//             if ((b < (size * size) && b >= 0) && (HTMLboard.children[b].getAttribute("data-ismine") == "false")){
//                 let num = HTMLboard.children[b].getAttribute("data-touching");
//                 HTMLboard.children[b].setAttribute("data-touching", parseInt(num) + 1);
//             }
//         });
// }); //needs to return an array of locations to check
}

function checkSpace(loc) {
    // let loc = parseInt(evt.target.getAttribute("location"));
    toSearch = [loc];
    if (!toSearch.includes(loc)){
        toSearch.concat(lookup(loc));
    };
    toSearch.forEach(function (check)  {
        HTMLboard.children[check].setAttribute("data-revealed", true);
        if (HTMLboard.children[check].getAttribute("data-touching") === '0'){
            console.log('toSearch = ' + toSearch);
            toSearch = toSearch.concat(checkSpace(parseInt(check)));
            console.log('Post Recursion: ' + toSearch);
            };
    });
    

    // if (evt.target.getAttribute("data-touching") !== '0') {
    //     evt.target.setAttribute("data-revealed", true);
    // } else {
    //     evt.target.setAttribute("data-revealed", true);
    //     toSearch = toSearch.concat(checkSpace(evt, check));
    // };

    

    console.log('Finding spaces to open');
    
    }
    //if good open right


function gameLost() {
    bombs.map(a => {
        HTMLboard.children[a].setAttribute("lost", true);
    });
    //show all the bombs
    //show game lost message
    //ask for new game
}

function gameWon() {
    //show winning message and time.
    //ask for new game
}

