import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CodePlayground from "./CodePlayground";

const SPRING = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const BUBBLE_SORT_CODE = `async function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare arr[j] and arr[j+1]
      if (arr[j] > arr[j + 1]) {
        // Swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;

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
    <div className="flex flex-col xl:flex-row gap-8 w-full max-w-7xl mx-auto p-4">
      {/* Left Column: Visualization */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-gray-800">Bubble Sort</h2>
          <p className="text-gray-600">
            Compare adjacent elements and swap them if they are in the wrong order. 
            The largest elements "bubble" to the top.
          </p>
        </div>

        <div className="flex items-end justify-center gap-2 h-96 w-full bg-white rounded-xl p-8 shadow-xl border border-gray-100">
          {array.map((value, index) => {
            let color = "bg-blue-500";
            if (sorted.includes(index)) color = "bg-green-500";
            else if (swapping.includes(index)) color = "bg-red-500";
            else if (comparing.includes(index)) color = "bg-yellow-400";

            return (
              <motion.div
                key={index}
                layout
                transition={SPRING}
                className={`w-full max-w-[40px] rounded-t-md ${color} shadow-sm`}
                style={{ height: `${value * 5}px` }}
              >
                <span className="hidden">{value}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="flex gap-4">
          <button
            onClick={generateArray}
            disabled={sorting}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 font-semibold transition-colors flex-1"
          >
            Reset Array
          </button>
          <button
            onClick={handleSort}
            disabled={sorting}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold shadow-lg shadow-blue-200 transition-colors flex-1"
          >
            {sorting ? "Sorting..." : "Start Sorting"}
          </button>
        </div>
      </div>

      {/* Right Column: Code Playground */}
      <div className="flex-1 flex flex-col gap-4">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Code</h3>
            <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">Read-Only Demo</span>
         </div>
         <CodePlayground code={BUBBLE_SORT_CODE} />
         
         <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm font-semibold text-gray-500 uppercase mb-1">Time Complexity</div>
                <div className="text-xl font-bold text-gray-900">O(n²)</div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="text-sm font-semibold text-gray-500 uppercase mb-1">Space Complexity</div>
                <div className="text-xl font-bold text-gray-900">O(1)</div>
            </div>
         </div>
      </div>
    </div>
  );
}
