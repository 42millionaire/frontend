import BASE_URL from "../constants/URL";

const getAPI = async (path, queryParams = {}) => {
	try {
		const url = new URL(`${BASE_URL}/${path}`);
		Object.keys(queryParams).forEach((key) =>
			url.searchParams.append(key, queryParams[key]),
		);

		const response = await fetch(url, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"ngrok-skip-browser-warning": true,
			},
			method: "GET",
		});

		if (response.ok) {
			return response.json();
		} else {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
	} catch (error) {
		console.error("Error in getAPI: ", error);
		throw error;
	}
};

export { getAPI };
