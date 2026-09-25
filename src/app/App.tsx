import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { AssessmentBuilderPage } from './pages/AssessmentBuilderPage';
import { AssessmentHistoryPage } from './pages/AssessmentHistoryPage';
import { AssessmentIntroPage } from './pages/AssessmentIntroPage';
import { AssessmentRunnerPage } from './pages/AssessmentRunnerPage';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';
import { SharedAssessmentPage } from './pages/SharedAssessmentPage';

export function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<AssessmentBuilderPage />} />
          <Route path="/builder/:id" element={<AssessmentBuilderPage />} />
          <Route path="/assessment/:id" element={<AssessmentIntroPage />} />
          <Route path="/assessment/:id/history" element={<AssessmentHistoryPage />} />
          <Route
            path="/assessment/:assessmentId/run/:runId"
            element={<AssessmentRunnerPage />}
          />
          <Route path="/results/:runId" element={<ResultsPage />} />
          <Route path="/share/:assessmentId" element={<SharedAssessmentPage />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}
