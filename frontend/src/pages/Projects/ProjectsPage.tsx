import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollProgress } from '../../components/ui/ScrollProgress';
import { ProjectsHeroSection } from './sections/ProjectsHeroSection';
import { ProjectsGridSection } from './sections/ProjectsGridSection';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <ScrollProgress />
      <Helmet>
        <title>Completed Solar & Battery Installations | Sunny Solar</title>
        <meta
          name="description"
          content="View real residential solar and battery installations across Gold Coast, australia and Sunshine Coast with verified specs and photos."
        />
      </Helmet>
      <ProjectsHeroSection />
      <ProjectsGridSection />
    </div>
  );
};

export default ProjectsPage;
