import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import UserInfo from '../userInfo/page';

export default function SelectedUser(props: any) {

  return (
    <>
      {props.isSelected ? (
        <div className='fixed z-50 flex justify-between items-center left-0 top-0 h-screen w-screen p-5 max-h-screen bg-black bg-opacity-70 '>
          <div className='absolute right-0 top-0 m-6'>
            <button onClick={() => { props.setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <button className='flex' onClick={() => { if ((props.selectedIndex - 1) >= 0) props.setSelectedIndex(props.selectedIndex - 1) }}><FaChevronLeft className="h-10 w-10 md:h-14 md:w-14 hover:fill-button_blue_BG" /></button>
          {props.users[props.selectedIndex] ? (

            <div className='block max-h-screen overflow-auto bg-white dark:bg-dark_background'>
              <UserInfo user={props.users[props.selectedIndex]} getUsers={props.getUsers} />
            </div>
          ) : (<></>)}
          <button className='flex' onClick={() => { if (props.users.length > (props.selectedIndex + 1)) props.setSelectedIndex(props.selectedIndex + 1) }}><FaChevronRight className="h-10 w-10 md:h-14 md:w-14 hover:fill-button_blue_BG" /></button>

        </div>
      ) : (<></>)}
    </>
  );
}