import usePrefetchData from "./Hooks/usePrefetch";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  usePrefetchData();
  return <AppRoutes />;
}

export default App;
