const AdminBody = ({title, children})=>{
	return (
		<div className="w-[65%] mt-[20px]">
			<h1 className="mb-[30px] mt-[10px] text-[40px]">{title}</h1>
			{children}
		</div>
	)
}

export default AdminBody;