const AdminContentBlock = ({title, contents, className, topbutton}) =>{
	return (
		<div className={className}>
		<div className="mb-[50px]">
			<div className="flex justify-between">
				<h1 className="text-[25px] w-[30%]">{title}</h1>
				{topbutton && topbutton()}
			</div>
			<hr className="mb-[5px]"></hr>
			{contents()}
		</div>
		</div>
	)
}

export default AdminContentBlock;