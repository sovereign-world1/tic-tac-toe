import React from "react"
import Square from "./Square";
import './Board.css';

const Board = () => {

    const [board, setBoard] = React.useState(Array(9).fill(''))
    const [turn, setTurn] = React.useState('X')
    const [winner, setWinner] = React.useState('')

    React.useEffect(() => {
        const winningPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        let winningPositionIndex = 0
        let newWinner = ''

        while (winningPositionIndex < winningPositions.length && !newWinner) {
            const boardPositionToCheck = winningPositions[winningPositionIndex]
            const boardValuesToCheck = boardPositionToCheck.map(index => board[index])
            const checkingValue = boardValuesToCheck[0]
            const isFinished = boardValuesToCheck.every((value) => value === checkingValue && checkingValue)
            newWinner = isFinished ? checkingValue : null
            winningPositionIndex++
        }
        if (newWinner) {
            setWinner(newWinner === 'X' ? 'ИГРОК 1' : 'ИГРОК 2')
        }

    }, [board])

    const handleClick = (index) => {
        if (index < 0 || index > 9 || board[index] || winner) return
        const newBoard = [...board]
        newBoard.splice(index, 1, turn)
        setBoard(newBoard)
        const newTurn = turn === 'X' ? '0' : 'X'
        setTurn(newTurn)
    }

    const handleRestart = () => {
        setBoard(Array(9).fill(''))
        setWinner('')
    }

    return (
        <div className='container'>
            <h1>Крестики-нолики</h1>
            {winner && <h2>Победитель: {winner} ({turn === 'X' ? '0' : 'X'})</h2>}
            <div className='board'>
                {board.map((elem, index) => (
                    <Square key={index} value={elem} index={index} handleClick={handleClick}/>
                ))}
            </div>
            <button onClick={handleRestart} className='restart'>Начать заново</button>
        </div>
    )
}

export default Board;