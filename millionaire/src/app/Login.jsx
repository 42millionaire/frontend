import { getAPI } from "../apis/get.js";

const Login = () => {
	const handleLogin = async () => {
		const data = await getAPI("oauth/google");
		window.location.href = data.url;
	};
	return (
		<div className="flex flex-col justify-center place-items-center h-[700px]">
			<h1 className="mb-[30px] text-[50px] bg-black text-green-400 p-[20px] rounded">
				☠️ 세후1억 해적단 ☠️
			</h1>
			<button
				className="md:place-items-center bg-white rounded hover:bg-gray-200 p-[10px]"
				onClick={handleLogin}
			>
				🌐 Google 계정으로 로그인
			</button>
		</div>
	);
};

export default Login;
