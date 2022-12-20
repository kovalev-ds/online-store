import { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode
}

type CardDescendants = {
  Media: typeof CardMedia
  Actions: typeof CardActions
  Body: typeof CardBody
  Header: typeof CardHeader
}

const Card: FC<CardProps> & CardDescendants = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      {children}
    </div>
  )
}


type CardMediaProps = {
  src: string;
  alt: string;
}

const CardMedia: FC<CardMediaProps> = ({ src, alt }) => {
  return (
    <div>
      <img className="aspect-video object-cover" src={src} alt={alt} />
    </div>
  )
}

type CardActionsProps = {
  children: ReactNode
}

const CardActions: FC<CardActionsProps> = ({ children }) => {
  return <div className="flex items-center justify-between">{children}</div>
}

type CardBodyProps = {
  children: ReactNode
}
const CardBody: FC<CardBodyProps> = ({ children }) => {
  return (
    <div className="max-h-40 overflow-y-auto">{children}</div>
  )
}

type CardHeaderProps = {
  children: ReactNode
}
const CardHeader: FC<CardBodyProps> = ({ children }) => {
  return (
    <div className="max-h-40 overflow-y-auto">{children}</div>
  )
}

Card.Actions = CardActions;
Card.Media = CardMedia;
Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;