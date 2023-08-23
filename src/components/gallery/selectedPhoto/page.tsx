import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { InfoPhoto } from '../infoPhoto/page';
import { MdClose } from 'react-icons/md';

export default function SelectedPhoto(props: any) {

  return (
    <>
      {props.isSelected ? (
        <div className='fixed z-50 flex flex-col left-0 top-0 h-screen w-screen p-5 bg-black bg-opacity-70 '>
          <div className='flex h-1/6 w-full justify-end items-start'>
            <button onClick={() => { props.setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <div className='flex h-4/5 w-full justify-between items-center'>
            <button className='w-1/12' onClick={() => { if ((props.selectedIndex - 1) >= 0) props.setSelectedIndex(props.selectedIndex - 1) }}><FaChevronLeft size={40} /></button>
            {props.photos[props.selectedIndex] ? (
              <div className='relative w-10/12 h-full flex justify-center items-center'>

                <div className='relative flex flex-col flex-wrap h-fit md:h-full w-auto  bg-white dark:bg-dark_background'>
                  <div className='h-3/4'>
                    <img className='object-contain h-auto md:h-full w-auto max-h-full' src={props.photos[props.selectedIndex].url} />
                  </div>
                  <div className='relative h-44 overflow-y-auto'>
                    <InfoPhoto photo={props.photos[props.selectedIndex]} myId={props.user.id} userId={props.user.id} get={props.get} />
                  </div>
                </div>
              </div>
            ) : (<></>)}
            <button className='w-1/12 flex justify-end' onClick={() => { if (props.photos.length > (props.selectedIndex + 1)) props.setSelectedIndex(props.selectedIndex + 1) }}><FaChevronRight size={40} /></button>
          </div>
        </div>
      ) : (<></>)}
    </>
  );
}