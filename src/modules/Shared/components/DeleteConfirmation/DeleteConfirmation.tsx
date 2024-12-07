import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import character from '../../../../assets/character.svg';
import closeButton from '../../../../assets/closeButton.png';

interface DeleteConfirmationProps {
  showDelete: boolean;
  handleCloseDelete: () => void; // Function to close the modal
  deleteItem: string; // Name of the item to delete
  deleteFunction: () => any; // Function to call the delete API
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  showDelete,
  handleCloseDelete,
  deleteItem,
  deleteFunction,
}) => {
  return (
    <>
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header>
          <img src={closeButton} onClick={handleCloseDelete} alt="Close" />
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={character} alt="Character" />
            <h5 className='mt-4'>Delete This {deleteItem}</h5>
            <p className='text-muted'>
              Are you sure you want to delete this item? If you are sure, just click on delete.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            className="btn-danger" 
            onClick={deleteFunction} // Call API delete
            aria-hidden="true"
          >
            Delete this {deleteItem}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;