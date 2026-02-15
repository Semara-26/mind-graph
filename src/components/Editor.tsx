interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  isEmpty: boolean;
}

export function Editor({ content, onChange, isEmpty }: EditorProps) {
  if (isEmpty) {
    return (
      <main className="flex-1 min-w-0 flex flex-col bg-slate-950">
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-slate-500 text-sm">
            Select a note or create a new one to start editing.
          </p>
        </div>
      </main>
    );
  }

  const safeContent = typeof content === 'string' ? content : '';

  return (
    <main className="flex-1 min-w-0 flex flex-col bg-slate-950">
      <div className="flex-1 flex flex-col p-6">
        <textarea
          value={safeContent}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-h-[200px] w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-slate-100 placeholder-slate-500 focus:border-slate-600 focus:outline-none focus:ring-1 focus:ring-slate-600"
          placeholder="Write your note... Use [[Note Title]] for wiki links."
          spellCheck={false}
        />
      </div>
    </main>
  );
}
