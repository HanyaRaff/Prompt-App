"use client";
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Form from '@components/Form';

const CreatePrompt = () => {

  const router = useRouter()
  const {data:session} = useSession()


  const [submit,setSubmit] =useState(false)
  const [post, setPost] = useState({
    prompt : '',
    tag : ''
  })

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmit(true);

    try {
      const res = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
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
    type="Create"
    post={post}
    setPost={setPost}
    submit={submit}
    handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt