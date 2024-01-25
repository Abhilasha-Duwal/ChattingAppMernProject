import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Join from "./components/join/Join";
import Chat from "./components/chat/Chat";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path="/" Component={Join}/>
        <Route path="/chat" Component={Chat} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
