import BASE_URL from "../constants/URL";

const postAPI = async (path, RequestBody) => {
	try {
		const url = new URL(`${BASE_URL}${path}`);

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(RequestBody),
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
