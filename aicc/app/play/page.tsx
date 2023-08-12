"use client"

import ReactMarkdown from "react-markdown"
import ReactDomServer from "react-dom/server"


const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

You can add or remove rows as needed to accommodate the number of players on your team. You can also add columns to track other information about the players, such as their height, weight, age, and experience.

1. You are currently an Android developer at ChatMagic AI, where you have developed the whole ChatMagic AI app including UI design, app development, and AI machine learning integration.
2. You have experience as a full-stack developer at AIE Studio, where you developed the frontend using React.js, styled with Material UI, and deployed the app using Netlify, and the backend and AI use Python.
3. You previously worked as an Android developer at Neurality, where you developed Neurality, which has over 20 brain training games using Android Studio with Kotlin programming language.

You can add or remove rows as needed to accommodate the number of players on your team. You can also add columns to track other information about the players, such as their height, weight, age, and experience.

- You are currently an Android developer at ChatMagic AI, where you have developed the whole ChatMagic AI app including UI design, app development, and AI machine learning integration.
- You have experience as a full-stack developer at AIE Studio, where you developed the frontend using React.js, styled with Material UI, and deployed the app using Netlify, and the backend and AI use Python.
- You previously worked as an Android developer at Neurality, where you developed Neurality, which has over 20 brain training games using Android Studio with Kotlin programming language.
`

export default function Main({}) {
  const domObj = (
    <div className="m-4 [&>p]:mt-2">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
  
  const str = ReactDomServer.renderToString(<div>p</div>)
  console.log(str)
  
  return domObj
}
