import { nodes } from '$lib/stores/store.js';

let nodeIdCounter = 1;

export function createNode({
  type = 'default',
  position = { x: 100, y: 100 },
  label = 'New Node',
  data = {}
} = {}) {
  const id = `node-${nodeIdCounter++}`;

  const newNode = {
    id,
    type,
    position,
    data: {
      label,
      ...data
    }
  };

  nodes.update(current => [...current, newNode]);

  return newNode;
}

