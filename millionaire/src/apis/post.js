import BASE_URL from "../constants/URL";

const postAPI = async (path, RequestBody, isFormData=false) => {
	try {
		const url = new URL(`${BASE_URL}${path}`);

		const response = await fetch(url, {
			method: "POST",
			headers: isFormData ? {} : { 
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: isFormData ? RequestBody : JSON.stringify(RequestBody),
		});

		if (response.ok) {
			return await response.text();
		} else {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export default postAPI;
