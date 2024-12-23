import React, { useState, useRef, useEffect } from 'react';

interface EditableFieldProps {
  value: string | number;
  onSave: (value: string | number) => void;
  type?: 'text' | 'number' | 'textarea';
  className?: string;
}

export function EditableField({ value, onSave, type = 'text', className = '' }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onSave(type === 'number' ? Number(editValue) : editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div
        className={`cursor-pointer hover:bg-gray-100 rounded px-1 -mx-1 ${className}`}
        onClick={() => setIsEditing(true)}
      >
        {value}
      </div>
    );
  }

  const commonProps = {
    ref: inputRef as any,
    value: editValue,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
      setEditValue(e.target.value),
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    className: `w-full px-1 py-0.5 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`
  };

  return type === 'textarea' ? (
    <textarea {...commonProps} rows={2} />
  ) : (
    <input {...commonProps} type={type} />
  );
}