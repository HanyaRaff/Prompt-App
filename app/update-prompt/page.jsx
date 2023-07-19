"use client";
import { useSession } from 'next-auth/react'
import { useRouter,useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Form from '@components/Form';

const EditPrompt = () => {

  const router = useRouter()
  // const {data:session} = useSession()
  const searchParams = useSearchParams()
  const promptId = searchParams.get('id')


  const [submit,setSubmit] =useState(false)
  const [post, setPost] = useState({
    prompt : '',
    tag : ''
  })

  useEffect(()=>{
    const getPromptDetails = async () =>{
      const res = await fetch(`/api/prompt/${promptId}`)
      const data = await res.json()

      setPost({
        prompt:data.prompt,
        tag:data.tag
      })
    }

    if(promptId) getPromptDetails()
  },[promptId])

  const UpdatePrompt = async (e) => {
    e.preventDefault();

    setSubmit(true);

    if(!promptId) return alert("Prompt Id Not Found")

    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      setSubmit(false)
    }
  }

  return (
    <Form 
    type="Update"
    post={post}
    setPost={setPost}
    submit={submit}
    handleSubmit={UpdatePrompt}
    />
  )
}

export default EditPrompt