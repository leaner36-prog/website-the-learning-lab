import { Outlet } from 'react-router-dom';
import { ToastProvider } from '../ui/Toast';

export function AdminLayout() {
  return (
    <ToastProvider>
      <div className="min-h-dvh bg-alt">
        <Outlet />
      </div>
    </ToastProvider>
  );
}
