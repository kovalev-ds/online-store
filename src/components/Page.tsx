import clsx from "clsx";
import { FC, ReactNode } from "react";

type PageProps = {
  children: ReactNode | ReactNode[]
}

type PageDescendants = {
  Store: typeof StorePage
}

const Page: FC<PageProps> & PageDescendants = ({ children }) => {
  return <>{children}</>
}

type StorePageProps = {
  aside: ReactNode,
  header: ReactNode
  content: ReactNode
  size: string[]
}
const StorePage: FC<StorePageProps> = ({ aside, header, content, size }) => {
  return (
    <div className="container">
      <div className="grid grid--store">
        <div className="space-y-6">
          {aside}
        </div>
        <div>
          <div className="flex items-center justify-between py-4">
            {header}
          </div>
          <div className={clsx("grid", `grid--product-grid-${size ?? 4}`)}>
            {content}
          </div>
        </div>
      </div>
    </div >
  )
}

Page.Store = StorePage;

export default Page;