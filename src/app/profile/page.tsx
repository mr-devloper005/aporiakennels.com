import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("profile", {
    path: "/profile",
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  });

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolved = await searchParams;
  return <TaskListPage task="profile" category={resolved?.category} />;
}
