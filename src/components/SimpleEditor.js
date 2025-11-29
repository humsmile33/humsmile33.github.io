import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Toolbar } from './Toolbar';
import './SimpleEditor.css';

export const SimpleEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요...',
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
    ],
    content: `
      <h1>Simple Editor에 오신 것을 환영합니다! 🎉</h1>
      <p>이것은 <strong>Tiptap</strong>을 기반으로 한 심플한 리치 텍스트 에디터입니다.</p>
      <p>다양한 기능을 사용해보세요:</p>
      <ul>
        <li><strong>Bold</strong>, <em>Italic</em>, <u>Underline</u> 포맷팅</li>
        <li>글머리 기호 및 번호 목록</li>
        <li>텍스트 정렬 (왼쪽, 가운데, 오른쪽)</li>
        <li>제목 스타일 (H1, H2, H3)</li>
        <li>링크 추가</li>
        <li>이미지 업로드</li>
        <li>실행 취소 / 다시 실행</li>
      </ul>
      <blockquote>
        "좋은 디자인은 가능한 한 적게 디자인하는 것이다." — Dieter Rams
      </blockquote>
    `,
  });

  return (
    <div className="simple-editor-container">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  );
};

