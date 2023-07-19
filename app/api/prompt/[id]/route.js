//Get
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database"; 

export const GET = async (req, {params}) => {
  try {
    await connectToDB();

    //Finding All Posts on Mongo
    const prompts = await Prompt.findById(params.id).populate('creator')
    if(!prompts) return new Response("prompt not Found",{status:404})

    
    return new Response(JSON.stringify(prompts),{
      status: 200
    })

  } catch (error) {
    return new Response("Failed to Fetch Data",{
      status: 500
    })
  }
}

//Patch 
export const PATCH = async (req , {params}) => {
  const {prompt, tag} = await req.json()

  try {
    await connectToDB()

    const existingPrompt = await Prompt.findById(params.id)


    if(!existingPrompt) return new Response("Prompt Not Found",{
      status:404
    })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag

    await existingPrompt.save()

    return new Response("Success Update",{status:200})

  } catch (error) {
    return new Response("Failed to Update Prompt",{
      status:500
    })
  }
}
//Delete=
export const DELETE = async (req,{params}) => {
  try {
    await connectToDB()

    await Prompt.findByIdAndRemove(params.id)
    return new Response("Prompt Deleted",{
      status:200
    })
  } catch (error) {
    return new Response("Prompt Delete Error",{
      status:500
    })
  }
}

// import Prompt from "@models/prompt";
// import { connectToDB } from "@utils/database";

// export const GET = async (request, { params }) => {
//     try {
//         await connectToDB()

//         const prompt = await Prompt.findById(params.id).populate("creator")
//         if (!prompt) return new Response("Prompt Not Found", { status: 404 });

//         return new Response(JSON.stringify(prompt), { status: 200 })

//     } catch (error) {
//         return new Response("Internal Server Error", { status: 500 });
//     }
// }

// export const PATCH = async (request, { params }) => {
//     const { prompt, tag } = await request.json();

//     try {
//         await connectToDB();

//         // Find the existing prompt by ID
//         const existingPrompt = await Prompt.findById(params.id);

//         if (!existingPrompt) {
//             return new Response("Prompt not found", { status: 404 });
//         }

//         // Update the prompt with new data
//         existingPrompt.prompt = prompt;
//         existingPrompt.tag = tag;

//         await existingPrompt.save();

//         return new Response("Successfully updated the Prompts", { status: 200 });
//     } catch (error) {
//         return new Response("Error Updating Prompt", { status: 500 });
//     }
// };

// export const DELETE = async (request, { params }) => {
//     try {
//         await connectToDB();

//         // Find the prompt by ID and remove it
//         await Prompt.findByIdAndRemove(params.id);

//         return new Response("Prompt deleted successfully", { status: 200 });
//     } catch (error) {
//         return new Response("Error deleting prompt", { status: 500 });
//     }
// };