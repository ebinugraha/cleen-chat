interface PageWorkflowProps {
  params: Promise<{ workflowId: string }>;
}

const Page = async ({ params }: PageWorkflowProps) => {
  const { workflowId } = await params;

  return <div>{workflowId}</div>;
};

export default Page;
