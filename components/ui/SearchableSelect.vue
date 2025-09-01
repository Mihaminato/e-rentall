<template>
  <div class="relative w-full">
    <div class="dropdown w-full" tabindex="0">
      <div
        class="select select-bordered w-full flex items-center !h-12"
        :class="{ 'select-error': !!error, 'select-disabled': disabled }"
        v-bind="attrs"
        @click="openDropdown"
      >
        <span class="truncate">{{ selectedLabel }}</span>
      </div>
      <div class="dropdown-content z-[1] w-full p-2 shadow bg-base-100 rounded-box mt-2">
        <div class="mb-2">
          <input
            v-model="search"
            type="text"
            class="input input-bordered w-full"
            placeholder="Rechercher..."
            @keydown.stop
          />
        </div>
        <ul class="menu bg-base-100 rounded-box max-h-60 overflow-auto w-full" tabindex="0">
          <li v-if="filteredOptions.length === 0" class="px-2 py-2 text-sm opacity-60">
            Aucune correspondance
          </li>
          <li v-for="option in filteredOptions" :key="option.value">
            <button type="button" class="justify-between" @click="selectValue(option.value)">
              <span>{{ option.label }}</span>
              <Icon v-if="modelValue === option.value" name="mdi:check" class="w-4 h-4" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, useAttrs } from 'vue'
  import type { SelectOption } from '~/types'

  defineOptions({ inheritAttrs: false })

  const props = defineProps<{
    modelValue: string | ''
    options: SelectOption[]
    placeholder?: string
    disabled?: boolean
    error?: string | null
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'blur'): void
  }>()

  const attrs = useAttrs()
  const isOpen = ref(false)
  const search = ref('')

  const filteredOptions = computed(() => {
    const term = search.value.trim().toLowerCase()
    if (!term) return props.options
    return props.options.filter(
      o => o.label.toLowerCase().includes(term) || String(o.value).toLowerCase().includes(term)
    )
  })

  const selectedLabel = computed(() => {
    const found = props.options.find(o => o.value === props.modelValue)
    return found ? found.label : props.placeholder || 'Sélectionner'
  })

  const blur = () => {
    ;(document.activeElement as HTMLElement)?.blur()
    isOpen.value = false
  }

  const selectValue = (value: string) => {
    blur()
    emit('update:modelValue', value)
    search.value = ''
  }

  const openDropdown = () => {
    if (isOpen.value) {
      blur()
      isOpen.value = false
    } else {
      isOpen.value = true
    }
  }
</script>
