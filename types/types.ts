import { Prisma } from "@/generated/prisma/client";

export type ProjectWithMilestones = Prisma.ProjectGetPayload<{
  include: {
    milestones: true;
  };
}>;
