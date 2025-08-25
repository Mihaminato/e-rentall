<template>
  <div class="form-control">
    <label v-if="label || icon" class="label pb-2">
      <span class="label-text font-medium text-sm flex items-center gap-2 text-base-content/80">
        <Icon v-if="icon" :name="icon" class="w-4 h-4 text-success" />
        {{ label }}
      </span>
    </label>
    <select
      :value="modelValue"
      :disabled="disabled"
      class="select select-bordered w-full focus-within:outline-none focus-within:border-primary bg-white"
      :class="{ 'select-error': !!error }"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      @blur="$emit('blur')"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <div v-if="error" class="text-error text-xs pt-1">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
  interface SelectOption {
    value: string
    label: string
    disabled?: boolean
  }

  defineProps<{
    label?: string
    icon?: string
    modelValue: string
    options: SelectOption[]
    placeholder?: string
    required?: boolean
    error?: string | null
    disabled?: boolean
  }>()

  defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'blur'): void
  }>()
</script>
