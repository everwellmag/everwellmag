import { TextInput } from '@sanity/ui';
import { useState } from 'react';

export function HtmlTextarea(props: any) {
  const [htmlContent, setHtmlContent] = useState(props.value?.content || '');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setHtmlContent(value);
    props.onChange({ _type: 'html', content: value });
  };

  return (
    <div>
      <textarea
        value={htmlContent}
        onChange={handleChange}
        placeholder="Enter HTML content here..."
        rows={10}
        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace' }}
      />
    </div>
  );
}