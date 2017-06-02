// HTML
let HTMLboard = document.getElementById("board");

// board variables
let size = 10,
    board = new Array(size * size).fill(false);

// cell constructor funciton
let Cell = (() => {
  let nextId = 0;
   return function Cell() {
      this.id = nextId++;
      this.revealed = false;
      this.clickable = true;
      this.isMine = false;
      this.touchingMines;
      this.flag = false; 
      this.html = `<div id=${this.id}></div>`;
      this.mineCheck = () => {
        if (this.isMine){
            console.log("boom");
        } 
      };
   }
})();

function insertDiv (a, index) {
    let div = document.createElement("div");
    HTMLboard.appendChild(div).id = index;
}

board.map(insertDiv);

// make array of 10 x 10 empty then generate the divs with unique ids.
// then pick n amount of random ids and switch them to this.is mine


