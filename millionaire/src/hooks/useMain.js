import { useState, useEffect, useRef } from "react";
import { getAPI } from "../apis/get";

export default function useMainAPI(endpoint, transform = (data) => data) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const transformRef = useRef(transform);

	useEffect(() => {
		transformRef.current = transform;
	}, [transform]);

	useEffect(() => {
		let isMounted = true;

		async function fetchData() {
			try {
				const result = await getAPI(endpoint);
				if (isMounted) {
					setData(transformRef.current(result));
					setLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setLoading(false);
				}
			}
		}

		fetchData();

		return () => {
			isMounted = false;
		};
	}, [endpoint]);

	return { data, loading, error };
}
