let playertext = document.getElementById('playertext')
let restartbtn = document.getElementById('restartbtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerindicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_Text = "O"
const X_Text = "X"
let currentplayer = X_Text
let spaces = Array(9).fill(null)
let count_plays = 0
const startgame = () => {
    boxes.forEach(box => box.addEventListener('click', boxclicked))
}
function boxclicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentplayer
        e.target.innerText = currentplayer
        if (playerHasWon() !== false) {
            playertext = `${currentplayer} has won!`
            document.getElementById('playertext').innerText = playertext
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerindicator)
            return
        }
        else {
            let isDraw = true
            for(var i=0; i<9; i++) {
                if(spaces[i] == null) {
                    isDraw = false
                }
            }
            if(isDraw) {
                playertext = `It's a Draw!!`
                // box.style.color ='#f2c14e'
                document.getElementById('playertext').innerText = playertext
            }
        }
        currentplayer = currentplayer == X_Text ? O_Text : X_Text
    }
}
const winningcombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
]
function playerHasWon() {
    for (const condition of winningcombos) {
        let [a, b, c] = condition

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a, b, c]
        }
    }
    return false
}

restartbtn.addEventListener('click', restart);
function restart() {
    spaces.fill(null)
    count_plays = 0
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
        
    })
    playertext = 'Tic Tac Toe'
    document.getElementById('playertext').innerText = playertext
    currentplayer = X_Text
}
startgame()
