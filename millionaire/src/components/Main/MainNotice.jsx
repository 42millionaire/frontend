export default function MainNotice({ notice }) {
	return (
		<section className="mt-10 w-[190x]">
			<h2 className="text-2xl font-bold mb-2">Notice</h2>
			<p className="text-gray-300 text-sm font-semibold">{notice}</p>
		</section>
	);
}
