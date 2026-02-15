import { ReactNode } from "react";




export default function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mutz-title my-6 lg:my-8">
        {children}
    </h1>
  )
}
