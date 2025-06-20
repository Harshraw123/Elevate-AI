'use client'

import React, { useEffect, useState } from 'react'
import {
  Lightbulb,
  FileText,
  MessageCircle,
  Map,
  FileSignature,
  Loader2,
} from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from 'next/navigation'

// 🌈 Assign colorful icon backgrounds
const iconStyles = {
  'AI Career Q&A Chat': 'bg-purple-600 text-white',
  'AI Resume Analyzer': 'bg-yellow-500 text-white',
  'Learning Roadmap': 'bg-green-500 text-white',
  'Cover Letter Generator': 'bg-pink-500 text-white',
}

const agentTypeToIcon = {
  'AI Career Q&A Chat': MessageCircle,
  'AI Resume Analyzer': FileText,
  'Learning Roadmap': Map,
  'Cover Letter Generator': FileSignature,
}

const agentTypeToLabel = {
  'AI Career Q&A Chat': 'AI Chat',
  'AI Resume Analyzer': 'Resume',
  'Learning Roadmap': 'Roadmap',
  'Cover Letter Generator': 'Cover Letter',
}

const agentTypeToRoute = {
  'AI Career Q&A Chat': '/ai-tools/ai-chat/',
  'AI Resume Analyzer': '/ai-tools/ai-resume-analyzer/',
  'Learning Roadmap': '/ai-tools/ai-roadmap-agent/',
  'Cover Letter Generator': '/ai-tools/ai-cover-letter-generator/',
}

interface HistoryItem {
  id?: number
  recordId: string
  content: any
  userEmail: string
  createdAt?: string
  metaData?: any
  aiAgentType: keyof typeof agentTypeToIcon
}

const History: React.FC = () => {
  const { user } = useUser()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)
        const res = await axios.get('/api/history')
        setHistory(res.data || [])
      } catch (err) {
        console.error('Error fetching history:', err)
        setHistory([])
      } finally {
        setLoading(false)
      }
    }
    if (user) fetchHistory()
  }, [user])

  const handleClick = (item: HistoryItem) => {
    const route = agentTypeToRoute[item.aiAgentType]
    if (route && item.recordId) {
      router.push(route + item.recordId)
    }
  }

  return (
    <div id="history" className="max-w-7xl mx-auto my-12 px-6 py-8 rounded-xl">
      <h2 className="text-4xl font-bold text-white mb-3">History</h2>
      <p className="text-gray-400 mb-6 text-lg">Here's what you've worked on recently.</p>

      {loading ? (
        <div className="flex justify-center items-center py-20 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-sky-500" />
          <span className="text-white">Loading...</span>
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 border border-dashed border-gray-700 rounded-lg bg-slate-900 shadow-inner shadow-sky-600/10">
          <Lightbulb className="w-12 h-12 text-yellow-400 mb-4" />
          <p className="text-lg font-medium text-gray-300 mb-2">You have no history yet</p>
          <button className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-full shadow-md transition">
            Get Started
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {history.map((item, index) => {
            const Icon = agentTypeToIcon[item.aiAgentType] || Lightbulb
            const iconBg = iconStyles[item.aiAgentType] || 'bg-gray-700 text-white'
            const title = agentTypeToLabel[item.aiAgentType] || 'Unknown'

            let description = ''
            if (typeof item.content === 'string') {
              description = item.content.slice(0, 100)
            } else if (Array.isArray(item.content) && item.content.length > 0) {
              description = item.content[0]?.text?.slice(0, 100) || ''
            } else if (item.content && typeof item.content === 'object') {
              description = JSON.stringify(item.content).slice(0, 100)
            }

            const date = item.createdAt
              ? new Date(item.createdAt).toLocaleString()
              : ''

            return (
              <div
                key={item.id || index}
                onClick={() => handleClick(item)}
                className="cursor-pointer bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-5 transition-all hover:border-blue-500 hover:shadow-[0_0_20px_rgba(0,185,255,0.2)] hover:scale-[1.02] flex flex-col gap-3 shadow-sky-800/20"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{title}</h3>
                </div>
                <p className="text-sm text-gray-300 truncate">
                  {description || 'No description available.'}
                </p>
                <span className="text-xs text-gray-500 mt-auto">{date}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default History

