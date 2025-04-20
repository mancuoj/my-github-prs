import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter } from 'react-router'
import { queryClient } from './query-client'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider storageKey="react-tmpl-lite-theme" attribute="class">
          {children}
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
