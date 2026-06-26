import Header from './Header';
import Sidebar from './Sidebar';

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-panel">
        <Header />
        {children}
      </div>
    </div>
  );
}
