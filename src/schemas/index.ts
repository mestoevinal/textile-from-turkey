import { z } from 'zod'

const FieldSchema = z.object({
  fieldName: z.string(),
  title: z.string().optional(),
  visible: z.boolean().optional(),
  order: z.number().optional(),
  defaultValue: z.string().optional(),
})

const ActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(['create', 'update', 'delete', 'export']).describe('Тип действия (для UI-кнопок)'),
  icon: z.string().optional(),
})

export const FilterSchema = z.object({
  field: z.string(),
  type: z.enum(['text', 'select', 'date']),
  options: z.array(z.string()).optional().describe('Варианты выбора (для select)'),
  label: z.string().optional(),
})

export const PageConfigSchema = z.object({
  pageName: z.string(),
  entityKey: z.string(),
  fields: z.array(FieldSchema),
  actions: z.array(ActionSchema).optional(),
  layout: z.enum(['list', 'grid', 'kanban']).optional().describe('Тип отображения карточек'),
  version: z.string().default('v1'),
  meta: z.record(z.any(), z.any()).optional(),
})
