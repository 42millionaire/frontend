import secureLocalStorage  from 'react-secure-storage';

export default function getUserInfo() {
    const id = secureLocalStorage.getItem('memberId');
    const name = secureLocalStorage.getItem('memberName');

    return {id, name};
}
