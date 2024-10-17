import { useState, useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import postAPI from "../apis/post.js";

//taskID를 받아와야함
export default function AuthModal({ taskId, onClose }) {
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const [showLargePreview, setShowLargePreview] = useState(false);
	const fileInputRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		const requestBody = {
			groupId: 1,
			memberId: 1,
			dueDate: new Date().toLocaleDateString(),
			content,
		};
		const result = await postAPI("verification", requestBody);
		if (result.error) {
			alert("할 일 추가에 실패했습니다.");
		} else {
			onClose();
		}
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file && file.type.substr(0, 5) === "image") {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		} else {
			setImage(null);
			setPreview(null);
		}
	};

	const removeImage = () => {
		setImage(null);
		setPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleOutsideClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
			onClick={handleOutsideClick}
		>
			<div className="relative w-[500px] max-w-[90%] p-6 rounded-lg bg-white">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
				>
					<FaTimes className="w-5 h-5" />
				</button>
				<h2 className="mb-4 text-2xl font-bold text-gray-800">
					세후 1억 프로젝트 완성하기
				</h2>
				<div className="mb-4 text-sm text-gray-500">
					created_at : {new Date().toLocaleDateString()}
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="p-4 border rounded-lg">
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="할 일을 입력하세요"
							className="w-full h-20 resize-none text-gray-700 focus:outline-none"
						/>
						<div className="text-right text-sm text-gray-500">
							{content.length} / 3000
						</div>
					</div>
					<div className="relative flex justify-center items-center h-20 p-4 border border-dashed rounded-lg">
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleImageUpload}
							accept="image/*"
							className="hidden"
						/>
						<button
							type="button"
							onClick={() => fileInputRef.current.click()}
							className="text-gray-400"
						>
							<FaPlus className="w-6 h-6" />
						</button>
						{preview && (
							<div className="absolute inset-0 flex justify-center items-center">
								<img
									src={preview}
									alt="Preview"
									className="max-w-full max-h-full object-contain"
								/>
								<button
									type="button"
									onClick={removeImage}
									className="absolute top-2 right-2 p-1 rounded-full bg-white text-red-500"
								>
									<FaTimes className="w-4 h-4" />
								</button>
							</div>
						)}
					</div>
					{preview && (
						<button
							type="button"
							onClick={() => setShowLargePreview(true)}
							className="w-full py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
						>
							이미지 미리보기
						</button>
					)}
					<button
						type="submit"
						className="w-full py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
					>
						제출하기
					</button>
				</form>
			</div>

			{showLargePreview && (
				<div
					className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
					onClick={() => setShowLargePreview(false)}
				>
					<div
						className="relative max-w-[90%] max-h-[90%]"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src={preview}
							alt="Large Preview"
							className="max-w-full max-h-full object-contain"
						/>
						<button
							onClick={() => setShowLargePreview(false)}
							className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
						>
							<FaTimes className="w-6 h-6" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
