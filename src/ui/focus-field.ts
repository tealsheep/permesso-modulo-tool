import { questionId } from '../questionnaire/model'

export function focusField(path: string) {
  requestAnimationFrame(() => {
    const group = document.getElementById(questionId(path))
    const target = group?.matches('input, select, button, textarea') ? group : group?.querySelector<HTMLElement>('input, button, select, textarea') ?? group
    group?.scrollIntoView({ block: 'center', behavior: 'instant' })
    target?.focus({ preventScroll: true })
  })
}
