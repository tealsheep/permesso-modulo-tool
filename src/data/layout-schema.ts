import { z } from 'zod'
import { isoDateSchema } from './schemas'

const n = z.number().finite()
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/)
const pathItem = z.union([
  z.tuple([z.literal('l'), n, n, n, n]),
  z.tuple([z.literal('c'), n, n, n, n, n, n, n, n]),
  z.tuple([z.literal('qu'), n, n, n, n, n, n, n, n]),
])
export const layoutPathSchema = z.object({
  stroke: color.nullable(), fill: color.nullable(), lineWidth: n.nonnegative(),
  dashes: z.string().regex(/^\[\s*(?:\d+(?:\.\d+)?\s*)*\]\s*\d+(?:\.\d+)?$/).nullable(),
  closePath: z.boolean(), evenOdd: z.boolean(), items: z.array(pathItem).min(1),
})
export const layoutTextSchema = z.object({
  text: z.string().min(1), x: n, y: n, size: n.positive(),
  font: z.enum(['narrow-bold', 'narrow-regular', 'bold', 'regular']), color, width: n.positive(),
})
export const modulo2LayoutSchema = z.object({
  form: z.literal('modulo2-layout'), version: z.literal(1), verifiedOn: isoDateSchema,
  basedOn: z.string().min(1), note: z.string().optional(),
  pages: z.array(z.object({
    page: n.int().positive(), width: n.positive(), height: n.positive(),
    texts: z.array(layoutTextSchema), paths: z.array(layoutPathSchema),
    omitted: z.array(z.object({ what: z.literal('image'), bbox: z.tuple([n, n, n, n]) })),
  })).min(1),
}).refine((layout) => layout.pages.every((page, index) => page.page === index + 1), { message: '版式页码必须从 1 连续递增' })

export type Modulo2Layout = z.infer<typeof modulo2LayoutSchema>
export type LayoutPath = z.infer<typeof layoutPathSchema>
export type LayoutText = z.infer<typeof layoutTextSchema>
