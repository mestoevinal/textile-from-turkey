import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Product } from '../App';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  category: string;
  images: string[];
}

const emptyForm: ProductForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  images: [],
};

function generateId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    }).catch(() => {
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400">Загрузка...</div>
      </div>
    );
  }

  if (!session) {
    return <LoginForm />;
  }

  return <AdminDashboard session={session} />;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Неверный email или пароль');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Вход в панель управления</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl transition-colors text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard({ session }: { session: Session }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category')
      .order('name');

    if (!error && data) {
      setProducts(data.map(row => ({ ...row, images: row.images ?? [] })));
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handlePublish() {
    setPublishing(true);
    const newVersion = String(Date.now());
    const { error } = await supabase
      .from('settings')
      .update({ value: newVersion })
      .eq('key', 'cache_version');

    if (!error) {
      setPublishedAt(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }));
    } else {
      alert('Не удалось опубликовать изменения. Попробуйте снова.');
    }
    setPublishing(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(prev => prev.filter(p => p.id !== id));
    } else {
      alert('Не удалось удалить товар. Попробуйте снова.');
    }
    setDeletingId(null);
  }

  function openAdd() {
    setEditingProduct(null);
    setShowModal(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setShowModal(true);
  }

  function handleSaved(product: Product) {
    setProducts(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? product : p);
      return [...prev, product];
    });
    setShowModal(false);
  }

  const categories = [...new Set(products.map(p => p.category))].sort();
  const filtered = filterCategory ? products.filter(p => p.category === filterCategory) : products;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Панель управления</h1>
            <p className="text-xs text-gray-400">{session.user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {publishedAt && (
                <span className="text-xs text-gray-400">Опубликовано в {publishedAt}</span>
              )}
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer"
              >
                {publishing ? 'Публикация...' : 'Опубликовать изменения'}
              </button>
            </div>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={openAdd}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl text-sm transition-colors cursor-pointer"
          >
            + Добавить товар
          </button>
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">Все категории ({products.length})</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat} ({products.filter(p => p.category === cat).length})
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-gray-400 text-sm">Загрузка...</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-400 text-sm">Нет товаров</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">ID</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Название</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Категория</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Цена</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">Фото</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{product.id}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{product.name}</td>
                      <td className="px-4 py-3 text-gray-500">{product.category}</td>
                      <td className="px-4 py-3 text-gray-800">
                        {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                      </td>
                      <td className="px-4 py-3 text-gray-400">{product.images.length} шт.</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => openEdit(product)} className="text-blue-500 hover:text-blue-600 text-sm transition-colors cursor-pointer">
                            Изменить
                          </button>
                          <button onClick={() => setDeletingId(product.id)} className="text-red-400 hover:text-red-500 text-sm transition-colors cursor-pointer">
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-100">
              {filtered.map(product => (
                <div key={product.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{product.category} · #{product.id}</p>
                      <p className="text-sm text-gray-700 mt-1">
                        {new Intl.NumberFormat('ru-RU').format(product.price)} ₽
                      </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={() => openEdit(product)} className="text-blue-500 text-sm cursor-pointer">Изменить</button>
                      <button onClick={() => setDeletingId(product.id)} className="text-red-400 text-sm cursor-pointer">Удалить</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onSaved={handleSaved}
          onClose={() => setShowModal(false)}
        />
      )}

      {deletingId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="font-semibold text-gray-800 mb-2">Удалить товар?</h3>
            <p className="text-sm text-gray-500 mb-6">Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deletingId)}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Удалить
              </button>
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploader({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError('');

    const uploaded: string[] = [];
    let failedCount = 0;

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop();
      const path = `${generateId()}.${ext}`;

      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file, { upsert: false });

      if (!error) {
        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(path);
        uploaded.push(data.publicUrl);
      } else {
        failedCount++;
      }
    }

    if (failedCount > 0) {
      setUploadError(`Не удалось загрузить ${failedCount} фото. Попробуйте снова.`);
    }

    onChange([...images, ...uploaded]);
    setUploading(false);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Изображения</label>

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover rounded-xl border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors disabled:opacity-50 cursor-pointer"
      >
        {uploading ? 'Загрузка...' : '+ Загрузить фото'}
      </button>
      {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
    </div>
  );
}

function ProductFormModal({
  product,
  categories,
  onSaved,
  onClose,
}: {
  product: Product | null;
  categories: string[];
  onSaved: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProductForm>(() =>
    product
      ? {
          name: product.name,
          description: product.description,
          price: String(product.price),
          category: product.category,
          images: product.images,
        }
      : emptyForm
  );
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const isEdit = !!product;

  function setField<K extends keyof ProductForm>(key: K, value: ProductForm[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.category.trim()) {
      setError('Заполните название и категорию');
      return;
    }

    const price = Number(form.price) || 0;
    if (price < 0) {
      setError('Цена не может быть отрицательной');
      return;
    }

    setSaving(true);

    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      category: form.category.trim(),
      images: form.images,
    };

    let newId: string | undefined;
    if (!isEdit) {
      const { data: existing } = await supabase.from('products').select('id');
      const maxNum = (existing ?? []).reduce((max, p) => {
        const n = parseInt(p.id, 10);
        return isNaN(n) ? max : Math.max(max, n);
      }, 0);
      newId = String(maxNum + 1);
    }

    const { data, error } = isEdit
      ? await supabase.from('products').update(payload).eq('id', product.id).select().single()
      : await supabase.from('products').insert({ id: newId, ...payload }).select().single();

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    onSaved({ ...data, images: data.images ?? [] });
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">
            {isEdit ? 'Редактировать товар' : 'Добавить товар'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Название *</label>
              <input
                value={form.name}
                onChange={e => setField('name', e.target.value)}
                placeholder="Название товара"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Цена (₽)</label>
              <input
                type="number"
                min="0"
                value={form.price}
                onChange={e => setField('price', e.target.value)}
                placeholder="0"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Категория *</label>
            <input
              value={form.category}
              onChange={e => setField('category', e.target.value)}
              list="categories-list"
              placeholder="Выберите или введите категорию"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="categories-list">
              {categories.map(cat => <option key={cat} value={cat} />)}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              value={form.description}
              onChange={e => setField('description', e.target.value)}
              rows={3}
              placeholder="Описание товара"
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <ImageUploader
            images={form.images}
            onChange={imgs => setField('images', imgs)}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-xl text-sm transition-colors disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Добавить'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-xl text-sm transition-colors cursor-pointer"
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
