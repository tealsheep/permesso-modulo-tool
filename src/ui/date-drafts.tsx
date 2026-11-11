import { createContext, useContext, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import type { FormError } from './questionnaire'

type DraftValidator = () => FormError | null
type DateDraftRegistry = { register: (path: string, validator: DraftValidator) => () => void; validate: () => FormError[] }
const DateDraftContext = createContext<DateDraftRegistry>({ register: () => () => {}, validate: () => [] })
export function DateDraftProvider({ children }: { children: ReactNode }) {
  const validators = useRef(new Map<string, DraftValidator>())
  const registry = useMemo<DateDraftRegistry>(() => ({
    register(path, validator) {
      validators.current.set(path, validator)
      return () => { if (validators.current.get(path) === validator) validators.current.delete(path) }
    },
    validate: () => [...validators.current.values()].map((validate) => validate()).filter((error): error is FormError => !!error),
  }), [])
  return <DateDraftContext.Provider value={registry}>{children}</DateDraftContext.Provider>
}
export const useDateDrafts = () => useContext(DateDraftContext)
export function mergeDateErrors(errors: FormError[], drafts: FormError[]): FormError[] {
  return [...new Map([...errors, ...drafts].map((error) => [error.path, error])).values()]
}
