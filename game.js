//defining the variables
var score=0;
var board;
var rows=4;
var columns=4;
let highScore=localStorage.getItem("highScore") || 0;


//starting game when the window loads
window.onload = function() {
    startGame();
}
//to create the game board
function startGame(){
    board=[
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            let tile=document.createElement("div");
            tile.id=r+"."+c;
            update_tile(tile,0);
            document.getElementById("board").append(tile);
        }
       
    }
     set_two();
        set_two();
}
//to update the tile with values 
function update_tile(tile, num) {
    tile.innerText="";
    tile.classList.value="";
    tile.classList.add("tile");
    if(num>0){
        tile.innerText=num;
        tile.classList.add("b"+num);
    }
}

//key controls
addEventListener('keyup',(e)=>{
    if(e.code=="ArrowLeft"){
        slideLeft();
        set_two();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        set_two();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        set_two();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        set_two();
    }
    document.getElementById("score").innerText="score: "+score;
    if(score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
    document.getElementById("high-score").innerText = "High Score: " + highScore;
    
});
document.addEventListener('keydown',(e)=>{
//preventing default action of arrow keys
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)) {
        e.preventDefault();
    }
});

//for removing zeros from the tiles
function removeZero(row){
    return row.filter(num=>num!=0);
}

// for adding the  numbers of rows 
function slide(row){
    row=removeZero(row);
    for(let i=0;i<row.length;i++){
        if(row[i]==row[i+1]){
            row[i]*=2;
            score+=row[i];
            row[i+1]=0;
        }

    }
    row=removeZero(row);
    while(row.length<columns){
        row.push(0);
    }
return row;
}

//for sliding the tiles
function slideLeft(){
    for(let r=0;r<rows;r++){
        let row=board[r];
        row=slide(row);
        board[r]=row;
        for(let c=0;c<columns;c++){
            let tile=document.getElementById(r+"."+c);
            let num=board[r][c];
            update_tile(tile,num);
        }
    }
}function slideRight(){
    for(let r=0;r<rows;r++){
        let row=board[r];
        row.reverse();
        row=slide(row);
         row.reverse();
        board[r]=row;
        for(let c=0;c<columns;c++){
            let tile=document.getElementById(r+"."+c);
            let num=board[r][c];
            update_tile(tile,num);
        }
    }
}
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        col = slide(col);
        for (let r = 0; r < rows; r++) {
            board[r][c] = col[r];
            let tile = document.getElementById(r + "." + c);
            update_tile(tile, board[r][c]);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        col.reverse();
        col = slide(col);
        col.reverse();
        for (let r = 0; r < rows; r++) {
            board[r][c] = col[r];
            let tile = document.getElementById(r + "." + c);
            update_tile(tile, board[r][c]);
        }
    }
}

function set_two() {
    if (!hasEmptyTile()){
        alert("Game Over! Your score is: " + score);
        window.location.href="index.html"; // reload the game
       
           return;

    } else{let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r + "." + c);
            update_tile(tile, 2); // use the tile update function
            found = true;
        }
    }
}
}

function hasEmptyTile() {
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]==0){
                return true;
            }
        }
    }
    return false;
}

