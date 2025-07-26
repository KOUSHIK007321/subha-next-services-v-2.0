// components/DraggableGridWithToast.jsx
"use client";
import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast, { Toaster } from "react-hot-toast";

// Sortable item component
const SortableItem = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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

const DraggableGridWithToast = () => {
  // Default items if no saved state exists
  const defaultItems = [
    { id: "item-1", content: "Item 1" },
    { id: "item-2", content: "Item 2" },
    { id: "item-3", content: "Item 3" },
    { id: "item-4", content: "Item 4" },
    { id: "item-5", content: "Item 5" },
    { id: "item-6", content: "Item 6" },
    { id: "item-7", content: "Item 7" },
    { id: "item-8", content: "Item 8" },
    { id: "item-9", content: "Item 9" },
  ];

  // State for items
  const [items, setItems] = useState(defaultItems);

  // State for tracking if data is loading
  const [isLoading, setIsLoading] = useState(true);

  // Load saved positions on component mount
  useEffect(() => {
    const loadSavedPositions = () => {
      try {
        // Try to get saved positions from localStorage
        const savedItems = localStorage.getItem("gridItems");

        if (savedItems) {
          setItems(JSON.parse(savedItems));
        }
      } catch (error) {
        console.error("Error loading saved positions:", error);
        toast.error("Failed to load saved positions");
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedPositions();
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
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Save the current positions
  const savePositions = () => {
    const saveToast = toast.loading("Saving positions...");

    try {
      // Save to localStorage
      localStorage.setItem("gridItems", JSON.stringify(items));

      // Update toast to success
      toast.success("Grid positions saved successfully!", {
        id: saveToast,
      });

      // In a real app with API:
      // const saveToAPI = async () => {
      //   try {
      //     const response = await fetch('/api/save-grid-positions', {
      //       method: 'POST',
      //       headers: { 'Content-Type': 'application/json' },
      //       body: JSON.stringify({ items }),
      //     });
      //
      //     if (response.ok) {
      //       toast.success('Grid positions saved successfully!', {
      //         id: saveToast,
      //       });
      //     } else {
      //       toast.error('Failed to save positions', {
      //         id: saveToast,
      //       });
      //     }
      //   } catch (error) {
      //     toast.error('Error connecting to server', {
      //       id: saveToast,
      //     });
      //   }
      // };
      //
      // saveToAPI();
    } catch (error) {
      console.error("Error saving positions:", error);
      toast.error("Failed to save positions", {
        id: saveToast,
      });
    }
  };

  // Reset positions to default
  const resetPositions = () => {
    const resetToast = toast.loading("Resetting positions...");

    try {
      setItems(defaultItems);
      localStorage.removeItem("gridItems");

      toast.success("Grid positions reset to default", {
        id: resetToast,
      });
    } catch (error) {
      console.error("Error resetting positions:", error);
      toast.error("Failed to reset positions", {
        id: resetToast,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto flex justify-center">
        <div className="text-gray-600">Loading saved grid layout...</div>
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
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "#22c55e", // Green background for success
            },
          },
          error: {
            style: {
              background: "#ef4444", // Red background for errors
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
          items={items.map((item) => item.id)}
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

export default DraggableGridWithToast;
