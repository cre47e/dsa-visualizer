import { Editor } from "@monaco-editor/react";

export default function CodePlayground({ code, onChange, language = "javascript" }) {
  return (
    <div className="w-full h-96 bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-700 flex flex-col">
      <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
        <span className="text-gray-400 text-sm font-medium">Implementation</span>
        <span className="text-xs text-gray-500 uppercase">{language}</span>
      </div>
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={code}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          padding: { top: 16 },
        }}
        onChange={onChange}
      />
    </div>
  );
}
