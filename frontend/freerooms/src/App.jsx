import "./App.css";
import DisplayGrid from "./components/DisplayGrid";
import Navbar from "./components/Navbar";
import UtilBar from "./components/UtilBar";
function App() {
  return (
    <div className="app-container">
      <Navbar />
      <UtilBar />
      <DisplayGrid></DisplayGrid>
    </div>
  );
}

export default App;
