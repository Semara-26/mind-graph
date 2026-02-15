import { useState, useEffect, useMemo } from 'react';
import { Sidebar, Editor, GraphView } from './components';
import { initialNotes, type Note } from './data/notes';
import { extractLinks, generateGraphData } from './utils/graphParser';

const STORAGE_KEY = 'mind-graph-notes';

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialNotes;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) return initialNotes;
    const valid = parsed.every(
      (n) => n && typeof n.id === 'string' && typeof n.title === 'string' && typeof n.content === 'string'
    );
    return valid ? (parsed as Note[]) : initialNotes;
  } catch {
    return initialNotes;
  }
}

function App() {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const activeNote = activeNoteId
    ? notes.find((n) => n.id === activeNoteId) ?? null
    : null;

  const graphData = useMemo(() => generateGraphData(notes), [notes]);

  const handleSelectNote = (id: string) => setActiveNoteId(id);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
    };
    setNotes((prev) => [...prev, newNote]);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (id: string) => {
    const nextNotes = notes.filter((n) => n.id !== id);
    setNotes(nextNotes);
    setActiveNoteId((current) =>
      current === id ? (nextNotes[0]?.id ?? null) : current
    );
  };

  const handleNodeClick = (nodeTitle: string) => {
    const note = notes.find((n) => n.title === nodeTitle);
    if (note) {
      setActiveNoteId(note.id);
      setShowGraph(false);
    }
  };

  const handleContentChange = (content: string) => {
    if (!activeNoteId) return;
    const firstLine = (content.split('\n')[0] ?? '').trim();
    const headerMatch = firstLine.match(/^#+\s*(.*)$/);
    const titleFromHeader = headerMatch ? headerMatch[1].trim() : null;

    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== activeNoteId) return n;
        const nextTitle =
          titleFromHeader !== null && titleFromHeader !== ''
            ? titleFromHeader
            : n.title;
        return { ...n, content, title: nextTitle };
      })
    );
  };

  useEffect(() => {
    if (!activeNote) return;
    const links = extractLinks(activeNote.content);
    console.log('Detected connections:', { note: activeNote.title, links });
  }, [activeNote?.id, activeNote?.content]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={handleSelectNote}
        onAddNote={addNote}
        onDeleteNote={deleteNote}
        showGraph={showGraph}
        onToggleGraph={() => setShowGraph((v) => !v)}
      />
      {showGraph ? (
        <GraphView graphData={graphData} onNodeClick={handleNodeClick} />
      ) : (
        <Editor
          content={activeNote?.content ?? ''}
          onChange={handleContentChange}
          isEmpty={!activeNote}
        />
      )}
    </div>
  );
}

export default App;
