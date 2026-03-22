/* NEW FILE: src/app/[locale]/projects/[slug]/page.tsx */
import { notFound } from 'next/navigation';
import { fetchProjectBySlug } from '@/lib/cms';
import ProjectPageClient from '@/components/ProjectPageClient';

export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  
  // Fetch the specific project
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Pass it to the interactive client component
  return <ProjectPageClient project={project} />;
}