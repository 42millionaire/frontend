import { FcGoogle } from "react-icons/fc";
import { getAPI } from "../apis/get";

const Login = () => {
	const handleLogin = async () => {
		const data = await getAPI("oauth/google");
		window.location.href = data.url;
	};
	
  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-80 relative">
      {/* 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
      ></div>

      {/* 로그인 박스 */}
      <div className="relative flex flex-col items-center text-center bg-black bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-lg w-80 sm:w-96">
        <h1 className="text-blue-400 text-xl sm:text-3xl font-extrabold flex items-center gap-2">
          ☠️ 세후1억 해적단 ☠️
        </h1>

        <p className="mt-2 text-gray-300 text-xs sm:text-sm">
          세후1억 해적단에 오신것을 환영합니다! <br/>
		  구글 아이디로 로그인해주세요!
        </p>

        {/* Google 로그인 버튼 */}
        <button
          className="mt-6 flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition w-full sm:w-auto"
          onClick={handleLogin}
        >
          <FcGoogle size={24} />
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
