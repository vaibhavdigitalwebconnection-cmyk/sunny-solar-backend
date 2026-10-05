/**
 * Universal Smart Paste Detector & Formatter for RichTextEditor & Admin Modals
 *
 * Robust detection of headings, subheadings, bold text, bullet points,
 * numbered lists, links, blockquotes, and colon key-values from:
 * 1. Google Docs (HTML with inline styles, font-size on spans, font-weight 700)
 * 2. Microsoft Word (MsoHeading, MsoTitle, MsoListParagraph, XML fragments)
 * 3. ChatGPT / Claude / Markdown (# H1, ## H2, ### H3, **bold**, *italic*, lists)
 * 4. Plain Text from PDF, Notepad, or Websites (Title Case lines, ALL CAPS, lines ending with ':', 'Step 1:')
 * 5. Raw HTML Code (e.g. <h2>...</h2> or <p><b>...</b></p> rendered visually rather than as plain strings)
 */

/**
 * Extracts inner HTML fragment from full HTML document (removes <html>, <head>, <style>, etc.)
 */
export function extractHtmlFragment(rawHtml: string): string {
  let html = rawHtml;

  // 1. Windows clipboard fragment comments
  const fragmentMatch = html.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
  if (fragmentMatch && fragmentMatch[1] && fragmentMatch[1].trim()) {
    html = fragmentMatch[1];
  } else {
    // 2. Body tag extraction
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch && bodyMatch[1] && bodyMatch[1].trim()) {
      html = bodyMatch[1];
    }
  }

  return html;
}

/**
 * Cleans and standardizes HTML copied from Google Docs, MS Word, or other rich text editors.
 * Converts font-size/class based titles into proper <h1>, <h2>, <h3>, and bolding.
 */
export function cleanHtmlFromDocs(rawHtml: string): string {
  let h = extractHtmlFragment(rawHtml);

  // Remove XML namespaces, comments, styles, scripts, and meta tags
  h = h.replace(/<!--[\s\S]*?-->/gi, '');
  h = h.replace(/<!\[if[\s\S]*?<!\[endif\]>/gi, '');
  h = h.replace(/<o:p>[\s\S]*?<\/o:p>/gi, '');
  h = h.replace(/<xml[\s\S]*?<\/xml>/gi, '');
  h = h.replace(/<style[\s\S]*?<\/style>/gi, '');
  h = h.replace(/<script[\s\S]*?<\/script>/gi, '');
  h = h.replace(/<meta[\s\S]*?>/gi, '');
  h = h.replace(/<link[\s\S]*?>/gi, '');

  // Unwrap Google Docs root wrapper: <b style="font-weight:normal" id="docs-internal-guid-...">
  h = h.replace(/<b\s+[^>]*id=["']?docs-internal-guid[^>]*>([\s\S]*?)<\/b>/gi, '$1');

  // Map Word Headings (with quotes or without quotes)
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoTitle[^"'>]*["']?[^>]*>([\s\S]*?)<\/p>/gi, '<h1>$1</h1>');
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoHeading1[^"'>]*["']?[^>]*>([\s\S]*?)<\/p>/gi, '<h1>$1</h1>');
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoHeading2[^"'>]*["']?[^>]*>([\s\S]*?)<\/p>/gi, '<h2>$1</h2>');
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoHeading3[^"'>]*["']?[^>]*>([\s\S]*?)<\/p>/gi, '<h3>$1</h3>');
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoHeading4[^"'>]*["']?[^>]*>([\s\S]*?)<\/p>/gi, '<h4>$1</h4>');
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoSubtitle[^"'>]*["']?[^>]*>([\s\S]*?)<\/p>/gi, '<h2>$1</h2>');

  // Word outline level styling
  h = h.replace(/<p[^>]*style=["'][^"']*mso-outline-level:\s*1[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h1>$1</h1>');
  h = h.replace(/<p[^>]*style=["'][^"']*mso-outline-level:\s*2[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h2>$1</h2>');
  h = h.replace(/<p[^>]*style=["'][^"']*mso-outline-level:\s*3[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h3>$1</h3>');

  // Convert font-size based headers in Google Docs / Word:
  // Font size >= 20pt / 24px on inner span -> <h1>
  h = h.replace(/<p[^>]*>\s*<span[^>]*style=["'][^"']*font-size:\s*(?:2[0-9]|3[0-9]|4[0-9])(?:pt|px)[^"']*["'][^>]*>([\s\S]*?)<\/span>\s*<\/p>/gi, '<h1>$1</h1>');
  // Font size 15-19pt / 19-23px on inner span -> <h2>
  h = h.replace(/<p[^>]*>\s*<span[^>]*style=["'][^"']*font-size:\s*(?:1[5-9])(?:pt|px)[^"']*["'][^>]*>([\s\S]*?)<\/span>\s*<\/p>/gi, '<h2>$1</h2>');
  // Font size on paragraph itself:
  h = h.replace(/<p[^>]*style=["'][^"']*font-size:\s*(?:2[0-9]|3[0-9]|4[0-9])(?:pt|px)[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h1>$1</h1>');
  h = h.replace(/<p[^>]*style=["'][^"']*font-size:\s*(?:1[5-9])(?:pt|px)[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h2>$1</h2>');
  h = h.replace(/<p[^>]*style=["'][^"']*(?:font-weight:\s*(?:bold|700|800|900)[^"']*font-size:\s*(?:1[34])(?:pt|px)|font-size:\s*(?:1[34])(?:pt|px)[^"']*font-weight:\s*(?:bold|700|800|900))[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi, '<h3>$1</h3>');

  // Convert font-weight: 700 / bold spans and <b> to <strong>
  h = h.replace(/<span[^>]*style=["'][^"']*(?:font-weight:\s*(?:bold|700|800|900))[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, '<strong>$1</strong>');
  h = h.replace(/<b(\s+[^>]*)?>([\s\S]*?)<\/b>/gi, '<strong>$2</strong>');

  // Convert font-style: italic spans and <i> to <em>
  h = h.replace(/<span[^>]*style=["'][^"']*(?:font-style:\s*italic)[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, '<em>$1</em>');
  h = h.replace(/<i(\s+[^>]*)?>([\s\S]*?)<\/i>/gi, '<em>$2</em>');

  // Convert text-decoration: underline spans to <u>
  h = h.replace(/<span[^>]*style=["'][^"']*(?:text-decoration:\s*underline)[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi, '<u>$1</u>');

  // Convert Word List Paragraphs (<p class="MsoListParagraph">)
  // Usually contain bullet like &middot; or o or number
  h = h.replace(/<p[^>]*class=["']?[^"'>]*MsoListParagraph[^"'>]*["']?[^>]*>(?:<!\[if !supportLists\]>[\s\S]*?<!\[endif\]>)?([\s\S]*?)<\/p>/gi, '<li>$1</li>');
  // Group adjacent <li> into <ul> if not already
  h = h.replace(/(?:<li>[\s\S]*?<\/li>\s*)+/gi, (match) => {
    if (!match.startsWith('<ul>') && !match.startsWith('<ol>')) {
      return `<ul>${match}</ul>`;
    }
    return match;
  });

  // Short paragraph (< 70 chars) wrapped in strong -> <h3>
  h = h.replace(/<p[^>]*>\s*<strong>([^<]{2,70}:?)<\/strong>\s*<\/p>/gi, '<h3><strong>$1</strong></h3>');
  // Short paragraph ending in colon alone -> <h3><strong>...</strong></h3>
  h = h.replace(/<p[^>]*>\s*([^<]{2,60}:)\s*<\/p>/gi, '<h3><strong>$1</strong></h3>');

  // Strip useless empty spans
  h = h.replace(/<span(?:\s+style=["'][^"']*["'])?\s*>([\s\S]*?)<\/span>/gi, '$1');

  // Strip empty paragraphs
  h = h.replace(/<p[^>]*>\s*(?:&nbsp;|\s)*<\/p>/gi, '');

  return h.trim();
}

/**
 * Checks if a plain text string has Title Case or Heading-like appearance.
 * e.g. "Residential Solar Panel Sizing Guide" or "KEY ADVANTAGES"
 */
function isHeadingLikeLine(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 3 || trimmed.length > 80) return false;
  // Should not end with full sentence punctuation
  if (/[.,;?!]$/.test(trimmed)) return false;

  // ALL CAPS line with at least 2 words or length > 5
  if (/^[A-Z0-9\s\-_/&]+$/.test(trimmed) && /[A-Z]/.test(trimmed)) {
    return true;
  }

  // Numbered section e.g. "1. Introduction" or "1.1 Overview" or "Step 1:"
  if (/^(\d+(\.\d+)*|[A-Z]\.|\(\d+\)|Step\s+\d+|Phase\s+\d+|Section\s+\d+)[:\s]/i.test(trimmed)) {
    return true;
  }

  // Line ending with a colon e.g. "Key Features:" or "Why Choose Us:"
  if (trimmed.endsWith(':') && trimmed.length <= 60) {
    return true;
  }

  // Title Case: At least 2 words, most words capitalized
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length >= 2 && words.length <= 10) {
    const capitalizedCount = words.filter((w) => /^[A-Z]/.test(w)).length;
    if (capitalizedCount / words.length >= 0.7) {
      return true;
    }
  }

  return false;
}

/**
 * Converts Markdown or structured plain text into rich HTML.
 * Automatically identifies headings, subheadings, bold text, lists, and colon-labels.
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
    // Bolds the prefix before colon if label is short (<= 35 chars)
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

    // Unordered List: - item, * item, • item, + item, – item, — item
    const ulMatch = trimmed.match(/^[\*\-\+•–—▪▫]\s+(.+)$/);
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

    // Ordered List: 1. item or 1) item or (1) item
    const olMatch = trimmed.match(/^(\d+[\.\)]|\(\d+\))\s+(.+)$/);
    if (olMatch) {
      if (inUl) {
        htmlParts.push('</ul>');
        inUl = false;
      }
      if (!inOl) {
        htmlParts.push('<ol>');
        inOl = true;
      }
      htmlParts.push(`<li>${formatInline(olMatch[2])}</li>`);
      continue;
    }

    closeList();

    // Check for Step / Section / Phase Subheading: e.g. "Step 1: Installing Panels"
    const stepHeadingMatch = trimmed.match(/^(Step|Phase|Section|Part|Chapter)\s+\d+[:\s]+(.+)$/i);
    if (stepHeadingMatch) {
      htmlParts.push(`<h3>${formatInline(trimmed)}</h3>`);
      continue;
    }

    // Line wrapped completely in bold: **Heading** -> <h3>Heading</h3>
    const allBoldMatch = trimmed.match(/^(\*\*|__)(.+?)\1$/);
    if (allBoldMatch && allBoldMatch[2].length <= 80) {
      htmlParts.push(`<h3>${formatInline(allBoldMatch[2])}</h3>`);
      continue;
    }

    // Line ending with a colon alone: e.g. "Key Benefits of Solar:" -> <h3><strong>Key Benefits of Solar:</strong></h3>
    if (trimmed.endsWith(':') && trimmed.length <= 60 && !trimmed.includes('\n')) {
      htmlParts.push(`<h3><strong>${formatInline(trimmed)}</strong></h3>`);
      continue;
    }

    // Plain text Title / Subheading heuristics (e.g. from Word, PDF, or text doc)
    // If the line is short, Title Case or ALL CAPS, and isolated from surrounding text
    const prevLineEmpty = i === 0 || !rawLines[i - 1].trim();
    const nextLineEmpty = i === rawLines.length - 1 || !rawLines[i + 1].trim();
    if (prevLineEmpty && (nextLineEmpty || i + 1 < rawLines.length) && isHeadingLikeLine(trimmed)) {
      // First line in document -> H1, other isolated headings -> H2 or H3
      if (i === 0 || (i <= 2 && trimmed.length <= 50)) {
        htmlParts.push(`<h2>${formatInline(trimmed)}</h2>`);
      } else {
        htmlParts.push(`<h3>${formatInline(trimmed)}</h3>`);
      }
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
 * Universal content processor for both event-based paste and manual clipboard reads.
 */
export function processClipboardData(rawHtml: string, rawText: string): { html: string; handled: boolean } {
  // Case 1: Plain text contains raw HTML code (e.g. user pasted `<h2>...</h2>` or `<p>...`)
  // Render it directly instead of pasting raw code strings
  const hasRawHtmlTags = /<\/?(h[1-6]|p|div|ul|ol|li|strong|b|em|i|blockquote|a|table|section|article)[\s>]/i.test(rawText);
  if (hasRawHtmlTags) {
    const cleaned = cleanHtmlFromDocs(rawText);
    if (cleaned && cleaned.trim()) return { html: cleaned, handled: true };
  }

  // Case 2: Rich HTML in clipboard (from Google Docs, MS Word, or webpage)
  // Check this FIRST before plain text so rich formatting (bold, font-size, lists) is NOT lost!
  if (rawHtml && rawHtml.trim()) {
    const hasRichFormatting =
      /<(h[1-6]|strong|b|em|i|u|ul|ol|li|blockquote|a|table|p)/i.test(rawHtml) ||
      /font-weight:\s*(?:bold|700|800|900)/i.test(rawHtml) ||
      /font-size:\s*(?:1[4-9]|2[0-9]|3[0-9])/i.test(rawHtml) ||
      /class=["']?[^"'>]*Mso/i.test(rawHtml) ||
      /id=["']?docs-internal-guid/i.test(rawHtml);

    if (hasRichFormatting) {
      const cleaned = cleanHtmlFromDocs(rawHtml);
      if (cleaned && cleaned.trim()) return { html: cleaned, handled: true };
    }
  }

  // Case 3: Markdown or structured text in plain text
  // Check for markdown headings, bold, lists, links, or colon labels
  const hasMarkdownPatterns =
    /(^|\n)#{1,6}\s+/.test(rawText) ||
    /\*\*[^*]+\*\*/.test(rawText) ||
    /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/.test(rawText) ||
    /(^|\n)[\*\-•–—▪▫]\s+/.test(rawText) ||
    /(^|\n)(\d+[\.\)]|\(\d+\))\s+/.test(rawText) ||
    /(^|\n)>\s+/.test(rawText) ||
    /(^|\n)[A-Za-z0-9\s\-_]{1,35}:\s+.+/.test(rawText) ||
    /(^|\n)[A-Za-z0-9\s\-_]{1,55}:$/.test(rawText) ||
    /(^|\n)(Step|Phase|Section)\s+\d+[:\s]+/i.test(rawText);

  if (hasMarkdownPatterns) {
    const parsed = parseMarkdownAndTextToHtml(rawText);
    if (parsed && parsed.trim()) return { html: parsed, handled: true };
  }

  // Case 4: Plain text with multiple paragraphs or lines
  if (rawText && (rawText.includes('\n') || rawText.length > 50)) {
    const parsed = parseMarkdownAndTextToHtml(rawText);
    if (parsed && parsed.trim()) return { html: parsed, handled: true };
  }

  return { html: '', handled: false };
}

/**
 * Main Smart Paste Processor for DOM ClipboardEvent.
 * Takes the raw clipboard event and returns { html, handled }
 */
export function processClipboardPaste(event: ClipboardEvent): { html: string; handled: boolean } {
  const clipboardData = event.clipboardData;
  if (!clipboardData) return { html: '', handled: false };

  const rawHtml = clipboardData.getData('text/html');
  const rawText = clipboardData.getData('text/plain');

  return processClipboardData(rawHtml, rawText);
}

/**
 * Extracts Title, Excerpt, and formatted content from pasted document text or HTML.
 * Used for 1-Click Document Import on BlogModal and KnowledgeModal.
 */
export function extractDocumentMetadata(textOrHtml: string): {
  title: string;
  excerpt: string;
  contentHtml: string;
  stats: { headingsCount: number; boldCount: number; listCount: number };
} {
  const processed = processClipboardData(
    /<[a-z][\s\S]*>/i.test(textOrHtml) ? textOrHtml : '',
    textOrHtml
  );

  const html = processed.html || parseMarkdownAndTextToHtml(textOrHtml);

  // Extract Title: Look for H1, H2, or first non-empty line
  let title = '';
  const h1Match = html.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/i);
  if (h1Match) {
    title = h1Match[1].replace(/<[^>]+>/g, '').trim();
  } else {
    const firstLine = textOrHtml.split('\n').map((l) => l.trim()).filter(Boolean)[0] || '';
    title = firstLine.replace(/^[#*\s\-_]+/, '').replace(/[:]$/, '').trim();
  }

  // Extract Excerpt: Look for first <p> paragraph
  let excerpt = '';
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (pMatch) {
    excerpt = pMatch[1].replace(/<[^>]+>/g, '').trim();
  }

  // Calculate statistics for user visual confirmation
  const headingsCount = (html.match(/<h[1-6][^>]*>/gi) || []).length;
  const boldCount = (html.match(/<strong[^>]*>/gi) || []).length;
  const listCount = (html.match(/<li[^>]*>/gi) || []).length;

  return {
    title,
    excerpt,
    contentHtml: html,
    stats: {
      headingsCount,
      boldCount,
      listCount,
    },
  };
}
