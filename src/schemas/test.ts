export const testClientPage = {
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
      meta: { color: 'blue' },
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
