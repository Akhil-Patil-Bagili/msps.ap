import React, { useState } from 'react';
import DraggableNumber from './DraggableNumber';
import DroppableCell from './DroppableCell';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const PuzzleBoard = () => {
  const initialNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [puzzle, setPuzzle] = useState(Array(9).fill(null));
  let [availableNumbers, setAvailableNumbers] = useState([...initialNumbers]);

  // const handleDrop = (targetCellId, droppedNumber, originCellId) => {
  //   let newPuzzle = puzzle;
    
  //   if (originCellId !== undefined) {
  //     // If originCellId is provided, we're swapping numbers within the puzzle
  //     const numberAtTargetCell = newPuzzle[targetCellId];
  //     newPuzzle[targetCellId] = droppedNumber;
  //     newPuzzle[originCellId] = numberAtTargetCell;
  //   } else {
  //     // This part handles dropping a new number into the puzzle
  //     if (newPuzzle[targetCellId] === null) {
  //       newPuzzle[targetCellId] = droppedNumber;
  //       // Remove the number from available numbers only if it's not already in the puzzle
  //       if (!newPuzzle.includes(droppedNumber)) {
  //         availableNumbers = availableNumbers.filter(num => num !== droppedNumber);
  //         setAvailableNumbers(availableNumbers);
  //       }
  //     } else {
  //       // If dropping on a cell that already has a number, we swap them if it's from the available numbers
  //       if (!newPuzzle.includes(droppedNumber)) {
  //         const temp = newPuzzle[targetCellId];
  //         newPuzzle[targetCellId] = droppedNumber;
  //         // Put the swapped out number back into available numbers
  //         availableNumbers = availableNumbers.concat(temp).sort((a, b) => a - b);
  //         availableNumbers = availableNumbers.filter(num => num !== droppedNumber);
  //         setAvailableNumbers(availableNumbers);
  //       }
  //     }
  //   }

  //   setPuzzle(newPuzzle);
  // };

  const handleDrop = (cellId, droppedNumber, isDraggingOut=  false) => {
    let newPuzzle = puzzle;
    let temp = 0

    if(isDraggingOut){
      if (newPuzzle[cellId] !== null) {
        availableNumbers.push(newPuzzle[cellId]);
        newPuzzle[cellId] = null;
        setAvailableNumbers(availableNumbers);
      }
    }

   else if(newPuzzle[cellId] === null)
    {
      newPuzzle[cellId] = droppedNumber;
      availableNumbers = availableNumbers.filter(num => num !== droppedNumber);
      setAvailableNumbers(availableNumbers);
    }

    else{
        temp = newPuzzle[cellId];
        newPuzzle[cellId] = droppedNumber;
        console.log(droppedNumber);
        availableNumbers = availableNumbers.filter(num => num !== droppedNumber).concat(temp).sort((a, b) => a - b); 
        setAvailableNumbers(availableNumbers);
    }

    setPuzzle(newPuzzle);

   
    // console.log(availableNumbers)

    
  };

 return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen items-center justify-center">
        <div>
          <div className="grid grid-cols-3 gap-2">
            {puzzle.map((number, index) => (
              <DroppableCell key={index} cellId={index} onDrop={handleDrop}>
                {number && <DraggableNumber id={number} number={number} />}
              </DroppableCell>
            ))}
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {availableNumbers.map((number) => (
              <DraggableNumber key={number} id={number} number={number} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};