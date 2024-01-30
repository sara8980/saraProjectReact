import React, { FC, ReactNode } from 'react';
import './my-modal.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyModalProps {
  title: string
  confirmFunction: (event:any) => void
  children: React.ReactNode


}

const MyModal: FC<MyModalProps> = (prop: MyModalProps) => {

  const handleButton = (event: any) => {
    event.preventDefault();
    prop.confirmFunction(
      event.target.innerText
    )
  }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
      <Modal.Header dir="ltr" closeButton>
          <Modal.Title>{prop.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{prop.children}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={(event) => handleButton(event)} variant="secondary">Cancel</Button>
          <Button onClick={(event) => handleButton(event)} variant="primary">Confirm </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>


  );

};

export default MyModal;
