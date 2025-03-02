import Month from "../Month";
import logOut from "../../../assets/img/logOut.png";
import { RiAdminLine } from "react-icons/ri";

export default function MainHeader({
	memberName,
	selectedMonth,
	setSelectedMonth,
	isAdmin
}) {
	return (
		<header className="flex items-center justify-around w-[100%]">
			<h1 className="mr-12 text-2xl font-bold">{memberName}의 목표</h1>
			<Month
				selectedMonth={selectedMonth}
				setSelectedMonth={setSelectedMonth}
			/>
			<div className="flex">
				{
					isAdmin === true ? 
					(
						<a href="/admin" className="ml-auto mr-5 hover:opacity-80">
							<RiAdminLine className="w-8 h-8" />
						</a>
					) : ""
				}
				<a href="/" className="ml-auto mr-5 hover:opacity-80">
					<img src={logOut} alt="logout" className="w-8 h-8" />
				</a>
			</div>
		</header>
	);
}
