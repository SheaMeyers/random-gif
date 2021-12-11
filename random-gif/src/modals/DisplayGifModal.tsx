import Modal from "react-modal";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../css/Modal.css';

interface Props {
  isOpen: boolean;
  handleModalClose: Function;
  displayGifComponent: React.ReactElement;
}

const DisplayGifModal = (props: Props) => {
  return (
    <Modal
      appElement={document.body}
      isOpen={props.isOpen}
      contentLabel="Forgot Password Modal"
      closeTimeoutMS={200}
      className="modal"
    >
      <div>
        <ArrowBackIosIcon onClick={() => props.handleModalClose()}/>
        {props.displayGifComponent}
      </div>
    </Modal>
  );
};

export default DisplayGifModal;
