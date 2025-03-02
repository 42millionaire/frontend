import Month from "../Month";
import logOut from "../../../assets/img/logOut.png";
import { RiAdminLine } from "react-icons/ri";
import YearMonthSelector from "../YearMonthSelector";
import MemberListDropdown from "../MemberListDropdown";
import MainGroupName from "./MainGroupName";
import MainNotice from "./MainNotice";

const handleLogout = () => {
	alert("로그아웃 합니다.");
	// server에 쿠키 삭제 요청보내기
	localStorage.clear();
}

export default function MainHeader({
	groupInfo,
	notice,
	selectedMonth,
	setSelectedMonth,
	selectedYear,
	setSelectedYear,
	members, 
	handleClickMember,
	currentUserId,
	isAdmin
}) {
	return (
		<header className="flex flex-col w-[100%]">
			<MainGroupName groupName={groupInfo?.groupName}/>
			<div className="flex items-center justify-between">
				<div className="flex items-center justify-center sm:space-x-4">
					<YearMonthSelector
						selectedMonth={selectedMonth}
						setSelectedMonth={setSelectedMonth}
						selectedYear={selectedYear}
						setSelectedYear={setSelectedYear}
					/>
					<MemberListDropdown 
						members={members}
						handleClickMember={handleClickMember}
						currentUserId={currentUserId}
					/>
					{/* <div className="text-2xl font-bold">{memberName}의 목표</div> */}
				</div>
				<div className="flex">
					{
						isAdmin === true ? 
						(
							<a href="/admin" className="ml-auto mr-5 hover:opacity-80">
								<RiAdminLine className="w-5 h-5 sm:w-8 sm:h-8" />
							</a>
						) : ""
					}
					<MainNotice notice={notice} className="mr-5 hover:opacity-80" />
					<a href="/login" onClick={() => handleLogout()} className="ml-auto mr-5 hover:opacity-80">
						<img src={logOut} alt="logout" className="w-5 h-5 sm:w-8 sm:h-8" />
					</a>
				</div>
			</div>
		</header>
	);
}
