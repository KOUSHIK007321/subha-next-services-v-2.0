"use client";

// components/DraggableGrid.jsx
import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable item component
const SortableItem = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 rounded-lg shadow-md
                 flex items-center justify-center
                 h-32 cursor-grab bg-white border-2 
                 border-gray-200 transition-colors 
                 duration-200 hover:border-blue-400"
    >
      <p className="text-lg font-medium">{content}</p>
    </div>
  );
};

const DraggableGrid = () => {
  // Initial items state
  const [items, setItems] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
    { id: 'item-5', content: 'Item 5' },
    { id: 'item-6', content: 'Item 6' },
    { id: 'item-7', content: 'Item 7' },
    { id: 'item-8', content: 'Item 8' },
    { id: 'item-9', content: 'Item 9' },
  ]);
  
  // State for save success message
  const [saveStatus, setSaveStatus] = useState(null);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
      
      // Reset save status when items are moved
      if (saveStatus) {
        setSaveStatus(null);
      }
    }
  };

  // Save the current positions
  const savePositions = () => {
    // Here you would typically save to a database or localStorage
    // For demonstration, we'll just show a success message
    
    // Save to localStorage as an example
    localStorage.setItem('gridItems', JSON.stringify(items));
    
    // Show save success message
    setSaveStatus('success');
    
    // You could also send to an API endpoint:
    // const saveToAPI = async () => {
    //   try {
    //     const response = await fetch('/api/save-grid-positions', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ items }),
    //     });
    //     
    //     if (response.ok) {
    //       setSaveStatus('success');
    //     } else {
    //       setSaveStatus('error');
    //     }
    //   } catch (error) {
    //     setSaveStatus('error');
    //     console.error('Error saving positions:', error);
    //   }
    // };
    // 
    // saveToAPI();
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Draggable Grid</h2>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items.map(item => item.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-3 gap-4 mb-6">
            {items.map((item) => (
              <SortableItem key={item.id} id={item.id} content={item.content} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      {/* Save button */}
      <div className="flex flex-col items-center mt-6">
        <button
          onClick={savePositions}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                     hover:bg-blue-700 transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Current Positions
        </button>
        
        {/* Status message */}
        {saveStatus === 'success' && (
          <div className="mt-4 py-2 px-4 bg-green-100 text-green-800 rounded-md">
            Grid positions saved successfully!
          </div>
        )}
        {saveStatus === 'error' && (
          <div className="mt-4 py-2 px-4 bg-red-100 text-red-800 rounded-md">
            Error saving grid positions. Please try again.
          </div>
        )}
      </div>
    </div>
  );
};

export default DraggableGrid;