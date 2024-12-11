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
// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import character from '../../../../assets/character.svg';
// import closeButton from '../../../../assets/closeButton.png';

// interface DeleteConfirmationProps {
//   showDelete: boolean;
//   handleCloseDelete: () => void; // Function to close the modal
//   deleteItem: string; // Name of the item to delete
//   deleteFunction: () => any; // Function to call the delete API
// }

// const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
//   showDelete,
//   handleCloseDelete,
//   deleteItem,
//   deleteFunction,
// }) => {
//   return (
//     <>
//       <Modal show={showDelete} onHide={handleCloseDelete}>
//         <Modal.Header>
//           <img src={closeButton} onClick={handleCloseDelete} alt="Close" />
//         </Modal.Header>
//         <Modal.Body>
//           <div className="text-center">
//             <img className="w-100" src={character} alt="Character" />
//             <h5 className='mt-4'>Delete This {deleteItem}</h5>
//             <p className='text-muted'>
//               Are you sure you want to delete this item? If you are sure, just click on delete.
//             </p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button 
//             className="btn-danger" 
//             onClick={deleteFunction} // Call API delete
//             aria-hidden="true"
//           >
//             Delete this {deleteItem}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

export default DeleteConfirmation;