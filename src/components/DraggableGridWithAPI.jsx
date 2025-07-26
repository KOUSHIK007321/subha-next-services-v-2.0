// components/DraggableGridWithAPI.jsx
'use client';
import { useState, useEffect } from 'react';
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
import toast, { Toaster } from 'react-hot-toast';

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

const DraggableGridWithAPI = () => {
  // Default items if no saved state exists
  const defaultItems = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
    { id: 'item-5', content: 'Item 5' },
    { id: 'item-6', content: 'Item 6' },
    { id: 'item-7', content: 'Item 7' },
    { id: 'item-8', content: 'Item 8' },
    { id: 'item-9', content: 'Item 9' },
  ];
  
  // State for items
  const [items, setItems] = useState(defaultItems);
  
  // State for tracking if data is loading
  const [isLoading, setIsLoading] = useState(true);

  // Load saved positions on component mount
  useEffect(() => {
    const fetchSavedPositions = async () => {
      const loadingToast = toast.loading('Loading saved positions...');
      
      try {
        // Fetch saved positions from API
        const response = await fetch('/api/grid-positions');
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.items && data.items.length > 0) {
            setItems(data.items);
            toast.success('Loaded saved grid layout', {
              id: loadingToast,
            });
          } else {
            // No saved data found
            toast.success('Using default grid layout', {
              id: loadingToast,
            });
          }
        } else {
          // API returned error
          console.error('Failed to fetch saved positions');
          toast.error('Failed to load saved layout', {
            id: loadingToast,
          });
        }
      } catch (error) {
        console.error('Error fetching saved positions:', error);
        toast.error('Error connecting to server', {
          id: loadingToast,
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedPositions();
  }, []);

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
    }
  };

  // Save the current positions to API
  const savePositions = async () => {
    const saveToast = toast.loading('Saving positions...');
    
    try {
      const response = await fetch('/api/grid-positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });
      
      if (response.ok) {
        toast.success('Grid positions saved successfully!', {
          id: saveToast,
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Failed to save positions';
        
        toast.error(errorMessage, {
          id: saveToast,
        });
      }
    } catch (error) {
      console.error('Error saving positions:', error);
      toast.error('Error connecting to server', {
        id: saveToast,
      });
    }
  };

  // Reset positions to default via API
  const resetPositions = async () => {
    const resetToast = toast.loading('Resetting positions...');
    
    try {
      // Set UI state immediately for better UX
      setItems(defaultItems);
      
      // Call API to reset positions
      const response = await fetch('/api/grid-positions/reset', {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('Grid positions reset to default', {
          id: resetToast,
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || 'Failed to reset positions';
        
        toast.error(errorMessage, {
          id: resetToast,
        });
        
        // If API call fails, reload saved positions to maintain consistency
        const savedResponse = await fetch('/api/grid-positions');
        if (savedResponse.ok) {
          const data = await savedResponse.json();
          if (data.items && data.items.length > 0) {
            setItems(data.items);
          }
        }
      }
    } catch (error) {
      console.error('Error resetting positions:', error);
      toast.error('Error connecting to server', {
        id: resetToast,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex justify-center items-center h-64">
        <div className="text-gray-600 text-lg">Loading grid layout...</div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* React Hot Toast container */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#22c55e', // Green background for success
            },
          },
          error: {
            style: {
              background: '#ef4444', // Red background for errors
            },
          },
        }}
      />
      
      <h2 className="text-2xl font-bold mb-6 text-center">Draggable Grid</h2>
      <p className="text-center text-gray-600 mb-6">
        Drag and drop items to rearrange them, then save your layout.
      </p>
      
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
      
      {/* Action buttons */}
      <div className="flex justify-center mt-6">
        <div className="flex space-x-4">
          <button
            onClick={savePositions}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                      hover:bg-blue-700 transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Save Current Positions
          </button>
          
          <button
            onClick={resetPositions}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg
                      hover:bg-gray-300 transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
          >
            Reset to Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableGridWithAPI;