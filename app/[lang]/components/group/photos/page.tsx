"use client"
import { useState } from 'react';
import { MdOutlineAddAPhoto } from "react-icons/md";
// import { PhotoAction } from '../photoAction/page';
// import SelectedPhoto from '../selectedPhoto/page';
import { GroupService } from '../../../../../services/group.service';
import SelectedPhoto from '../../gallery/selectedPhoto/page';
import PhotoAction from './photoAction/page';
import styles from './styles.module.scss';

export default function Photos(props: any) {

  const [isSelected, setIsSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);


  const change = (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      add(e.target.files[0]);
    }
  }

  const add = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id", props.group.id);
    let result = await GroupService.addPhoto(formData);
    props.getPhotos();
  }


  const select = (index: number) => {
    setSelectedIndex(index);
    setIsSelected(true);
  }

  return (
    <div className={styles.container}>
      {props.group.adminId === props.session?.user.id ? (
        <div>
          <label className={styles.addPhoto}>
            <MdOutlineAddAPhoto size={50} className="fill-button_blue_BG" />
            <p className='text-center'>Добавить фото</p>
            <input type='file' className='hidden' onChange={change}></input>
          </label>
        </div>
      ) : (<></>)}
      {props.photos.map((photo: any, index: any) => {
        return (
          <div key={index} className='relative'>
            <div className='absolute right-0 bottom-0'>
              <PhotoAction getPhotos={props.getPhotos} photo={photo} albums={props.albums} group={props.group} />
            </div>
            <img className={styles.image} src={photo.url} onClick={() => { select(index) }} />
          </div>
        );
      })}
      <SelectedPhoto isSelected={isSelected} setIsSelected={setIsSelected} photos={props.photos} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} myId={props.session?.user.id} userId={props.group.id} get={props.getPhotos} />
    </div>
  );
}