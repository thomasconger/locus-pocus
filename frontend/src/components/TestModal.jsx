import Modal from "./Modal";
import ModalBody from "./ModalBody";
import ModalHeader from "./ModalHeader";
import ModalFooter from "./ModalFooter";

export default function TestModal(props) {
  return (
    <Modal>
      <ModalHeader>
        <h3>Create New Activity</h3>
      </ModalHeader>
      <ModalBody>
        <form className="test-modal">
          <input placeholder="Title"></input>
          <input placeholder="Prompt"></input>
          <input placeholder="Responses"></input>
          <input placeholder="Extra"></input>

        </form>
      </ModalBody>
      <ModalFooter>
        <button onClick={ props.close } className="btn btn-primary">Close Modal</button>
      </ModalFooter>
    </Modal>
  );
}
