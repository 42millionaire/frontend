export default function MemberList({ members, handleClickMember }) {
	//memberId로 눌렀을 시, 해당 멤버의 카드만 보이도록.

	return (
		<section>
			<h2 className="text-2xl font-bold mb-4">Member</h2>
			<div className="space-y-2">
				{members?.map((member) => (
					<div
						key={member.memberId}
						className="text-gray-300 text-xl font-semibold cursor-pointer hover:underline"
						onClick={() => handleClickMember(member.memberId, member.name)}
					>
						{member.name}
					</div>
				))}
			</div>
		</section>
	);
}
