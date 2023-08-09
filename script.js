let sudoku = [
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
    $board.innerHTML = ''; // 스도쿠 보드 초기화
  
    for (let i = 0; i < 9; i++) {
      const $block = document.createElement('div');
      $block.classList.add('wrap-block');
  
      for (let j = 0; j < 9; j++) {
        const row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        // Math.floor(i / 3) * 3 은 스도쿠 보드 내에서 현재 블록의 첫번째 행 인덱스를 나타냄 0,3,6 중 하나의 값을 가짐 블록을 구분하기 위해 사용
        // Math.floor(j / 3); 은 현재 블록 내에서 셀의 열 인덱스를 구하는데 사용됌
        const col = (i % 3) * 3 + (j % 3); 
        //i % 3 : 현재 블록 내에서 몇 번째 블록의 행에 위치하는지를 나타내는 값
        //j % 3 : 현재 블록 내에서 몇 번째 블록의 열에 위치하는지를 나타내는 값
        // 현재 블록 내부에서 각 셀의 열 위치를 나타내는 값을 가지게 된다

        const cellValue = sudoku[row][col];
        const $cell = document.createElement('p');
        $cell.classList.add('cell');
        if (cellValue !== 0) $cell.textContent = cellValue;
        $block.appendChild($cell);
      }
  
      $board.appendChild($block);
    }
  }
  
  function randomNum(num){
    return Math.floor(Math.random()* num)
  }
  // 랜덤한 정수 생성하는 함수 0 ~ (num -1)

  function execute(func, count){
    if(count === 0) return
    func()
    return execute(func, count-1)
  }
  // func라는 함수를 count 횟수만큼 호출함 카운트가 0이 되면 멈춤
  
  function rowSwap(num) {
    for (let i = 0; i < num; i++) {
      const blockIndex = randomNum(3) * 3;
      // 블록인덱스가 어떤 기능하는지 주석 달기

      const row1 = blockIndex + randomNum(3);
      let row2
   
      while (true) {
        row2 = blockIndex + randomNum(3);
        if(row1 !== row2) break;
      }
  
      [sudoku[row1], sudoku[row2]] = [sudoku[row2], sudoku[row1]];
  
    }
  }
  
  function colSwap(num) {  
    for (let i = 0; i < num; i++) {
      const blockIndex = randomNum(3) * 3;
  
      const col1 = blockIndex * 3 + randomNum(3);
      let col2
  
      while (true) {
        col2 = blockIndex * 3 + randomNum(3);
        if(col1 !== col2) break;
      }
  
      for (let j = 0; j < 9; j++) {
        const temp = sudoku[j][col1];
        sudoku[j][col1] = sudoku[j][col2];
        sudoku[j][col2] = temp;
      }

    }
  }
  

  function rowBlockSwap(num) {
    for (let i = 0; i < num; i++) {
      const blockIndex1 = randomNum(3) * 3;
      let blockIndex2

      while(true){
        blockIndex2 = randomNum(3) * 3;
        if(blockIndex1 !== blockIndex2) break;
      }

      const temp = sudoku.slice(blockIndex1, blockIndex1 + 3);
      sudoku.splice(blockIndex1, 3, ...sudoku.slice(blockIndex2, blockIndex2 + 3));
      sudoku.splice(blockIndex2, 3, ...temp);
    }
  }

  function colBlockSwap(num) {
    for (let i = 0; i < num; i++) {
      const blockIndex1 = randomNum(3) * 3;
      let blockIndex2;
  
      while (true) {
        blockIndex2 = randomNum(3) * 3;
        if (blockIndex1 !== blockIndex2) break;
      }
  
      for (let j = 0; j < 9; j++) {
        [sudoku[j][blockIndex1], sudoku[j][blockIndex2]] = [sudoku[j][blockIndex2], sudoku[j][blockIndex1]];
        [sudoku[j][blockIndex1 + 1], sudoku[j][blockIndex2 + 1]] = [sudoku[j][blockIndex2 + 1], sudoku[j][blockIndex1 + 1]];
        [sudoku[j][blockIndex1 + 2], sudoku[j][blockIndex2 + 2]] = [sudoku[j][blockIndex2 + 2], sudoku[j][blockIndex1 + 2]];
      }
    }
  }
  
  
  function randomSwap(num) {
    for (let i = 0; i < num; i++) {
      const num1 = randomNum(9) + 1;
      let num2;
      
      while(true){
        num2 = randomNum(9) + 1;
        if(num1 !== num2) break;
      }

      for (let j = 0; j < 9; j++) {
        const num1Index = sudoku[j].indexOf(num1);
        const num2Index = sudoku[j].indexOf(num2);
  
        const temp = sudoku[j][num1Index];
        sudoku[j][num1Index] = sudoku[j][num2Index];
        sudoku[j][num2Index] = temp;
        
      }
    }
  }  
  

  function rotate() {
 //while문으로 바꾸기, 재귀함수로 쓰는 방법도 있음
      // 호출할 때 여러번 호출하는 함수로...?
      const rotated = Array.from({ length: 9 }, () => Array(9).fill(0));
  
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          rotated[i][j] = sudoku[9 - j - 1][i];
        }
      }
  
      sudoku = rotated;
  
  } 

  function randomErase(num){
    for(let i = 0; i < num; i++){
      
    }
  }

  // 함수에서 하나의 기능만 하게...

// :3줄 안에서 1줄씩 바꾸기(행)
// :3줄 안에서 1줄씩 바꾸기
// : 3줄(단)간격(행)
// : 3줄(단)간격(열)
// : 랜덤숫자2개 바꾸기
// : 회전하기


//rowSwap(3)
//colSwap(2)
//rowBlockSwap(2)
//colBlockSwap(2)
//randomSwap(2)
//rotate()
execute(rotate, randomNum(4))
render()

// 랜덤함수 전부 모아서 크리에이트(가제)라는 함수를 만들기???
// 클릭했을때 css를 바꾸는 형식으로 구현 ::애프터 << 1순위
// 코드 리팩토링 하기 << 2순위
// 빈칸 만들기 << 3순위