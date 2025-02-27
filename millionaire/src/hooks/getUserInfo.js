
export default function getUserInfo() {
    const id = window.localStorage.getItem('memberId');
    const name = window.localStorage.getItem('memberName');

    return {id, name};
}
