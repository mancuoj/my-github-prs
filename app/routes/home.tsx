import { PrItem } from '@/components/pr-item'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ThemeToggle } from '@/components/theme-toggle'
import { TwScreenIndicator } from '@/components/tw-screen-indicator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { fetchUserPrs } from '@/lib/github'
import { useLoaderData } from 'react-router'

export function meta() {
  return [
    { title: 'My GitHub Pull Requests' },
    { name: 'description', content: 'Mancuoj\'s GitHub Pull Requests' },
  ]
}

export async function loader() {
  const contributions = await fetchUserPrs()
  return { contributions }
}

export default function Home() {
  const { contributions } = useLoaderData<typeof loader>()

  const { user, prs } = contributions
  const userUrl = `https://github.com/${user?.username}`

  return (
    <div className="relative font-sans antialiased">
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <div className="flex flex-col items-center">
          <a href={userUrl} target="_blank" rel="noopener noreferrer">
            <Avatar className="size-14">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </a>
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
        <div className="flex flex-col gap-8 md:gap-10">
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
