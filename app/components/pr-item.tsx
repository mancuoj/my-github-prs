import type { PullRequest } from '@/lib/types'
import { useTimeAgo } from '@shined/react-use'
import { LucideGitMerge, LucideGitPullRequestArrow, LucideGitPullRequestClosed, LucideGitPullRequestDraft } from 'lucide-react'
import { formatStars } from '@/lib/utils'

const stateIcon = {
  open: <LucideGitPullRequestArrow className="size-3.5 sm:size-4.5 text-green-400 shrink-0" />,
  closed: <LucideGitPullRequestClosed className="size-3.5 sm:size-4.5 text-gray-400 shrink-0" />,
  merged: <LucideGitMerge className="size-3.5 sm:size-4.5 text-purple-400 shrink-0" />,
  draft: <LucideGitPullRequestDraft className="size-3.5 sm:size-4.5 text-red-400 shrink-0" />,
}

export function PrItem({ pr }: { pr: PullRequest }) {
  const timeAgo = useTimeAgo(new Date(pr.created_at))
  const [author, repo] = pr.repo.split('/')

  return (
    <div className="flex gap-4 items-center">
      <a href={`https://github.com/${author}`} target="_blank" rel="noopener noreferrer">
        <img src={`https://github.com/${author}.png`} className="size-9 sm:size-11 rounded shadow" />
      </a>
      <div className="flex-1 flex justify-between gap-3 md:gap-4 min-w-0">
        <div className="flex flex-col gap-1 min-w-0 sm:gap-1.5">
          <a href={pr.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 sm:gap-1.5 text-sm sm:text-base">
            {stateIcon[pr.state]}
            <span className="truncate hover:underline">{pr.title}</span>
          </a>
          <div className="flex gap-2.5 text-xs sm:text-sm">
            <a href={`https://github.com/${pr.repo}`} target="_blank" rel="noopener noreferrer" className="inline-flex gap-1 truncate text-muted-foreground">
              <span className="opacity-75">{author}</span>
              <span className="opacity-50">/</span>
              <span className="truncate">{repo}</span>
            </a>
            <p className="hidden sm:inline-flex gap-0.5 items-center hover:text-primary">
              <span className="iconify carbon--star size-3 shrink-0" />
              {formatStars(pr.stars)}
            </p>
          </div>
        </div>
        <div className="flex flex-col text-right shrink-0 gap-2.5 text-xs sm:text-sm">
          <a href={pr.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            #
            {pr.number}
          </a>
          <p className="text-muted-foreground">{timeAgo}</p>
        </div>
      </div>
    </div>
  )
}
