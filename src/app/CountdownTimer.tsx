"use client"

import { Input } from "@/components/ui/input"
import { TimeUnit, useCountdownContext, useCountdownDispatch } from "@/contexts/CounterContext"
import { formatTimeValue } from "@/lib/utils"
import { useRef, useState } from 'react'
import { useOnClickOutside } from "usehooks-ts"


const CountdownTimer = () => {
    const [editing, setEditing] = useState<TimeUnit | null>(null)
    return (
        <div
            className="flex items-center justify-center text-4xl md:text-6xl bg-secondary rounded-xl p-6 shadow-lg w-full">
            <Cell
                timeUnit="hours"
                setEditing={setEditing}
                editing={editing} />
            <div>:</div>
            <Cell
                timeUnit="minutes"
                setEditing={setEditing}
                editing={editing} />
            <div>:</div>
            <Cell
                timeUnit="seconds"
                setEditing={setEditing}
                editing={editing} />
            <div>.</div>
            <Cell
                timeUnit="millis"
            />
        </div >
    )
}


interface CellProps {
    timeUnit: TimeUnit
    setEditing?: (value: TimeUnit | null) => void
    editing?: TimeUnit | null,
}

const Cell = ({ editing, setEditing, timeUnit }: CellProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const value = useCountdownContext()[timeUnit]
    const dispatch = useCountdownDispatch()

    // @ts-expect-error("That's works even being null")
    useOnClickOutside(inputRef, () => setEditing(null))

    return (
        <div className="text-center basis-16 md:basis-24 grow shrink">
            {
                editing === timeUnit ?
                    <Input
                        className="text-4xl md:text-6xl text-center w-full focus-visible:outline-none m-0 focus-visible:border-none focus-visible:ring-0 bg-transparent dark:bg-transparent p-0 md:py-2 box-content"
                        ref={inputRef}
                        value={value}
                        onChange={(e) => {
                            const inputValue = Number(e.target.value)
                            const formattedInputValue = formatTimeValue(inputValue, timeUnit)
                            if (!formattedInputValue || formattedInputValue === value) return;
                            dispatch({
                                type: "set",
                                state: { [timeUnit]: formattedInputValue }
                            })
                        }}
                        autoFocus
                    />
                    :
                    <div
                        className="cursor-text w-full"
                        onClick={() => {
                            if (setEditing) setEditing(timeUnit)
                        }}
                    >
                        {value}
                    </div>
            }
        </div>
    )
}

export { CountdownTimer }