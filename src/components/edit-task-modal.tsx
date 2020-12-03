import React, { useEffect, useState } from 'react'
import Modal from 'react-overlays/Modal';
import styled from 'styled-components';
import Button from './button';

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

const StyledModal = styled(Modal)`
  position: fixed;
  width: 400px;
  top: 35%;
  right: 50%;
  transform: translateX(50%);
  z-index: 1040;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
  &:focus {
    outline: none;
  }
  `;

const StyledInput = styled.input`
  width: calc(100% - 24px);
  border-width: 1px;
  border-color: #DFE0EB;
  font-weight: 300;
  font-family: Montserrat;
  padding: 10px;

  &:focus {
    border-width: 1px;
    border-color: #DFE0EB;
    outline: none;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  margin-top: 20px;
  & button:first-child {
    margin-right: 20px;
  }
`

type EditTaskModalProps = {
  show: boolean;
  onHide: () => void;
  mainButtonAction: (value: string) => void;
  inputValue: string;
}

const EditTaskModal = ({
  show,
  onHide,
  mainButtonAction,
  inputValue,
}: EditTaskModalProps) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    if (inputValue) {
      setValue(inputValue)
    }
  }, [inputValue])

  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  return (
    <StyledModal renderBackdrop={renderBackdrop} show={show} onHide={onHide}>
      <>
        <StyledInput value={value} onChange={e => setValue(e.target.value)} />
        <ButtonsContainer>
          <Button onClick={onHide} variant='outlined' label="Cancelar" />
          <Button onClick={() => mainButtonAction(value)} label="Actualizar" />
        </ButtonsContainer>
      </>
    </StyledModal>
  )
}

export default EditTaskModal;