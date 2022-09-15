import '../style/grid.css'

export const MM_LETTER_STATE_TBD = 0
export const MM_LETTER_STATE_INWORD_INPLACE = 1
export const MM_LETTER_STATE_INWORD_NOTINPLACE = 2
export const MM_LETTER_STATE_NOTINWORD = 3

function Grid({ rows, currentRowIndex, currentCellIndex }) {

  return (
    <div id="mm-grid">
      {
        rows.map((row, rowIndex) => {
          const selectedCellIndex = (rowIndex === currentRowIndex ? currentCellIndex : -1)
          return (
            <div className="mm-gridrow" key={rowIndex}>
            {
              row.map((cell, cellIndex) => {
                let gridClassName = "mm-gridcell"
                switch(cell.state) {
                  case MM_LETTER_STATE_TBD: gridClassName += " mm-gridcell-tbd"
                  break
                  case MM_LETTER_STATE_INWORD_INPLACE: gridClassName += " mm-gridcell-inword-inplace"
                  break
                  case MM_LETTER_STATE_INWORD_NOTINPLACE: gridClassName += " mm-gridcell-inword-notinplace"
                  break
                  case MM_LETTER_STATE_NOTINWORD: gridClassName += " mm-gridcell-notinword"
                  break
                  default:
                }
                if (cellIndex === selectedCellIndex) {
                  return <div className={gridClassName} key={`${rowIndex}-${cellIndex}`}><span className="mm-gridcell-letter">{cell.letter}</span><span className="mm-gridcell-selected"></span></div>
                } else {
                  return <div className={gridClassName} key={`${rowIndex}-${cellIndex}`}><span className="mm-gridcell-letter">{cell.letter}</span></div>
                }
              })
            }
            </div>
          )
        })
      }
    </div>
  )
}

export default Grid