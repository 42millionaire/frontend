import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Main from "./app/Main.jsx";
import Admin from "./app/Admin.jsx";
import Home from "./app/Home.jsx";
import Login from "./app/Login.jsx";
import GoogleCallback from "./app/GoogleCallback.jsx";
import { useEffect, useState } from "react";
import WaitinRoom from "./app/WaitingRoom.jsx";
import { getAPI } from "./apis/get.js";
import postAPI from "./apis/post.js";
import getUserInfo from "./hooks/getUserInfo.js";
import Rule from "./app/Rule.jsx";
import secureLocalStorage  from 'react-secure-storage';

function App() {
	const ProtectedRoute = ({ children }) => {
		const [isAuthenticated, setIsAuthenticated] = useState(false);
		const navigate = useNavigate();

		useEffect(() => {
			const token = secureLocalStorage.getItem("memberId");
			setIsAuthenticated(!!token);
			if (!token) {
				navigate("/login", { replace: true });
			}
		}, [navigate]);

		return isAuthenticated ? children : null;
	};

	const ProtectedGroupRoute = ({ children }) => {
		const [isJoinGroup, setIsJoinGroup] = useState(false);
		const navigate = useNavigate();

		const handleJoinGroup = async () => {
			const checking = await getAPI("groupmember/check/1");

			if (checking === true) {
				setIsJoinGroup(true);
				return ;
			}
			
			const token = getUserInfo().id;

			if (checking === 409) {
				navigate("/waiting", { replace: true });
				return ;
			}

			if (checking === 404) {
				const requestBody = {
					"groupId" : 1,
					"memberId" : parseInt(token)
				}
				const response = await postAPI("/groupjoin", requestBody);

				if (response.error) {
					alert("가입 오류. 관리자한테 문의해주세요.");
					navigate("/login", { replace: true });
				} else {
					navigate("/waiting", { replace: true });
				}

				return ;
			}

			if (checking === 400) {

				alert("세션 만료되었습니다. 다시 로그인해주세요.");
				secureLocalStorage.clear();
				navigate("/login", { replace: true });

				return ;
			}
		}

		useEffect(() => {
			handleJoinGroup();
		}, [navigate]);

		return isJoinGroup ? children : null;
	};

	const ProtectedAdminRoute = ({ children }) => {
		const [isAdmin, setIsAdmin] = useState(false);
		const navigate = useNavigate();

		const handelAdmin = async () => {
			const response = await getAPI("admin", {"groupId": 1});

			if (response === 403) {
				alert("관리자가 아닙니다.");
				navigate("/main", { replace: true });
				return ;
			} 

			setIsAdmin(response.isAdmin);
		}

		useEffect(() => {
			handelAdmin();
		}, [navigate]);

		return isAdmin ? children : null;
	}

	return (
		<div className="background">
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<ProtectedGroupRoute>
								<Main />
							</ProtectedGroupRoute>
						</ProtectedRoute>
					}
					/>
				<Route path="/login" element={<Login />} />
				<Route path="/rule" element={<Rule />} />
				<Route path="/auth/google/callback" element={<GoogleCallback />} />
				<Route
					path="/main"
					element={
						<ProtectedRoute>
							<ProtectedGroupRoute>
								<Main />
							</ProtectedGroupRoute>
						</ProtectedRoute>
					}
					/>
				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<ProtectedGroupRoute>
								<ProtectedAdminRoute>
									<Admin />
								</ProtectedAdminRoute>
							</ProtectedGroupRoute>
						</ProtectedRoute>
					}
					/>
				<Route path="/waiting" element={
						<ProtectedRoute>
							<WaitinRoom />
						</ProtectedRoute>
				}
				/>
			</Routes>
		</BrowserRouter>
		</div>
	);
}

export default App;
