// pages/index.js or app/page.js
import DraggableGridWithAPI from '@/components/DraggableGridWithPersistence';

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Drag & Drop Grid</h1>
      <DraggableGridWithAPI />
    </div>
  );
}