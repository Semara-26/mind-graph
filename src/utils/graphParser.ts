import type { Note } from '../data/notes';

/**
 * Extracts wiki-style link targets from content.
 * Finds all text inside double brackets, e.g. [[Project Ideas]] or [[Meeting Notes]].
 * @param content - Raw note content (e.g. markdown string)
 * @returns Array of unique link targets (trimmed), in order of first appearance
 */
export function extractLinks(content: string): string[] {
  if (!content || typeof content !== 'string') return [];

  const regex = /\[\[([^\]]+)\]\]/g;
  const seen = new Set<string>();
  const links: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    const target = match[1].trim();
    if (target && !seen.has(target)) {
      seen.add(target);
      links.push(target);
    }
  }

  return links;
}

export interface GraphNode {
  id: string;
  group: number;
  x?: number;
  y?: number;
}

export interface GraphLink {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

/**
 * Builds graph nodes and links from notes. Real notes get group 1;
 * link targets that don't exist as notes become "ghost" nodes with group 2.
 * Nodes get initial x,y so react-force-graph never draws links with NaN positions.
 */
export function generateGraphData(notes: Note[]): GraphData {
  const nodesMap = new Map<string, GraphNode>();
  const links: GraphLink[] = [];

  for (const note of notes) {
    nodesMap.set(note.title, { id: note.title, group: 1 });
  }

  for (const note of notes) {
    const targets = extractLinks(note.content);
    for (const target of targets) {
      if (!nodesMap.has(target)) {
        nodesMap.set(target, { id: target, group: 2 });
      }
      links.push({ source: note.title, target });
    }
  }

  const nodes = Array.from(nodesMap.values());
  const n = nodes.length;
  const radius = 200;
  nodes.forEach((node, i) => {
    const angle = (2 * Math.PI * i) / (n || 1);
    node.x = radius * Math.cos(angle);
    node.y = radius * Math.sin(angle);
  });

  return { nodes, links };
}
