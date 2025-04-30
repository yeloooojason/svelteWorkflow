
export function handleDrop(event, createNode) {
  event.preventDefault();

  const dataString = event.dataTransfer.getData('application/svelteflow');
  const data = JSON.parse(dataString);

  if (data) {
    const flowContainer = document.querySelector('.flow-container');
    const rect = flowContainer.getBoundingClientRect();

    // Adjust for zoom and pan (if applicable)
    const zoom = 1; // Replace with the actual zoom level from SvelteFlow
    const panOffset = { x: 0, y: 0 }; // Replace with the actual pan offset from SvelteFlow

    const position = {
      x: (event.clientX - rect.left - panOffset.x) / zoom,
      y: (event.clientY - rect.top - panOffset.y) / zoom,
    };
    createNode({
      type: data.type,
      position: data.position,
      label: data.type === 'generateEmail' ? 'LLM' : data.type,
      data: data.data
    });
  }
}

export function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move'; // Indicate that the drop will result in a move
}
export function handleDragStart(event, type) {
  const dragData = JSON.stringify(type);
    event.dataTransfer.setData('application/svelteflow', dragData);
    event.dataTransfer.effectAllowed = 'move' // Indicate that the item can be moved
  }