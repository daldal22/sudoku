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

function render() {
    $board.innerHTML = '';
  
    const blockSize = 3;
  
    for (let i = 0; i < 9; i += blockSize) {
      for (let j = 0; j < 9; j += blockSize) {
        const $block = document.createElement('div');
        $block.classList.add('wrap-block');
  
        for (let row = i; row < i + blockSize; row++) {
          for (let col = j; col < j + blockSize; col++) {
            const cellValue = sudoku[row][col];
            const $cell = document.createElement('p');
            $cell.classList.add('cell');
            if (cellValue !== 0) $cell.textContent = cellValue;
            $block.appendChild($cell);
          }
        }
  
        $board.appendChild($block);
      }
    }
  }
  
function rowSwap(sudoku, row1, row2) {
  const temp = sudoku[row1];
  sudoku[row1] = sudoku[row2];
  sudoku[row2] = temp;
}

function colSwap(sudoku, col1, col2) {
    for (let i = 0; i < 9; i++) {
      const temp = sudoku[i][col1];
      sudoku[i][col1] = sudoku[i][col2];
      sudoku[i][col2] = temp;
    }
  }

function rowBlockSwap(sudoku, block1Row, block2Row) {
    for (let i = 0; i < 3; i++) {
        const temp = sudoku[block1Row * 3 + i];
        sudoku[block1Row * 3 + i] = sudoku[block2Row * 3 + i];
        sudoku[block2Row * 3 + i] = temp;
    }
}

function colBlockSwap(sudoku, block1Col, block2Col){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 3; j++){
            const temp = sudoku[i][block1Col * 3 + j];
            sudoku[i][block1Col * 3 + j] = sudoku[i][block2Col * 3 + j];
            sudoku[i][block2Col * 3 + j] = temp;
        }
    }
}

function randomSwap(sudoku, num1, num2) {
    for(let i = 0; i < 9; i++){
    const num1Position = sudoku[i].indexOf(num1);
    const num2Position = sudoku[i].indexOf(num2);
  
    if (num1Position !== -1 && num2Position !== -1) {
        const temp = sudoku[i][num1Position];
        sudoku[i][num1Position] = sudoku[i][num2Position];
        sudoku[i][num2Position] = temp;
    }}
  }

  function rotate(sudoku, rotationCount) {
    const rotated = Array.from({ length: 9 }, () => Array(9).fill(0));
  
    for (let k = 0; k < rotationCount; k++) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          rotated[i][j] = sudoku[9 - j - 1][i];
        }
      }
  
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          sudoku[i][j] = rotated[i][j];
        }
      }
    }
  
    return rotated;
  }

// :3줄 안에서 1줄씩 바꾸기(행)
// :3줄 안에서 1줄씩 바꾸기
// : 3줄(단)간격(행)
// : 3줄(단)간격(열)
// : 랜덤숫자2개 바꾸기
// : 회전하기

//rowSwap(sudoku, 0, 2)
//colSwap(sudoku, 0, 1)
//rowBlockSwap(sudoku, 0,1)
//colBlockSwap(sudoku,0,2)
//randomSwap(sudoku, 1,2)
//rotate(sudoku,1)
render()