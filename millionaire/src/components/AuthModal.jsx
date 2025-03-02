import { useState, useRef } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import postAPI from "../apis/post.js";
import { printDateFormat } from "../utils/dateUtils.js";

export default function AuthModal({ task, onClose }) {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [showLargePreview, setShowLargePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api_url = task.status === "deny" ? "/appeal" : "/verification";
    const isFormData = task.status !== "deny";

    const formData = new FormData();
    formData.append("taskId", task.taskId);
    formData.append("content", content);
    images.forEach((image) => formData.append("images", image));

    const requestBody = {
      taskId: task.taskId,
      content,
    };

    const result = await postAPI(api_url, isFormData ? formData : requestBody, isFormData);
    if (result.error) {
      alert("인증 요청에 실패했습니다.");
    } else {
      onClose();
      window.location.reload();
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter((file) => file.type.startsWith("image"));
    if (fileArray.length === 0) return;

    setImages((prev) => [...prev, ...fileArray]);
    const newPreviews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleImageUpload = (e) => handleFiles(e.target.files);

  const handlePaste = (e) => {
    if (e.clipboardData.files.length > 0) {
      handleFiles(e.clipboardData.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-100"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPaste={handlePaste}
    >
      <div className="relative w-[500px] max-w-[90%] p-6 rounded-lg bg-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <h2 className="mb-4 text-2xl font-bold text-gray-800">{task.content}</h2>
        <div className="mb-4 text-sm text-gray-500">인증시간 : {printDateFormat()}</div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border rounded-lg">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="인증 내용을 입력하세요."
              className="w-full h-20 resize-none text-gray-700 focus:outline-none"
            />
            <div className="text-right text-sm text-gray-500">{content.length} / 150</div>
          </div>
          <div
            className="relative flex flex-col items-center h-24 p-4 border border-dashed rounded-lg cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              className="hidden"
            />
            <FaPlus className="text-gray-400 w-6 h-6" />
            <span className="text-gray-500 text-sm">파일을 드래그하거나 클릭하여 업로드</span>
          </div>
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-20 object-cover rounded"
                    onClick={() => setShowLargePreview(preview)}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 p-1 rounded-full bg-white text-red-500"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button type="submit" className="w-full py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
            {task.status === "deny" ? "이의제기" : "제출하기"}
          </button>
        </form>
      </div>

      {showLargePreview && (
        <div
          className="fixed inset-0 z-100 flex justify-center items-center bg-black bg-opacity-75"
          onClick={() => setShowLargePreview(null)}
        >
          <div className="relative max-w-[90%] max-h-[90%]" onClick={(e) => e.stopPropagation()}>
            <img src={showLargePreview} alt="Large Preview" className="max-w-full max-h-full object-contain" />
            <button
              onClick={() => setShowLargePreview(null)}
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
