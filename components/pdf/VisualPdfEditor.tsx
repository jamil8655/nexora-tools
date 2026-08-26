'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Type,
  PenTool,
  Highlighter,
  Square,
  Circle,
  CheckSquare,
  Stamp,
  Download,
  RotateCw,
  Undo2,
  Trash2,
  FileUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { downloadSingleFile } from '@/lib/utils/download';

type EditorTool = 'select' | 'text' | 'draw' | 'highlight' | 'rectangle' | 'circle' | 'signature' | 'stamp';

interface AnnotationItem {
  id: string;
  type: EditorTool;
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
  color?: string;
  size?: number;
  points?: { x: number; y: number }[];
}

export function VisualPdfEditor() {
  const [activeTool, setActiveTool] = useState<EditorTool>('text');
  const [selectedColor, setSelectedColor] = useState<string>('#026fc7');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [textInput, setTextInput] = useState<string>('Sample Text');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Redraw canvas whenever annotations change
  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw page background (white paper simulation)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw document grid/page outline
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw simulated page lines or placeholder content
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(40, 40, canvas.width - 80, 40);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(`DocuOmni PDF Document - Page ${currentPage}`, 50, 65);

    // Render all user annotations
    annotations.forEach((item) => {
      ctx.save();
      if (item.type === 'draw' && item.points && item.points.length > 1) {
        ctx.strokeStyle = item.color || '#000000';
        ctx.lineWidth = item.size || 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(item.points[0].x, item.points[0].y);
        for (let i = 1; i < item.points.length; i++) {
          ctx.lineTo(item.points[i].x, item.points[i].y);
        }
        ctx.stroke();
      } else if (item.type === 'highlight' && item.points && item.points.length > 1) {
        ctx.strokeStyle = item.color || '#fef08a';
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 18;
        ctx.lineCap = 'square';
        ctx.beginPath();
        ctx.moveTo(item.points[0].x, item.points[0].y);
        for (let i = 1; i < item.points.length; i++) {
          ctx.lineTo(item.points[i].x, item.points[i].y);
        }
        ctx.stroke();
      } else if (item.type === 'text') {
        ctx.fillStyle = item.color || '#000000';
        ctx.font = `bold ${item.size || 16}px sans-serif`;
        ctx.fillText(item.text || '', item.x, item.y);
      } else if (item.type === 'rectangle') {
        ctx.strokeStyle = item.color || '#000000';
        ctx.lineWidth = item.size || 2;
        ctx.strokeRect(item.x, item.y, item.width || 100, item.height || 60);
      } else if (item.type === 'circle') {
        ctx.strokeStyle = item.color || '#000000';
        ctx.lineWidth = item.size || 2;
        ctx.beginPath();
        ctx.arc(item.x, item.y, (item.width || 80) / 2, 0, Math.PI * 2);
        ctx.stroke();
      } else if (item.type === 'stamp') {
        ctx.strokeStyle = item.color || '#dc2626';
        ctx.lineWidth = 3;
        ctx.strokeRect(item.x - 60, item.y - 25, 120, 50);
        ctx.fillStyle = item.color || '#dc2626';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.text || 'APPROVED', item.x, item.y + 6);
      }
      ctx.restore();
    });

    // Render live drawing line
    if (isDrawing && currentPath.length > 1) {
      ctx.save();
      if (activeTool === 'highlight') {
        ctx.strokeStyle = selectedColor;
        ctx.globalAlpha = 0.45;
        ctx.lineWidth = 18;
      } else {
        ctx.strokeStyle = selectedColor;
        ctx.lineWidth = brushSize;
      }
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(currentPath[0].x, currentPath[0].y);
      for (let i = 1; i < currentPath.length; i++) {
        ctx.lineTo(currentPath[i].x, currentPath[i].y);
      }
      ctx.stroke();
      ctx.restore();
    }
  };

  useEffect(() => {
    redrawCanvas();
  }, [annotations, isDrawing, currentPath, currentPage]);

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (activeTool === 'draw' || activeTool === 'highlight') {
      setIsDrawing(true);
      setCurrentPath([{ x, y }]);
    } else if (activeTool === 'text') {
      setAnnotations((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: 'text',
          x,
          y,
          text: textInput,
          color: selectedColor,
          size: brushSize * 5 + 10,
        },
      ]);
    } else if (activeTool === 'rectangle') {
      setAnnotations((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'rectangle', x, y, width: 120, height: 70, color: selectedColor, size: brushSize },
      ]);
    } else if (activeTool === 'circle') {
      setAnnotations((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'circle', x, y, width: 80, height: 80, color: selectedColor, size: brushSize },
      ]);
    } else if (activeTool === 'stamp') {
      setAnnotations((prev) => [
        ...prev,
        { id: Math.random().toString(), type: 'stamp', x, y, text: 'APPROVED', color: '#16a34a' },
      ]);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing && currentPath.length > 0) {
      setAnnotations((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          type: activeTool,
          x: currentPath[0].x,
          y: currentPath[0].y,
          points: currentPath,
          color: selectedColor,
          size: brushSize,
        },
      ]);
    }
    setIsDrawing(false);
    setCurrentPath([]);
  };

  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (blob) downloadSingleFile(blob, `edited-document-page-${currentPage}.png`);
    });
  };

  return (
    <div className="space-y-6">
      {/* Editor Top Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shadow-xl">
        {/* Tools */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'text', icon: Type, label: 'Text' },
            { id: 'draw', icon: PenTool, label: 'Draw' },
            { id: 'highlight', icon: Highlighter, label: 'Highlight' },
            { id: 'rectangle', icon: Square, label: 'Rectangle' },
            { id: 'circle', icon: Circle, label: 'Circle' },
            { id: 'stamp', icon: Stamp, label: 'Stamp' },
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveTool(tool.id as EditorTool)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tool.label}</span>
              </button>
            );
          })}
        </div>

        {/* Color Palette & Brush Size */}
        <div className="flex items-center gap-3">
          {activeTool === 'text' && (
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Text to insert..."
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white"
            />
          )}

          <div className="flex items-center gap-1">
            {['#026fc7', '#dc2626', '#16a34a', '#eab308', '#000000'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedColor(c)}
                className={`w-5 h-5 rounded-full border-2 transition-transform ${
                  selectedColor === c ? 'scale-125 border-white' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setAnnotations((prev) => prev.slice(0, -1))}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setAnnotations([])}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-300 hover:text-rose-300"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive PDF Canvas Viewer */}
      <div className="relative p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center overflow-x-auto">
        <canvas
          ref={canvasRef}
          width={650}
          height={850}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          className="rounded-lg shadow-2xl bg-white cursor-crosshair max-w-full"
        />

        {/* Page Nav */}
        <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleExport}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-brand-500/25 flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Save & Export Annotated Document</span>
        </button>
      </div>
    </div>
  );
}
