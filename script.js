const sudoku = [
    [8,1,9,4,5,2,3,6,7],
    [2,4,3,8,7,6,5,1,9],
    [7,6,5,1,9,3,8,4,2],
    [1,8,6,3,2,9,7,5,4],
    [5,7,4,6,1,8,9,2,3],
    [3,9,2,5,4,7,6,8,1],
    [4,5,7,9,6,1,2,3,8],
    [6,2,8,7,3,4,1,9,5],
    [9,3,1,2,8,5,4,7,6]
]

{/* <div class="sudoku_session">
<div class="wrap-block">
    <p class="cell"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
    <p class="item-sudoku-block"> </p>
</div>
</div> */}

const $board = document.querySelector('.sudoku_session');
const $number = [1,2,3,4,5,6,7,8,9]



function randomCreate(){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            const randomIndex = Math.floor(Math.random() * $number.length);
            const randomNum = $number[randomIndex];
            sudoku[i][j] = randomNum;
        }
        // 숫자가 랜덤 생성되긴 하는데 중복 숫자가 출력됌
    }
    
}

function render(){
    sudoku.forEach((block) => {
        const $block = document.createElement('div');
        $block.classList.add('wrap-block');

        block.forEach((cellValue) => {
            const $cell = document.createElement('p');
            $cell.classList.add('cell');
            if (cellValue !== 0) $cell.textContent = cellValue;
            else $cell.textContent = '';      
            $block.appendChild($cell);
        })

        $board.appendChild($block);
    })
}



// 랜덤 스도쿠 생성할 때는 줄 단위로 생성하는 코드 작성
// 완성할때 칸단위로 다시 배열을 생성하면 위 코드 쓸 수 있음

// 스도쿠 랜덤 생성 알고리즘 만들어오기 못해도 만들어보고 오답노트 만들기

randomCreate()
render()