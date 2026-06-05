import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../context/userContext";

export const CustomModal = ({ children }) => {
  const { toggleModal, show, setEditingTransaction } = useUser();

  return (
    <>
      <Button
        className="app-button mb-4"
        variant="primary"
        onClick={() => {
          setEditingTransaction(null);
          toggleModal(true);
        }}
      >
        Add new transaction
      </Button>

      <Modal
        show={show}
        onHide={() => toggleModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
