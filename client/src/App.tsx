import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout, LoadingState } from '@components';
import { ROUTES, ROUTE_PARAMS } from '@constants/routes';
import { MESSAGES } from '@constants/messages';

const HomePage = lazy(() => import('@pages').then((module) => ({ default: module.HomePage })));
const FormBuilderPage = lazy(() => import('@pages').then((module) => ({ default: module.FormBuilderPage })));
const FormFillerPage = lazy(() => import('@pages').then((module) => ({ default: module.FormFillerPage })));
const FormResponsesPage = lazy(() => import('@pages').then((module) => ({ default: module.FormResponsesPage })));

function App() {
  return (
    <Layout>
      <Toaster position="top-right" richColors />
      <Suspense fallback={<LoadingState message={MESSAGES.LOADING.FORMS} />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CREATE_FORM} element={<FormBuilderPage />} />
          <Route path={`/forms/:${ROUTE_PARAMS.FORM_ID}/fill`} element={<FormFillerPage />} />
          <Route path={`/forms/:${ROUTE_PARAMS.FORM_ID}/responses`} element={<FormResponsesPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;


