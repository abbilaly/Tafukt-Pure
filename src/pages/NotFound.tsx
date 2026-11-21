import { Button, Container, Sprig } from '../components/ui'
import { useContent } from '../lib/lang'
import { useTitle } from '../lib/title'

export function NotFound({ message }: { message?: string }) {
  const { notFound, ui } = useContent()
  useTitle(notFound.title)
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Sprig className="h-16 text-flame-ink" />
      <p className="mt-6 font-serif text-[120px] leading-none text-flame-text md:text-[180px]">{notFound.eyebrow}</p>
      <h1 className="mt-4 max-w-xl text-balance font-serif text-[36px] leading-tight text-wine md:text-[48px]">{message ?? notFound.title}</h1>
      <p className="mt-4 text-muted">{notFound.body}</p>
      <div className="mt-8 flex gap-3">
        <Button to="/">{notFound.cta}</Button>
        <Button to="/shop" variant="outline">
          {ui.theLarder}
        </Button>
      </div>
    </Container>
  )
}
