import React, { useState } from 'react'
import { useLocation } from "@reach/router"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
// import profilePicture from "../../images/mnaoi.jpeg"

type PageType = {
  title:string,
  uri:string
}

type Props = {
  pages: PageType[],
}

//HARDCODED this dictionary is used to sort the pages in the sidebar
const pagePrecedence = {
  "Home": 0,
  "Curriculum Vitae": 1,
  "Publications and Working Papers": 2,
  "Teaching": 3,
  "Domestic Politics of Free Trade Agreements": 4
}

export default function Sidebar(props:Props) {
  const [active, setActive] = useState(false)

  const location = useLocation()

  const pages: PageType[] = props.pages.map(p => p).sort((a: PageType, b: PageType) => {
    const aPrecedence = pagePrecedence[a.title]
    const bPrecedence = pagePrecedence[b.title]
    if(aPrecedence!=undefined && bPrecedence!=undefined) {
      return aPrecedence - bPrecedence
    }
    else if(aPrecedence!=undefined) {
      return -1
    }
    else if(bPrecedence!=undefined) {
      return 1
    }
    return 0
  })

  
  return (
    <>
      <div className={`sidebar-dimmer ${active?"active":""}`} onClick={() => setActive(!active)}></div>

      <div className={`sidebar ${active?"active":""}`}>

        <StaticImage
          src="../../images/mnaoi.jpeg"
          alt="Profile picture"
        />

        <hr/>
        <div className='items'>
          {pages.map((p,i) =>
            <p key={i} className={`item ${location.pathname==p.uri && "active"}`}><Link to={p.uri}>{p.title}</Link></p>
          )}
        </div>

        <button className="sidebar-toggle" onClick={() => setActive(!active)}>X</button>
        
      </div>
    </>
  )
}