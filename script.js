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
let $selectedBlock = null;
let $selectedNumber = null;

function render() {
  $board.innerHTML = '';
  
  for (let i = 0; i < 9; i++) {
    const $block = document.createElement('div');
    $block.className = 'wrap-block';
  
    for (let j = 0; j < 9; j++) {
      const row = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      const col = (i % 3) * 3 + (j % 3);
  
      const cellValue = sudoku[row][col];
      const $cell = document.createElement('p');
      $cell.className = `cell row-cell-${i + 1} col-cell-${j + 1}`;
  
      if (cellValue !== 0) {
        $cell.textContent = cellValue;
      }
  
      $cell.addEventListener('click', (e) => {
        const $clickedCell = e.target;
        
        if ($selectedBlock !== null && $selectedBlock !== $clickedCell) {
          // 이미 선택한 셀이 있을 경우 처리
          if ($selectedNumber !== null) {
            $selectedBlock.textContent = $selectedNumber;
            $selectedNumber = null;
            // 이미 선택된 셀이 있는 상태에서 숫자 버튼을 클릭한 경우, 선택된 셀의 내용을 $selectedNumber로 업데이트하고 변수를 초기화함
          }
          $selectedBlock.classList.remove('cell-select');
          $selectedBlock.classList.remove('cell-select-empty');
          $selectedBlock.parentElement.classList.remove(`wrap-block-${$selectedBlock.classList[2].split('-')[2]}`);
          // `wrap-block-${$selectedBlock.classList[1].split('-')[2]}`
          // $selectedBlock.classList[1] 셀랙트블록의 2번째 클래스 이름 가져옴 cell / row-cell-${i+1} / ...
          // split '-' 기준으로 나누고 3번째 요소 가져옴
          $selectedBlock.classList.remove('row-cell-selected');
          $selectedBlock.classList.remove('col-cell-selected');
        }
  
        if (cellValue === 0) {
          $selectedBlock = $clickedCell;
          $clickedCell.classList.add('cell-select-empty');
          $clickedCell.parentElement.classList.add(`wrap-block-${$clickedCell.classList[2].split('-')[2]}`);
          $clickedCell.classList.add('row-cell-selected');
          $clickedCell.classList.add('col-cell-selected');
        } else {
          $selectedBlock = $clickedCell;
          $clickedCell.classList.add('cell-select');
          $clickedCell.parentElement.classList.add(`wrap-block-${$clickedCell.classList[2].split('-')[2]}`);
          $clickedCell.classList.add('row-cell-selected');
          $clickedCell.classList.add('col-cell-selected');
        }
      });
  
      $block.appendChild($cell);
    }
  
    $board.appendChild($block);
  }
  
  const $numberButtons = document.querySelectorAll('.item-num');
  $numberButtons.forEach($button => {
    $button.addEventListener('click', () => {
      $selectedNumber = $button.textContent;
      // 클릭한 버튼의 내용(텍스트콘텐트)을 $selectedNumber 변수에 저장함
      if ($selectedBlock !== null && $selectedNumber !== null) { // 선택한 셀과 선택한 숫자가 유효한 경우에
        $selectedBlock.textContent = $selectedNumber;
        // 선택한 셀의 내용을 $selectedBlock 변수에 저장한 숫자로 업데이트함
        $selectedBlock.classList.remove('cell-select-empty');
        $selectedBlock.classList.add('cell-select-clear')
      }
    });
  });
  }
  // 좌표를 준다 [1,1] 선택했을때 랜더 화면을 보여줌??
  // 클릭했을때마다 클래스가 추가되고 빠지고 해야함
  // 클릭했을때 타겟으로 받아서
  // wrap-block을 숫자를 다 붙임 -1 -2 이런 식으로 클래스값을 추가했다 뺐다... 클래스에는 색칠한걸로 변경
  // 열도 다 숫자를 붙임 행도 숫자를 다 붙임 행 가리키는 셀 열 가리키는 셀 이런식으로 따로 클래스 여러개 만들기!
  // 클릭했을때 이벤트 다 보이게 다 해오기
  
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
    const emptyIndex = [];
    let emptyCount = 0;

    while(emptyCount < num){
      const row = randomNum(9);
      const col = randomNum(9);

      if(sudoku[row][col] !== 0){
        emptyIndex.push([row],[col]);
        sudoku[row][col] = 0;
        emptyCount++;
      }
    }
    return emptyIndex;
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
//execute(rotate, randomNum(4))
randomErase(25)
render()

// 랜덤함수 전부 모아서 크리에이트(가제)라는 함수를 만들기???
// 클릭했을때 css를 바꾸는 형식으로 구현 ::애프터 << 1순위
// 코드 리팩토링 하기 << 2순위
// 빈칸 만들기 << 3순위