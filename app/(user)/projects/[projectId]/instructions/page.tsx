import CopyBtn from '@/components/copy-btn';
const Page = ({ params }: { params: { projectId: string } }) => {
    if(!params.projectId) return (<div>Invalid Project ID</div>);
    if(!process.env.WIDGET_URL) return (<div>Invalid Widget URL</div>);
    return (
      <div>
        <h1 className="text-xl font-bold mb-2">Start Collecting Feedback</h1>
        <p className="text-lg text-secondary-foreground">Embed the code in your site</p>
        <div className="bg-blue-950 text-white p-6 rounded-md mt-6 relative">
          <code className="text-white">
          {`<my-widget project-id="${params.projectId}"></my-widget>`}
          <br/>

          {`<script src="${process.env.WIDGET_URL}/widget.umd.js"></script>`}
          

          </code>
        
        <CopyBtn text={`<my-widget projects="${params.projectId}"></my-widget>`} />
        </div>
      </div>
    );
  };
  
  export default Page;