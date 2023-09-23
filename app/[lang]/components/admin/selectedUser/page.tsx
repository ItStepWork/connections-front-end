import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import UserInfo from '../userInfo/page';

export default function SelectedUser(props: any) {

  return (
    <>
      {props.isSelected ? (
        <div className='fixed z-50 flex flex-col left-0 top-0 h-screen w-screen p-5 bg-black bg-opacity-70 '>
          <div className='flex h-1/6 w-full justify-end items-start'>
            <button onClick={() => { props.setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <div className='flex h-4/5 w-full justify-between items-center'>
            <button className='w-1/12' onClick={() => { if ((props.selectedIndex - 1) >= 0) props.setSelectedIndex(props.selectedIndex - 1) }}><FaChevronLeft size={40} /></button>
            {props.users[props.selectedIndex] ? (
              <div className=' w-10/12 h-full block overflow-hidden'>
                <div className='flex p-3 h-full w-full flex-col flex-wrap justify-center items-center bg-white dark:bg-dark_background'>
                  <UserInfo user={props.users[props.selectedIndex]}/>
                </div>
              </div>
            ) : (<></>)}
            <button className='w-1/12 flex justify-end' onClick={() => { if (props.users.length > (props.selectedIndex + 1)) props.setSelectedIndex(props.selectedIndex + 1) }}><FaChevronRight size={40} /></button>
          </div>
        </div>
      ) : (<></>)}
    </>
  );
}