import '../style/keyboard.css'

export const MM_KB_BACKSPACE = '\u21E0'
export const MM_KB_RETURN = '\u21B5'
export const MM_KB_JOKER = '\u0000'
export const MM_KEYBOARD_KEYS = [ 'AZERTYUIOP', 'QSDFGHJKLM', `WXCVBN${MM_KB_BACKSPACE}${MM_KB_RETURN}` ]


function Keyboard({ enabled, onLetterPressed }) {

  if (enabled) {
    document.onkeydown = (e) => {
      const keyPressed = e.code === "Backspace" ? MM_KB_BACKSPACE : e.code === "Enter" ? MM_KB_RETURN : e.key.toUpperCase()
      if (MM_KEYBOARD_KEYS.join('').indexOf(keyPressed) > -1) {
        onLetterPressed(keyPressed)
      }
    }
  } else {
    document.onkeydown = null;
  }

  return (
    <div id="mm-keyboard">
      {
        (MM_KEYBOARD_KEYS.map( (row, rowIndex) => (
          <div className="mm-kbrow" key={rowIndex}>
            { Array.from(row).map( (letter, cellIndex) => (<div className="mm-kbletter" onClick={() => enabled && onLetterPressed(letter)} key={`${rowIndex}-${cellIndex}`}><div className="mm-kbletterinside">{letter}</div></div>)) }
          </div>
        )))
      }
    </div>
  )
}

export default Keyboard