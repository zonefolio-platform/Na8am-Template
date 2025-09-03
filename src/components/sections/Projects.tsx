import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
  
type Project = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
};

type ProjectsProps = {
  data?: Project[];
};

export default function Projects({ data }: ProjectsProps) {
  if (!data?.length) return null;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Featured Project */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 w-full lg:max-w-2xl space-y-8">
            <div className="space-y-6">
              <span className="text-sm uppercase tracking-wider text-gray-500 bg-white px-4 py-1 rounded-full inline-block shadow-sm">
                Featured Project
              </span>

              <h2 className="text-4xl sm:text-5xl font-semibold text-gray-900 leading-tight">
                {data[0].name}
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                {data[0].description}
              </p>

              {data[0].technologies && (
                <div className="flex flex-wrap gap-2">
                  {data[0].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 pt-4">
                {data[0].liveUrl && (
                  <a
                    href={data[0].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    View Live
                  </a>
                )}
                {data[0].githubUrl && (
                  <a
                    href={data[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-400 rounded-lg transition-colors"
                  >
                    View Code →
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 w-full lg:max-w-xl">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
              {data[0].image ? (
                <Image
                  src={data[0].image}
                  alt={data[0].name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg
                    className="w-16 h-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </motion.article>

        {/* Other Projects Grid */}
        {data.length > 1 && (
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-semibold text-gray-900"
            >
              Other Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {data.slice(1).map((project, index) => (
                <motion.article
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-transform"
                >
                  {/* Project Image */}
                  <figure className="relative w-full aspect-[16/9]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </figure>

                  {/* Project Content */}
                  <div className="flex flex-col flex-grow p-6 space-y-4">
                    <header>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.name}
                      </h3>
                    </header>

                    <p className="text-gray-600 line-clamp-2 flex-grow">
                      {project.description}
                    </p>

                    {project.technologies && (
                      <footer className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <nav className="flex items-center gap-4 pt-2">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <span>View Live</span>
                              <span className="ml-1">→</span>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <span>Code</span>
                              <span className="ml-1">→</span>
                            </a>
                          )}
                        </nav>
                      </footer>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
