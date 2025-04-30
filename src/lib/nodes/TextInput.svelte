<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte'

  export let id: string
  export let isConnectable: boolean
</script>

<div class="custom-node">
  <div class="node-header">User Input</div>
  <div class="node-content">
    <div class="input-output-container">
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
      <input type="text" placeholder="User Input" class="input-field" on:input={e => (data.inputLabel = e.target.value)} />
    </div>
  </div>
</div>

<style>
  .custom-node {
    background-color: #f9f9f9; /* Light background */
    border: 1px solid rgb(0, 0, 0); /* Light blue border */
    border-radius: 8px; /* Rounded corners */
    padding: 10px;
    height: 70px;
    width: 150px; /* Adjust as needed */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); /* Subtle shadow (optional) */
    font-family: sans-serif;
    font-size: 12px;
    color: #374151;
  }

  .node-header {
    display: flex;
    align-items: left;
    padding: 8px 10px;
    background-color: #f9f9f9; /* Slightly different background for title */
    border-radius: 6px 6px 0 0;
    margin-bottom: 10px;
    font-weight: bold;
    color: #1d3557; /* Darker text for title */
  }
  .input-output-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .input-field {
    width: 100%; /* Full width of the container */
    padding: 6px 8px; /* Add padding for better usability */
    border: 1px solid #d1d5db; /* Light gray border */
    border-radius: 4px; /* Slightly rounded corners */
    font-size: 12px; /* Match the font size of the node */
    color: #374151; /* Text color */
    background-color: #ffffff; /* White background */
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1); /* Subtle inner shadow */
    outline: none; /* Remove default outline */
    margin: 5px;
    width: 80%; /* Adjust width as needed */
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease; /* Smooth transition for focus */
  }

  .input-field:focus {
    border-color: #3b82f6; /* Blue border on focus */
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); /* Blue focus ring */
  }

  .input-field::placeholder {
    color: #9ca3af; /* Light gray placeholder text */
    font-style: italic; /* Optional: Italicize placeholder text */
  }
</style>
