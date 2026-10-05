/**
 * Smart Paste Detector & Formatter for RichTextEditor
 * 
 * Automatically detects and formats text pasted from:
 * - Google Docs (preserves H1-H6, bold, italic, underline, lists)
 * - Microsoft Word (converts MsoHeading, MsoListParagraph, bold, italic)
 * - ChatGPT / Markdown (converts # headings, **bold**, *italic*, lists, links, blockquotes)
 * - Raw HTML code (renders HTML directly instead of pasting raw code tags)
 * - Plain text with structured labels (e.g. "Label: message" or "Step 1: ...")
 */

/**
 * Cleans and standardizes HTML copied from Google Docs, MS Word, or other rich text editors.
 */
export function cleanHtmlFromDocs(rawHtml: string): string {
  let h = rawHtml;

  // 1. Remove Word / Outlook XML namespaces, style blocks, and conditional comments
  h = h.replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi, '');
  h = h.replace(/<!\[if[\s\S]*?<!\[endif\]>/gi, '');
  h = h.replace(/<o:p>[\s\S]*?<\/o:p>/gi, '');
  h = h.replace(/<xml>[\s\S]*?<\/xml>/gi, '');
  h = h.replace(/<style[\s\S]*?<\/style>/gi, '');

  // 2. Unwrap Google Docs root wrapper: <b style="font-weight:normal" id="docs-internal-guid-...">
  h = h.replace(/<b\s+[^>]*id=["']docs-internal-guid[^>]*>([\s\S]*?)<\/b>/gi, '$1');

  // 3. Map Word Headings (MsoHeading1, MsoHeading2, MsoTitle, etc.)
  h = h.replace(/<p[^>]*class=["'][^"']*MsoTitle[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h1>$1</h1>');
  h = h.replace(/<p[^>]*class=["'][^"']*MsoHeading1[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h1>$1</h1>');
  h = h.replace(/<p[^>]*class=["'][^"']*MsoHeading2[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h2>$1</h2>');
  h = h.replace(/<p[^>]*class=["'][^"']*MsoHeading3[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h3>$1</h3>');
  h = h.replace(/<p[^>]*class=["'][^"']*MsoHeading4[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h4>$1</h4>');
  h = h.replace(/<p[^>]*class=["'][^"']*MsoSubtitle[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h2>$1</h2>');

  // 4. Convert font-weight: 700 / bold spans and <b> to <strong>
  h = h.replace(/<span[^>]*style=["'][^"']*(?:font-weight:\s*(?:bold|700|800|900))[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, '<strong>$1</strong>');
  h = h.replace(/<b(\s+[^>]*)?>([\s\S]*?)<\/b>/gi, '<strong>$2</strong>');

  // 5. Convert font-style: italic spans and <i> to <em>
  h = h.replace(/<span[^>]*style=["'][^"']*(?:font-style:\s*italic)[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, '<em>$1</em>');
  h = h.replace(/<i(\s+[^>]*)?>([\s\S]*?)<\/i>/gi, '<em>$2</em>');

  // 6. Convert text-decoration: underline spans to <u>
  h = h.replace(/<span[^>]*style=["'][^"']*(?:text-decoration:\s*underline)[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, '<u>$1</u>');

  return h;
}

/**
 * Converts Markdown or structured text (from ChatGPT, Notion, text files) into HTML.
 */
export function parseMarkdownAndTextToHtml(rawText: string): string {
  const rawLines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  const htmlParts: string[] = [];
  let inUl = false;
  let inOl = false;
  let inBlockquote = false;

  const closeList = () => {
    if (inUl) {
      htmlParts.push('</ul>');
      inUl = false;
    }
    if (inOl) {
      htmlParts.push('</ol>');
      inOl = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      htmlParts.push('</blockquote>');
      inBlockquote = false;
    }
  };

  const formatInline = (str: string): string => {
    let s = str;
    // Escape HTML special characters
    s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Markdown Links: [text](https://...)
    s = s.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Bold + Italic: ***text*** or ___text___
    s = s.replace(/(\*\*\*|___)(.*?)\1/g, '<strong><em>$2</em></strong>');

    // Bold: **text** or __text__
    s = s.replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>');

    // Italic: *text* or _text_
    s = s.replace(/(^|[^\w])(\*|_)([^\*_]+?)\2([^\w]|$)/g, '$1<em>$3</em>$4');

    // Strikethrough: ~~text~~
    s = s.replace(/~~(.*?)~~/g, '<s>$1</s>');

    // Inline code: `code`
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Colon Pattern: "Label: Message" or "**Label:** Message"
    // Format only if label is concise (<= 35 chars) and doesn't already start with <strong>
    const colonMatch = s.match(/^([A-Za-z0-9\s\-_]{1,35}):\s+(.+)$/);
    if (colonMatch && !s.startsWith('<strong>')) {
      s = `<strong>${colonMatch[1]}:</strong> ${colonMatch[2]}`;
    }

    return s;
  };

  for (let i = 0; i < rawLines.length; i++) {
    const rawLine = rawLines[i];
    const trimmed = rawLine.trim();

    // Blank line -> Paragraph separator
    if (!trimmed) {
      closeList();
      closeBlockquote();
      continue;
    }

    // Markdown Headings: # H1, ## H2, ### H3, #### H4, ##### H5, ###### H6
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeList();
      closeBlockquote();
      const level = headingMatch[1].length;
      const content = formatInline(headingMatch[2].trim());
      htmlParts.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    // Blockquote: > quote
    const bqMatch = trimmed.match(/^>\s*(.+)$/);
    if (bqMatch) {
      closeList();
      if (!inBlockquote) {
        htmlParts.push('<blockquote>');
        inBlockquote = true;
      }
      htmlParts.push(`<p>${formatInline(bqMatch[1])}</p>`);
      continue;
    } else {
      closeBlockquote();
    }

    // Unordered List: - item, * item, • item, + item
    const ulMatch = trimmed.match(/^[\*\-\+•]\s+(.+)$/);
    if (ulMatch) {
      if (inOl) {
        htmlParts.push('</ol>');
        inOl = false;
      }
      if (!inUl) {
        htmlParts.push('<ul>');
        inUl = true;
      }
      htmlParts.push(`<li>${formatInline(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered List: 1. item or 1) item
    const olMatch = trimmed.match(/^\d+[\.\)]\s+(.+)$/);
    if (olMatch) {
      if (inUl) {
        htmlParts.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        htmlParts.push('<ol>');
        inOl = true;
      }
      htmlParts.push(`<li>${formatInline(olMatch[1])}</li>`);
      continue;
    }

    closeList();

    // Step or Section Subheadings: e.g. "Step 1: Installing Panels" or "Section 2: ..."
    const stepHeadingMatch = trimmed.match(/^(Step|Phase|Section|Part|Chapter)\s+\d+[:\s]+(.+)$/i);
    if (stepHeadingMatch) {
      htmlParts.push(`<h3>${formatInline(trimmed)}</h3>`);
      continue;
    }

    // Line wrapped in standalone bold: **Heading** -> <h3>Heading</h3>
    const allBoldMatch = trimmed.match(/^(\*\*|__)(.+?)\1$/);
    if (allBoldMatch && allBoldMatch[2].length <= 80) {
      htmlParts.push(`<h3>${formatInline(allBoldMatch[2])}</h3>`);
      continue;
    }

    // Regular paragraph
    htmlParts.push(`<p>${formatInline(trimmed)}</p>`);
  }

  closeList();
  closeBlockquote();

  return htmlParts.join('');
}

/**
 * Main Smart Paste Processor.
 * Takes the raw clipboard event and returns { html, handled }
 */
export function processClipboardPaste(event: ClipboardEvent): { html: string; handled: boolean } {
  const clipboardData = event.clipboardData;
  if (!clipboardData) return { html: '', handled: false };

  const rawHtml = clipboardData.getData('text/html');
  const rawText = clipboardData.getData('text/plain');

  // Case 1: Plain text contains raw HTML code (e.g. user pasted `<h2>...</h2>` or `<p>...`)
  // Render it directly instead of pasting raw code strings
  const hasRawHtmlTags = /<\/?(h[1-6]|p|div|ul|ol|li|strong|b|em|i|blockquote|a|table|section|article)[\s>]/i.test(rawText);
  if (hasRawHtmlTags) {
    const cleaned = cleanHtmlFromDocs(rawText);
    return { html: cleaned, handled: true };
  }

  // Case 2: Markdown or structured text in plain text
  // Check for markdown headings, bold, lists, links, or colon labels
  const hasMarkdownPatterns =
    /(^|\n)#{1,6}\s+/.test(rawText) ||
    /\*\*[^*]+\*\*/.test(rawText) ||
    /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/.test(rawText) ||
    /(^|\n)[\*\-•]\s+/.test(rawText) ||
    /(^|\n)\d+[\.\)]\s+/.test(rawText) ||
    /(^|\n)>\s+/.test(rawText) ||
    /(^|\n)[A-Za-z0-9\s\-_]{1,30}:\s+.+/.test(rawText) ||
    /(^|\n)(Step|Phase|Section)\s+\d+[:\s]+/i.test(rawText);

  // If plain text has clear markdown or list structure, prefer markdown conversion
  if (hasMarkdownPatterns) {
    const parsed = parseMarkdownAndTextToHtml(rawText);
    return { html: parsed, handled: true };
  }

  // Case 3: Rich HTML from Google Docs, MS Word, or webpage
  if (rawHtml && rawHtml.trim()) {
    // Check if it has real formatting tags
    const hasRichTags =
      /<(h[1-6]|strong|b|em|i|u|ul|ol|li|blockquote|a|table)/i.test(rawHtml) ||
      /font-weight:\s*(?:bold|700|800|900)/i.test(rawHtml) ||
      /class=["'][^"']*MsoHeading/i.test(rawHtml) ||
      /id=["']docs-internal-guid/i.test(rawHtml);

    if (hasRichTags) {
      const cleaned = cleanHtmlFromDocs(rawHtml);
      return { html: cleaned, handled: true };
    }
  }

  // Case 4: Plain text with multiple paragraphs (separated by blank lines)
  if (rawText && rawText.includes('\n\n')) {
    const parsed = parseMarkdownAndTextToHtml(rawText);
    return { html: parsed, handled: true };
  }

  // Otherwise let TipTap perform default paste handling
  return { html: '', handled: false };
}
