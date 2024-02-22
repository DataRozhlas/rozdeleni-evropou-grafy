import React from 'react'

import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Embed from './Embed.tsx'
import EmbedSingle from './EmbedSingle.tsx'
import './index.css'


const params  = new URLSearchParams(window.location.search)
const id = params.get('id')
const select = params.get('select')


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {typeof id === "string" && typeof select === "string" && <EmbedSingle id={id} select={select}/>}
    {typeof id === "string" && select===null && <Embed id={id} />}
    {id === null && <App />}
  </React.StrictMode>,
)
