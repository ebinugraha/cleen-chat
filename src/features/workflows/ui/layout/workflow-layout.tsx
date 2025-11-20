import { EntityContainer } from "@/components/entity";
import {
  WorkflowSearch,
  WorkflowsHeader,
  WorkflowsPagination,
} from "../components/workflow-list";

export const WorkflowsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  );
};
