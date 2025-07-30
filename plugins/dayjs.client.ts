import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/fr'

export default defineNuxtPlugin(() => {
  // Configurer les plugins Day.js
  dayjs.extend(isBetween)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(isSameOrBefore)
  dayjs.extend(relativeTime)
  dayjs.extend(utc)
  dayjs.extend(timezone)

  // Définir la locale française
  dayjs.locale('fr')

  // Rendre Day.js disponible globalement
  return {
    provide: {
      dayjs
    }
  }
})
