'use server';

import { db } from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function editSnippet(id: number, code: string, title: string) {
  await db.snippet.update({
    where: {
      id: id
    },
    data: {
      code: code,
      title: title
    }
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id:number) {
  await db.snippet.delete({
    where: {
      id: id
    }
  });

  revalidatePath('/');
  redirect('/');
}

export async function createSnippet(
  formState: { message: string}, 
  formData: FormData) {
  // return {
  //   message: 'Title must be longer'
  // };

    //Check the user's input and make sure they're valid
    const title = formData.get('title');
    const code = formData.get('code');

    if(typeof title !== 'string' || title.length < 3){
      return {
        message: 'Title must be longer'
      };
    }

    if(typeof code !== 'string' || code.length < 10){
      return {
        message: 'Code must be longer'
      };
    }

    try{
    //Create a new record in the database
    await db.snippet.create({
      data: {
        title: title,
        code: code
      }
    });

    throw new Error('Failed to save to database');
  }catch(err: unknown){
    if(err instanceof Error){
      return {
        message: err.message
      };
    }else{
      return {
        message: 'Something went wrong'
      };
    }
  }

  //Redirect the user back to the root route
  revalidatePath('/');
  redirect('/');
}