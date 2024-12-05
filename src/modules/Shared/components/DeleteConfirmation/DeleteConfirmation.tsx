import Modal from 'react-bootstrap/Modal';



interface DeleteConfirmationProps {
  show: boolean;
  handleClose: () => void;
  onDelete: () => void;
  children: React.ReactNode; // This ensures children can be any valid React node
}


const  DeleteConfirmation: React.FC<DeleteConfirmationProps>=({show, handleClose, onDelete, children})=> {
  return (
  <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <h5 className='my-3'>Delete This {children}?</h5>
            <p className="text-muted">are you sure you want to delete this item ? if you are sure just click on delete it</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          <button className="btn btn-light border-danger text-danger" onClick={onDelete}>
            Delete This {children}
          </button>
        </Modal.Footer>
      </Modal>
  </>);
}

export default DeleteConfirmation;