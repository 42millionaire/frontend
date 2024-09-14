export default function DashBoard() {
	return (
		<div className="flex-none w-[65%] mt-[20px]">
			<h1 className="mb-[10px] text-[40px]">Notice Board</h1>
			<div className="w-[100%] mb-[50px]">
				<h1 className="text-[25px]">Notice</h1>
				<hr className="mb-[5px]"></hr>
       			<p><textarea className="w-[100%] h-[300px] bg-black" name="notice" placeholder='Notice'></textarea></p>
        		<p className="flex justify-end"><input className="self-end" type="submit" value="Notify"/></p>
			</div>
		</div>
	)
}