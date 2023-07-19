import Prompt from "@models/prompt";

const { connectToDB } = require("@utils/database"); 

export const POST = async (req,res) => {
  const {prompt,userId,tag} = await req.json();

  try {
    await connectToDB()

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

  await newPrompt.save();

  return new Response(JSON.stringify(newPrompt),{
    status: 201
  })
  } catch (error) {
return new Response('Failed create new prompt', {
  status: 500
})
  }
}