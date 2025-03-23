"use client"

import { Button } from "@/components/ui/button"
import { useCountdownContext, useCountdownDispatch } from "@/contexts/CounterContext"
import { formatTimeValue } from "@/lib/utils"
import React, { useEffect, useRef, useState } from 'react'

const ControlButtons = () => {
    const intervalRef = useRef<NodeJS.Timeout>(null)
    const [endDate, setEndDate] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const countValues = useCountdownContext()
    const dispatch = useCountdownDispatch()

    const getTotalMs = () => {
        return (
            Number(countValues["hours"]) * 3600000
            + Number(countValues["minutes"]) * 60000
            + Number(countValues["seconds"]) * 1000
            + Number(countValues["millis"])
        )
    }

    const resetTimer = () => {
        setIsRunning(false)
        dispatch({
            type: "set",
            state: {
                "hours": "00",
                "minutes": "00",
                "seconds": "00",
                "millis": "000"
            }
        })
    }

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const remaing = endDate - Date.now()

                if (remaing <= 0) return resetTimer()

                const hours = Math.floor(remaing / 3600000)
                const minutes = Math.floor((remaing % 3600000) / 60000)
                const seconds = Math.floor((remaing % 60000) / 1000)
                const milliseconds = Math.floor(remaing % 1000)

                dispatch({
                    type: "set",
                    state: {
                        "hours": formatTimeValue(hours, "hours"),
                        "minutes": formatTimeValue(minutes, "minutes"),
                        "seconds": formatTimeValue(seconds, "seconds"),
                        "millis": formatTimeValue(milliseconds, "millis")
                    }
                })
            }, 10)
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, endDate])

    const toggleTimer = () => {
        if (!isRunning) {
            const totalMs = getTotalMs()
            if (!totalMs) return;
            setEndDate(Date.now() + totalMs)
        }
        setIsRunning(!isRunning)
    }
    const totalMs = getTotalMs()

    return (
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <Button
                onClick={toggleTimer}
                size="lg"
                className="text-lg cursor-pointer"
                disabled={!totalMs}
            >{isRunning ? "Pause" : "Start"}</Button>
            <Button
                onClick={resetTimer}
                size="lg"
                variant="secondary"
                className="text-lg cursor-pointer"
                disabled={isRunning || !totalMs}
            >{"Reset"}</Button>
        </div>
    )
}

export { ControlButtons }