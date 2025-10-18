import { z } from "zod"

const FieldSchema = z.object({
  fieldName: z.string(),
  label: z.string(),
  fieldType: z.enum(["string", "number", "date", "select"]),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional().describe("Варианты выбора (для select)"),
  visible: z.boolean().optional(),
  order: z.number().optional(),
})

const ActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["create", "update", "delete", "export"]).describe("Тип действия (для UI-кнопок)"),
})

const FilterSchema = z.object({
  field: z.string(),
  type: z.enum(["text", "select", "date"]),
  label: z.string().optional(),
})

export const PageConfigSchema = z.object({
  pageName: z.string(),
  entityKey: z.string(),
  fields: z.array(FieldSchema),
  actions: z.array(ActionSchema).optional(),
  filters: z.array(FilterSchema).optional(),
  layout: z.enum(["list", "grid", "kanban"]).optional().describe("Тип отображения карточек"),
})
