export const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]
  
  export function getMonthName(month: number): string {
    return MONTH_NAMES[month]
  }
  
  export function formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  }
  
  export function formatDisplayDate(date: Date): string {
    return `${getMonthName(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`
  }
  
  export function isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }
  
  export function isSameMonth(date1: Date, date2: Date): boolean {
    return date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear()
  }
  
  export function addMonths(date: Date, months: number): Date {
    const newDate = new Date(date)
    const currentMonth = newDate.getMonth()
    newDate.setMonth(currentMonth + months)
    return newDate
  }
  
  export function startOfMonth(date: Date): Date {
    const newDate = new Date(date)
    newDate.setDate(1)
    return newDate
  }
  
  export function endOfMonth(date: Date): Date {
    const newDate = new Date(date)
    newDate.setMonth(newDate.getMonth() + 1)
    newDate.setDate(0)
    return newDate
  }
  
  export function getCalendarDays(date: Date): Date[] {
    const days: Date[] = []
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
  
    // Start from the first day of the week that contains the first day of the month
    const startDate = new Date(monthStart)
    startDate.setDate(startDate.getDate() - startDate.getDay())
  
    // End on the last day of the week that contains the last day of the month
    const endDate = new Date(monthEnd)
    const daysToAdd = 6 - endDate.getDay()
    endDate.setDate(endDate.getDate() + daysToAdd)
  
    // Generate all days
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
  
    return days
  }
  
  // Utility function to conditionally join class names
  export function cn(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ")
  }