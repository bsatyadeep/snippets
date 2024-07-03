'use client';
import type { Snippet } from "@prisma/client";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
// import { editSnippet } from "@/actions";

import * as actions from "@/actions"; 
import { title } from "process";

interface SnippetEditFormProps {
  snippet: Snippet
}


export default function SnippetEditForm({snippet}: SnippetEditFormProps){

  const [code, setCode] = useState(snippet.code);
  const [title, setTitle] = useState(snippet.title);

  // const [code, setCode] = useState('');

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  }

  const handleTitleChange = (value: string = '') => {
    setTitle(value);
  }

  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code, title);

  return (<form action={editSnippetAction}>
  <div>
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
            value={title}
            onChange={(e)=> handleTitleChange(e.target.value)}></input>
        </div>
        <div className="flex gap-4">
        <label className="w-12" htmlFor="code">
          Code
        </label>
        <Editor
            height='40vh'
            theme="vs-dark"
            language="javascript"
            defaultValue={snippet.code}
            options={{minimap: { enabled: false}}}
            onChange={handleEditorChange}>
          </Editor>
        </div>
        <button 
        type="submit"
        className="rounded p-2 bg-blue-200 border border-blue-400">
          Update
        </button>
    </div>

    
      
  </div>
  </form>);
}