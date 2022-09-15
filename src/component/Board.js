import Header from './Header'
import Grid, { MM_LETTER_STATE_INWORD_NOTINPLACE, MM_LETTER_STATE_INWORD_INPLACE, MM_LETTER_STATE_NOTINWORD, MM_LETTER_STATE_TBD } from './Grid'
import Keyboard, { MM_KB_BACKSPACE, MM_KB_RETURN, MM_KB_JOKER } from './Keyboard'
import '../style/board.css'
import { useEffect, useState } from 'react'
import word from '../data/word.js'

function Board() {

  const [ rows, setRows ] = useState(
    [0, 1, 2, 3, 4, 5].map(
      (rowIndex) => {
        return Array.from(word).map(
          (letter, letterIndex) => {
            const cellLetter = rowIndex === 0 && letterIndex === 0 ? letter : '.'
            const cellState = rowIndex === 0 && letterIndex === 0 ? MM_LETTER_STATE_INWORD_INPLACE : MM_LETTER_STATE_TBD
            return { letter: cellLetter, state: cellState }
          })
      }
    )
  );
  const [ currentRowIndex, setCurrentRowIndex ] = useState(0)
  const [ currentLetterIndex, setCurrentLetterIndex ] = useState(1)
  const [ gameStep, setGameStep ] = useState('CONTINUE')

  function onLetterPressed(letter) {
    const newRows = rows.slice()
    const currentRow = newRows[currentRowIndex]
    if (letter === MM_KB_BACKSPACE) {
      currentRow[currentLetterIndex] = { letter: '.', state: MM_LETTER_STATE_TBD }
      if (currentLetterIndex > 1) {
        setCurrentLetterIndex(currentLetterIndex - 1)
      }
    } else if (letter === MM_KB_RETURN) {
      if (currentRow.find(cell => cell.letter === '.') !== undefined) {
        alert("Le mot n'est pas complet !")
      } else {
        let wordFetched = word
        for(let cellIndex = 0; cellIndex < currentRow.length; cellIndex++) {
          const cell = currentRow[cellIndex]
          if (cell.letter === wordFetched[cellIndex]) {
            cell.state = MM_LETTER_STATE_INWORD_INPLACE
            wordFetched = wordFetched.substring(0, cellIndex) + MM_KB_JOKER + wordFetched.substring(cellIndex + 1)
            continue
          }
          const letterInWordFetchedIndex = wordFetched.indexOf(cell.letter)
          if (letterInWordFetchedIndex > -1) {
            cell.state = MM_LETTER_STATE_INWORD_NOTINPLACE
            wordFetched = wordFetched.substring(0, letterInWordFetchedIndex) + MM_KB_JOKER + wordFetched.substring(letterInWordFetchedIndex + 1)
            continue
          }
          cell.state = MM_LETTER_STATE_NOTINWORD
        }
        if (currentRow.find(cell => cell.state !== MM_LETTER_STATE_INWORD_INPLACE) === undefined) {
          setGameStep('WIN')
        } else if (currentRowIndex < newRows.length - 1) {
          newRows[currentRowIndex + 1][0] = { letter: word[0], state: MM_LETTER_STATE_INWORD_INPLACE }
          setCurrentRowIndex(currentRowIndex + 1)
          setCurrentLetterIndex(1)
        } else {
          setGameStep('LOOSE')
        }
      }
    } else {
      currentRow[currentLetterIndex] = { letter: letter, state: MM_LETTER_STATE_TBD }
      if (currentLetterIndex < (currentRow.length - 1)) {
        setCurrentLetterIndex(currentLetterIndex + 1)
      }
    }
    setRows(newRows)
  }

  useEffect(() => {
    if (gameStep === 'WIN') {
      alert("Bravo !")
    } else if (gameStep === 'LOOSE') {
      alert("Perdu : la solution est " + word)
    }
  })

  return (
    <div id="mm-board">
      <Header />
      <main id="mm-main">
        <Grid rows={rows} currentRowIndex={currentRowIndex} currentCellIndex={currentLetterIndex}/>
        <Keyboard enabled={gameStep === 'CONTINUE'} onLetterPressed={onLetterPressed} />
      </main>
    </div>
  )
}

export default Board