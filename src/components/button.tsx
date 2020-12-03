import React from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
  display: flex;
  width: 100%;
  padding: 14px 8px;
  justify-content: center;
  cursor: pointer;
  font-family: Montserrat;
`

const PrimaryButton = styled(BaseButton)`
  border: 1px solid #363740;
  background: #363740;
  color: #fff;
`

const SecondaryButton = styled(BaseButton)`
  background: #fff;
  border: 1px solid #363740;
  color: #363740;
`

type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: 'outlined' | 'contained'
}

const Button = ({ label, onClick, variant = 'contained', type }: ButtonProps) => {
  if (variant === "outlined") {
    return (
      <SecondaryButton type={type} onClick={onClick}>
        {label}
      </SecondaryButton>
    )
  }

  return (
    <PrimaryButton type={type} onClick={onClick}>
      {label}
    </PrimaryButton>
  )
}

export default Button