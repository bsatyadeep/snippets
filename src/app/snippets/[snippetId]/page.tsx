import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import * as actions from '@/actions';

interface SnippetShowProps {
  params: {
    snippetId: string
  }
}
export default async function SnippetShowPage(props: SnippetShowProps){
// await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.snippetId)
    }
  });

  if(!snippet){
    return notFound();
  }
  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (<div>
    <div className="flex m-4 justify-between items-center">
      <h1 className="text-xl font-bold">
        {snippet.title}
      </h1>
      <div className="flex gap-2">
        <Link 
          key={snippet.id}
          href={`/snippets/${snippet.id}/edit`}
          className="p-2 border rounded bg-blue-200 border-blue-400">Edit</Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded bg-red-200 border-red-400">Delete</button>
          </form>
      </div>
    </div>
    <pre className="p-3 border rounded bg-gray-200 border-gray-400">
      <code>
        {snippet.code}
      </code>
    </pre>
  </div>);
}

// export async function generateStaticParams(){
//   const snippets = await db.snippet.findMany();

//   return snippets.map((snippet) =>{
//     return {
//       snippetId: snippet.id.toString()
//     };
//   });
// }