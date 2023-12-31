"use client"
import { FaTrash } from "react-icons/fa6";
import { MdClose, MdOutlineNoPhotography } from "react-icons/md";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { StoriesServices } from "../../../../../../services/stories.service";
import styles from './selected-story.module.scss';


const SelectedStory = (props:any) => {

  const {
    local,
    isSelected,
    photos,
    setIsSelected,
    storyId
  } = props;

  const deleteStory = async () => {
    await StoriesServices.deleteStory(storyId);
    setIsSelected(false);
  }

  const deleteStoryAndPhotos = async () => {
    await StoriesServices.deleteStoryAndPhotos(storyId);
    setIsSelected(false);
  }
  return (
    <>
    {isSelected ? (
        <div className={styles.container}>
          <div className={styles.close}>
            <button title={local.stories.selected.deleteAll}
              onClick={() => { deleteStoryAndPhotos() }}>
              <MdOutlineNoPhotography size={30} />
            </button>
            <button title={local.stories.selected.delete}
            onClick={() => { deleteStory() }}>
              <FaTrash size={26} />
            </button>
            <button title={local.stories.selected.close} onClick={() => { setIsSelected(false) }}><MdClose size={40} /></button>
          </div>
          <div className={styles.carouselContainer}>          
            <div className={styles.carousel}>
              <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showArrows={true}
                stopOnHover={true}
                showThumbs={false}  
                showStatus={false}           
                swipeable={true}
                interval={15000}>
                  {photos.map((photo: any) => {
                    return(<img key={photo.id} src={photo.url} alt='photo' />)
                  })}
              </Carousel>
            </div>
          </div>
        </div>
      ) : (<></>)}
    </>
  )
};

export default SelectedStory;
