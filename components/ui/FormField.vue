<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text font-medium">{{ label }}{{ required ? '*' : '' }}</span>
    </label>
    <slot></slot>
    <div v-if="error" class="text-error text-xs pt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string
    required?: boolean
    error?: string | null
  }>()
</script>
