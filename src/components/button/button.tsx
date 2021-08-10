import React, { ElementType, MouseEventHandler, ReactNode } from "react";
import { ComponentSize } from "../../config/sizes";
import { StyledButton } from "./styled";

export type ButtonType = "default" | "danger" | "ghost" | "secondary";

interface BaseButtonProps {
  type?: ButtonType;
  icon?: ElementType;
  size?: ComponentSize;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

type HTMLButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps;

/**
 * For React Router Link
 */
type HTMLAnchorProps = {
  href?: string;
} & BaseButtonProps;

type CustomNodeProps = {
  as?: ElementType;
  to?: string;
} & BaseButtonProps;

export type ButtonProps = HTMLButtonProps & HTMLAnchorProps & CustomNodeProps;

const Button: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const {
    type = "default",
    icon,
    size = "default",
    className = "",
    children,
    disabled = false,
    loading = false,
    onClick,
    href,
    as,
    to,
  } = props;

  const styles = {
    innerType: type,
    size,
    disabled,
    withText: children !== null,
  };

  if (as && !disabled) {
    return (
      <StyledButton as={as} to={to} ref={ref} className={className} {...styles}>
        {loading ? "Loading..." : children}
      </StyledButton>
    );
  }

  if (href && !disabled) {
    return (
      <StyledButton
        as="a"
        href={href}
        ref={ref as React.MutableRefObject<HTMLAnchorElement>}
        className={className}
        {...styles}>
        {loading ? "Loading..." : children}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      as="button"
      type="button"
      onClick={onClick}
      ref={ref as React.MutableRefObject<HTMLButtonElement>}
      className={className}
      {...styles}>
      {loading ? "Loading..." : children}
    </StyledButton>
  );
};

export default React.forwardRef<unknown, ButtonProps>(Button);
