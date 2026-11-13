import React, { useState, useEffect, useMemo } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  FolderIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const INITIAL_CATEGORIES = [
  {
    id: 'CAT-01',
    name: 'Tortlar',
    description: 'Shokoladli, biskvitli va bayramona asal tortlar',
    order: 1,
    isActive: true,
    icon: '🎂',
    productCount: 1,
  },
  {
    id: 'CAT-02',
    name: 'Kekslar va Muffinlar',
    description: 'Kichik qandolat pishiriqlari, shirin muffinlar va kapkeyklar',
    order: 2,
    isActive: true,
    icon: '🧁',
    productCount: 1,
  },
  {
    id: 'CAT-03',
    name: 'Piroglar va Pishiriqlar',
    description: 'Mevali piroglar, limonli tartletkalar va qatlama pishiriqlar',
    order: 3,
    isActive: true,
    icon: '🥧',
    productCount: 1,
  },
  {
    id: 'CAT-04',
    name: 'Biskvitlar va Pechenyalar',
    description: 'Choybop xushtaʼm pechenyalar va quruq pishiriqlar',
    order: 4,
    isActive: true,
    icon: '🍪',
    productCount: 0,
  },
];

const STORAGE_KEY = 'shirinlik_categories_v1';

export function CategoriesView({ orders = [] }) {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_CATEGORIES;
  });

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'active' | 'inactive'
  const [sortBy, setSortBy] = useState('order_asc');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [detailCategory, setDetailCategory] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 1,
    isActive: true,
    icon: '🍰',
  });
  const [formError, setFormError] = useState('');

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch {}
  }, [categories]);

  // Compute product counts dynamically from orders
  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => {
      const count = orders.filter((o) => {
        const catName = cat.name.toLowerCase();
        const orderCat = (o.category || '').toLowerCase();
        const title = (o.orderTitle || '').toLowerCase();
        return (
          orderCat.includes(catName.slice(0, 4)) ||
          title.includes(catName.slice(0, 4))
        );
      }).length;
      return { ...cat, productCount: count || cat.productCount };
    });
  }, [categories, orders]);

  // KPIs
  const totalCategories = categoriesWithCounts.length;
  const activeCategories = categoriesWithCounts.filter((c) => c.isActive).length;
  const inactiveCategories = totalCategories - activeCategories;
  const totalProducts = categoriesWithCounts.reduce((acc, c) => acc + c.productCount, 0);

  // Filtering & Sorting
  const filteredCategories = useMemo(() => {
    return categoriesWithCounts
      .filter((cat) => {
        const matchesSearch =
          cat.name.toLowerCase().includes(search.toLowerCase()) ||
          cat.description.toLowerCase().includes(search.toLowerCase()) ||
          cat.id.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
          statusFilter === 'all'
            ? true
            : statusFilter === 'active'
            ? cat.isActive
            : !cat.isActive;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'order_asc') return a.order - b.order;
        if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
        if (sortBy === 'products_desc') return b.productCount - a.productCount;
        return 0;
      });
  }, [categoriesWithCounts, search, statusFilter, sortBy]);

  // Handle open Add/Edit
  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      order: categories.length + 1,
      isActive: true,
      icon: '🍰',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      description: cat.description,
      order: cat.order,
      isActive: cat.isActive,
      icon: cat.icon || '🍰',
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Iltimos, toifa nomini kiriting!');
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? { ...c, ...formData, order: Number(formData.order) || 1 }
            : c
        )
      );
    } else {
      const newCat = {
        id: `CAT-0${categories.length + 1}`,
        ...formData,
        order: Number(formData.order) || categories.length + 1,
        productCount: 0,
      };
      setCategories((prev) => [...prev, newCat]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (catId) => {
    if (window.confirm("Haqiqatan ham ushbu toifani o'chirmoqchimisiz?")) {
      setCategories((prev) => prev.filter((c) => c.id !== catId));
    }
  };

  const handleToggleStatus = (catId) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* ─── 1. TOP KPI METRICS (Exact online store style) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* JAMI TOIFALAR - Dark card */}
        <div className="bg-[#111827] text-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-slate-400 uppercase">
              JAMI TOIFALAR
            </span>
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <FolderIcon className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black tracking-tight">
              {totalCategories} ta
            </span>
            <p className="text-[11px] text-slate-400 font-semibold mt-1">
              Barcha qandolat toifalari
            </p>
          </div>
        </div>

        {/* FAOL TOIFALAR */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-slate-500 uppercase">
              FAOL TOIFALAR
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              Faol
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategories} ta
            </span>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Saytda ko‘rinadigan
            </p>
          </div>
        </div>

        {/* BIRIKTIRILGAN TOVARLAR */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-slate-500 uppercase">
              BUYURTMALAR
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 border border-purple-100">
              Tovarlar
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {totalProducts} ta
            </span>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Toifalarga bog‘langan
            </p>
          </div>
        </div>

        {/* NOFAOL TOIFALAR */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-slate-500 uppercase">
              NOFAOL TOIFALAR
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
              Vaqtinchalik
            </span>
          </div>
          <div className="mt-4">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {inactiveCategories} ta
            </span>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Yashirilgan toifalar
            </p>
          </div>
        </div>
      </div>

      {/* ─── 2. ACTION CONTROLS & FILTER BAR ─── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Toifa nomi yoki ID bo'yicha qidirish..."
            className="w-full bg-[#F8FAFC] border border-slate-200 pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#CC1122]/10 focus:border-[#CC1122] transition-all"
          />
        </div>

        {/* Status filter pills & View toggles */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {/* Status buttons */}
          <div className="flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Barchasi ({totalCategories})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-white text-emerald-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Faol ({activeCategories})
            </button>
            <button
              onClick={() => setStatusFilter('inactive')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                statusFilter === 'inactive'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Nofaol ({inactiveCategories})
            </button>
          </div>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#F8FAFC] border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#CC1122] cursor-pointer"
          >
            <option value="order_asc">Tartib bo'yicha (1-9)</option>
            <option value="name_asc">Nomi bo'yicha (A-Z)</option>
            <option value="products_desc">Mahsulotlar soni bo'yicha</option>
          </select>

          {/* View mode toggle */}
          <div className="hidden sm:flex items-center bg-[#F8FAFC] p-1 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-[#CC1122] shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Karta ko'rinishi"
            >
              <Squares2X2Icon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#CC1122] shadow-xs'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
              title="Jadval ko'rinishi"
            >
              <Bars3Icon className="w-4 h-4" />
            </button>
          </div>

          {/* Add Category Button */}
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-bold rounded-xl shadow-md shadow-[#CC1122]/20 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer active:scale-95"
          >
            <PlusIcon className="w-4 h-4 stroke-[2.5]" />
            <span>Yangi toifa</span>
          </button>
        </div>
      </div>

      {/* ─── 3. CATEGORIES DISPLAY (GRID OR TABLE) ─── */}
      {filteredCategories.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
          <FolderIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="text-sm font-bold text-slate-800">Toifalar topilmadi</h4>
          <p className="text-xs text-slate-500 mt-1">
            Qidiruv so‘rovingiz bo‘yicha mos keluvchi toifa mavjud emas.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header row: Icon & Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0F1] flex items-center justify-center text-2xl border border-rose-100 shadow-2xs">
                    {cat.icon || '🍰'}
                  </div>
                  <button
                    onClick={() => handleToggleStatus(cat.id)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                      cat.isActive
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {cat.isActive ? '● Faol' : '○ Nofaol'}
                  </button>
                </div>

                {/* Title & Desc */}
                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#CC1122] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description || 'Qandolat mahsulotlari toifasi'}
                </p>
              </div>

              {/* Bottom stats & action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  {cat.productCount} ta buyurtma
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDetailCategory(cat)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title="Batafsil ko'rish"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                    title="Tahrirlash"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="O'chirish"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Tartib</th>
                  <th className="py-3 px-4">Toifa nomi</th>
                  <th className="py-3 px-4">Tavsif</th>
                  <th className="py-3 px-4">Mahsulotlar</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-400">
                      #{cat.order}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-base">{cat.icon || '🍰'}</span>
                      <span>{cat.name}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 max-w-xs truncate">
                      {cat.description}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-700">
                      {cat.productCount} ta tovar
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cat.isActive
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {cat.isActive ? 'Faol' : 'Nofaol'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDetailCategory(cat)}
                          className="p-1 text-slate-400 hover:text-slate-700 rounded-md"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1 text-slate-400 hover:text-blue-600 rounded-md"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-md"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── 4. ADD / EDIT CATEGORY MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-[32px] p-6 shadow-2xl border border-slate-100 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF0F1] text-[#CC1122] flex items-center justify-center font-bold">
                  <SparklesIcon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-black text-slate-900">
                  {editingCategory ? 'Toifani tahrirlash' : 'Yangi toifa qo‘shish'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Toifa nomi */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Toifa nomi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masalan: Shokoladli tortlar"
                  className="w-full bg-[#F8FAFC] border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                />
              </div>

              {/* Icon va Tartib raqami */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Emoji / Piktogramma
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🎂"
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122] text-center text-lg"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Tartib raqami
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122]"
                  />
                </div>
              </div>

              {/* Tavsif */}
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  Toifa haqida tavsif
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mijozlar uchun qisqacha ma'lumot..."
                  className="w-full bg-[#F8FAFC] border border-slate-200 p-3 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CC1122] resize-none"
                />
              </div>

              {/* Status checkbox */}
              <div className="flex items-center gap-2 pt-1 select-none">
                <input
                  type="checkbox"
                  id="catStatus"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-[#CC1122] rounded accent-[#CC1122] cursor-pointer"
                />
                <label htmlFor="catStatus" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Toifani faol holatda saqlash
                </label>
              </div>

              {formError && (
                <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-bold text-center">
                  ⚠️ {formError}
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#CC1122] hover:bg-[#A80D1B] text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-[#CC1122]/20 cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 5. CATEGORY DETAIL MODAL ─── */}
      {detailCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl border border-slate-100 animate-scaleUp text-center">
            <div className="w-16 h-16 rounded-3xl bg-[#FFF0F1] flex items-center justify-center text-3xl mx-auto mb-4 border border-rose-100 shadow-sm">
              {detailCategory.icon || '🍰'}
            </div>

            <h3 className="text-base font-black text-slate-900">
              {detailCategory.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {detailCategory.description || 'Tavsif berilmagan'}
            </p>

            <div className="grid grid-cols-2 gap-2 my-5 p-3 bg-slate-50 rounded-2xl text-left text-xs font-semibold">
              <div>
                <span className="text-slate-400 block text-[10px]">TOIFA ID:</span>
                <span className="font-bold text-slate-800">{detailCategory.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">TARTIB RAQAM:</span>
                <span className="font-bold text-slate-800">#{detailCategory.order}</span>
              </div>
              <div className="mt-2">
                <span className="text-slate-400 block text-[10px]">MAHSULOTLAR:</span>
                <span className="font-bold text-[#CC1122]">
                  {detailCategory.productCount} ta buyurtma
                </span>
              </div>
              <div className="mt-2">
                <span className="text-slate-400 block text-[10px]">STATUS:</span>
                <span className="font-bold text-emerald-600">
                  {detailCategory.isActive ? 'Faol' : 'Nofaol'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setDetailCategory(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
