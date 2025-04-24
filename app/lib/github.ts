import type { Contributions, PullRequest, User } from './types'
import process from 'node:process'
import { Octokit } from 'octokit'

let octokitInstance: Octokit

export function getOctokitInstance() {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    })
  }
  return octokitInstance
}

async function fetchUser() {
  const octokit = getOctokitInstance()
  const userResponse = await octokit.request('GET /user')
  const user: User = {
    name: userResponse.data.name ?? userResponse.data.login,
    username: userResponse.data.login,
    avatar: userResponse.data.avatar_url,
  }
  return user
}

async function fetchRepoDetails(owner: string, name: string) {
  const octokit = getOctokitInstance()
  const { data } = await octokit.request('GET /repos/{owner}/{name}', { owner, name })
  return data
}

export async function fetchUserPrs() {
  const octokit = getOctokitInstance()

  const user = await fetchUser()
  const { data } = await octokit.request('GET /search/issues', {
    // To exclude the pull requests to your repositories
    // q: `type:pr+author:"${user.username}"+-user:"${user.username}"`
    q: `type:pr+author:"${user.username}"`,
    per_page: 50,
    page: 1,
    advanced_search: 'true',
  })
  const filterPrs = data.items.filter(pr => !(pr.state === 'closed' && !pr.pull_request?.merged_at))

  const prs: PullRequest[] = []
  for (const pr of filterPrs) {
    const [owner, name] = pr.repository_url.split('/').slice(-2)
    const repo = await fetchRepoDetails(owner, name)
    prs.push({
      repo: `${owner}/${name}`,
      title: pr.title,
      url: pr.html_url,
      created_at: pr.created_at,
      state: pr.pull_request?.merged_at ? 'merged' : pr.draft ? 'draft' : pr.state as 'open' | 'closed',
      number: pr.number,
      type: repo.owner.type,
      stars: repo.stargazers_count,
    })
  }

  return { user, prs } as Contributions
}
