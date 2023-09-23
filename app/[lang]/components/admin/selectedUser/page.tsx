import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import UserInfo from '../userInfo/page';

export default function SelectedUser(props: any) {

  return (
    <>
      {props.isSelected ? (
        <div className='fixed z-50 flex flex-col left-0 top-0 h-screen w-screen p-5 max-h-screen bg-black bg-opacity-70 '>
          <div className='flex h-1/6 w-full justify-end items-start'>
            <button onClick={() => { props.setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <div className='flex h-4/5 w-full justify-between items-center'>
            <button className='w-1/12 md:w-1/4 flex justify-end items-center' onClick={() => { if ((props.selectedIndex - 1) >= 0) props.setSelectedIndex(props.selectedIndex - 1) }}><FaChevronLeft className="h-10 w-10 md:h-14 md:w-14 hover:fill-button_blue_BG" /></button>
            {props.users[props.selectedIndex] ? (
              <div className='h-4/5 block overflow-auto'>
                <div className='flex justify-center items-center bg-white dark:bg-dark_background'>
                  <UserInfo user={props.users[props.selectedIndex]}/>
                </div>
              </div>
            ) : (<></>)}
            <button className='w-1/12 md:w-1/4 flex justify-start' onClick={() => { if (props.users.length > (props.selectedIndex + 1)) props.setSelectedIndex(props.selectedIndex + 1) }}><FaChevronRight className="h-10 w-10 md:h-14 md:w-14 hover:fill-button_blue_BG" /></button>
          </div>
        </div>
      ) : (<></>)}
    </>
  );
}