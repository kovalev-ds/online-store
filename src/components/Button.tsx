import { ButtonHTMLAttributes, FC, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
}

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
  return (
    <button className="px-6 py-4" {...rest}>{children}</button>
  )
}

export default Button