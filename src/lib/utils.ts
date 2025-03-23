import { TimeUnit } from "@/contexts/CounterContext"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeValue(value: number, timeUnit: TimeUnit): string | null {
  if (Number.isNaN(value) || value < 0) return null

  let max = 0

  switch (timeUnit) {
    case "hours": { max = 128; break }
    case "minutes": { max = 59; break }
    case "seconds": { max = 59; break }
    case "millis": { max = 999; break }
  }

  if (value <= max) {
    if (timeUnit === "millis")
      return value < 100 ? `0${value}` : `${value}`
    else
      return value < 10 ? `0${value}` : `${value}`
  } else return max.toString()
}