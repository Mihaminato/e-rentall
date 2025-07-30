<template>
  <div
    v-if="totalPages > 1"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full"
  >
    <!-- Navigation pagination -->
    <div class="flex items-center gap-2">
      <!-- Bouton précédent -->
      <button
        :disabled="currentPage === 1"
        class="btn btn-sm btn-ghost"
        :class="{ 'btn-disabled': currentPage === 1 }"
        @click="goToPage(currentPage - 1)"
      >
        <Icon name="mdi:chevron-left" class="w-4 h-4" />
        <span class="hidden sm:inline">Précédent</span>
      </button>

      <!-- Numéros de pages -->
      <div class="flex items-center gap-1">
        <!-- Première page -->
        <button
          v-if="showFirstPage"
          class="btn btn-sm"
          :class="currentPage === 1 ? 'btn-primary' : 'btn-ghost'"
          @click="goToPage(1)"
        >
          1
        </button>

        <!-- Points de suspension début -->
        <span v-if="showStartEllipsis" class="px-2 text-base-content/50">...</span>

        <!-- Pages du milieu -->
        <button
          v-for="page in middlePages"
          :key="page"
          class="btn btn-sm"
          :class="currentPage === page ? 'btn-primary' : 'btn-ghost'"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Points de suspension fin -->
        <span v-if="showEndEllipsis" class="px-2 text-base-content/50">...</span>

        <!-- Dernière page -->
        <button
          v-if="showLastPage"
          class="btn btn-sm"
          :class="currentPage === totalPages ? 'btn-primary' : 'btn-ghost'"
          @click="goToPage(totalPages)"
        >
          {{ totalPages }}
        </button>
      </div>

      <!-- Bouton suivant -->
      <button
        :disabled="currentPage === totalPages"
        class="btn btn-sm btn-ghost"
        :class="{ 'btn-disabled': currentPage === totalPages }"
        @click="goToPage(currentPage + 1)"
      >
        <span class="hidden sm:inline">Suivant</span>
        <Icon name="mdi:chevron-right" class="w-4 h-4" />
      </button>
    </div>

    <!-- Sélecteur de taille de page -->
    <div class="flex items-center gap-2 text-sm">
      <span class="text-base-content/70">Par page:</span>
      <UiFormSelect
        label=""
        :model-value="pageSize.toString()"
        :options="pageSizeSelectOptions"
        class="w-20"
        @update:model-value="changePageSize(+$event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    currentPage: number
    totalItems: number
    pageSize: number
    pageSizeOptions?: number[]
  }

  interface Emits {
    (e: 'page-change' | 'page-size-change', value: number): void
  }

  const props = withDefaults(defineProps<Props>(), {
    pageSizeOptions: () => [5, 10, 20, 50]
  })

  const emit = defineEmits<Emits>()

  // Calculs
  const totalPages = computed(() => Math.ceil(props.totalItems / props.pageSize))

  // Navigation
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
      emit('page-change', page)
    }
  }

  const changePageSize = (size: number) => {
    emit('page-size-change', size)
  }

  // Options pour FormSelect
  const pageSizeSelectOptions = computed(() =>
    props.pageSizeOptions.map(size => ({
      value: size.toString(),
      label: size.toString()
    }))
  )

  // Logique d'affichage des pages
  const showFirstPage = computed(() => props.currentPage > 3)
  const showLastPage = computed(() => props.currentPage < totalPages.value - 2)
  const showStartEllipsis = computed(() => props.currentPage > 4)
  const showEndEllipsis = computed(() => props.currentPage < totalPages.value - 3)

  const middlePages = computed(() => {
    const pages: number[] = []
    const start = Math.max(1, props.currentPage - 2)
    const end = Math.min(totalPages.value, props.currentPage + 2)

    for (let i = start; i <= end; i++) {
      if (!(showFirstPage.value && i === 1) && !(showLastPage.value && i === totalPages.value)) {
        pages.push(i)
      }
    }

    return pages
  })
</script>
