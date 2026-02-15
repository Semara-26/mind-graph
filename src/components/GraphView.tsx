import { useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import type { GraphData } from '../utils/graphParser';

interface GraphViewProps {
  graphData: GraphData;
  onNodeClick: (nodeTitle: string) => void;
}

export function GraphView({ graphData, onNodeClick }: GraphViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const updateSize = () =>
      setDimensions({ width: el.offsetWidth, height: el.offsetHeight });
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <main
      ref={containerRef}
      className="flex-1 min-w-0 flex flex-col bg-slate-950 rounded-r-lg overflow-hidden"
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph2D
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#020617"
          nodeLabel={(node) => (node as { id: string }).id}
          nodeColor={(node) => {
            const n = node as { id: string; group: number };
            return n.group === 1 ? '#94a3b8' : '#64748b';
          }}
          linkColor="#475569"
          onNodeClick={(node) => {
            const id = (node as { id: string }).id;
            if (id) onNodeClick(id);
          }}
        />
      )}
    </main>
  );
}
