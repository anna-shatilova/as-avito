import styled from 'styled-components'
import { Button } from '../../App.styles'

export const AuthContainer = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  left: 0px;
  top: 0px;
  overflow: hidden;
  background-color: #f4f5f6;
`

export const Modal = styled.div`
  --modal-width: 366px;
  --modal-height: 647px;
  position: absolute;
  // z-index: 2;
  left: calc(50% - (var(--modal-width) / 2));
  top: calc(50% - (var(--modal-height) / 2));
  opacity: 1;
  width: 366px;
  background-color: #ffffff;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 43px 47px 47px 40px;
`

export const ModalLogo = styled.div`
  width: 140px;
  height: 21px;
  margin-bottom: 42px;
  background-color: transparent;

  & img {
    width: 140px;
    height: auto;
  }
`

export const ModalForm = styled.form``

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
  width: 100%;
`

export const ModalInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid #d0cece;
  padding: 8px 1px;

  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: -0.05px;
    color: #d0cece;
  }
`
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 60px;
  width: 100%;
`

export const ModalButton = styled(Button)`
  width: 278px;
  height: 52px;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;
`

export const ModalButtonRegister = styled.button`
  width: 278px;
  height: 52px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  color: #000;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.05px;

  &:hover {
    background-color: #f4f5f6;
  }
`
export const Error = styled.div`
  color: coral;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  margin-top: 20px;
  text-align: left;
`