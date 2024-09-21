export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-orange-400 text-[50px]">
			<a href="/main" className="hover:text-black hover:underline">
				Main
			</a>
			<a href="/admin" className="hover:text-black hover:underline">
				Admin
			</a>
		</div>
	);
}
