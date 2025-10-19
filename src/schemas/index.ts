import { z } from 'zod'

const FieldSchema = z.object({
  fieldName: z.string(),
  title: z.string().optional(),
  fieldType: z.enum(['string', 'number', 'date', 'select']).default('string'),
  visible: z.boolean().optional(),
  order: z.number().optional(),
  defaultValue: z.string().optional(),
})

export type Field = z.infer<typeof FieldSchema>

const ActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(['create', 'update', 'delete']).describe('Тип действия (для UI-кнопок)'),
  icon: z.string().optional(),
})

const FilterSchema = z.object({
  field: z.string(),
  type: z.enum(['text', 'select', 'date']),
  options: z.array(z.string()).optional(),
  label: z.string().optional(),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PageConfigSchema = z.object({
  pageName: z.string(),
  entityKey: z.string(),
  fields: z.array(FieldSchema),
  actions: z.array(ActionSchema).optional(),
  filters: z.array(FilterSchema).optional(),
  layout: z.enum(['list', 'grid']).optional(),
  version: z.string().default('v1'),
  meta: z.record(z.string(), z.any()).optional(),
})

export type PageConfig = z.infer<typeof PageConfigSchema>
