let rows = 3;
let columns = 3;

let currTile;
let otherTile;
let turns = 0;


let imgOrder = ['4', '2', '8', '5', '1', '6', '9', '7', '3'];

window.onload = function () {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            
            let tile = document.createElement("img");
            tile.id = i.toString() + "," + j.toString();
            // console.log(tile.id);
            tile.src = "./image/" +imgOrder.shift() + ".jpg";
            // console.log(tile.src);
            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);  //click an image to drag
            tile.addEventListener("dragover", dragOver);    //moving image around while clicked
            tile.addEventListener("dragenter", dragEnter);  //dragging image onto another one
            tile.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
            tile.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
            tile.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
            document.getElementById("board").append(tile);
            
        }
        
    }
}

function dragStart() {
    currTile = this; //this refers to the img tile being dragged
    console.log(currTile);
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to the img tile being dropped on
console.log(otherTile);
}

function dragEnd() {
    if (!otherTile.src.includes("9.jpg")) {
        console.log(!otherTile.src.includes("3.jpg"));
        return;
    }

    let currCoords = currTile.id.split(","); //ex) "0-0" -> ["0", "0"]
    console.log(currCoords);
    
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split(",");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }


}
