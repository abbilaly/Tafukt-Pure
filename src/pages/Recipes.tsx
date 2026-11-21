import { Check, Clock, Users } from 'lucide-react'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router'

import { JarTile, RecipeCard } from '../components/Cards'
import { Button, Chip, Container, Crumb, EmptyState, SectionHeading } from '../components/ui'
import { img, type Course } from '../content'
import { useContent } from '../lib/lang'
import { useStore } from '../lib/store'
import { useTitle } from '../lib/title'
import { NotFound } from './NotFound'

const courses: Course[] = ['Starter', 'Main', 'Sweet']

export function Recipes() {
  const { recipesPage: copy, recipes, ui } = useContent()
  useTitle(copy.title)
  const [params, setParams] = useSearchParams()
  const course = courses.find((c) => c === params.get('course')) ?? null
  const list = recipes.filter((r) => !course || r.course === course)
  return (
    <Container className="pb-28 pt-12 md:pt-16">
      <SectionHeading as="h1" eyebrow={copy.eyebrow} title={copy.title}>
        <p>{copy.intro}</p>
      </SectionHeading>
      <div role="group" aria-label={ui.courseLabel} className="mt-10 flex flex-wrap gap-2 border-y border-line py-5">
        <Chip active={!course} onClick={() => setParams({}, { replace: true })}>
          {ui.allCourses}
        </Chip>
        {courses.map((c) => (
          <Chip key={c} active={course === c} onClick={() => setParams({ course: c }, { replace: true })}>
            {ui.courses[c]}
          </Chip>
        ))}
      </div>
      {list.length === 0 ? (
        <div className="mt-10">
          <EmptyState title={copy.empty} body={ui.tryAnotherCourse} />
        </div>
      ) : (
        <div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}
    </Container>
  )
}

export function RecipePage() {
  const { slug } = useParams()
  const { recipe: recipeOf, products: allProducts, ui } = useContent()
  const recipe = recipeOf(slug ?? '')
  useTitle(recipe?.title ?? ui.recipeNotFound)
  const { add, toast } = useStore()
  const [done, setDone] = useState<number[]>([])
  if (!recipe) return <NotFound message={ui.recipeNotFound} />
  const products = recipe.products.map((s) => allProducts.find((p) => p.slug === s))
  return (
    <>
      <Container className="pt-8">
        <Crumb to="/recipes">{ui.allCourses}</Crumb>
      </Container>
      <Container className="grid gap-12 pb-24 pt-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <img src={img(recipe.image)} alt={recipe.title} className="aspect-square w-full rounded-[999px_999px_32px_32px] object-cover lg:sticky lg:top-6" />
        <div>
          <p className="flex flex-wrap items-center gap-4 text-[14px] font-semibold text-flame-text">
            <span>{ui.courses[recipe.course]}</span>
            <span className="flex items-center gap-1">
              <Clock className="size-4" aria-hidden /> {ui.minutes(recipe.minutes)}
            </span>
            <span className="flex items-center gap-1">
              <Users className="size-4" aria-hidden /> {ui.serves(recipe.serves)}
            </span>
          </p>
          <h1 className="mt-4 text-balance font-serif text-[44px] leading-[1.05] text-wine md:text-[60px]">{recipe.title}</h1>
          <p className="mt-5 font-serif text-[21px] italic text-muted">{recipe.intro}</p>

          <h2 className="mt-12 font-serif text-[28px] text-wine">{ui.ingredients}</h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {recipe.ingredients.map((i) => (
              <li key={i} className="py-3 text-[16px] text-ink">
                {i}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-serif text-[28px] text-wine">{ui.method}</h2>
          <p className="mt-1 text-[14px] text-muted">{ui.tickSteps}</p>
          <ol className="mt-4 flex flex-col gap-3">
            {recipe.steps.map((s, i) => {
              const on = done.includes(i)
              return (
                <li key={i}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDone((d) => (on ? d.filter((x) => x !== i) : [...d, i]))}
                    className="flex w-full gap-4 rounded-card border-[1.5px] border-line p-4 text-start transition-colors hover:border-wine aria-pressed:border-transparent aria-pressed:bg-cream-2"
                  >
                    <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-wine font-serif text-[16px] text-on-dark">
                      {on ? <Check className="size-4" /> : i + 1}
                    </span>
                    <span className={on ? 'text-muted line-through decoration-flame-ink/60' : 'text-ink'}>{s}</span>
                  </button>
                </li>
              )
            })}
          </ol>

          {products.length > 0 && (
            <div className="mt-12 rounded-card bg-cream-2 p-5">
              <h2 className="font-serif text-[24px] text-wine">{ui.fromLarder}</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {products.map((p) =>
                  p ? (
                    <li key={p.slug} className="flex items-center gap-4">
                      <JarTile product={p} className="size-20 shrink-0 rounded-field" />
                      <div className="flex-1">
                        <p className="font-serif text-[20px] text-wine">{p.name}</p>
                        <p className="text-[14px] text-muted">{p.kind}</p>
                      </div>
                      <Button
                        size="md"
                        onClick={() => {
                          add(p, p.sizes[0].id)
                          toast(ui.addedToast(p.name), 'success')
                        }}
                      >
                        {ui.addShort}
                      </Button>
                    </li>
                  ) : null,
                )}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </>
  )
}
