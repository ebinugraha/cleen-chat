interface PageCredentialProps {
  params: Promise<{ credentialId: string }>;
}

const Page = async ({ params }: PageCredentialProps) => {
  const { credentialId } = await params;

  return <div>{credentialId}</div>;
};

export default Page;
