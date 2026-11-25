import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PublicLayout } from './components/layout/PublicLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Programs from './pages/Programs';
import SubjectPage from './pages/SubjectPage';
import Method from './pages/Method';
import Pricing from './pages/Pricing';
import Testimonials from './pages/Testimonials';
import PlacementTest from './pages/PlacementTest';
import TrialRegistration from './pages/TrialRegistration';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminGuard = lazy(() => import('./pages/admin/AdminGuard'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-dvh" />}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="chuong-trinh" element={<Programs />} />
            <Route path="chuong-trinh/:slug" element={<SubjectPage />} />
            <Route path="phuong-phap" element={<Method />} />
            <Route path="hoc-phi" element={<Pricing />} />
            <Route path="cam-nhan" element={<Testimonials />} />
            <Route path="kiem-tra-dau-vao" element={<PlacementTest />} />
            <Route path="dang-ky-hoc-thu" element={<TrialRegistration />} />
            <Route path="lien-he" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route
              index
              element={
                <AdminGuard>
                  <AdminDashboard />
                </AdminGuard>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
