import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./app/Main.jsx";
import Admin from "./app/Admin.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Main />} />
				{/* <Route path="/login" element={<Login />} /> */}
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
