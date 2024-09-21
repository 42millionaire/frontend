import Month from "../Month";
import logOut from "../../../assets/img/logOut.png";

export default function MainHeader({
	groupTitle,
	selectedMonth,
	setSelectedMonth,
}) {
	return (
		<header className="flex items-center pl-16 pt-14">
			<h1 className="mr-24 text-4xl font-bold">{groupTitle}</h1>
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
