import React from 'react'
import { Link } from "../../components/link/Link"

export function PostTitle({url, title}){
    if(url) return <h3><Link url={url}>{title}</Link></h3>
    return <h3>{title}</h3>
  }
  
  