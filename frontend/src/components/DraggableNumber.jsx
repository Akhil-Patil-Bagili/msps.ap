import { useDrag } from 'react-dnd';

const DraggableNumber = ({ id, number }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'number',
    item: { id, number },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="cursor-move w-12 h-12 flex justify-center items-center bg-white-500 text-black text-xl rounded"
    >
      {number}
    </div>
  );
};

export default DraggableNumber;
