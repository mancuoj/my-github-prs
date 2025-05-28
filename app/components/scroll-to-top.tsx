import { useWindowScroll } from '@shined/react-use'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

export function ScrollToTop() {
  const { y, scrollTo } = useWindowScroll({ behavior: 'smooth' })

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => scrollTo({ x: 0, y: 0 })}
      className={cn(
        'fixed bottom-4 right-4 z-10 rounded-full',
        'transition-opacity duration-300',
        y > 200 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <span className="iconify carbon--arrow-up size-4.5" />
    </Button>
  )
}
