import {useEffect,useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';

const modalRoot = document.querySelector('#root-modal');
export default function Modal ({largeImageURL,onClose,tags}) {
  // componentDidMount() {
  //   document.addEventListener('keydown', this.handleEscape);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.handleEscape);
  // }

  const handleEscape = useCallback (event => {
    if (event.code === 'Escape') {
      onClose();
    }
  },[onClose]
  );

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
       onClose();
    }
  };

  useEffect(()=>{
    document.addEventListener('keydown',handleEscape);
    return ()=>{
      document.removeEventListener('keydown', handleEscape);
    };
  },[handleEscape]);
    
    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <ModalStyled>
          <img src={largeImageURL} alt={tags} />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  
}
