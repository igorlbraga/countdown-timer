import { CountdownTimer } from "./CountdownTimer";
import { CountdownTimerProvider } from "@/contexts/CounterContext";
import { ControlButtons } from "./ControlButtons";


export default function Home() {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center max-w-3xl mx-auto p-4 space-y-8">
      <CountdownTimerProvider>
        <CountdownTimer />
        <ControlButtons />
      </CountdownTimerProvider>
    </div>
  );
}