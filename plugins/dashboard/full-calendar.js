import BigCalendar from '@/components/pages/calendar/BigCalendar'
import CalendarWidget from '@/components/widgets/CalendarWidget'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component(BigCalendar.name, BigCalendar)
  nuxtApp.vueApp.component(CalendarWidget.name, CalendarWidget)
})
