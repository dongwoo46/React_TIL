import Button from './Button';

export interface ButtonProps {
  children: React.ReactNode;
  color?: string;
  background?: string;
  primary?: boolean; // Add the type for the 'primary' prop
}

export const App: React.FC = () => {
  return (
    <>
      <Button>Default Button</Button>
      <Button color="green" background="pink">
        Green Button
      </Button>
      <Button primary>Primary Button</Button>
    </>
  );
};
