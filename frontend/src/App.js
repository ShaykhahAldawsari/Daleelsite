import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Record from "./Pages/Record";
import AllRecords from "./Pages/AllRecords";
import EditRecord from "./Pages/Record/editRecord";
import AddRecord from "./Pages/Record/addRecord";
import { AuthProvider } from "./Context/AuthContext";

import "./App.css";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/record" element={<Record />} />
            <Route path="/all-records" element={<AllRecords />} />
            <Route path="/edit-record" element={<EditRecord />} />
            <Route path="/add-record" element={<AddRecord />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
