import { FC, ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
};

type CardDescendants = {
  Media: typeof CardMedia;
  Actions: typeof CardActions;
};

const Card: FC<CardProps> & CardDescendants = ({ children }) => {
  return (
    <div className="flex flex-col items-center rounded-md shadow-lg hover:shadow-2xl h-full relative pb-10 text-xs">
      {children}
    </div>
  );
};

type CardMediaProps = {
  src: string;
  alt: string;
};

const CardMedia: FC<CardMediaProps> = ({ src, alt }) => {
  return (
    <div>
      <img className="aspect-video object-cover hover:opacity-75 rounded-md" src={src} alt={alt} />
    </div>
  );
};

type CardActionsProps = {
  children: ReactNode;
};

const CardActions: FC<CardActionsProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between bg-gray-200 rounded-md mb-2 absolute bottom-0 opacity-70 hover:opacity-100 font-bold">
      {children}
    </div>
  );
};

Card.Actions = CardActions;
Card.Media = CardMedia;

export default Card;
