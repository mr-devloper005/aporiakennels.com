import { TaskListPage } from "@/components/tasks/task-list-page";
import { buildTaskMetadata } from "@/lib/seo";
import { taskPageMetadata } from "@/config/site.content";

export const revalidate = 3;

export const generateMetadata = () =>
  buildTaskMetadata("image", {
    path: "/images",
    title: taskPageMetadata.image.title,
    description: taskPageMetadata.image.description,
  });

export default async function ImageSharingPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const resolved = await searchParams;
  return <TaskListPage task="image" category={resolved?.category} />;
}
