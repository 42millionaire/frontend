import Month from "../Month";
import logOut from "../../../assets/img/logOut.png";

export default function MainHeader({
	memberName,
	selectedMonth,
	setSelectedMonth,
}) {
	return (
		<header className="flex items-center pl-5 py-5">
			<h1 className="mr-12 text-2xl font-bold">{memberName}의 목표</h1>
			<Month
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>
			<a href="/" className="ml-auto mr-5 hover:opacity-80">
				<img src={logOut} alt="logout" className="w-8 h-8" />
			</a>
		</header>
	);
}
