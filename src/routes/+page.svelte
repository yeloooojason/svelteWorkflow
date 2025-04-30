<script>
  import { fromStore, writable } from 'svelte/store'
  import { SvelteFlow, Controls, ControlButton, Background, BackgroundVariant, MiniMap, Panel, getViewportForBounds } from '@xyflow/svelte'
  import { createNode } from '$lib/utils/createNode'
  import { handleDrop, handleDragOver, handleDragStart } from '$lib/utils/dragMoveFunction.js'
  import LLMNode from '$lib/nodes/LLMNode.svelte'
  import StartNode from '$lib/nodes/StartNode.svelte'
  import EndNode from '$lib/nodes/EndNode.svelte'
  import InputNode from '$lib/nodes/TextInput.svelte'
  import { onMount } from 'svelte'
  import { nodes } from '$lib/stores/store.js'

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import '@xyflow/svelte/dist/style.css'

  const edges = writable([])

  const snapGrid = [25, 25]

  let showSelector = false

  function toggleSelector() {
    event.stopPropagation()
    showSelector = !showSelector
  }

  let currentPosition = { x: 200, y: 150 }

  const nodeTypes = {
    generateEmail: LLMNode,
    start: StartNode,
    end: EndNode,
    userInput: InputNode
  }

  function handleClickOutside(event) {
    const selector = document.querySelector('.selector')
    if (selector && !selector.contains(event.target)) {
      showSelector = false
    }
  }
  createNode({
    type: 'start',
    position: { x: 100, y: 200 }
  })
  createNode({
    type: 'end',
    position: { x: 800, y: 200 }
  })

  function handleAddNode(currentPosition) {
    createNode({
      type: 'generateEmail',
      position: { ...currentPosition },
      label: 'LLM',
      data: {
        inputLabel: 'input',
        outputLabel: 'str.output',
        model: 'GPT-4o',
        skills: 'Not configuredSkills'
      }
    })
    currentPosition.x += 15
    currentPosition.y += 15
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })
</script>

<div class="flow-container">
  <SvelteFlow {nodes} {edges} {snapGrid} {nodeTypes} minZoom={0.5} maxZoom={2} on:drop={e => handleDrop(e, createNode)} on:dragover={handleDragOver}>
    {#if showSelector}
      <div class="selector" on:click={e => e.stopPropagation()}>
        <input type="text" placeholder="Search nodes, plugins, workflows" class="search-input" />

        <div class="section">
          <div class="group">
            <div
              class="item icon-llm"
              on:click={handleAddNode}
              draggable="true"
              on:dragstart={e =>
                handleDragStart(e, {
                  type: 'generateEmail',
                  position: { ...currentPosition },
                  label: 'LLM',
                  data: {
                    inputLabel: 'input',
                    outputLabel: 'str.output',
                    model: 'GPT-4o',
                    skills: 'Not configuredSkills'
                  }
                })}
            >
              LLM
            </div>
            <div
              class="item icon-plugin"
              on:click={handleAddNode}
              draggable="true"
              on:dragstart={e =>
                handleDragStart(e, {
                  type: 'userInput',
                  position: { ...currentPosition }
                })}
            >
              Input Text
            </div>
          </div>

          <div class="label">Logic</div>
          <div class="group">
            <div class="item">Code</div>
            <div class="item">Condition</div>
            <div class="item">Intent recognition</div>
            <div class="item">Loop</div>
            <div class="item">Batch</div>
            <div class="item">Variable Merge</div>
          </div>

          <div class="label">Input & Output</div>
          <div class="group">
            <div class="item">Input</div>
            <div class="item">Output</div>
          </div>

          <div class="label">Conversation management</div>
          <div class="group">
            <div class="item">Create conversation</div>
            <div class="item">Clear conversation history</div>
            <div class="item">Query message list</div>
          </div>

          <div class="label">Database</div>
          <div class="group">
            <div class="item">SQL Customization</div>
            <div class="item">Query Data</div>
            <div class="item">Add Data</div>
            <div class="item">Update Data</div>
            <div class="item">Delete Data</div>
          </div>
        </div>
      </div>
    {/if}
    <Controls position="bottom-center" orientation="horizontal" style="transform: scale(1.5); margin-bottom: 20px;">
      <ControlButton class="custom-control-button" on:click={toggleSelector}>⚡️</ControlButton>
    </Controls>
    <Background variant={BackgroundVariant.Dots} />
  </SvelteFlow>
</div>

<style>
  /* Ensure the SvelteFlow container takes up the full page */
  .flow-container {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  /* Position the selector 10px above the control bar and align it */
  .selector {
    background: white;
    border-radius: 12px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    position: absolute;
    bottom: 65px; /* 10px above the control bar */
    left: 50%;
    transform: translateX(-40%); /* Center align horizontally */
    font-family: sans-serif;
    z-index: 1000;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .label {
    font-size: 0.85rem;
    font-weight: bold;
    color: #555;
    margin: 1rem 0 0.5rem;
  }

  .group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .item {
    padding: 0.5rem 0.75rem;
    background: #f3f4f6;
    border-radius: 8px;
    font-size: 0.85rem;
    cursor: pointer;
    white-space: nowrap;
  }

  .item:hover {
    background: #e5e7eb;
  }

  .icon-llm::before {
    content: '🧠 ';
  }

  .icon-plugin::before {
    content: '🧩 ';
  }
</style>
