import styled, { css } from 'styled-components';
import { ButtonProps } from './App';

interface Buttons extends ButtonProps {
  children: string;
}
const StyledButton = styled.button<Buttons>`
  padding: 6px 12px;
  border: 1px solid lightgrey;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;

  color: ${(p) => p.color || 'gray'};
  background: ${(p) => p.background || 'white'};

  ${(p) =>
    p.primary &&
    css`
      color: white;
      background: navy;
      border-color: navy;
    `}
`;

function Button({ childr  en, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
