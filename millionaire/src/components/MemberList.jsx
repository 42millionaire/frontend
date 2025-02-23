export default function MemberList({ members, handleClickMember, currentUserId}) {
	const me = members?.find((member) => member.memberId === parseInt(currentUserId));
	const others = members?.filter((member) => member.memberId !== parseInt(currentUserId));

	return (
		<section>
			<span
				key={me?.memberId}
				className="text-gray-300 text-2xl font-semibold cursor-pointer hover:underline"
				onClick={() => handleClickMember(me?.memberId, me?.name)}
			>
				Hello, {me?.name}
			</span>

			<h2 className="text-2xl font-bold mt-6">Other Members</h2>
			<div className="space-y-1">
				{others?.map((member) => (
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
