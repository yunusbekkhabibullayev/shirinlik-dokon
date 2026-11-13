import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { INITIAL_ORDERS, STORAGE_KEY } from './constants/initialOrders';
import AdminLayout from './components/AdminLayout';
import { AdminDashboardView } from './components/AdminDashboardView';
import { AdminOrdersView } from './components/AdminOrdersView';
import { ProductsView } from './components/ProductsView';
import { CategoriesView } from './components/CategoriesView';
import { SettingsView } from './components/SettingsView';
import { AdminProductCreateModal } from './components/AdminProductCreateModal';
import { AdminProductDetailModal } from './components/AdminProductDetailModal';
import { TicketInfoModal } from './components/TicketInfoModal';
import ToastMessage from './components/ToastMessage';
import { LoginPage } from './components/LoginPage';
import { checkAuth, clearAuth } from './utils/auth';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

export default function App() {
  // 1. Load initial orders from LocalStorage or fallback to INITIAL_ORDERS
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  // Selected order for detailed view modal
  const [detailModalOrder, setDetailModalOrder] = useState(null);

  // UI state: 'dashboard' | 'orders' | 'products'
  const [activeTab, setActiveTab] = useState('orders'); // Defaults to 'orders' / 'products' as requested
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return checkAuth();
  });

  // 2. Persist to LocalStorage whenever orders change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // Toast trigger
  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  // Handler: "Tayyor deb belgilash" (Bilet 010: faqat tanlangan buyurtma Yangi -> Tayyor bo'ladi)
  const handleMarkAsReady = useCallback((orderId) => {
    setOrders((prevOrders) => {
      return prevOrders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: 'Tayyor',
          };
        }
        return order;
      });
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#CC1122', '#10B981', '#F59E0B', '#3B82F6'],
      });
    } catch {
      // ignore
    }

    const target = orders.find((o) => o.id === orderId);
    showToast(`"${target?.customerName || 'Buyurtma'}" tayyor deb belgilandi!`, 'success');
  }, [orders, showToast]);

  // Handler: Statusni xohlagancha yangilash (Yangi <-> Tayyor)
  const handleUpdateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
          };
        }
        return order;
      })
    );

    setDetailModalOrder((prev) => {
      if (prev && prev.id === orderId) {
        return { ...prev, status: newStatus };
      }
      return prev;
    });

    if (newStatus === 'Tayyor') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#CC1122', '#10B981', '#F59E0B', '#3B82F6'],
        });
      } catch {}
    }

    const target = orders.find((o) => o.id === orderId);
    showToast(
      `"${target?.customerName || 'Buyurtma'}" holati "${newStatus}" ga o‘zgartirildi!`,
      newStatus === 'Tayyor' ? 'success' : 'info'
    );
  }, [orders, showToast]);

  // Handler: Buyurtmani o'chirish
  const handleDeleteOrder = useCallback((orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    setDetailModalOrder(null);
    showToast("Buyurtma o'chirildi.", 'info');
  }, [showToast]);

  // Handler: Yangi buyurtma qo'shish (Bilet 010: doimo "Yangi" bo'ladi)
  const handleAddOrder = useCallback((newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`"${newOrder.customerName}" buyurtmasi "Yangi" holatida qo‘shildi.`, 'success');
  }, [showToast]);

  // Handler: Boshlang'ich test holatiga qaytarish (Reset)
  const handleResetData = useCallback(() => {
    setOrders(INITIAL_ORDERS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
    showToast('Boshlang‘ich 3 ta sinov buyurtmasi qayta yuklandi.', 'info');
  }, [showToast]);

  // Handler: Tizimdan chiqish
  const handleLogout = useCallback(() => {
    clearAuth();
    setIsAuthenticated(false);
    showToast('Tizimdan chiqildi.', 'info');
  }, [showToast]);

  // Agar login qilinmagan bo'lsa - LoginPage ko'rsatiladi
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            showToast('Tizimga muvaffaqiyatli kirildi!', 'success');
          }}
          onCancel={() => {
            setIsAuthenticated(true);
          }}
        />
        <PwaInstallPrompt />
      </>
    );
  }

  // Counts
  const totalCount = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'Yangi').length;
  const readyCount = orders.filter((o) => o.status === 'Tayyor').length;

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      totalCount={totalCount}
      pendingCount={pendingCount}
      readyCount={readyCount}
      onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
      onOpenTicketInfo={() => setIsTicketModalOpen(true)}
      onResetData={handleResetData}
      onLogout={handleLogout}
    >
      {/* 1. Agar Statistika (Dashboard) tanlangan bo'lsa: faqat analitika va grafiklar */}
      {activeTab === 'dashboard' && (
        <AdminDashboardView
          orders={orders}
          onSelectOrder={(order) => setDetailModalOrder(order)}
          onMarkReady={handleMarkAsReady}
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
          onNavigateToOrders={() => setActiveTab('orders')}
        />
      )}

      {/* 2. Agar Buyurtmalar tanlangan bo'lsa: online store AdminOrders asosidagi sahifa */}
      {activeTab === 'orders' && (
        <AdminOrdersView
          orders={orders}
          onMarkReady={handleMarkAsReady}
          onUpdateStatus={handleUpdateOrderStatus}
          onDeleteOrder={handleDeleteOrder}
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
        />
      )}

      {/* 3. Agar Mahsulotlar tanlangan bo'lsa: 2-rasm mahsulotlar katalogi */}
      {activeTab === 'products' && (
        <ProductsView
          orders={orders}
          selectedOrder={detailModalOrder}
          onSelectOrder={(order) => setDetailModalOrder(order)}
          onMarkReady={handleMarkAsReady}
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
        />
      )}

      {/* 4. Agar Kategoriyalar tanlangan bo'lsa: online store AdminCategories asosidagi toifalar */}
      {activeTab === 'categories' && (
        <CategoriesView orders={orders} />
      )}

      {/* 5. Agar Sozlamalar tanlangan bo'lsa: online store AdminSiteSettings asosidagi sozlamalar */}
      {activeTab === 'settings' && (
        <SettingsView
          onResetData={handleResetData}
          onShowToast={(msg, type) => showToast(msg, type)}
        />
      )}

      {/* Yangi buyurtma qo'shish modali (online store AdminProductCreate uslubida) */}
      <AdminProductCreateModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onAddOrder={handleAddOrder}
      />

      {/* Buyurtma tafsilotlari modali (Batafsil + Tayyor deb belgilash + Status yangilash) */}
      <AdminProductDetailModal
        order={detailModalOrder}
        onClose={() => setDetailModalOrder(null)}
        onMarkReady={handleMarkAsReady}
        onUpdateStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
      />

      {/* Bilet 010 Tanlov modali */}
      <TicketInfoModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
      />

      {/* Toast xabarnomasi */}
      {toast && (
        <ToastMessage
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* PWA O'rnatish & Oflayn ogohlantirish */}
      <PwaInstallPrompt />
    </AdminLayout>
  );
}
