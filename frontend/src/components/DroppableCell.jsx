import { useDrop } from 'react-dnd';

const DroppableCell = ({ onDrop, children, cellId }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'number',
    drop: (item, monitor) => onDrop(cellId, item.number),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-16 h-16 border flex justify-center items-center text-2xl ${isOver ? 'bg-gray-200' : 'bg-white'}`}
    >
      {children}
    </div>
  );
};

export default DroppableCell;
