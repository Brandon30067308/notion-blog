import clsx from "clsx";
import {
  Button as FlowbiteButton,
  ButtonProps as FlowbiteButtonProps,
} from "flowbite-react";
import * as React from "react";

export interface ButtonProps extends FlowbiteButtonProps {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, color = "primary", ...props }, ref) => {
    return (
      <FlowbiteButton
        ref={ref}
        color={color}
        className={clsx("outline-none", className)}
        {...props}
      >
        {children}
      </FlowbiteButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
