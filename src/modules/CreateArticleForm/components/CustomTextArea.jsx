import { useEffect, useRef } from 'react';
import s from '../styles/index.module.css';

const CustomTextArea = ({ touched, error, value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const minHeight = textarea.clientHeight;

    const handleInput = () => {
      textarea.style.height = 'auto';
      const newHeight = Math.max(textarea.scrollHeight, minHeight);
      textarea.style.height = `${newHeight}px`;
    };

    textarea.addEventListener('input', handleInput);

    return () => {
      textarea.removeEventListener('input', handleInput);
    };
  }, []);
  return (
    <label className={s.textareaLabel}>
      <textarea
        name="text"
        ref={textareaRef}
        id="article-text"
        placeholder="Enter a text"
        className={`${s.textarea} ${touched && error ? s.errored : ''}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ resize: 'none', overflow: 'hidden' }}
      ></textarea>
      <span className={touched ? (error ? s.error : s.success) : ''}>
        {touched ? (error ? error : 'Text is valid') : '\u00A0'}
      </span>
    </label>
  );
};

export default CustomTextArea;
