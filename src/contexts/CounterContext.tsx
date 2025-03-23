"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionDispatch, createContext, useContext, useReducer } from "react";

export type TimeUnit = "hours" | "minutes" | "seconds" | "millis"

type CountdownProps = {
    [K in TimeUnit]: string;
};

function countdownReducer(props: CountdownProps, action: { type: any; state: CountdownProps; }): CountdownProps {
    switch (action.type) {
        case "set": return { ...props, ...action.state }
        default: return props
    }
}

const CountdownContext = createContext<CountdownProps>(null!)
const CountdownDispatchContext = createContext<ActionDispatch<any>>(null!)


export const CountdownTimerProvider = ({ children }: { children: React.ReactNode }) => {
    const [countdownCounter, dispatch] = useReducer(countdownReducer, {
        hours: "00",
        minutes: "00",
        seconds: "00",
        millis: "000"
    } satisfies CountdownProps)
    return (
        <CountdownContext.Provider value={countdownCounter}>
            <CountdownDispatchContext.Provider value={dispatch}>
                {children}
            </CountdownDispatchContext.Provider>
        </CountdownContext.Provider>
    )
}

export const useCountdownContext = (): CountdownProps => {
    const countdownCounter = useContext(CountdownContext)
    return countdownCounter
}

export const useCountdownDispatch = () => {
    const dispatch = useContext(CountdownDispatchContext)
    return dispatch
}

export const useCountdownActions = () => {

}