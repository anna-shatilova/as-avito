import styled, { createGlobalStyle, keyframes } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

@font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto/Roboto-Regular.ttf');
    font-style: normal;
}

@font-face {
    font-family: 'Noto Sans';
    src: url('/fonts/NotoSans/NotoSans-Bold.ttf');
    font-style: normal;
}

@font-face {
    font-family: 'Noto Sans Regular';
    src: url('/fonts/NotoSans/NotoSans-Regular.ttf');
    font-style: normal;
}

a,
a:visited {
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
}

html,
body {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  color: #000000;
}

button {
  cursor: pointer;
}

input,
button,
textarea,
a {
  font-family: 'Roboto', sans-serif;
}

input,
button {
  border: none;
  outline: none;
}

ul li {
  list-style: none;
}
`

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`

export const Main = styled.main``

export const MainContainer = styled.div`
  max-width: 1208px;
  margin: 0 auto;
  padding: 4px 10px 30px;
`

// Переиспользуемые компоненты кнопок и заголовков

export const Button = styled.button`
  color: #ffffff;
  border-radius: 6px;
  background-color: #009ee4;
  border: #009ee4;

  background-color: ${(props) => (props.$disabled ? '#d9d9d9' : '#009ee4')};
  border: ${(props) => (props.$disabled ? '1px solid #d9d9d9' : '#009ee4')};
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${(props) => (props.$disabled ? '#d9d9d9' : '#0080c1')};
    background-color: #0080c1;
  }
`

export const ButtonWithBorder = styled.button`
  color: #fff;
  background-color: #009ee4;
  border-radius: 6px;
  border: 1px solid #fff;
  padding: 8px 24px;
  font-size: 16px;
  line-height: 150%;
  transition: all 0.3s ease-out;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`

const rotate = keyframes`
0% {
  transform: rotate(0)
}
100% {
  transform: rotate(360deg)
}
`

export const Loader = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin-top: 150px;
  left: 550px;

  &::before,
  &::after {
    content: '';
    border-radius: 50%;
    position: absolute;
    inset: 0;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3) inset;
  }
  &::after {
    box-shadow: 0 5px 0 #009ee4 inset;
    animation: ${rotate} 2s linear infinite;
  }
`
// export const TitleH2 = css`
//   color: #000;
//   font-size: 40px;
//   font-style: normal;
//   line-height: 220%;
// `;

// export const HeadingH3 = css`
//   ${TitleH2}

//   font-size: 32px;
// `;
