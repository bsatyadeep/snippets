import Link from "next/link";
import { db } from "@/db";

// export const dynamic = 'force-dynamic';

export default async function Home() {
const snippets = await db.snippet.findMany();

const renderedSnippes = snippets.map((snippet) => {
  return (
    <Link 
      href={`/snippets/${snippet.id}`}
      key={snippet.id} 
      className="flex justify-between items-center p-2 border rounded">
      <div>{snippet.title}</div>
      <div className="border p-1 rounded bg-blue-200 border-blue-400">View</div>
    </Link>
  );
});

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link
          href='/snippets/new'
          className="border p-1 rounded bg-blue-200 border-blue-400">
            New
          </Link>
      </div>
      <div className="flex flex-col gap-2">
      {/* <div className="flex gap-2"> */}
        {renderedSnippes}
      </div>
    </div>
  );
}
