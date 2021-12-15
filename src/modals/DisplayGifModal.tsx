import Modal from "react-modal";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import '../css/Modal.css';

interface Props {
  isOpen: boolean;
  handleModalClose: Function;
  title: string;
  displayGifComponent: React.ReactElement;
}

const DisplayGifModal = (props: Props) => {
  return (
    <Modal
      appElement={document.body}
      isOpen={props.isOpen}
      contentLabel="Display Gif Modal"
      closeTimeoutMS={200}
      className="modal"
    >
      <span className="Modal-Header">
        <ArrowBackIosIcon 
          style={{cursor: 'pointer'}}
          onClick={() => props.handleModalClose()}
        />
        <h2>{props.title}</h2>
      </span>
      {props.displayGifComponent}
    </Modal>
  );
};

export default DisplayGifModal;
