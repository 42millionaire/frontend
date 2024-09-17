const AdminContentBlock = ({title, contents, className}) =>{
	return (
		<div className={className}>
		<div className="mb-[50px]">
				<h1 className="text-[25px]">{title}</h1>
				<hr className="mb-[5px]"></hr>
				{contents()}
		</div>
		</div>
	)
}

export default AdminContentBlock;