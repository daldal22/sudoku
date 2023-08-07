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
  
  
  
  function rowSwap(num) {
    const blockArr = [0, 1, 2];
    
    for (let i = 0; i < num; i++) {
      const blockIndex = blockArr.splice(Math.floor(Math.random() * blockArr.length), 1);
  
      const row1 = blockIndex * 3 + Math.floor(Math.random() * 3);
      let row2 = blockIndex * 3 + Math.floor(Math.random() * 3);
      // while문 사용해서 값을 변경할 것이기 때문에 let을 쓴다
  
      while (row2 === row1) {
        row2 = blockIndex * 3 + Math.floor(Math.random() * 3);
      }
  
      [sudoku[row1], sudoku[row2]] = [sudoku[row2], sudoku[row1]];
  
      blockArr.push(blockIndex);
    }
  }
  
  

  function colSwap(num) {
    const blockArr = [0, 1, 2];
    
    for (let i = 0; i < num; i++) {
      const blockIndex = blockArr.splice(Math.floor(Math.random() * 3), 1);
  
      const col1 = blockIndex * 3 + Math.floor(Math.random() * 3);
      let col2 = blockIndex * 3 + Math.floor(Math.random() * 3);
  
      while (col2 === col1) {
        col2 = blockIndex * 3 + Math.floor(Math.random() * 3);
      }
  
      for (let j = 0; j < 9; j++) {
        const temp = sudoku[j][col1];
        sudoku[j][col1] = sudoku[j][col2];
        sudoku[j][col2] = temp;
      }
  
      blockArr.push(blockIndex);
    }
  }
  

  function rowBlockSwap(num) {
    for (let k = 0; k < num; k++) {
      const blockArr = [0, 1, 2];
      const blockIndex1 = blockArr.splice(Math.floor(Math.random() * 3), 1);
      // Math.random으로 0, 1, 2 중에서 랜덤하게 정수를 생성한다 랜덤으로 선택한 인덱스의 요소를 1개 제거한다 (선택되지 않게하기 위함)
      const blockIndex2 = blockArr[Math.floor(Math.random() * 2)];
      // 남은 인덱스 중에 무작위로 선택된다 이에 해당하는 배열 요소를 선택함 결론은 단 한개의 배열 요소를 랜덤으로 선택하기 위함
      const temp = sudoku.slice(blockIndex1 * 3, blockIndex1 * 3 + 3);
      // 블록인덱스1 *3으로 첫번째 블록 인덱스에 해당하는 행의 시작 위치를 나타냄 / 블록인덱스1 *3 +3 으로 행의 끝의 위치를 나타냄
      sudoku.splice(blockIndex1 * 3, 3, ...sudoku.slice(blockIndex2 * 3, blockIndex2 * 3 + 3));
      // blockIndex2 * 3, blockIndex2 * 3 + 3 으로 두 번째 블록에 해당하는 3개의 행을 잘라내어 새로운 배열을 만듦
      // ...sudoku.slice()함으로써 값을 추출해서 개별적으로 만듦
      // 블록인덱스1의 첫번째 행부터 3개의 요소를 제거하고 ...스도쿠(이하생략) 요소를 추가한다
      // 첫 번째 블록의 행들을 두 번째 블록의 행들로 바꿔치기하는 작업을 수행
      sudoku.splice(blockIndex2 * 3, 3, ...temp);
      // temp에 저장해둔 배열을 추가한다
    }
  }

  function colBlockSwap(num) {
    const blockArr = [0, 1, 2];
    for (let i = 0; i < num; i++) {
      const blockIndex1 = blockArr.splice(Math.floor(Math.random() * 3), 1);
      // Math.random으로 0, 1, 2 중에서 랜덤하게 정수를 생성한다 랜덤으로 선택한 인덱스의 요소를 1개 제거한다 (선택되지 않게하기 위함)
      const blockIndex2 = blockArr[Math.floor(Math.random() * 2)];
      // blockArr에서 랜덤하게 선택하여 블록인덱스2에 저장함
      for (let j = 0; j < 9; j++) {
        [sudoku[j][blockIndex1 * 3], sudoku[j][blockIndex2 * 3]] = [sudoku[j][blockIndex2 * 3], sudoku[j][blockIndex1 * 3]];
        // 첫쨰 블록과 두번째 블록의 첫번째 열을 교체함
        [sudoku[j][blockIndex1 * 3 + 1], sudoku[j][blockIndex2 * 3 + 1]] = [sudoku[j][blockIndex2 * 3 + 1], sudoku[j][blockIndex1 * 3 + 1]];
        // 두번째 열 교체
        [sudoku[j][blockIndex1 * 3 + 2], sudoku[j][blockIndex2 * 3 + 2]] = [sudoku[j][blockIndex2 * 3 + 2], sudoku[j][blockIndex1 * 3 + 2]];
        // 세번째 열 교체
        }
      blockArr.push(blockIndex1);
    }
  }
  
  function randomSwap(num) {
    for (let i = 0; i < num; i++) {
      const num1 = Math.floor(Math.random() * 9) + 1;
      const num2 = Math.floor(Math.random() * 9) + 1;
  
      for (let j = 0; j < 9; j++) {
        const num1Position = sudoku[j].indexOf(num1);
        const num2Position = sudoku[j].indexOf(num2);
  
        if (num1Position !== -1 && num2Position !== -1) {
          const temp = sudoku[j][num1Position];
          sudoku[j][num1Position] = sudoku[j][num2Position];
          sudoku[j][num2Position] = temp;
        }
      }
    }
  }  
  

  function rotate(num) {
    for (let k = 0; k < num; k++) {
      const rotated = Array.from({ length: 9 }, () => Array(9).fill(0));
  
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          rotated[i][j] = sudoku[9 - j - 1][i];
        }
      }
  
      sudoku = rotated;
    }
  } 
   // k가 안 쓰임 숫자 넣어도 제대로 안 바뀜 제대로 고쳐서 오기
   // 이거 도저히 k 안 쓰고 못 바꾸겠어요 방법이 안 떠올라요ㅠㅠㅠ

// :3줄 안에서 1줄씩 바꾸기(행)
// :3줄 안에서 1줄씩 바꾸기
// : 3줄(단)간격(행)
// : 3줄(단)간격(열)
// : 랜덤숫자2개 바꾸기
// : 회전하기


//rowSwap(2) //숫자 1을 넣으면 랜덤으로 1~3블럭에서 행들이 1번 바뀌고 4~6, 7~9에서도 행이 1번 바뀌어야함 완전 랜덤으로
//colSwap(2)
//rowBlockSwap(2)
//colBlockSwap(2)
//randomSwap(2)
rotate()
render()

// for문 2중 포문까지
// 랜덤함수 전부 모아서 크리에이트(가제)라는 함수를 만들기???
// 전부 고쳐서 오기
// 목욜날 수업듣고 월요일까지 빈칸 만드는 코드 만들기 (만약 빈칸 만들고 시간 남으면 빈칸 선택된 구역 색 넣는 기능 구현하기)