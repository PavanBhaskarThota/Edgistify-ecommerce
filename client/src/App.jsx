import { Toaster } from "react-hot-toast";
import "./App.css";
import { Navbar } from "./Components/Main/Navbar";
import { MainRoutes } from "./Routes/MainRoutes";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <MainRoutes />
    </>
  );
}

export default App;
