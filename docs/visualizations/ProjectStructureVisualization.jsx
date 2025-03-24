import React, { useState } from 'react';

const ProjectVisualization = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedModule, setExpandedModule] = useState('MOD-001');

  // Project data
  const modules = [
    {
      id: 'MOD-001',
      name: 'Core System',
      status: 'active',
      description: 'Core framework functionality including context, state management, and types',
      functionalities: [
        {
          id: 'FUNC-001',
          name: 'Block System Context',
          status: 'active',
          description: 'Core context provider for the block system',
          artifacts: [
            {
              id: 'ART-002',
              name: 'context.tsx',
              status: 'active',
              location: 'src/lib/block-system/context.tsx'
            }
          ]
        },
        {
          id: 'FUNC-002',
          name: 'Block System Provider',
          status: 'planned',
          description: 'React provider component with state management',
          artifacts: []
        },
        {
          id: 'FUNC-003',
          name: 'Type Definitions',
          status: 'active',
          description: 'TypeScript interfaces for the system',
          artifacts: [
            {
              id: 'ART-001',
              name: 'types.ts',
              status: 'active',
              location: 'src/lib/block-system/types.ts'
            }
          ]
        },
        {
          id: 'FUNC-004',
          name: 'Validation Schemas',
          status: 'planned',
          description: 'Zod schemas for validation',
          artifacts: []
        },
        {
          id: 'FUNC-005',
          name: 'Block System Hooks',
          status: 'planned',
          description: 'React hooks for accessing block system functionality',
          artifacts: []
        }
      ]
    },
    {
      id: 'MOD-002',
      name: 'LLM Integration',
      status: 'planned',
      description: 'Integration with LLMs using Vercel AI SDK and response parsing',
      functionalities: []
    },
    {
      id: 'MOD-003',
      name: 'Rendering System',
      status: 'planned',
      description: 'Components for rendering blocks and explanations',
      functionalities: []
    },
    {
      id: 'MOD-004',
      name: 'Explanation System',
      status: 'planned',
      description: 'Provides transparency and explanations for LLM decisions',
      functionalities: []
    }
  ];

  // Initiatives
  const initiatives = [
    {
      id: 'INIT-001',
      name: 'MVP Development',
      status: 'active',
      description: 'Develop core framework with basic block referencing capabilities for initial release'
    },
    {
      id: 'INIT-002',
      name: 'Advanced Features',
      status: 'planned',
      description: 'Develop hierarchical blocks and advanced functionality for future iterations'
    }
  ];

  // Documents
  const documents = [
    {
      id: 'DOC-001',
      title: 'Vision Document',
      type: 'vision',
      status: 'active',
      location: 'docs/vision-document.md'
    },
    {
      id: 'DOC-002',
      title: 'Technical Design',
      type: 'design',
      status: 'active',
      location: 'docs/technical-design.md'
    },
    {
      id: 'DOC-003',
      title: 'Implementation Plan',
      type: 'plan',
      status: 'active',
      location: 'docs/implementation-plan.md'
    },
    {
      id: 'DOC-004',
      title: 'GitHub Issues',
      type: 'reference',
      status: 'active',
      location: 'docs/github-issues.md'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-emerald-500' : 'bg-amber-400';
  };

  const getHoverEffectClasses = (id) => {
    return hoveredItem === id ? 'ring-2 ring-blue-500 shadow-lg' : '';
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'vision': return 'bg-purple-100 text-purple-800';
      case 'design': return 'bg-blue-100 text-blue-800';
      case 'plan': return 'bg-green-100 text-green-800';
      case 'reference': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">LLM-Block-System Architecture</h1>
      
      {/* Introduction */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Project Introduction</h2>
        <p className="text-gray-700 mb-2">
          LLM-Block-System is a NextJS toolkit that enables LLM-driven content experiences by leveraging reusable content blocks. 
          It bridges large language models and component-based web applications, enabling AI to understand, generate, and explain 
          web content while respecting component architecture.
        </p>
        <p className="text-gray-700">
          The system follows a modular architecture with a focus on component-based design, allowing developers to send content 
          requirements to LLMs and receive structured block definitions that can be rendered within React applications.
        </p>
      </div>
      
      {/* Architecture Overview */}
      <div className="mb-10">
        <div className="flex justify-between items-start mb-6">
          <div className="w-full">
            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Initiatives</h3>
                  <div className="space-y-2">
                    {initiatives.map(initiative => (
                      <div 
                        key={initiative.id}
                        className={`p-3 bg-white rounded-md border border-gray-200 ${getHoverEffectClasses(initiative.id)}`}
                        onMouseEnter={() => setHoveredItem(initiative.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(initiative.status)}`}></div>
                          <span className="font-medium">{initiative.name}</span>
                          <span className="text-xs text-gray-500 ml-2">({initiative.id})</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{initiative.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-medium text-purple-800 mb-2">Documentation</h3>
                  <div className="space-y-2">
                    {documents.map(doc => (
                      <div 
                        key={doc.id}
                        className={`p-3 bg-white rounded-md border border-gray-200 ${getHoverEffectClasses(doc.id)}`}
                        onMouseEnter={() => setHoveredItem(doc.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-medium">{doc.title}</span>
                            <span className="text-xs text-gray-500 ml-2">({doc.id})</span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(doc.type)}`}>
                            {doc.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{doc.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div className="flex space-x-2 mb-4">
        {modules.map(module => (
          <button 
            key={module.id}
            className={`px-4 py-2 rounded-t-lg font-medium text-sm ${
              expandedModule === module.id 
                ? 'bg-gray-100 border-t border-l border-r border-gray-300' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setExpandedModule(module.id)}
          >
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(module.status)}`}></div>
              {module.name}
            </div>
          </button>
        ))}
      </div>

      {/* Module Details */}
      {modules.map(module => (
        <div 
          key={module.id}
          className={`${expandedModule === module.id ? 'block' : 'hidden'} bg-gray-100 rounded-b-lg rounded-tr-lg p-6 border border-gray-300`}
        >
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold">{module.name}</h2>
            <span className="text-sm text-gray-500 ml-2">({module.id})</span>
            <div className={`ml-3 px-2 py-1 text-xs rounded-full text-white ${getStatusColor(module.status)}`}>
              {module.status}
            </div>
          </div>
          
          <p className="text-gray-700 mb-6">{module.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {module.functionalities.map(functionality => (
              <div 
                key={functionality.id}
                className={`bg-white p-4 rounded-lg border border-gray-200 ${getHoverEffectClasses(functionality.id)}`}
                onMouseEnter={() => setHoveredItem(functionality.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(functionality.status)}`}></div>
                  <h3 className="font-medium">{functionality.name}</h3>
                </div>
                <div className="text-xs text-gray-500 mb-2">{functionality.id}</div>
                <p className="text-sm text-gray-600 mb-3">{functionality.description}</p>
                
                {functionality.artifacts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Artifacts</h4>
                    <div className="space-y-2">
                      {functionality.artifacts.map(artifact => (
                        <div 
                          key={artifact.id}
                          className={`flex items-center p-2 bg-gray-50 rounded border border-gray-200 text-sm ${getHoverEffectClasses(artifact.id)}`}
                          onMouseEnter={() => setHoveredItem(artifact.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(artifact.status)}`}></div>
                          <div>
                            <div className="font-medium">{artifact.name}</div>
                            <div className="text-xs text-gray-500">{artifact.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {module.functionalities.length === 0 && (
              <div className="col-span-full text-center p-6 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500">No functionalities defined yet for this planned module.</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="mt-8 bg-white p-4 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
            <span className="text-sm text-gray-600">Active</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-400 mr-2"></div>
            <span className="text-sm text-gray-600">Planned</span>
          </div>
          <div className="flex items-center">
            <div className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 mr-2">Vision</div>
            <span className="text-sm text-gray-600">Document Type</span>
          </div>
        </div>
      </div>

      {/* Project Structure */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Dependency Structure</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-lg border border-blue-200 text-center w-60 mb-4">
              <span className="font-medium">Core System (MOD-001)</span>
              <div className="text-xs text-blue-700 mt-1">Active</div>
            </div>
            
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="transform rotate-180">
              <svg height="24" width="24" viewBox="0 0 24 24" className="text-gray-400">
                <path fill="currentColor" d="M12 6v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            
            <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200 text-center w-60 mb-4">
              <span className="font-medium">LLM Integration (MOD-002)</span>
              <div className="text-xs text-yellow-700 mt-1">Planned</div>
            </div>
            
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="transform rotate-180">
              <svg height="24" width="24" viewBox="0 0 24 24" className="text-gray-400">
                <path fill="currentColor" d="M12 6v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            
            <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200 text-center w-60 mb-4">
              <span className="font-medium">Rendering System (MOD-003)</span>
              <div className="text-xs text-yellow-700 mt-1">Planned</div>
            </div>
            
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="transform rotate-180">
              <svg height="24" width="24" viewBox="0 0 24 24" className="text-gray-400">
                <path fill="currentColor" d="M12 6v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            
            <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200 text-center w-60">
              <span className="font-medium">Explanation System (MOD-004)</span>
              <div className="text-xs text-yellow-700 mt-1">Planned</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectVisualization;