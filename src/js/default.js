let size = 10,
    board = [];

let Cell = (() => {
  let nextId = 0;
   return function Cell() {
      this.id = nextId++;
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

// make array of 10 x 10 empty then generate the divs with unique ids.
// then pick n amount of random ids and switch them to this.is mine


