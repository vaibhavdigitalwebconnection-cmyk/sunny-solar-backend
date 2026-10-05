import React, { useState } from 'react';
import {
  Sparkles,
  X,
  ClipboardPaste,
  Eye,
  Edit3,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { extractDocumentMetadata, processClipboardData } from './pasteDetector';

interface SmartImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (
    data: { title: string; excerpt: string; contentHtml: string },
    autoFillAll: boolean
  ) => void;
  entityName?: string; // 'Blog Article' | 'Knowledge Guide'
}

export const SmartImportModal: React.FC<SmartImportModalProps> = ({
  isOpen,
  onClose,
  onApply,
  entityName = 'Article'
}) => {
  const [inputText, setInputText] = useState('');
  const [activeView, setActiveView] = useState<'edit' | 'preview'>('edit');
  const [pasteError, setPasteError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isHtml = /<[a-z][\s\S]*>/i.test(inputText);
  const metadata = extractDocumentMetadata(inputText);

  const handleClipboardRead = async () => {
    setPasteError(null);
    try {
      if (navigator.clipboard?.read) {
        const items = await navigator.clipboard.read();
        let rawHtml = '';
        let rawText = '';
        for (const item of items) {
          if (item.types.includes('text/html')) {
            const blob = await item.getType('text/html');
            rawHtml = await blob.text();
          }
          if (item.types.includes('text/plain')) {
            const blob = await item.getType('text/plain');
            rawText = await blob.text();
          }
        }
        if (rawHtml || rawText) {
          const result = processClipboardData(rawHtml, rawText);
          setInputText(result.html || rawHtml || rawText);
          return;
        }
      }
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setInputText(text);
          return;
        }
      }
      setPasteError('Clipboard is empty or permissions were denied. Please paste directly with Ctrl+V into the box below.');
    } catch {
      setPasteError('Browser clipboard permission not granted. Please paste directly into the box with Ctrl+V.');
    }
  };

  const handleApply = (autoFillAll: boolean) => {
    if (!inputText.trim()) return;
    onApply(
      {
        title: metadata.title,
        excerpt: metadata.excerpt,
        contentHtml: metadata.contentHtml
      },
      autoFillAll
    );
    setInputText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-70 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>Smart Auto-Detect &amp; Document Importer</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                  AI &amp; Heuristic
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Paste any document or code from Word, Google Docs, ChatGPT, PDF, or HTML
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 text-slate-400 hover:text-slate-800 hover:bg-slate-200/80 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 min-h-0 overflow-y-auto space-y-4">
          {/* Quick Actions & Tab Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={handleClipboardRead}
              className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold px-3 py-1.5 rounded-xl border border-amber-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-amber-600" />
              <span>Paste from Clipboard</span>
            </button>

            {inputText.trim() && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveView('edit')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'edit'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Input Text / Code</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('preview')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeView === 'preview'
                      ? 'bg-white text-amber-700 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Formatted Preview</span>
                </button>
              </div>
            )}
          </div>

          {pasteError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{pasteError}</span>
            </div>
          )}

          {/* Real-time Detection Summary */}
          {inputText.trim() && (
            <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Detected Elements:
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg font-semibold text-slate-800 shadow-xs">
                  🏷️ {metadata.stats.headingsCount} Headings (H1–H6)
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg font-semibold text-slate-800 shadow-xs">
                  🔤 {metadata.stats.boldCount} Bold Phrases
                </span>
                <span className="bg-white border border-slate-200 px-2.5 py-0.5 rounded-lg font-semibold text-slate-800 shadow-xs">
                  📋 {metadata.stats.listCount} List Items
                </span>
              </div>

              {metadata.title && (
                <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-1 border-t border-slate-200/60">
                  <strong className="text-slate-900 shrink-0">Auto Title:</strong>
                  <span className="font-medium text-slate-800 truncate">
                    &ldquo;{metadata.title}&rdquo;
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Editor or Preview */}
          {activeView === 'preview' && inputText.trim() ? (
            <div className="border border-slate-200 rounded-xl p-4 bg-white max-h-85 overflow-y-auto space-y-3 prose prose-sm max-w-none shadow-inner leading-relaxed">
              <div
                dangerouslySetInnerHTML={{
                  __html: metadata.contentHtml
                }}
              />
            </div>
          ) : (
            <div className="relative">
              <textarea
                autoFocus
                rows={10}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your document, notes, markdown, or HTML here...&#10;&#10;Examples supported:&#10;1. Google Docs or Word: Just copy & paste directly!&#10;2. ChatGPT Markdown: # Heading, **bold text**, lists&#10;3. Raw HTML code: <h2>Title</h2><p><b>Bold</b> text</p>&#10;4. Plain Text: Automatically promotes Title Case & lines ending with ':' into headings!"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 font-sans leading-relaxed resize-y shadow-xs"
              />
            </div>
          )}

          <p className="text-[11px] text-slate-500 leading-normal">
            💡 Headings (H1–H6), subheadings, bold phrases, bullet lists, numbered steps, links, and colon labels are automatically detected and structured for clean publishing.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="button"
              disabled={!inputText.trim()}
              onClick={() => handleApply(false)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              title="Only update the rich text body content"
            >
              <FileText className="w-3.5 h-3.5 text-slate-600" />
              <span>Insert Content Only</span>
            </button>

            <button
              type="button"
              disabled={!inputText.trim()}
              onClick={() => handleApply(true)}
              className="px-4 py-2 text-xs font-bold bg-neutral-900 hover:bg-black text-white rounded-xl transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
              title={`Auto-fill ${entityName} title, excerpt, and content`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-Fill Title &amp; Content</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
