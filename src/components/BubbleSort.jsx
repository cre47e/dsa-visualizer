import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SPRING = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

export default function BubbleSort() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [comparing, setComparing] = useState([]); // indices being compared
  const [swapping, setSwapping] = useState([]); // indices being swapped
  const [sorted, setSorted] = useState([]); // indices that are sorted

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 15 }, () =>
      Math.floor(Math.random() * 50) + 10
    );
    setArray(newArray);
    setSorted([]);
    setComparing([]);
    setSwapping([]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight comparing
        setComparing([j, j + 1]);
        await sleep(300);

        if (arr[j] > arr[j + 1]) {
          // Highlight swapping
          setSwapping([j, j + 1]);
          await sleep(200);

          // Swap
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          
          await sleep(300);
          setSwapping([]);
        }
        setComparing([]);
      }
      // Mark as sorted
      setSorted((prev) => [...prev, n - i - 1]);
    }
    // Mark first element as sorted too
    setSorted((prev) => [...prev, 0]);
    setSorting(false);
  };

  return (
    <div className="flex flex-col items-center p-8 gap-8 w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">Bubble Sort</h2>
        <p className="text-gray-600">The classic "bubbling up" algorithm.</p>
      </div>

      {/* Visualization Area */}
      <div className="flex items-end justify-center gap-2 h-64 w-full bg-gray-50 rounded-xl p-8 shadow-inner">
        {array.map((value, index) => {
          let color = "bg-blue-500";
          if (sorted.includes(index)) color = "bg-green-500";
          else if (swapping.includes(index)) color = "bg-red-500";
          else if (comparing.includes(index)) color = "bg-yellow-400";

          return (
            <motion.div
              key={index} // Using index as key is usually bad for reordering, but okay here if we just swap values in place or track IDs. 
              // Better: Attach IDs to objects. For simple array of numbers, Framer Motion needs layoutId or careful keying. 
              // For this simple v1, we update values in place, so index key + layout might not animate position, just height.
              // Let's rely on height animation for now.
              layout
              transition={SPRING}
              className={`w-8 rounded-t-md ${color} shadow-sm`}
              style={{ height: `${value * 3}px` }}
            >
              <span className="hidden">{value}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={generateArray}
          disabled={sorting}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-medium transition-colors"
        >
          Reset Array
        </button>
        <button
          onClick={handleSort}
          disabled={sorting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium shadow-lg shadow-blue-200 transition-colors"
        >
          {sorting ? "Sorting..." : "Start Sorting"}
        </button>
      </div>
    </div>
  );
}
