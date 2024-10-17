import "./index.css";

const Spinner = ({ size = 36, color = "#09f" }) => {
	return (
		<div className="spinner-container">
			<div
				className="spinner"
				style={{
					width: `${size}px`,
					height: `${size}px`,
					borderLeftColor: color,
				}}
			></div>
		</div>
	);
};

export default Spinner;
