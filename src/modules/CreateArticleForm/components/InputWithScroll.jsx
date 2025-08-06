import { useRef } from 'react';
import s from '../styles/index.module.css';

export const InputWithScroll = ({ touched, error, value, onChange }) => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    const input = inputRef.current;
    requestAnimationFrame(() => {
      input.selectionStart = input.selectionEnd = input.value.length;
      input.scrollLeft = input.scrollWidth;
    });
  };

  const handleBlur = () => {
    const input = inputRef.current;
    input.scrollLeft = 0;
  };

  return (
    <label className={s.titleLabel} htmlFor="titleInput">
      Article Title
      <input
        name="title"
        ref={inputRef}
        type="text"
        id="titleInput"
        className={`${s.input} ${touched && error ? s.errored : ''}`}
        placeholder="Enter the title"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <span className={touched ? (error ? s.error : s.success) : ''}>
        {touched ? (error ? error : 'Title is valid') : '\u00A0'}
      </span>
    </label>
  );
};
