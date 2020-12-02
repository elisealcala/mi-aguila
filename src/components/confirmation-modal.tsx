import React from 'react'
import styled from 'styled-components'
import Modal from 'react-overlays/Modal';
import Button from './button'

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

const RandomlyPositionedModal = styled(Modal)`
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

const Title = styled.span`
  font-size: 24px;
  font-weight: 300;
  text-align: center;
`

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  margin-top: 20px;
  & > button {
    margin-right: 20px;
  }
`

type ConfirmationModalProps = {
  show: boolean;
  onHide: () => void;
  mainButtonAction: () => void;
}

const ConfirmationModal = ({ show, onHide, mainButtonAction }: ConfirmationModalProps) => {
  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  return (
    <RandomlyPositionedModal renderBackdrop={renderBackdrop} show={show} onHide={onHide}>
      <>
        <Title>¿Seguro que quieres realizar esta acción?</Title>
        <ButtonsContainer>
          <Button onClick={onHide} variant='outlined' label="Cancelar" />
          <Button onClick={mainButtonAction} label="Aceptar" />
        </ButtonsContainer>
      </>
    </RandomlyPositionedModal>
  )
}

export default ConfirmationModal