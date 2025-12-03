"use client"
import { useParams } from "next/navigation"

const Editor = async () => {
  const {projectId} = await useParams()
  return (
    <div>Project Id - {projectId}</div>
  )
}

export default Editor