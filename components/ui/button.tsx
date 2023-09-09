import { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    " rounded-full hover:bg-orange-600 px-6 py-3 text-white bg-orange-500",
  secondary: "",
  teritary: "",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  className?: string;
  children?: React.ReactNode;
}

const BASE_CLASS = "";

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  children,
  ...properties
}) => {
  return (
    <button
      {...properties}
      className={`${className} ${BASE_CLASS} ${variant && variants[variant]}`}
    >
      {children && children}
    </button>
  );
};

export default Button;
