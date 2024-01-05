import SearchPage from "./pages/Search.page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <SearchPage />
      <ToastContainer theme="colored" position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
