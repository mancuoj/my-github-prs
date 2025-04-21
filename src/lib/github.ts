import { Octokit } from 'octokit'

let octokitInstance: Octokit

export function getOctokitInstance() {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: import.meta.env.VITE_GITHUB_TOKEN,
    })
  }
  return octokitInstance
}
