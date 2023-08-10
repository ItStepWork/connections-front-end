import { useEffect } from 'react';
import styles from './styles.module.scss';
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from 'react';

export default function Photos(props: any) {


  const [photos, setPhotos] = useState([]);

  const change = (e: any) => {
    if (e.target.files[0].name.endsWith('.jpg') || e.target.files[0].name.endsWith('.jpeg') || e.target.files[0].name.endsWith('.png')) {
      add(e.target.files[0]);
    }
  }

  const add = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/AddPhoto", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.session.user.accessToken
      },
      body: formData,
    });

    if (response.ok) {
      get();
    }
  }

  const get = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_STRAPI_API + "Gallery/GetPhotos", {
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + props.session.user.accessToken
      },
    });

    if (response.ok) {
      let result = await response.json();
      setPhotos(result);
    }
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <div className={styles.container}>
      <div>
      <label className={styles.addPhoto}>
        <MdOutlineAddAPhoto size={50} className="fill-buttonBlue" />
        <p className='text-center'>Добавить фото</p>
        <input type='file' className='hidden' onChange={change}></input>
      </label>
      </div>
      {photos.map((photo: any, index) => {
        console.log(photo.url);
        return (
          <div key={index}>
            <img className={styles.image} src={photo.url}/>
          </div>
        );
      })}
    </div>
  );
}