import BubbleSort from "./components/BubbleSort";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          DSA Visualizer
        </h1>
        <p className="text-lg text-gray-500">
          Interactive Data Structures & Algorithms
        </p>
      </header>

      <main className="w-full">
        <BubbleSort />
      </main>
      
      <footer className="mt-16 text-gray-400 text-sm">
        Built with React, Tailwind & Framer Motion
      </footer>
    </div>
  );
}

export default App;
