import { useState,useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { serviceGetPhotos } from 'api/api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import StyledApp from 'App.styled';

export default function App () {

  const[searchQuery,setSearchQuery] =useState('');
  const[gallery,setGallery]= useState([]);
  const[currentPage,setCurrentPage]=useState(1);
  const[quantityPages,setQuantityPages]=useState(null);
  const[error,setError]=useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[showModal,setShowModal]=useState(false);
  const[largeImageURL,setLargeImageURL]=useState(null);
  const[tags,setTags]=useState(null);

  useEffect(()=>{
    if(!searchQuery ){
      return;
    }
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await serviceGetPhotos(
          searchQuery,
          currentPage
        );
        if (!hits.length) {
          Notify.failure('Sorry,no images found.Please,try again.');
          return;
        }
        if (hits.length > 0) {
            setGallery(prev=>[ ...prev,...hits]);
            setQuantityPages(Math.ceil(totalHits / 12));
          }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
    },[currentPage,searchQuery]);

  const handleFormSubmit = searchQuery => {
      setCurrentPage(1);
      setQuantityPages(null);
      setGallery([]);
      setError(null);
      setSearchQuery(searchQuery);
  };

  const handleModal = obj => {
    setIsLoading(false);
     setShowModal(true);
     setLargeImageURL(obj.largeImageURL);
     setTags(obj.tags);
  };

  const onClose = () => {
    setIsLoading(false);
     setShowModal(false);
  };

  const handleBtnLoad = () => {
   setCurrentPage(prev=>prev + 1);
  };

    return (
      <StyledApp>
        <Searchbar onSubmit={handleFormSubmit}></Searchbar>
        {isLoading && <Loader />}
        {error && Notify.failure(error)}
        {gallery && gallery.length > 0 && (
          <ImageGallery hits={gallery} onClick={handleModal} />
        )}
        {currentPage < quantityPages && (
          <Button handleBtnLoad={handleBtnLoad} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={onClose}
          />
        )}
      </StyledApp>
    );
}
