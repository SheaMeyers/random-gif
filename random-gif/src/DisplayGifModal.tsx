import Modal from "react-modal";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './Modal.css';

interface Props {
  isOpen: boolean;
  handleModalClose: Function;
  gifSrc: string;
}

const DisplayGifModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Forgot Password Modal"
      closeTimeoutMS={200}
      className="modal"
    >
      <div>
        <ArrowBackIosIcon onClick={() => props.handleModalClose()}/>
        {/* TODO Use new component here */}
        <iframe
            src={props.gifSrc}
            title="random-gif"
            width="480"
            height="270"
            frameBorder="0"
        />
      </div>
    </Modal>
  );
};

export default DisplayGifModal;
