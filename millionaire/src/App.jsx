import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./app/Main.jsx";
import Admin from "./app/Admin.jsx";
import Home from "./app/Home.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/main" element={<Main />} />
				{/* <Route path="/login" element={<Login />} /> */}
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
