import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Layout from "./pages/Layout";
import Hobbies from "./pages/Hobbies.jsx";

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="users" element={<Users />} />
                <Route path="hobbies" element={<Hobbies />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App