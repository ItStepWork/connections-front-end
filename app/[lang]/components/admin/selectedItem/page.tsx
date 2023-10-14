import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

export default function SelectedItem(props: any) {

  const {
    isSelected,
    selectedIndex,
    setIsSelected,
    setSelectedIndex,
    array,
    children
  } = props;

  return (
    <>
      {isSelected ? (
        <div className='fixed z-50 flex justify-between items-center left-0 top-0 h-screen w-screen p-5 max-h-screen bg-black bg-opacity-70 '>
          <div className='absolute right-0 top-0 m-6'>
            <button onClick={() => { setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <button className='flex' onClick={() => { if ((selectedIndex - 1) >= 0) setSelectedIndex(selectedIndex - 1) }}><FaChevronLeft className="h-10 w-10 md:h-14 md:w-14 hover:fill-button_blue_BG" /></button>
          {array[selectedIndex] ? (

            <div className='block max-h-screen overflow-auto bg-white dark:bg-dark_background'>
              {children}
            </div>
          ) : (<></>)}
          <button className='flex' onClick={() => { if (array.length > (selectedIndex + 1)) setSelectedIndex(selectedIndex + 1) }}><FaChevronRight className="h-10 w-10 md:h-14 md:w-14 hover:fill-button_blue_BG" /></button>

        </div>
      ) : (<></>)}
    </>
  );
}