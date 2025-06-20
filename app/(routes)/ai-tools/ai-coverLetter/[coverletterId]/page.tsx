'use client'

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import jsPDF from 'jspdf';
import { Loader } from 'lucide-react';
import axios from 'axios';

const CoverLetterPage = () => {
  const params = useParams();
  const { coverletterId } = params as { coverletterId: string };
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const editableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCoverLetter = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`/api/history?chatid=${coverletterId}`);
        const result = res.data;

        if (!Array.isArray(result) || result.length === 0) {
          throw new Error('No cover letter found.');
        }

        const contentData = result[0]?.content;

        if (typeof contentData === 'string') {
          setContent(contentData);
        } else if (typeof contentData === 'object') {
          // Format object content as text
          setContent(JSON.stringify(contentData, null, 2));
        } else {
          setContent('Unsupported content format.');
        }

      } catch (err: any) {
        console.error('Error fetching cover letter:', err);
        setError(err.message || 'Error fetching cover letter');
      } finally {
        setLoading(false);
      }
    };

    if (coverletterId) fetchCoverLetter();
  }, [coverletterId]);

  const handleDownload = () => {
    const text = editableRef.current?.innerText || content;
    const file = new Blob([text], { type: 'text/plain' });
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'cover-letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const text = editableRef.current?.innerText || content;
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 10);
    doc.save('cover-letter.pdf');
  };

  return (
    <div className="max-w-2xl mx-auto mt-5 p-8 bg-white rounded-lg shadow-lg shadow-slate-800 text-black">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Your Cover Letter</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Download as TXT
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Download as PDF
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12 text-gray-500">
          <Loader className="animate-spin w-6 h-6 mr-2" />
          Loading cover letter...
        </div>
      ) : error ? (
        <div className="text-red-600 font-semibold">{error}</div>
      ) : (
        <div
          ref={editableRef}
          contentEditable
          suppressContentEditableWarning
          className="prose prose-lg min-h-[300px] border border-gray-200 rounded p-4 focus:outline-blue-400 whitespace-pre-wrap bg-gray-50"
          style={{ outline: 'none' }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default CoverLetterPage;
