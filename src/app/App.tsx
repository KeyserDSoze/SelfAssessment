import { HashRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { AssessmentIntroPage } from './pages/AssessmentIntroPage';
import { AssessmentRunnerPage } from './pages/AssessmentRunnerPage';
import { HomePage } from './pages/HomePage';
import { ResultsPage } from './pages/ResultsPage';

export function App() {
  return (
    <HashRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assessment/:id" element={<AssessmentIntroPage />} />
          <Route
            path="/assessment/:assessmentId/run/:runId"
            element={<AssessmentRunnerPage />}
          />
          <Route path="/results/:runId" element={<ResultsPage />} />
        </Routes>
      </AppShell>
    </HashRouter>
  );
}
