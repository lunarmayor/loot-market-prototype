import styled from "@emotion/styled";

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: white;
  color: #5a67fe;
  font-family: Source Code Pro;
  font-size: 18px;
  width: 100%;

  border: 1px solid #5a67ff1a;
  box-shadow: 0 1px 1px rgb(0 0 0 / 2%), 0 2px 2px rgb(0 0 0 / 2%), 0 4px 4px rgb(0 0 0 / 2%), 0 8px 8px rgb(0 0 0 / 2%), 0 16px 16px rgb(0 0 0 / 7%);
  ${p =>
    p.dark &&
    `
  background: #5a67fe;
  color: white;
  `}
}
`;

export default Button;
