import { useCallback, useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Link,
  Unlink,
  Image,
  Undo,
  Redo,
  Highlighter,
  Palette,
  CodeSquare,
  ListTodo,
} from 'lucide-react';
import './Toolbar.css';

export const Toolbar = ({ editor }) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#cccccc',
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6',
    '#3b82f6', '#6366f1', '#a855f7', '#ec4899', '#f43f5e',
  ];

  const highlightColors = [
    '#fef08a', '#fde047', '#fca5a5', '#fed7aa', '#bbf7d0',
    '#a5f3fc', '#c4b5fd', '#f9a8d4', '#e5e5e5', 'transparent',
  ];

  const setLink = useCallback(() => {
    if (!editor) return;
    
    if (linkUrl === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
    }
    setLinkUrl('');
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  const addImage = useCallback(() => {
    if (!editor) return;
    
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const url = event.target?.result;
          editor.chain().focus().setImage({ src: url }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`toolbar-button ${editor.isActive('bold') ? 'active' : ''}`}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`toolbar-button ${editor.isActive('italic') ? 'active' : ''}`}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`toolbar-button ${editor.isActive('underline') ? 'active' : ''}`}
          title="Underline (Ctrl+U)"
        >
          <Underline size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`toolbar-button ${editor.isActive('strike') ? 'active' : ''}`}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`toolbar-button ${editor.isActive('code') ? 'active' : ''}`}
          title="Inline Code"
        >
          <Code size={18} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`toolbar-button ${editor.isActive('heading', { level: 1 }) ? 'active' : ''}`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`toolbar-button ${editor.isActive('heading', { level: 2 }) ? 'active' : ''}`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`toolbar-button ${editor.isActive('heading', { level: 3 }) ? 'active' : ''}`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`toolbar-button ${editor.isActive('bulletList') ? 'active' : ''}`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`toolbar-button ${editor.isActive('orderedList') ? 'active' : ''}`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          className={`toolbar-button ${editor.isActive('taskList') ? 'active' : ''}`}
          title="Task List"
        >
          <ListTodo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`toolbar-button ${editor.isActive('blockquote') ? 'active' : ''}`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`toolbar-button ${editor.isActive('codeBlock') ? 'active' : ''}`}
          title="Code Block"
        >
          <CodeSquare size={18} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`toolbar-button ${editor.isActive({ textAlign: 'left' }) ? 'active' : ''}`}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`toolbar-button ${editor.isActive({ textAlign: 'center' }) ? 'active' : ''}`}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`toolbar-button ${editor.isActive({ textAlign: 'right' }) ? 'active' : ''}`}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`toolbar-button ${editor.isActive({ textAlign: 'justify' }) ? 'active' : ''}`}
          title="Justify"
        >
          <AlignJustify size={18} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group color-group">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={`toolbar-button ${showColorPicker ? 'active' : ''}`}
          title="Text Color"
        >
          <Palette size={18} />
        </button>
        {showColorPicker && (
          <div className="color-picker">
            {colors.map((color) => (
              <button
                key={color}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                  setShowColorPicker(false);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-group color-group">
        <button
          onClick={() => setShowHighlightPicker(!showHighlightPicker)}
          className={`toolbar-button ${showHighlightPicker ? 'active' : ''}`}
          title="Highlight Color"
        >
          <Highlighter size={18} />
        </button>
        {showHighlightPicker && (
          <div className="color-picker">
            {highlightColors.map((color, index) => (
              <button
                key={index}
                className={`color-swatch ${color === 'transparent' ? 'no-color' : ''}`}
                style={{ backgroundColor: color === 'transparent' ? '#ffffff' : color }}
                onClick={() => {
                  if (color === 'transparent') {
                    editor.chain().focus().unsetHighlight().run();
                  } else {
                    editor.chain().focus().toggleHighlight({ color }).run();
                  }
                  setShowHighlightPicker(false);
                }}
              >
                {color === 'transparent' && '✕'}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group link-group">
        <button
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={`toolbar-button ${editor.isActive('link') ? 'active' : ''}`}
          title="Add Link"
        >
          <Link size={18} />
        </button>
        {editor.isActive('link') && (
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="toolbar-button"
            title="Remove Link"
          >
            <Unlink size={18} />
          </button>
        )}
        {showLinkInput && (
          <div className="link-input-container">
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setLink()}
              className="link-input"
            />
            <button onClick={setLink} className="link-submit">
              확인
            </button>
          </div>
        )}
      </div>

      <div className="toolbar-group">
        <button
          onClick={addImage}
          className="toolbar-button"
          title="Add Image"
        >
          <Image size={18} />
        </button>
      </div>

      <div className="toolbar-divider" />

      <div className="toolbar-group">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="toolbar-button"
          title="Undo (Ctrl+Z)"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="toolbar-button"
          title="Redo (Ctrl+Y)"
        >
          <Redo size={18} />
        </button>
      </div>
    </div>
  );
};

