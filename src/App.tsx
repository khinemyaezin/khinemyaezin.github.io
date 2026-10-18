import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from '@/pages/Portfolio';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Portfolio />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
