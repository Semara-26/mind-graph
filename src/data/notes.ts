export interface Note {
  id: string;
  title: string;
  content: string;
}

export const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Getting started',
    content: `# Getting started

Welcome to your knowledge base. Start by browsing [[Project ideas]] or reviewing [[Meeting notes]].

Key habits:
- Link related ideas with [[Todo list]] and [[Learning log]]
- Revisit [[Random thoughts]] for creativity
- Summarize books in [[Book summary]] and link back here`,
  },
  {
    id: '2',
    title: 'Project ideas',
    content: `# Project ideas

Ideas from [[Meeting notes]] and [[Random thoughts]]:

1. **Mind graph** – Visualize [[Getting started]] links as a graph.
2. **Daily log** – Integrate with [[Todo list]] and [[Learning log]].
3. **Book highlights** – Feed into [[Book summary]].

Next: sync with [[Meeting notes]] and prioritize.`,
  },
  {
    id: '3',
    title: 'Meeting notes',
    content: `# Meeting notes

## Topics discussed

- [[Project ideas]] pipeline and [[Todo list]] alignment.
- [[Learning log]] format; see [[Getting started]] for onboarding.
- [[Book summary]] template; [[Random thoughts]] for brainstorming.

Action items: update [[Project ideas]], then [[Todo list]].`,
  },
  {
    id: '4',
    title: 'Todo list',
    content: `# Todo list

- [ ] Review [[Meeting notes]] and extract tasks
- [ ] Add items from [[Project ideas]]
- [ ] Update [[Learning log]] daily
- [ ] Finish [[Book summary]] for current read
- [ ] Revisit [[Getting started]] checklist
- [ ] Capture [[Random thoughts]] in evening`,
  },
  {
    id: '5',
    title: 'Random thoughts',
    content: `# Random thoughts

Ideas that might connect to [[Project ideas]] or [[Book summary]]:

- Connection between [[Meeting notes]] and [[Learning log]].
- [[Todo list]] as a graph of dependencies?
- [[Getting started]] could be a hub node.

More [[Random thoughts]] later.`,
  },
  {
    id: '6',
    title: 'Book summary',
    content: `# Book summary

Key points to link:

- Relate to [[Learning log]] and [[Project ideas]].
- Cross-reference [[Meeting notes]] if work-related.
- [[Random thoughts]] often tie to book ideas.
- Add follow-ups to [[Todo list]].
- See [[Getting started]] for how we use links.`,
  },
  {
    id: '7',
    title: 'Learning log',
    content: `# Learning log

Today: explored [[Getting started]] and [[Book summary]].

Next: practice [[Project ideas]] and update [[Todo list]]. 
[[Meeting notes]] had a tip; [[Random thoughts]] for reflection.`,
  },
];
