interface PageExecutionProps {
  params: Promise<{ executionId: string }>;
}

const Page = async ({ params }: PageExecutionProps) => {
  const { executionId } = await params;

  return <div>{executionId}</div>;
};

export default Page;
