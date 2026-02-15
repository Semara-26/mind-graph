import { useState, useEffect, useMemo } from 'react';
import { Sidebar, Editor, GraphView } from './components';
import { initialNotes, type Note } from './data/notes';
import { extractLinks, generateGraphData } from './utils/graphParser';

function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [showGraph, setShowGraph] = useState(false);

  const activeNote = activeNoteId
    ? notes.find((n) => n.id === activeNoteId) ?? null
    : null;

  const graphData = useMemo(() => generateGraphData(notes), [notes]);

  const handleSelectNote = (id: string) => setActiveNoteId(id);

  const handleNodeClick = (nodeTitle: string) => {
    const note = notes.find((n) => n.title === nodeTitle);
    if (note) {
      setActiveNoteId(note.id);
      setShowGraph(false);
    }
  };

  const handleContentChange = (content: string) => {
    if (!activeNoteId) return;
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeNoteId ? { ...n, content } : n
      )
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
