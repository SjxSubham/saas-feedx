import CopyButton from "@/components/copy-btn";
import CopyBtn from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ClipboardCopy, CornerUpLeft, Share2 } from "lucide-react";
import Link from "next/link";

const page = ({ params }: { 
  params: { 
    projectId: string 
  } 
}) => {
  
  if (!params.projectId) return <div>Invalid Project ID</div>;
  if (!process.env.WIDGET_URL) return <div>Missing WIDGET_URL</div>;

  const widgetUrl = `https://feed-x-widget.vercel.app/?projectId=${params.projectId}`; // i'M Pass projectId dynamically HERE

  return (
    <div>
      <div className="flex py-4">
        <Link href={`/projects/${params.projectId}`}>
          <Button className="bg-indigo-400 flex items-center mb-2 w-fit hover:bg-indigo-500">
            <CornerUpLeft className="h-5 w-5 mr-1" />
            <span className="text-lg">Return To Project</span>
          </Button>
        </Link>
      </div>

      <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>

      <div className="bg-gray-300 p-6 rounded-md mt-6 relative">
        <h1 className="text-2xl font-semibold font-mono text-secondary-foreground">
          Share the link with Others to Collect Feedback
        </h1>
        <h2 className="text-xl font-mono text-center font-bold py-4 bg-gradient-to-r from-gray-400 via-gray-700 to-gray-950 text-transparent bg-clip-text">
          Your Project-ID: {params.projectId}
        </h2>
        <div className="flex justify-center w-full">
          <Link href={widgetUrl} target="_blank">
            <Button className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% flex items-center mb-3 w-fit">
              <Share2 className="h-5 w-5 mr-1" />
              <span className="text-lg">Share Link</span>
            </Button>
          </Link>
          <CopyBtn text={widgetUrl} />
        </div>
      </div>

      <h3 className="font-extrabold text-gray-400 text-center py-5">---OR---</h3>
      <div className="bg-gray-400 p-6 rounded-md mt-6 relative">
        <p className="text-lg font-semibold font-mono text-secondary-foreground">
          Embed the code in your site
        </p>
        <div className="bg-blue-950 p-6 rounded-md mt-6 relative">
          <code className="text-white">
            {`<my-widget project-id="${params.projectId}"></my-widget>`}
            <br />
            {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
          </code>
          <CopyButton
            text={`<my-widget project-id="${params.projectId}"></my-widget>\n<script src="${process.env.WIDGET_URL}/dist/widget.umd.js"></script>`}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
