import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { serviceGetPhotos } from 'api/api';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import StyledApp from 'App.styled';
export default class App extends Component {
  state = {
    searchQuery: '',
    gallery: [],
    currentPage: 1,
    quantityPages: null,
    error: null,
    isLoading: false,
    showModal: false,
    largeImageURL: null,
    tags: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchQuery !== this.state.searchQuery
    ) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await serviceGetPhotos(
        this.state.searchQuery,
        this.state.currentPage
      );
      if (!hits.length) {
        Notify.failure('Sorry,no images found.Please,try again.');
        return;
      }
      if (hits.length > 0) {
        this.setState(prev => ({
          gallery: [...prev.gallery, ...hits],
          quantityPages: Math.ceil(totalHits / 12),
        }));
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({
      currentPage: 1,
      quantityPages: null,
      gallery: [],
      error: null,
      searchQuery,
    });
  };

  handleModal = obj => {
    this.setState({ isLoading: true, showModal: true, ...obj });
  };

  onClose = () => {
    this.setState({ isLoading: false, showModal: false });
  };

  handleBtnLoad = () => {
    this.setState(prev => ({
      currentPage: prev.currentPage + 1,
    }));
  };

  render() {
    const {
      gallery,
      error,
      isLoading,
      showModal,
      largeImageURL,
      tags,
      currentPage,
      quantityPages,
    } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        {isLoading && <Loader />}
        {error && Notify.failure(error)}
        {gallery && gallery.length > 0 && (
          <ImageGallery hits={gallery} onClick={this.handleModal} />
        )}
        {currentPage < quantityPages && (
          <Button handleBtnLoad={this.handleBtnLoad} />
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.onClose}
          />
        )}
      </StyledApp>
    );
  }
}
