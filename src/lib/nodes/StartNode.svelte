<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte'

  export let id: string
  export let isConnectable: boolean
</script>

<div class="custom-node">
  <div class="node-header">start</div>
  <div class="node-content">
    <div class="input-output-container">
      <Handle type="source" position={Position.Right} />
    </div>
  </div>
</div>

<style>
  .custom-node {
    background-color: #f9f9f9; /* Light background */
    border: 1px solid rgb(0, 0, 0); /* Light blue border */
    border-radius: 8px; /* Rounded corners */
    padding: 10px;
    height: 30px;
    width: 60px; /* Adjust as needed */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow (optional) */
    font-family: sans-serif;
    font-size: 12px;
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
</style>
