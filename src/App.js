import React ,{useState} from 'react';

import './App.css';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';




function App() {

  const WIN_CONDITION =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const [board,setBoard]=useState(Array(9).fill(null));
  const [xPlaying,setxPlaying]=useState(true);
  const [score,setScore]=useState({xScore:0,oScore:0})
  const [gameOver,setGameOver]=useState(false)
  


  const handleBoxClick =(boxId)=>{
    const updatedBoard =board.map((value,idx)=>{
      if (idx==boxId){
        return xPlaying === true ?"X":"O";
      }else{
        return value;
      }
    })
    setBoard(updatedBoard);

    const winner=checkWinner(updatedBoard);

    if (winner){

      if(winner=="O"){
        let {oScore}=score;
        oScore +=1
        setScore({...score,oScore})
      }else{
        let {xScore}=score;
        xScore +=1
        setScore({...score,xScore})

      }
      console.log(score)
    }

    setxPlaying(!xPlaying);
  }



  const resetBoard=()=>{
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  const checkWinner= ( board ) => {
    for(let i=0;i<WIN_CONDITION.length;i++)
    {
      const [x,y,z]=WIN_CONDITION[i];

      if(board[x] && board[x]===board[y]&& board[y]==board[z]){
        setGameOver(true)
        return board[x];
      }
    }
  }


  return (
    <div className="App">
      <ScoreBoard score={score} xPlaying={xPlaying}></ScoreBoard>
      <Board board={board} onClick={gameOver? resetBoard :handleBoxClick} ></Board>
      <ResetButton resetBoard={resetBoard}></ResetButton>
    </div>
  );
}

export default App;
