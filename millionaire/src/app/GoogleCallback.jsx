import { useState, useEffect, Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAPI } from "../apis/get.js";
import Spinner from "../components/Spinner/Spinner.jsx";

const GoogleCallback = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);

	const handleGoogleLogin = async (code) => {
		try {
			const isSuccess = await getAPI("login/oauth2/code/google?", { code });
			if (!isSuccess) {
				console.error("Google login failed");
				navigate("/login");
			} else {
				console.log(isSuccess);
				window.localStorage.setItem("accessToken", isSuccess.accessToken);
				navigate("/");
			}
		} catch (error) {
			alert(error, "Google login failed");
			navigate("/login");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const code = searchParams.get("code");
		if (code) {
			handleGoogleLogin(code);
		} else {
			alert("No auth code received");
			navigate("/login");
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			{isLoading && (
				<Fragment>
					<Spinner size={48} color="#F1C4A3" />
					<p className="mt-4 text-lg font-semibold">구글 로그인 처리 중...</p>
				</Fragment>
			)}
		</div>
	);
};

export default GoogleCallback;
