import { PrItem } from '@/components/pr-item'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ThemeToggle } from '@/components/theme-toggle'
import { TwScreenIndicator } from '@/components/tw-screen-indicator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchUserPrs } from '@/hooks/use-contributions'

import { useQuery } from '@tanstack/react-query'

export function App() {
  const { data: contributions, isLoading } = useQuery({
    queryKey: ['user-prs'],
    queryFn: fetchUserPrs,
  })

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="iconify carbon--circle-dash size-10 animate-spin" />
      </div>
    )
  }

  if (!contributions) {
    throw new Error('Failed to fetch contributions')
  }

  const { user, prs } = contributions!
  const userUrl = `https://github.com/${user?.username}`

  return (
    <div className="relative font-sans antialiased">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <div className="flex flex-col items-center">
          <Avatar className="size-14">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-bold mt-4">
            <a href={userUrl} target="_blank" rel="noopener noreferrer">
              {user.name}
            </a>
            {' '}
            is
            {' '}
            <span className="text-primary animate-pulse">Contributing ...</span>
          </h1>
          <a className="text-sm text-muted-foreground mt-1.5" href={userUrl} target="_blank" rel="noopener noreferrer">
            @
            { user.username }
            's recent pull requests on GitHub.
          </a>
          <div className="flex gap-0.5 mt-1.5">
            <ThemeToggle />
            <Button variant="ghost" size="icon">
              <a className="iconify carbon--logo-github size-4.5" href={userUrl} target="_blank" rel="noopener noreferrer" />
            </Button>
          </div>
        </div>
        <Separator className="mt-4 mb-8" />
        <div className="flex flex-col gap-6 md:gap-10">
          {prs.map(pr => (
            <PrItem key={pr.url} pr={pr} />
          ))}
        </div>
        <TwScreenIndicator />
        <ScrollToTop />
      </div>
    </div>
  )
}
