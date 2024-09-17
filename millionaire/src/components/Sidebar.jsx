import PAGE_TITLES from "../constants/PAGE_TITLES";

const Sidebar = ({ setPage }) => (
	<div className="w-[23%] mt-[20px] ml-[20px]">
		<h1 className="mb-[50px] mt-[20px] text-[30px]">☠️세후1억 해적단☠️</h1>
		<nav>
			<ul className="text-[20px]">
				{Object.entries(PAGE_TITLES).map(([key, title]) => (
					<li key={key} onClick={() => setPage(key)} className="hover:text-orange-400 cursor-pointer  w-fit">
						{title}
					</li>
				))}
				<a href="/" className="hover:text-orange-400">Admin out</a>
			</ul>
		</nav>
	</div>
);

export default Sidebar;
