
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-100">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Navbar />

        <div className="w-full p-4 sm:p-6 lg:p-8">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}

export default App;
