import { useEffect, useState } from "react";

const AppealModalContent = (id, title) => {
    const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${BASE_URL}/verification/${id}`, {
					headers: {
						"Accept": "application/json",
						"ngrok-skip-browser-warning": true,
					},
					method: "GET",
				});
				const res = await response.json();
				console.log(res);
				setData(res);
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
    return (
        <div>
            <h3>{title}</h3>
            <div>{data.createTime}</div>
            <div>{data.updateTime}</div>
            <hr></hr>
            <div className="">
                <div>{data.content}</div>
                {data.base64_images.map(
					(item) =>(
						<image src={item}/>
					),
				)}
            </div>
        </div>
    )
}


export default AppealModalContent;