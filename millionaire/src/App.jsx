import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./app/Main.jsx";
import Admin from "./app/Admin.jsx";
import Home from "./app/Home.jsx";
import Login from "./app/Login.jsx";
import GoogleCallback from "./app/GoogleCallback.jsx";
import { useEffect, useState } from "react";

function App() {
	const ProtectedRoute = ({ children }) => {
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const navigate = useNavigate();

		useEffect(() => {
			const token = localStorage.getItem("memberId");
			setIsAuthenticated(!!token);
			if (!token) {
				navigate("/login", { replace: true });
			}
		}, [navigate]);

		return isAuthenticated ? children : null;
	};

	return (
		<div className="background">
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
					/>
				<Route path="/login" element={<Login />} />
				<Route path="/auth/google/callback" element={<GoogleCallback />} />
				<Route
					path="/main"
					element={
						<ProtectedRoute>
							<Main />
						</ProtectedRoute>
					}
					/>
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<Admin />
						</ProtectedRoute>
					}
					/>
			</Routes>
		</BrowserRouter>
		</div>
	);
}

export default App;
