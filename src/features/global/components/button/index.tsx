import { ReactElement } from 'react';
import { ButtonWrapper } from '@global/components/button/button.styles';
import { ButtonVariantsType } from '@global/types';

type ButtonPropsType = {
  onClick: (...args: any[]) => void;
  text: string | ReactElement;
  variant: ButtonVariantsType;
  disabled?: boolean;
  disabledText?: string | ReactElement;
  id?: string;
  connectButton?: boolean;
};

const Button = ({
  onClick,
  text,
  variant,
  disabled = false,
  disabledText,
  id,
  connectButton,
}: ButtonPropsType) => {
  return (
    <ButtonWrapper
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      id={id}
      connectButton={connectButton}
    >
      {disabled ? disabledText : text}
    </ButtonWrapper>
  );
};

export default Button;
