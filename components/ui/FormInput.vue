<template>
  <div class="form-control">
    <label v-if="label || icon" class="label pb-2">
      <span class="label-text font-medium text-sm flex items-center gap-2 text-base-content/80">
        <Icon v-if="icon" :name="icon" class="w-4 h-4 text-success" />
        {{ label }}
      </span>
    </label>
    <input
      :value="modelValue"
      class="input input-bordered w-full focus-within:outline-none focus-within:border-primary bg-white"
      :type="type"
      :placeholder="placeholder"
      :class="{ 'input-error': !!error }"
      :max="max"
      :min="min"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="$emit('blur')"
    />
    <div v-if="error" class="text-error text-xs pt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label?: string
    icon?: string
    modelValue: string | number
    type?: string
    placeholder?: string
    required?: boolean
    error?: string | null
    min?: string | number
    max?: string | number
  }>()

  defineEmits<{
    (e: 'update:modelValue', value: string | number): void
    (e: 'blur'): void
  }>()
</script>
