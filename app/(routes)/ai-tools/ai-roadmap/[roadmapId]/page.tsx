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
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from '../_components/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

interface RoadmapNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    title: string;
    description: string;
    duration?: string;
    status?: string;
    link?: string;
  };
}

interface RoadmapEdge {
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

  useEffect(() => {
    if (roadmapId) {
      GetRoadmapDetails();
    }
  }, [roadmapId]);

  const GetRoadmapDetails = async () => {
    if (!roadmapId) {
      setError("Roadmap ID is not present");
      return;
    }

    setIsLoading(true);
    setError(null);
  

    try {
      const response = await axios.get(`/api/history?chatid=${roadmapId}`);
      if (response.status === 200) {
        const data = response.data[0].content;
        
        // Transform the API response into nodes and edges
        const transformedNodes = data.initialNodes.map((node: any, index: number) => ({
          id: node.id || `node-${index}`,
          type: 'custom',
          position: node.position || { x: index * 250, y: index * 100 },
          data: {
            title: node.title || node.data?.title || 'Untitled',
            description: node.description || node.data?.description || '',
            duration: node.duration || node.data?.duration,
            status: node.status || node.data?.status,
            link: node.link || node.data?.link,
          },
        }));

        const transformedEdges = data.initialEdges.map((edge: any, index: number) => ({
          id: edge.id || `edge-${index}`,
          source: edge.source,
          target: edge.target,
          animated: edge.animated || false,
        }));

        setRoadmapDetails(data);
        setNodes(transformedNodes);
        setEdges(transformedEdges);
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      setError("Failed to load roadmap. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={GetRoadmapDetails}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
      {/* Sidebar */}
      <div className="p-6 overflow-auto border-r border-gray-300 bg-white">
        <h2 className="font-bold text-2xl text-black">{roadmapDetails?.roadmapTitle}</h2>
        <p className="mt-3 text-black">{roadmapDetails?.description}</p>
        <h3 className="mt-4 font-semibold text-black">Duration:</h3>
        <p className="text-black">{roadmapDetails?.duration}</p>
      </div>

      {/* React Flow Canvas */}
      <div className="md:col-span-2 h-full bg-gray-50">
        <ReactFlow
 
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          proOptions={proOptions}
         
        >
          <Background color="#aaa" gap={16} />
          <MiniMap 
            nodeStrokeWidth={3}
            zoomable
            pannable
          />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
};

export default Page;
