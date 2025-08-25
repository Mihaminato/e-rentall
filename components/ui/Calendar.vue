<template>
  <div class="bg-white border rounded-lg p-4">
    <!-- Navigation du calendrier -->
    <div class="flex justify-between items-center mb-4">
      <button
        class="btn btn-sm btn-ghost"
        :class="{ 'btn-disabled cursor-not-allowed opacity-50': !canGoPreviousMonth }"
        :disabled="!canGoPreviousMonth"
        @click="previousMonth"
      >
        <Icon name="mdi:chevron-left" class="w-5 h-5" />
      </button>
      <h5 class="text-lg font-semibold">{{ currentMonthYear }}</h5>
      <button class="btn btn-sm btn-ghost" @click="nextMonth">
        <Icon name="mdi:chevron-right" class="w-5 h-5" />
      </button>
    </div>

    <!-- Grille du calendrier -->
    <div class="calendar-grid">
      <!-- En-têtes des jours -->
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="day in dayHeaders"
          :key="day"
          class="text-center text-sm font-medium text-gray-500 p-1"
        >
          {{ day }}
        </div>
      </div>

      <!-- Jours du calendrier -->
      <div class="grid grid-cols-7 gap-1">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="relative h-6 md:h-8 border border-gray-200 rounded cursor-pointer p-0.5 flex items-center justify-center"
          :class="[getDayClasses(day), day.isCurrentMonth ? 'cursor-pointer' : 'cursor-default']"
          @click="handleDayClick(day)"
        >
          <span class="text-xs font-medium">{{ day.date }}</span>
        </div>
      </div>
    </div>

    <!-- Légende optionnelle -->
    <div v-if="showLegend" class="mt-4 flex justify-between flex-wrap gap-3 text-sm">
      <div v-for="legend in legendItems" :key="legend.label" class="flex items-center space-x-2">
        <div class="w-2 h-2 rounded-full" :class="legend.color"></div>
        <span>{{ legend.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // Interface pour les jours du calendrier
  interface CalendarDay {
    date: number
    fullDate: Date
    isCurrentMonth: boolean
    isToday: boolean
    isMarked: boolean
    markerColor?: string
    isSelected?: boolean // Nouveau : si la date est sélectionnée
    selectionType?: 'start' | 'middle' | 'end' | null // Nouveau : type de sélection
    isBooked?: boolean // Nouveau : si la date est réservée
    bookedType?: 'start' | 'middle' | 'end' | null // Nouveau : type de réservation
    isPast?: boolean // Nouveau : si la date est dans le passé
    data?: Record<string, unknown> // Données personnalisées
  }

  interface LegendItem {
    label: string
    color: string
  }

  // Props
  const props = defineProps<{
    markedDates?: Date[] // Dates à marquer avec des points
    selectedDates?: { date: Date; type: 'start' | 'middle' | 'end' }[] // Dates sélectionnées avec type (bleu)
    bookedDates?: { date: Date; type: 'start' | 'middle' | 'end' }[] // Dates réservées (rouge)
    initialDate?: Date | null // Date initiale pour le calendrier
    dayHeaders?: string[] // En-têtes personnalisés des jours
    showLegend?: boolean // Afficher la légende
    legendItems?: LegendItem[] // Items de la légende
    markerColorClass?: string // Classe CSS pour la couleur des marqueurs
    disableOtherMonths?: boolean // Désactiver les jours des autres mois
  }>()

  // Valeurs par défaut
  const dayHeaders = props.dayHeaders || ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

  // Émissions
  const emit = defineEmits<{
    dayClick: [day: CalendarDay]
    monthChange: [date: Date]
  }>()

  // État du calendrier - utiliser initialDate si fournie
  const currentDate = ref(props.initialDate || new Date())

  // Réagir aux changements de initialDate
  watch(
    () => props.initialDate,
    newDate => {
      if (newDate) {
        currentDate.value = new Date(newDate)
      }
    }
  )

  // Mois et année actuels
  const currentMonthYear = computed(() => {
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'long',
      year: 'numeric'
    }).format(currentDate.value)
  })

  // Vérifier si on peut naviguer vers le mois précédent
  const canGoPreviousMonth = computed(() => {
    const today = new Date()
    const currentYear = currentDate.value.getFullYear()
    const currentMonth = currentDate.value.getMonth()
    const todayYear = today.getFullYear()
    const todayMonth = today.getMonth()

    // Autoriser seulement si le mois affiché est postérieur au mois actuel
    return currentYear > todayYear || (currentYear === todayYear && currentMonth > todayMonth)
  })

  // Navigation du calendrier
  const previousMonth = () => {
    // Ne pas permettre de naviguer vers un mois antérieur au mois actuel
    if (!canGoPreviousMonth.value) return

    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    )
    emit('monthChange', currentDate.value)
  }

  const nextMonth = () => {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    )
    emit('monthChange', currentDate.value)
  }

  // Vérifier si une date est aujourd'hui
  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  // Vérifier si une date est dans le passé (avant aujourd'hui)
  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Réinitialiser l'heure pour comparer seulement les dates
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate < today
  }

  // Vérifier si une date est marquée
  const isDateMarked = (date: Date) => {
    if (!props.markedDates) return false
    return props.markedDates.some(markedDate => markedDate.toDateString() === date.toDateString())
  }

  // Vérifier si une date est sélectionnée et retourner son type
  const getSelectedDateType = (date: Date) => {
    if (!props.selectedDates) return null
    const selectedDate = props.selectedDates.find(
      sd => sd.date.toDateString() === date.toDateString()
    )
    return selectedDate ? selectedDate.type : null
  }

  // Vérifier si une date est réservée et retourner son type
  const getBookedDateType = (date: Date) => {
    if (!props.bookedDates) return null
    const bookedDate = props.bookedDates.find(bd => bd.date.toDateString() === date.toDateString())
    return bookedDate ? bookedDate.type : null
  }

  // Générer les jours du calendrier
  // eslint-disable-next-line max-lines-per-function
  const calendarDays = computed(() => {
    const year = currentDate.value.getFullYear()
    const month = currentDate.value.getMonth()

    // Premier jour du mois
    const firstDay = new Date(year, month, 1)
    // Dernier jour du mois
    const lastDay = new Date(year, month + 1, 0)

    // Premier jour de la semaine (lundi = 1, dimanche = 0)
    const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay()

    // Jours à afficher
    const days: CalendarDay[] = []

    // Jours du mois précédent
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      const date = new Date(year, month, 1 - i)
      const selectionType = getSelectedDateType(date)
      const bookedType = getBookedDateType(date)
      days.push({
        date: date.getDate(),
        fullDate: date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isMarked: isDateMarked(date),
        markerColor: props.markerColorClass,
        isSelected: selectionType !== null,
        selectionType: selectionType,
        isBooked: bookedType !== null,
        bookedType: bookedType,
        isPast: isPastDate(date)
      })
    }

    // Jours du mois actuel
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      const selectionType = getSelectedDateType(date)
      const bookedType = getBookedDateType(date)
      days.push({
        date: i,
        fullDate: date,
        isCurrentMonth: true,
        isToday: isToday(date),
        isMarked: isDateMarked(date),
        markerColor: props.markerColorClass,
        isSelected: selectionType !== null,
        selectionType: selectionType,
        isBooked: bookedType !== null,
        bookedType: bookedType,
        isPast: isPastDate(date)
      })
    }

    // Jours du mois suivant pour compléter la grille
    const remainingDays = 42 - days.length // 6 semaines × 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i)
      const selectionType = getSelectedDateType(date)
      const bookedType = getBookedDateType(date)
      days.push({
        date: i,
        fullDate: date,
        isCurrentMonth: false,
        isToday: isToday(date),
        isMarked: isDateMarked(date),
        markerColor: props.markerColorClass,
        isSelected: selectionType !== null,
        selectionType: selectionType,
        isBooked: bookedType !== null,
        bookedType: bookedType,
        isPast: isPastDate(date)
      })
    }

    return days
  })

  // Classes CSS pour les jours
  // eslint-disable-next-line complexity
  const getDayClasses = (day: CalendarDay) => {
    const classes = []

    if (!day.isCurrentMonth) {
      classes.push('bg-gray-100', 'text-gray-400')
    }

    // Gestion des dates passées (priorité haute)
    if (day.isPast) {
      classes.push('bg-gray-200', 'text-gray-400', 'cursor-not-allowed')
      // Retourner immédiatement pour éviter d'autres styles
      return classes
    }

    // Gestion des réservations (priorité la plus haute après dates passées)
    if (day.isBooked && day.bookedType) {
      // Style rouge/primary pour les réservations
      if (day.bookedType === 'start' || day.bookedType === 'end') {
        // Dates de début/fin : style plus marqué
        classes.push('bg-red-200', 'border-red-500', 'border-2', 'text-red-900', 'font-semibold')
      } else {
        // Dates du milieu : style plus léger
        classes.push('bg-red-100', 'border-red-400', 'border-2', 'text-red-800')
      }
    } else if (day.isSelected && day.selectionType) {
      // Gestion des sélections (priorité sur les marquages)
      // Style différent selon le type de sélection
      if (day.selectionType === 'start' || day.selectionType === 'end') {
        // Dates de début/fin : style plus marqué
        classes.push('bg-blue-200', 'border-blue-500', 'border-2', 'text-blue-900', 'font-semibold')
      } else {
        // Dates du milieu : style plus léger
        classes.push('bg-blue-100', 'border-blue-300', 'border-2', 'text-blue-800')
      }
    } else if (day.isMarked) {
      // Style pour les indisponibilités : fond orange avec bordure
      classes.push(
        'bg-orange-100',
        'border-orange-400',
        'border-2',
        'text-orange-800',
        'hover:bg-orange-150'
      )
    } else if (day.isCurrentMonth) {
      // Dates disponibles : fond vert léger avec bordure verte
      classes.push(
        'bg-green-50',
        'border-green-300',
        'border-2',
        'text-green-800',
        'hover:bg-green-100'
      )
    }

    if (day.isToday && !day.isSelected) {
      classes.push('ring-2', 'ring-blue-300')
    }

    return classes
  }

  // Fonction pour naviguer vers un mois spécifique
  const navigateToMonth = (date: Date) => {
    currentDate.value = new Date(date.getFullYear(), date.getMonth(), 1)
    emit('monthChange', currentDate.value)
  }

  // Gérer le clic sur un jour
  const handleDayClick = (day: CalendarDay) => {
    // Ne pas permettre d'action sur les dates passées
    if (day.isPast) return

    // Si c'est un jour d'un autre mois, naviguer vers ce mois
    if (!day.isCurrentMonth) {
      navigateToMonth(day.fullDate)
      // Attendre un tick pour que le calendrier se mette à jour, puis émettre le clic
      nextTick(() => {
        emit('dayClick', day)
      })
      return
    }

    emit('dayClick', day)
  }
</script>
