import "./index.css";
import Auth from "./components/Auth";
import Movies from "./components/Movies";

function App() {
  return (
    <>
      <div className="App">
        <Auth />
      </div>
      <Movies />
    </>
  );
}

export default App;
