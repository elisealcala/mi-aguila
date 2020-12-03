import React from 'react'
import Modal from 'react-overlays/Modal';
import styled from 'styled-components'
import Button from '../components/button';
import NavBar from '../components/navbar'
import SideBar from '../components/sidebar'


const Container = styled.div`
  display: flex;
  font-family: 'Montserrat';

  & .container {
    margin-left: 255px;
    width: calc(100% - 255px);
  }
`

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
  width: 200px;
  top: 5%;
  right: 5%;
  z-index: 1040;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
  &:focus {
    outline: none;
  }
  `;

type Props = {
  hideMessage: () => void;
  showMessage: boolean;
}

const MainLayout: React.FC<Props> = ({ children, showMessage, hideMessage }) => {
  const renderBackdrop = (props: any) => <Backdrop {...props} />;

  return (
    <Container>
      <SideBar />
      <div className="container">
        <NavBar />
        {children}
      </div>
      <StyledModal renderBackdrop={renderBackdrop} show={showMessage} onHide={hideMessage}>
        <>
          <span>Tu sesión esta a punto de expirar</span>
          <Button label="Permanecer" />
        </>
      </StyledModal>
    </Container>
  )
}

export default MainLayout