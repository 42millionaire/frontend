export default function MemberList({ members }) {
	return (
		<section>
			<h2 className="text-2xl font-bold mb-4">Member</h2>
			<div className="space-y-2">
				{members?.map((member) => (
					<div
						key={member.memberId}
						className="text-gray-300 text-xl font-semibold cursor-pointer hover:underline"
					>
						{member.name}
					</div>
				))}
			</div>
		</section>
	);
}
