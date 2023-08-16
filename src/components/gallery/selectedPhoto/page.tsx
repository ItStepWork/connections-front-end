import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { InfoPhoto } from '../infoPhoto/page';
import { MdClose } from 'react-icons/md';

export default function SelectedPhoto(props: any) {

  return (
    <>
    {props.isSelected?(
      <div className='fixed z-50 flex flex-col left-0 top-0 h-screen w-full p-5 bg-black bg-opacity-70 '>
        <div className='flex h-1/5 w-full justify-end items-start'>
          <button onClick={()=>{props.setIsSelected(false)}}><MdClose size={40}/></button>
        </div>
        <div className='flex h-3/5 w-full justify-between items-center'>
          <button className='w-1/12' onClick={()=>{if((props.selectedIndex - 1) >= 0) props.setSelectedIndex(props.selectedIndex - 1)}}><FaChevronLeft size={40}/></button>
          {props.photos[props.selectedIndex]?(<div className='w-10/12 h-full flex items-center justify-center'><InfoPhoto photo={props.photos[props.selectedIndex]} myId={props.user.id} userId={props.user.id} get={props.get}/><img className='max-h-full' src={props.photos[props.selectedIndex].url}/></div>):(<></>)}
          <button className='w-1/12 flex justify-end' onClick={()=>{if(props.photos.length > (props.selectedIndex + 1)) props.setSelectedIndex(props.selectedIndex + 1)}}><FaChevronRight size={40}/></button>
        </div>
      </div>
      ):(<></>)}
      </>
  );
}