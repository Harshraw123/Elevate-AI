'use client';

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from '../_components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface RoadmapNodeData {
  title: string;
  description: string;
  duration?: string;
  status?: string;
  link?: string;
  [key: string]: unknown;
}

interface RoadmapNode extends Node {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: RoadmapNodeData;
}

interface RoadmapEdge extends Edge {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
}

interface RoadmapData {
  roadmapTitle: string;
  description: string;
  duration: string;
  initialNodes: RoadmapNode[];
  initialEdges: RoadmapEdge[];
}

const proOptions = { hideAttribution: true };

const Page = () => {
  const { roadmapId } = useParams();
  const [roadmapDetails, setRoadmapDetails] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<RoadmapNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<RoadmapEdge>([]);

  const GetRoadmapDetails = useCallback(async () => {
    if (!roadmapId) {
      setError("Roadmap ID is not present");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/history?chatid=${roadmapId}`);
      if (response.status === 200 && response.data?.[0]?.content) {
        const data = response.data[0].content;
        
        // Validate required data structure
        if (!data.initialNodes || !Array.isArray(data.initialNodes)) {
          throw new Error('Invalid roadmap data structure');
        }
        
        // Transform the API response into nodes and edges
        const transformedNodes: RoadmapNode[] = data.initialNodes.map((node: any, index: number) => ({
          id: node.id || `node-${index}`,
          type: 'custom',
          position: node.position || { x: index * 300, y: Math.floor(index / 3) * 200 },
          data: {
            title: node.title || node.data?.title || 'Untitled',
            description: node.description || node.data?.description || '',
            duration: node.duration || node.data?.duration,
            status: node.status || node.data?.status,
            link: node.link || node.data?.link,
          },
        }));

        const transformedEdges: RoadmapEdge[] = (data.initialEdges || []).map((edge: any, index: number) => ({
          id: edge.id || `edge-${index}`,
          source: edge.source,
          target: edge.target,
          animated: edge.animated || false,
          type: 'smoothstep',
        }));

        setRoadmapDetails(data);
        setNodes(transformedNodes);
        setEdges(transformedEdges);
      } else {
        throw new Error('No roadmap data found');
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      const errorMessage = axios.isAxiosError(error) 
        ? `Failed to load roadmap: ${error.response?.status === 404 ? 'Roadmap not found' : 'Server error'}`
        : 'Failed to load roadmap. Please try again later.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [roadmapId]);

  useEffect(() => {
    GetRoadmapDetails();
  }, [GetRoadmapDetails]);

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading roadmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <svg className="mx-auto h-12 w-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Roadmap</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={GetRoadmapDetails}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!roadmapDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">No roadmap data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-80 flex-shrink-0 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 h-full overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              {roadmapDetails.roadmapTitle}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {roadmapDetails.description}
            </p>
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Duration
            </h3>
            <p className="text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              {roadmapDetails.duration}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: List of nodes as colorful cards, normal vertical scroll */}
      <div className="block md:hidden p-4 bg-gray-50 overflow-y-auto">
        <div className="flex flex-col space-y-6 w-full max-w-md mx-auto">
          {roadmapDetails?.initialNodes?.map((node, idx) => {
            let bgColor = "from-orange-400 to-red-600";
            if (typeof node.data?.bgColor === 'string') bgColor = node.data.bgColor;
            return (
              <React.Fragment key={node.id || idx}>
                <div className={`bg-gradient-to-br ${bgColor} border border-gray-200 rounded-lg p-4 shadow-lg w-full transition-all hover:shadow-xl`}>
                  <div className="space-y-3">
                    <h3 className="font-semibold text-base text-white bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                      {node.data?.title}
                    </h3>
                    <p className="text-sm text-gray-100 line-clamp-3">{node.data?.description}</p>
                    { node.data?.duration && (
                      <div className="flex items-center text-xs text-gray-200">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {node.data?.duration}
                      </div>
                    )}
                    { node.data?.status && (
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${ node.data?.status === 'completed' ? 'bg-green-500 text-white' :
                            node.data?.status === 'in-progress' ? 'bg-blue-500 text-white' :
                            'bg-gray-500 text-white'}`}
                        >
                          {node.data?.status}
                        </span>
                      </div>
                    )}
                    { node.data?.link && (
                      <a
                        href={node.data?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm font-medium text-yellow-100 hover:text-yellow-300 transition-colors"
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                {/* Glowing connector line, except after last card */}
                {idx < roadmapDetails.initialNodes.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-1 h-8 bg-yellow-400 rounded-full shadow-[0_0_10px_2px_rgba(250,204,21,0.7)] animate-pulse"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Desktop: React Flow Canvas */}
      <div className="hidden lg:block flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          proOptions={proOptions}
          className="bg-gray-50"
        >
          <Background 
            color="#e5e7eb" 
            gap={20}
            size={1}
          />
          <MiniMap 
            nodeStrokeWidth={3}
            zoomable
            pannable
            className="bg-white border border-gray-200 rounded-lg"
            nodeColor="#f3f4f6"
            maskColor="rgba(0, 0, 0, 0.1)"
          />
          <Controls 
            showInteractive={false}
            className="bg-white border border-gray-200 rounded-lg shadow-sm"
          />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Page;