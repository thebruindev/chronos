import React from 'react';

interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  spacing?: number;
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  className?: string;
}

const Stack: React.FC<StackProps> = ({
  children,
  direction = 'column',
  spacing = 4,
  align = 'stretch',
  justify = 'flex-start',
  className = '',
}) => {
  const flexDirection = direction === 'row' ? 'flex-row' : 'flex-col';
  const spacingClass = `gap-${spacing}`;
  
  // Map props to Tailwind classes
  const alignClass = {
    'flex-start': 'items-start',
    'center': 'items-center',
    'flex-end': 'items-end',
    'stretch': 'items-stretch',
    'baseline': 'items-baseline',
  }[align];

  const justifyClass = {
    'flex-start': 'justify-start',
    'center': 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly',
  }[justify];

  return (
    <div className={`flex ${flexDirection} ${spacingClass} ${alignClass} ${justifyClass} ${className}`}>
      {children}
    </div>
  );
};

export default Stack;
