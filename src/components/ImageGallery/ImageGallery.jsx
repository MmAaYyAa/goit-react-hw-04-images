import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';
const ImageGallery = ({ hits, onClick }) => {
  //console.log('hits in ImageGallery  :>> ', hits);
  return (
    <>
      <ImageGalleryList className="gallery">
        {hits.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            id={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onClick={onClick}
          />
        ))}
      </ImageGalleryList>
    </>
  );
};
export default ImageGallery;
