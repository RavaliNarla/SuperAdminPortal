import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      /> */}
      <>
        {sidebarOpen && (
          <div
            className="sidebar-backdrop"
            onClick={() => {
              if (window.innerWidth < 992) {
                setSidebarOpen(false);
              }
            }}
          />
        )}

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </>

      <div className="main-wrapper">
        <Header
          setSidebarOpen={setSidebarOpen}
        />

        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
}

// import Header from './Header';
// import Sidebar from './Sidebar';

// export default function AppShell({ children }) {
//   return (
//     <div className="layout">
//       <Sidebar />

//       <div className="main-wrapper">
//         <Header />

//         <main className="content">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
