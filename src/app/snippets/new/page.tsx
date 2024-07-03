'use client';
// import { db } from "@/db";
// import { redirect } from "next/navigation";
import * as actions from '@/actions';
import { useFormState } from "react-dom";

export default function SippetCreatePage(){
  // async function createSnippet(formData: FormData) {
  //   // This needs to be a server action
  //   'use server';

  //   //Check the user's input and make sure they're valid
  //   const title = formData.get('title') as string;
  //   const code = formData.get('code') as string;

  //   //Create a new record in the database
  //   const snippet = await db.snippet.create({
  //     data: {
  //       title: title,
  //       code: code
  //     }
  //   });
  //   //Redirect the user back to the root route
  //   redirect('/');
  // }

  const [formState, action] = useFormState(actions.createSnippet, {message: ''});

  // return (<form action={createSnippet}>
  return (<form action={action}>
    <h3 className="font-bold m-3">Create a Snippet</h3>
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="w-12" htmlFor="title">
          Title
        </label>
        <input
          name="title"
          className="border rounded p-2 w-full"
          id="title"></input>
      </div>

      <div className="flex gap-4">
        <label className="w-12" htmlFor="code">
          Code
        </label>
        <textarea
          name="code"
          className="border rounded p-2 w-full"
          id="code"></textarea>
      </div>

      <div>
        {formState.message?  <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>{formState.message}</div> : null}
      </div>

      <button 
        type="submit"
        className="rounded p-2 bg-blue-200 border border-blue-400">Create</button>
    </div>
    </form>
  );
}