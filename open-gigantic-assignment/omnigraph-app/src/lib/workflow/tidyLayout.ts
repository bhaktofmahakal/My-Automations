import { Node, Edge } from '@xyflow/react';

export function computeTidyLayout(nodes: Node[], edges: Edge[]): Node[] {
  const nodeWidth = 240;
  const nodeHeight = 140;
  const horizontalGap = 60;
  const verticalGap = 80;

  // Group nodes by type hierarchy (module -> file -> function -> assertion)
  const layers: Record<string, Node[]> = {
    module: [],
    file: [],
    function: [],
    assertion: [],
  };

  nodes.forEach(node => {
    const type = node.type || 'file';
    if (layers[type]) {
      layers[type].push(node);
    } else {
      layers['file'].push(node);
    }
  });

  const orderedTypes = ['module', 'file', 'function', 'assertion'];
  let currentY = 50;

  const layoutedNodes: Node[] = [];

  orderedTypes.forEach(type => {
    const layerNodes = layers[type];
    if (layerNodes.length === 0) return;

    const totalWidth = layerNodes.length * nodeWidth + (layerNodes.length - 1) * horizontalGap;
    const startX = Math.max(50, 400 - totalWidth / 2);

    layerNodes.forEach((node, idx) => {
      layoutedNodes.push({
        ...node,
        position: {
          x: startX + idx * (nodeWidth + horizontalGap),
          y: currentY,
        },
      });
    });

    currentY += nodeHeight + verticalGap;
  });

  return layoutedNodes;
}
