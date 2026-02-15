import type { Note } from '../data/notes';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  showGraph: boolean;
  onToggleGraph: () => void;
}

export function Sidebar({ notes, activeNoteId, onSelectNote, showGraph, onToggleGraph }: SidebarProps) {
  return (
    <aside className="w-[25%] min-w-[200px] h-full flex flex-col bg-slate-900 border-r border-slate-700">
      <div className="p-4 border-b border-slate-700 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Notes
        </h2>
        <button
          type="button"
          onClick={onToggleGraph}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            showGraph
              ? 'bg-slate-600 text-slate-200'
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
          }`}
        >
          Toggle Graph
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {notes.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                onClick={() => onSelectNote(note.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm truncate transition-colors ${
                  activeNoteId === note.id
                    ? 'bg-slate-700 text-slate-100'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {note.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
