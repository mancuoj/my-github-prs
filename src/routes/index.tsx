import { ThemeToggle } from '@/components/theme-toggle'
import { TwScreenIndicator } from '@/components/tw-screen-indicator'

export function App() {
  return (
    <div className="relative font-sans antialiased">
      <div className="flex flex-col items-center justify-center min-h-svh">
        <ThemeToggle />
        <TwScreenIndicator />
      </div>
    </div>
  )
}
