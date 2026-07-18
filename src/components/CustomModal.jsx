import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../context/userContext";

export const CustomModal = ({ children }) => {
  const { toggleModal, show, setEditingTransaction } = useUser();

  return (
    <>
      <Button
        className="mb-4 fw-semibold"
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
        contentClassName="overflow-hidden border-0"
      >
        <Modal.Header className="border-0 pb-0" closeButton />
        <Modal.Body className="p-0">{children}</Modal.Body>
      </Modal>
    </>
  );
};
