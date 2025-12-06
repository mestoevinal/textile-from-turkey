import type { PageConfig } from '../schemas'

export const clientPage: PageConfig = {
  pageName: 'Clients',
  entityKey: 'clients',
  layout: 'list',
  version: 'v1',
  fields: [
    {
      fieldName: 'name',
      title: 'Имя',
      fieldType: 'string',
      visible: true,
      order: 1,
      defaultValue: '',
    },
    {
      fieldName: 'email',
      title: 'Email',
      fieldType: 'string',
      visible: true,
      order: 2,
    },
    {
      fieldName: 'status',
      title: 'Статус',
      fieldType: 'select',
      visible: true,
      order: 3,
      defaultValue: 'active',
    },
    {
      fieldName: 'createdAt',
      title: 'Дата регистрации',
      fieldType: 'date',
      visible: true,
      order: 4,
    },
  ],
  filters: [
    {
      field: 'status',
      type: 'select',
      options: ['active', 'archived'],
      label: 'Статус',
    },
    {
      field: 'createdAt',
      type: 'date',
      label: 'Дата регистрации',
    },
  ],
  actions: [
    {
      id: 'create',
      label: 'Добавить клиента',
      type: 'create',
      icon: 'plus',
    },
    {
      id: 'export',
      label: 'Экспорт',
      type: 'delete', 
      icon: 'upload',
    },
  ],
  meta: {
    section: 'crm',
  },
}

export const clientData = [
  { name: 'Иванов И.И.', email: 'ivanov@mail.ru', status: 'active', createdAt: '2024-10-12' },
  { name: 'Петров П.П.', email: 'petrov@mail.ru', status: 'archived', createdAt: '2024-09-01' },
]

