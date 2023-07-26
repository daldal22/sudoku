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
    <p class="item-sudoku-block"> </p>
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

function sudokuBoard(value){
    const $board = document.querySelector('.sudoku_session');
    value.forEach((block) => {
        const $block = document.createElement('div');
        $block.classList.add('wrap-block');

        block.forEach((cellValue) => {
            const $cell = document.createElement('p');
            $cell.classList.add('cell');
            if (cellValue !== 0) {
                $cell.textContent = cellValue;
              } else {
                $cell.textContent = '';
              }        
            $block.appendChild($cell);
        })

        $board.appendChild($block);
    })
}
// 
// 랜덤 스도쿠 생성할 때는 줄 단위로 생성하고
// 완성할때 칸단위로 다시 배열을 생성하면 위 코드 쓸 수 있음


sudokuBoard(sudoku)