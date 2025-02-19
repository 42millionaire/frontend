import BASE_URL from "../constants/URL";

const deleteAPI = async (path, queryParams = {}) => {
	try {
		const url = new URL(`${BASE_URL}${path}`);

        Object.keys(queryParams).forEach((key) =>
			url.searchParams.append(key, queryParams[key]),
		);

		const response = await fetch(url, {
			method: "DELETE",
			headers: { 
				"Accept": "application/json",
				"Content-Type": "application/json",
			}
		});

		if (response.ok) {
			return response.text();
		} else {
			return null;
		}
	} catch (error) {
		return { error: true, message: error.message };
	}
};

export default deleteAPI;
