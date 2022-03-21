import React from 'react'

type Props = {
  pages: {title:string}[],
}

export default function Sidebar(props:Props) {
  console.log("props",props)
  return (
    <div className="sidebar">
      {props.pages.map((p,i) => <p key={i} className="item">{p.title}</p>)}
    </div>
  )
}