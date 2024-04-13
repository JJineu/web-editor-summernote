/* eslint-disable */
import React, { useRef, useEffect } from 'react';
import useScript from './useScript.js';
import './ReactSummernote.module.css';

interface ReactSummernoteProps {
  editor: any;
  options?: any;
  codeview?: boolean;
  value?: string;
  disabled?: boolean;
  onInit?: (editor: any) => void;
  onEnter?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyUp?: () => void;
  onKeyDown?: () => void;
  onPaste?: () => void;
  onChange?: () => void;
  onImageUpload?: (
    images: any[],
    insertImage: (url: string, filenameOrCallback: any) => void,
  ) => void;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}

const ReactSummernote: React.FC<ReactSummernoteProps> = ({
  editor,
  options = {},
  codeview = false,
  value,
  disabled,
  onInit,
  onEnter,
  onFocus,
  onBlur,
  onKeyUp,
  onKeyDown,
  onPaste,
  onChange,
  onImageUpload,
  tag: Tag = 'div',
  className,
}) => {
  const noteEditable = useRef<HTMLDivElement | null>(null);
  const notePlaceholder = useRef<HTMLDivElement | null>(null);

  // const status = useScript('https://code.jquery.com/jquery-3.2.0.js');
  const status2 = useScript(
    'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js',
  );
  const status3 = useScript(
    'https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/lang/summernote-ko-KR.js',
  );

  const handleInit = () => {
    if (typeof disabled === 'boolean') {
      toggleState(disabled);
    }

    if (typeof onInit === 'function') {
      onInit({
        summernote: editor.current.summernote,
        focus,
        isEmpty,
        reset,
        replace,
        disable,
        enable,
        insertImage,
        insertNode,
        insertText,
      });
    }
  };

  const handleChange = (value: string) => {
    if (typeof onChange === 'function') {
      onChange();
    }
    editor.current.value = value;
  };

  const handleImageUpload = (images: any[]) => {
    if (typeof onImageUpload === 'function') {
      onImageUpload(images, insertImage);
    }
  };

  const focus = () => {
    editor.current.summernote('focus');
  };

  const isEmpty = () => {
    return editor.current.summernote('isEmpty');
  };

  const reset = () => {
    editor.current.summernote('reset');
  };

  const replace = (content: string) => {
    const prevContent = noteEditable.current?.innerHTML;
    const contentLength = content.length;

    if (notePlaceholder.current === null || noteEditable.current === null) {
      return;
    }
    if (prevContent !== content) {
      if (isEmpty() && contentLength > 0) {
        notePlaceholder.current.style.display = 'none';
      } else if (contentLength === 0) {
        notePlaceholder.current.style.display = 'block';
      }

      noteEditable.current!.innerHTML = content;
    }
  };

  const disable = () => {
    editor.current.summernote('disable');
  };

  const enable = () => {
    editor.current.summernote('enable');
  };

  const toggleState = (disabled: boolean) => {
    if (disabled) {
      disable();
    } else {
      enable();
    }
  };

  const insertImage = (url: string, filenameOrCallback: any) => {
    editor.current.summernote('insertImage', url, filenameOrCallback);
  };

  const insertNode = (node: Node) => {
    editor.current.summernote('insertNode', node);
  };

  const insertText = (text: string) => {
    editor.current.summernote('insertText', text);
  };

  useEffect(() => {
    if (!(status2 === 'ready' && status3 === 'ready')) return;
    if (editor.current === null) return;
    editor.current = $('#summernote').summernote({
      height: 500, // 에디터 높이
      minHeight: null, // 최소 높이
      maxHeight: null, // 최대 높이
      focus: true, // 에디터 로딩 후 포커스 설정
      tabsize: 4,
      lang: 'ko-KR',
      toolbar: [
        ['style', ['style']], // 글자 스타일 설정 옵션
        ['fontsize', ['fontsize']], // 글꼴 크기 설정 옵션
        ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']], // 글자 굵게, 밑줄, 포맷 제거 옵션
        ['color', ['color']], // 글자 색상 설정 옵션
        ['para', ['ul', 'ol', 'paragraph']], // 문단 스타일, 순서 없는 목록, 순서 있는 목록 옵션
        ['height', ['height']], // 줄 간격
        ['table', ['table']], // 테이블 삽입 옵션
        ['insert', ['link', 'picture', 'video']], // 링크 삽입, 이미지 삽입, 동영상 삽입 옵션
        ['view', ['codeview', 'help']], // 코드 보기, 'fullscreen' 전체 화면, 도움말 옵션
      ],
      fontSizes: [
        '8',
        '9',
        '10',
        '11',
        '12',
        '14',
        '16',
        '18',
        '20',
        '22',
        '24',
        '28',
        '30',
        '36',
        '50',
        '72',
      ],
      callbacks: {
        onInit: handleInit,
        onEnter,
        onFocus,
        onBlur,
        onKeyUp,
        onKeyDown,
        onPaste,
        onChange: handleChange,
        onImageUpload: handleImageUpload,
      },
    });
    editor.current.summernote();
    $('.note-status-output').html(
      '<div class="alert alert-danger">' +
        'This is an error using a Bootstrap alert that has been restyled to fit here.' +
        '</div>',
    );
    return () => {
      editor.current.summernote('destroy');
    };
  }, [options, status2, status3, editor.current]);

  useEffect(() => {
    if (!(status2 === 'ready')) return;
    if (editor.current === null) return;

    if (typeof value === 'string') {
      replace(value);
    }
    if (typeof disabled === 'boolean') {
      toggleState(disabled);
    }
  }, [value, disabled, status2, status3, editor.current]);

  return (
    <div>
      <Tag id='summernote' ref={editor}></Tag>
    </div>
  );
};

export default ReactSummernote;
