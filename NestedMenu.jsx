import { useState } from "react";

export default function NestedMenu() {
  const [history, setHistory] = useState(["root"]); // "root" là menu cha
  const currentMenu = history[history.length - 1];

  const handleBack = () => {
    if (history.length > 1) {
      setHistory(history.slice(0, history.length - 1));
    }
  };

  return (
    <div className="w-64 rounded border bg-white p-4 shadow-md">
      {/* Back button */}
      {history.length > 1 && (
        <button
          onClick={handleBack}
          className="mb-2 rounded bg-blue-500 px-3 py-1 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
        >
          Back
        </button>
      )}

      {/* Menu cha */}
      {currentMenu === "root" && (
        <div className="space-y-2">
          <button
            onClick={() => setHistory([...history, "fruits"])}
            className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
          >
            Fruits
          </button>
          <button
            onClick={() => setHistory([...history, "vegetables"])}
            className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
          >
            Vegetables
          </button>
        </div>
      )}

      {/* Menu con Fruits */}
      {currentMenu === "fruits" && (
        <div className="space-y-2">
          <button
            onClick={() => alert("Bạn chọn Apple")}
            className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
          >
            Apple
          </button>
          <button
            onClick={() => alert("Bạn chọn Banana")}
            className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
          >
            Banana
          </button>
        </div>
      )}

      {/* Menu con Vegetables */}
      {currentMenu === "vegetables" && (
        <div className="space-y-2">
          <button
            onClick={() => alert("Bạn chọn Carrot")}
            className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
          >
            Carrot
          </button>
          <button
            onClick={() => alert("Bạn chọn Tomato")}
            className="w-full rounded px-3 py-2 text-left hover:bg-gray-100"
          >
            Tomato
          </button>
        </div>
      )}
    </div>
  );
}
