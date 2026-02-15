import type { Note } from '../data/notes';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onAddNote: () => void;
  onDeleteNote: (id: string) => void;
  showGraph: boolean;
  onToggleGraph: () => void;
}

export function Sidebar({ notes, activeNoteId, onSelectNote, onAddNote, onDeleteNote, showGraph, onToggleGraph }: SidebarProps) {
  return (
    <aside className="w-[25%] min-w-[200px] h-full flex flex-col bg-slate-900 border-r border-slate-700">
      <div className="p-4 border-b border-slate-700 space-y-3">
        <div className="flex items-center justify-between gap-2">
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
        <button
          type="button"
          onClick={onAddNote}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Note
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-0.5">
          {notes.map((note) => (
            <li key={note.id} className="group flex items-center gap-1 rounded-md overflow-hidden">
              <button
                type="button"
                onClick={() => onSelectNote(note.id)}
                className={`flex-1 min-w-0 text-left px-3 py-2 rounded-md text-sm truncate transition-colors ${
                  activeNoteId === note.id
                    ? 'bg-slate-700 text-slate-100'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {note.title}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                className="shrink-0 p-1.5 rounded text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                title="Delete note"
                aria-label={`Delete ${note.title}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
