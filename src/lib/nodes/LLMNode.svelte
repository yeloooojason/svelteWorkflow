<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte'

  export let id: string
  export let data: {
    inputLabel?: string
    outputLabel?: string
    model?: string
    skills?: string
  }
  export let isConnectable: boolean
</script>

<div class="custom-node">
  <div class="node-header">LLM</div>
  <div class="node-content">
    <div class="input-output-container">
      {#if data?.inputLabel}
        <div class="io-item">
          <span class="io-label">Input</span>
          <span class="io-value">{data.inputLabel}</span>
          <Handle type="target" position={Position.Left} id="input" connectable={isConnectable} />
        </div>
      {/if}
      {#if data?.outputLabel}
        <div class="io-item">
          <span class="io-label">Output</span>
          <span class="io-value">{data.outputLabel}</span>
          <Handle type="source" position={Position.Right} id="output" connectable={isConnectable} />
        </div>
      {/if}
    </div>
    {#if data?.model}
      <div class="info-row">
        <span class="info-label">Model</span>
        <span class="info-value">🧠 {data.model}</span>
      </div>
    {/if}
    {#if data?.skills}
      <div class="info-row">
        <span class="info-label">Skills</span>
        <span class="info-value">{data.skills}</span>
      </div>
    {/if}
  </div>
</div>

<style>
  .custom-node {
    background-color: #f9f9f9; /* Light background */
    border: 1px solid rgb(0, 0, 0); /* Light blue border */
    border-radius: 8px; /* Rounded corners */
    padding: 10px;
    width: auto; /* Adjust as needed */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow (optional) */
    font-family: sans-serif;
    font-size: 14px;
    color: #374151;
  }

  .node-header {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    background-color: #f9f9f9; /* Slightly different background for title */
    border-radius: 6px 6px 0 0;
    margin-bottom: 10px;
    font-weight: bold;
    color: #1d3557; /* Darker text for title */
  }

  .title-icon {
    margin-right: 8px;
  }

  .node-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0 10px 10px 10px;
  }

  .input-output-container {
    display: flex;
    gap: 10px;
    margin-bottom: 8px;
  }

  .io-item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    background-color: white;
    border: 1px solid #d1d5db;
    border-radius: 6px;
  }

  .io-label {
    font-size: 0.9em;
    color: #6b7280;
  }

  .io-value {
    font-size: 0.9em;
    font-weight: 500;
    color: #111827;
  }

  .info-row {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .info-label {
    font-size: 0.85em;
    color: #6b7280;
    width: 50px; /* Adjust width as needed */
  }

  .info-value {
    font-size: 0.85em;
    color: #374151;
  }

  .svelte-flow__handle {
    width: 12px;
    height: 12px;
    background-color: #a8dadc;
    border-radius: 6px;
    border: 1px solid #457b9d;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    cursor: grab;
  }

  .svelte-flow__handle:hover {
    opacity: 1;
  }
</style>
