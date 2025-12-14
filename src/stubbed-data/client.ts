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
  { name: 'Иванов И.И.', email: 'ivanov@mail.ru', status: 'active', createdAt: '2024-10-12' },
  { name: 'Петров П.П.', email: 'petrov@mail.ru', status: 'archived', createdAt: '2024-09-01' },
  { name: 'Иванов И.И.', email: 'ivanov@mail.ru', status: 'active', createdAt: '2024-10-12' },
  { name: 'Петров П.П.', email: 'petrov@mail.ru', status: 'archived', createdAt: '2024-09-01' },
  { name: 'Иванов И.И.', email: 'ivanov@mail.ru', status: 'active', createdAt: '2024-10-12' },
  { name: 'Петров П.П.', email: 'petrov@mail.ru', status: 'archived', createdAt: '2024-09-01' },
  { name: 'Иванов И.И.', email: 'ivanov@mail.ru', status: 'active', createdAt: '2024-10-12' },
  { name: 'Петров П.П.', email: 'petrov@mail.ru', status: 'archived', createdAt: '2024-09-01' },
]

export const productPage: PageConfig = {
  pageName: 'Продукты',
  entityKey: 'products',
  layout: 'list',
  version: 'v1',
  fields: [
    {
      fieldName: 'name',
      title: 'Название',
      fieldType: 'string',
      visible: true,
      order: 1,
      defaultValue: '',
    },
    {
      fieldName: 'category',
      title: 'Категория',
      fieldType: 'select',
      visible: true,
      order: 2,
    },
    {
      fieldName: 'price',
      title: 'Цена',
      fieldType: 'number',
      visible: true,
      order: 3,
    },
    {
      fieldName: 'stock',
      title: 'На складе',
      fieldType: 'number',
      visible: true,
      order: 4,
    },
    {
      fieldName: 'status',
      title: 'Статус',
      fieldType: 'select',
      visible: true,
      order: 5,
      defaultValue: 'available',
    },
    {
      fieldName: 'createdAt',
      title: 'Дата добавления',
      fieldType: 'date',
      visible: true,
      order: 6,
    },
  ],
  filters: [
    {
      field: 'category',
      type: 'select',
      options: ['electronics', 'clothing', 'food', 'books'],
      label: 'Категория',
    },
    {
      field: 'status',
      type: 'select',
      options: ['available', 'out_of_stock', 'discontinued'],
      label: 'Статус',
    },
    {
      field: 'createdAt',
      type: 'date',
      label: 'Дата добавления',
    },
  ],
  actions: [
    {
      id: 'create',
      label: 'Добавить продукт',
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
    section: 'inventory',
  },
}

export const productData = [
  { 
    name: 'iPhone 15 Pro Max', 
    category: 'electronics', 
    price: 119990, 
    stock: 5, 
    status: 'available', 
    createdAt: '2024-11-25' 
  },
  { 
    name: 'Ноутбук Dell XPS 15', 
    category: 'electronics', 
    price: 89990, 
    stock: 12, 
    status: 'available', 
    createdAt: '2024-11-01' 
  },
  { 
    name: 'Футболка Nike Dri-FIT', 
    category: 'clothing', 
    price: 2990, 
    stock: 0, 
    status: 'out_of_stock', 
    createdAt: '2024-10-15' 
  },
  { 
    name: 'Джинсы Levi\'s 501', 
    category: 'clothing', 
    price: 5490, 
    stock: 15, 
    status: 'available', 
    createdAt: '2024-10-20' 
  },
  { 
    name: 'Кофе Lavazza Qualità Rossa', 
    category: 'food', 
    price: 890, 
    stock: 45, 
    status: 'available', 
    createdAt: '2024-11-20' 
  },
  { 
    name: 'Книга "Мастер и Маргарита"', 
    category: 'books', 
    price: 590, 
    stock: 8, 
    status: 'available', 
    createdAt: '2024-09-10' 
  },
  { 
    name: 'AirPods Pro 2', 
    category: 'electronics', 
    price: 24990, 
    stock: 20, 
    status: 'available', 
    createdAt: '2024-12-01' 
  },
  { 
    name: 'Кроссовки Adidas Ultraboost', 
    category: 'clothing', 
    price: 12990, 
    stock: 7, 
    status: 'available', 
    createdAt: '2024-11-18' 
  },
  { 
    name: 'Шоколад Milka Oreo', 
    category: 'food', 
    price: 120, 
    stock: 100, 
    status: 'available', 
    createdAt: '2024-11-05' 
  },
  { 
    name: 'Планшет Samsung Galaxy Tab S9', 
    category: 'electronics', 
    price: 32990, 
    stock: 0, 
    status: 'discontinued', 
    createdAt: '2024-08-15' 
  },
  { 
    name: 'Чай Greenfield Classic', 
    category: 'food', 
    price: 340, 
    stock: 67, 
    status: 'available', 
    createdAt: '2024-10-30' 
  },
  { 
    name: 'Книга "1984" Оруэлл', 
    category: 'books', 
    price: 450, 
    stock: 3, 
    status: 'available', 
    createdAt: '2024-09-25' 
  },
]