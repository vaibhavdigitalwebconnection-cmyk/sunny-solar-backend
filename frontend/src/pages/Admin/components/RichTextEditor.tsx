import React, { useEffect, useCallback, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  UploadCloud,
  Loader2,
  Link as LinkIcon,
  X as CloseIcon,
  Code as CodeIcon,
  Copy as CopyIcon,
  Check as CheckIcon,
  Sparkles,
  ClipboardPaste
} from "lucide-react";
import {
  processClipboardPaste,
  processClipboardData,
  extractDocumentMetadata,
} from "./pasteDetector";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  onUploadImage?: (file: File) => Promise<string>;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  label,
  onUploadImage,
}: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [pasteModalText, setPasteModalText] = useState("");
  const [pasteModalMode, setPasteModalMode] = useState<"edit" | "preview">("edit");
  const [copiedCode, setCopiedCode] = useState(false);
  const [pasteNotification, setPasteNotification] = useState<string | null>(null);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [, setTick] = useState(0);
  const forceUpdate = useCallback(() => setTick((t) => (t + 1) % 1000000), []);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<any>(null);

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md max-w-full my-4 border border-slate-200 shadow-sm",
        },
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      forceUpdate();
    },
    onSelectionUpdate() {
      forceUpdate();
    },
    onTransaction() {
      forceUpdate();
    },
    editorProps: {
      attributes: {
        class: "rte-editor",
        ...(placeholder ? { "data-placeholder": placeholder } : {}),
      },
      handlePaste(_view, event) {
        const result = processClipboardPaste(event);
        if (result.handled && result.html) {
          event.preventDefault();
          if (editorRef.current) {
            editorRef.current.chain().focus().insertContent(result.html).run();
            setPasteNotification("⚡ Document formatting auto-detected: Headings, bold text & lists applied!");
            setTimeout(() => setPasteNotification(null), 4000);
          }
          return true;
        }
        return false;
      },
    },
  });

  // Keep ref synchronized
  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // Sync external value on first load or when changed from outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    if (!linkUrl.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl.trim() })
        .run();
    }
    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowLinkInput(false);
  }, [editor]);

  // 1-Click Smart Paste from clipboard
  const handleSmartPasteClick = async () => {
    try {
      if (navigator.clipboard?.read) {
        const items = await navigator.clipboard.read();
        let rawHtml = "";
        let rawText = "";
        for (const item of items) {
          if (item.types.includes("text/html")) {
            const blob = await item.getType("text/html");
            rawHtml = await blob.text();
          }
          if (item.types.includes("text/plain")) {
            const blob = await item.getType("text/plain");
            rawText = await blob.text();
          }
        }
        if (rawHtml || rawText) {
          const result = processClipboardData(rawHtml, rawText);
          if (result.html) {
            editor?.commands.insertContent(result.html);
            setPasteNotification("⚡ Smart Paste: Headings, bold & lists auto-detected from clipboard!");
            setTimeout(() => setPasteNotification(null), 4000);
            return;
          }
        }
      }
      if (navigator.clipboard?.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          const result = processClipboardData("", text);
          if (result.html) {
            editor?.commands.insertContent(result.html);
            setPasteNotification("⚡ Smart Paste: Headings, bold & lists auto-detected from clipboard!");
            setTimeout(() => setPasteNotification(null), 4000);
            return;
          }
        }
      }
      setShowPasteModal(true);
    } catch {
      setShowPasteModal(true);
    }
  };

  const handleApplyPasteModal = () => {
    if (!pasteModalText.trim() || !editor) return;
    const isHtml = /<[a-z][\s\S]*>/i.test(pasteModalText);
    const result = processClipboardData(isHtml ? pasteModalText : "", pasteModalText);
    const contentToInsert = result.html || `<p>${pasteModalText}</p>`;
    editor.chain().focus().insertContent(contentToInsert).run();
    setPasteModalText("");
    setShowPasteModal(false);
    setPasteNotification("⚡ Document formatting auto-detected: Headings, bold text & lists applied!");
    setTimeout(() => setPasteNotification(null), 4000);
  };

  const handleCopyCode = async () => {
    if (!editor) return;
    const html = editor.getHTML();
    try {
      await navigator.clipboard.writeText(html);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = html;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2200);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor || !onUploadImage) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setIsUploadingImg(true);
    try {
      const url = await onUploadImage(file);
      if (url) {
        editor.chain().focus().setImage({ src: url, alt: file.name || "Uploaded image" }).run();
      }
    } catch (err: any) {
      alert(err.message || "Failed to upload image.");
    } finally {
      setIsUploadingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (!editor) return null;

  const btn = (active: boolean, extra = "") =>
    `px-2.5 py-1 rounded-sm text-xs font-bold transition cursor-pointer select-none ${extra} ${
      active
        ? "bg-[#155DFC] text-white border border-[#155DFC] shadow-xs"
        : "bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-2xs"
    }`;

  const textContent = editor.getText();
  const wordCount = textContent.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <div className="flex flex-col flex-1">
      {/* Editor Styles */}
      <style>{`
        .rte-editor {
          min-height: 280px;
          max-height: 52vh;
          overflow-y: auto;
          overflow-x: hidden;
          word-break: break-word;
          overflow-wrap: break-word;
          outline: none;
          color: #0f172a;
          font-size: 0.935rem;
          line-height: 1.75;
          padding: 18px 20px;
          background-color: #ffffff;
        }
        .rte-editor p { margin: 0 0 0.85rem 0; color: #1e293b; }
        .rte-editor strong { font-weight: 700; color: #0f172a; }
        .rte-editor em { font-style: italic; }
        .rte-editor u { text-decoration: underline; }
        .rte-editor s { text-decoration: line-through; color: #64748b; }
        .rte-editor code {
          background-color: #f1f5f9;
          color: #0f172a;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.85em;
        }
        .rte-editor a { color: #155DFC; text-decoration: underline; cursor: pointer; font-weight: 600; }
        .rte-editor a:hover { color: #1048c7; }
        .rte-editor ul { list-style: disc; padding-left: 1.5rem; margin: 0.65rem 0; color: #1e293b; }
        .rte-editor ol { list-style: decimal; padding-left: 1.5rem; margin: 0.65rem 0; color: #1e293b; }
        .rte-editor li { margin-bottom: 0.4rem; }
        .rte-editor h1, .rte-editor h2, .rte-editor h3, .rte-editor h4, .rte-editor h5, .rte-editor h6 {
          font-weight: 800;
          color: #0f172a;
          margin: 1.35rem 0 0.5rem;
          line-height: 1.3;
        }
        .rte-editor h1 { font-size: 1.75rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.35rem; }
        .rte-editor h2 { font-size: 1.45rem; border-bottom: 1px solid #f8fafc; padding-bottom: 0.25rem; }
        .rte-editor h3 { font-size: 1.25rem; }
        .rte-editor h4 { font-size: 1.1rem; }
        .rte-editor h5 { font-size: 0.98rem; }
        .rte-editor h6 { font-size: 0.88rem; color: #64748b; }
        .rte-editor blockquote {
          border-left: 4px solid #155DFC;
          padding: 10px 16px;
          background-color: #f0f4ff;
          color: #1e3a8a;
          margin: 1rem 0;
          border-radius: 0 6px 6px 0;
          font-style: italic;
        }
        .rte-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.25rem 0;
          display: block;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
        }
        .rte-editor[data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        .rte-editor p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>

      {/* Label and Smart Indicator */}
      <div className="flex items-center justify-between mb-1.5">
        {label ? (
          <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
            {label}
          </label>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => setShowPasteModal(true)}
          className="text-[11.5px] text-amber-800 font-bold flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 px-2.5 py-1 rounded border border-amber-200/80 transition-colors cursor-pointer"
          title="Click to paste text from any doc and auto-detect headings, subheadings & bold"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Paste Any Doc → Auto-Detect Formatting</span>
        </button>
      </div>

      {/* Main Editor Card Container */}
      <div className="border border-slate-200 rounded-sm overflow-hidden bg-white shadow-xs focus-within:border-[#155DFC] focus-within:ring-1 focus-within:ring-[#155DFC]/20 transition-all">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 bg-slate-50/90 border-b border-slate-200 px-3 py-2 shrink-0">
          <div className="flex flex-wrap items-center gap-1">
            {/* Formatting */}
            <button
              type="button"
              title="Bold (Ctrl+B)"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={btn(editor.isActive("bold"), "font-bold")}
            >
              B
            </button>
            <button
              type="button"
              title="Italic (Ctrl+I)"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={btn(editor.isActive("italic"), "italic")}
            >
              I
            </button>
            <button
              type="button"
              title="Underline (Ctrl+U)"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={btn(editor.isActive("underline"), "underline")}
            >
              U
            </button>

            <span className="w-px h-4 bg-slate-300 mx-1" />

            {/* Headings H1 - H6 */}
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <button
                key={level}
                type="button"
                title={`Heading ${level} (or subheading)`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: level as any })
                    .run()
                }
                className={btn(
                  editor.isActive("heading", { level }),
                  "font-bold",
                )}
              >
                H{level}
              </button>
            ))}

            <span className="w-px h-4 bg-slate-300 mx-1" />

            <button
              type="button"
              title="Bullet List"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={btn(editor.isActive("bulletList"))}
            >
              • List
            </button>
            <button
              type="button"
              title="Numbered List"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={btn(editor.isActive("orderedList"))}
            >
              1. List
            </button>

            <span className="w-px h-4 bg-slate-300 mx-1" />

            {/* 🔗 Link button */}
            <button
              type="button"
              title="Add Link — select text first, then click this"
              onClick={() => setShowLinkInput((v) => !v)}
              className={btn(editor.isActive("link"), "inline-flex items-center gap-1")}
            >
              <LinkIcon className="w-3 h-3" />
              Link
            </button>
            {editor.isActive("link") && (
              <button
                type="button"
                onClick={removeLink}
                className="px-2 py-1 rounded-sm text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 transition cursor-pointer inline-flex items-center gap-1 bg-white"
              >
                <CloseIcon className="w-3 h-3" />
                Remove Link
              </button>
            )}

            {/* Smart Paste Button */}
            <button
              type="button"
              title="Paste from clipboard with auto-detected headings, bold text, lists & links"
              onClick={handleSmartPasteClick}
              className="px-2.5 py-1 rounded-sm text-xs font-bold bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 border border-amber-300 transition cursor-pointer inline-flex items-center gap-1 shadow-2xs"
            >
              <ClipboardPaste className="w-3.5 h-3.5 text-amber-600" />
              <span>⚡ Smart Paste</span>
            </button>

            {/* Device Image Upload Button */}
            {onUploadImage && (
              <>
                <span className="w-px h-4 bg-slate-300 mx-1" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <button
                  type="button"
                  disabled={isUploadingImg}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded-sm text-xs font-bold bg-[#155DFC]/10 text-[#155DFC] hover:bg-[#155DFC]/15 hover:text-[#1048c7] border border-[#155DFC]/30 transition cursor-pointer inline-flex items-center gap-1.5 shadow-2xs"
                  title="Upload image from device and insert into content"
                >
                  {isUploadingImg ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#155DFC]" />
                  ) : (
                    <UploadCloud className="w-3.5 h-3.5 text-[#155DFC]" />
                  )}
                  <span>{isUploadingImg ? "Uploading..." : "+ Insert Image"}</span>
                </button>
              </>
            )}

            <span className="w-px h-4 bg-slate-300 mx-1" />

            {/* HTML / Code View Toggle */}
            <button
              type="button"
              title="Toggle between Visual WYSIWYG editor and raw HTML code view"
              onClick={() => setShowHtmlCode((prev) => !prev)}
              className={btn(showHtmlCode, "inline-flex items-center gap-1 font-mono text-[11px]")}
            >
              <CodeIcon className="w-3.5 h-3.5" />
              <span>{showHtmlCode ? "Visual View" : "</> HTML Code"}</span>
            </button>

            {/* Copy HTML Code Button */}
            <button
              type="button"
              title="Copy formatted HTML code to clipboard to paste into any doc"
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-2xs transition cursor-pointer inline-flex items-center gap-1"
            >
              {copiedCode ? (
                <>
                  <CheckIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <CopyIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <span className="w-px h-4 bg-slate-300 mx-1" />

            <button
              type="button"
              title="Clear all formatting"
              onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
              className={btn(false)}
            >
              Clear
            </button>
          </div>

          {/* Word count & Read time */}
          <div className="text-xs text-slate-500 font-bold px-1 shrink-0">
            {wordCount} words • {readTime} min read
          </div>
        </div>

        {/* Link URL input panel */}
        {showLinkInput && (
          <div className="flex gap-2 items-center bg-[#155DFC]/5 border-b border-slate-200 px-3.5 py-2.5 animate-in fade-in duration-100">
            <span className="text-slate-600 text-xs shrink-0 font-bold">Link URL:</span>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyLink();
                }
              }}
              placeholder="https://example.com or /services"
              autoFocus
              className="flex-1 bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-sm px-3 py-1.5 text-xs focus:outline-none focus:border-[#155DFC] focus:ring-1 focus:ring-[#155DFC]/20"
            />
            <button
              type="button"
              onClick={applyLink}
              className="shrink-0 px-3 py-1.5 rounded-sm bg-[#155DFC] text-white text-xs font-bold hover:bg-[#1048c7] transition cursor-pointer shadow-xs"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl("");
              }}
              className="shrink-0 px-3 py-1.5 rounded-sm bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Smart Paste Feedback Banner */}
        {pasteNotification && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-3 py-1.5 text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              {pasteNotification}
            </span>
            <button
              type="button"
              onClick={() => setPasteNotification(null)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Editor Content Area vs Raw HTML Code Area */}
        {showHtmlCode ? (
          <div className="bg-slate-900 text-slate-100 flex flex-col">
            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-mono text-amber-400 flex items-center gap-1">
                <CodeIcon className="w-3.5 h-3.5" />
                Raw HTML Source Mode — edits here reflect in visual view
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-xs text-white hover:text-amber-300 bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition cursor-pointer flex items-center gap-1 font-sans"
              >
                {copiedCode ? <CheckIcon className="w-3 h-3 text-emerald-400" /> : <CopyIcon className="w-3 h-3" />}
                <span>{copiedCode ? "Copied!" : "Copy HTML"}</span>
              </button>
            </div>
            <textarea
              value={editor.getHTML()}
              onChange={(e) => {
                editor.commands.setContent(e.target.value, { emitUpdate: true });
                onChange(e.target.value);
              }}
              rows={12}
              className="w-full min-h-70 max-h-[52vh] p-4 font-mono text-xs text-slate-200 bg-slate-900 border-0 outline-none resize-y selection:bg-amber-500/30 whitespace-pre-wrap wrap-break-word overflow-x-auto"
              placeholder="<p>Paste or write HTML code here...</p>"
            />
          </div>
        ) : (
          <div className="bg-white">
            <EditorContent editor={editor} />
          </div>
        )}
      </div>

      {/* Manual Smart Paste Modal Dialog */}
      {showPasteModal && (
        <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col animate-in zoom-in-95 duration-150">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900">
                  Smart Paste: Auto-Detect Headings &amp; Bold
                </h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowPasteModal(false);
                  setPasteModalText("");
                }}
                className="w-7 h-7 text-slate-400 hover:text-slate-700 flex items-center justify-center rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Paste content from <strong>Word, Google Docs, ChatGPT, PDF, or HTML</strong>:
                </p>
                {pasteModalText.trim() && (
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setPasteModalMode("edit")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        pasteModalMode === "edit"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Input Text
                    </button>
                    <button
                      type="button"
                      onClick={() => setPasteModalMode("preview")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        pasteModalMode === "preview"
                          ? "bg-white text-amber-700 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                )}
              </div>

              {/* Detected Metrics Badges */}
              {pasteModalText.trim() && (() => {
                const meta = extractDocumentMetadata(pasteModalText);
                return (
                  <div className="flex flex-wrap items-center gap-2 p-2 bg-amber-50/70 border border-amber-200/80 rounded-xl text-[11px]">
                    <span className="font-bold text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Auto-detected:
                    </span>
                    <span className="bg-white border border-amber-200 px-2 py-0.5 rounded-md font-semibold text-slate-800">
                      🏷️ {meta.stats.headingsCount} Headings
                    </span>
                    <span className="bg-white border border-amber-200 px-2 py-0.5 rounded-md font-semibold text-slate-800">
                      🔤 {meta.stats.boldCount} Bold Items
                    </span>
                    <span className="bg-white border border-amber-200 px-2 py-0.5 rounded-md font-semibold text-slate-800">
                      📋 {meta.stats.listCount} List Items
                    </span>
                  </div>
                );
              })()}

              {pasteModalMode === "preview" && pasteModalText.trim() ? (
                <div
                  className="w-full bg-white border border-slate-200 rounded-xl p-4 text-xs text-slate-900 max-h-75 overflow-y-auto space-y-2.5 leading-relaxed prose prose-sm max-w-none shadow-inner"
                  dangerouslySetInnerHTML={{
                    __html: extractDocumentMetadata(pasteModalText).contentHtml,
                  }}
                />
              ) : (
                <textarea
                  autoFocus
                  rows={9}
                  value={pasteModalText}
                  onChange={(e) => setPasteModalText(e.target.value)}
                  placeholder="Paste your text or code here...&#10;e.g.&#10;Solar Sizing Guide&#10;&#10;Key Benefits:&#10;- Lower bills&#10;- Battery storage&#10;&#10;Step 1: Inverter Selection&#10;Choose high efficiency inverters..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500 font-sans resize-y leading-relaxed"
                />
              )}
            </div>

            <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setShowPasteModal(false);
                  setPasteModalText("");
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!pasteModalText.trim()}
                onClick={handleApplyPasteModal}
                className="px-4 py-2 text-xs font-bold bg-neutral-900 hover:bg-black text-white rounded-xl transition-colors disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Apply Smart Formatting &amp; Insert</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Helper hint */}
      <p className="text-slate-500 text-[11.5px] mt-1.5 leading-relaxed">
        📋 <strong className="text-slate-700 font-semibold">Copy &amp; Paste Support:</strong> Paste directly (Ctrl+V) from <strong className="text-slate-700">Google Docs, Word, ChatGPT, or Markdown</strong> — Headings (H1–H6), subheadings, bold (<strong className="text-slate-700">**text**</strong>), bullet/number lists, and links are automatically detected! Or click <strong className="text-slate-700">⚡ Smart Paste</strong>.
      </p>
    </div>
  );
}
