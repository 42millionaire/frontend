import { printDateFormat } from "../utils/dateUtils";

const Li = (props) => {
    console.log(props.id);
    const {item, openModal, id} = props;
    return (
        <li className="mt-3 flex hover:text-orange-400 text-[17px]">
            <div className="w-[43%] mr-[1%] whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer" onClick={()=>openModal(item.taskId, item.content, item.createdTime)}>
                {item.content}
            </div>
            <div className="w-[17%]">{item.memberName}</div>
            <div className="w-[30%] whitespace-nowrap overflow-hidden text-ellipsis">{printDateFormat(item.createdTime)}</div>
            <button className="w-[9%] mr-2 px-1 bg-green-600 hover:bg-green-800 text-white text-[16px] rounded" onClick={()=>props.yes(props.id)}>승인</button>
            <button className="w-[9%] px-1 bg-red-500 hover:bg-red-700 text-white text-[16px] rounded" onClick={()=>props.no(props.id)}>거절</button>
        </li>
    );
}

export default Li;
