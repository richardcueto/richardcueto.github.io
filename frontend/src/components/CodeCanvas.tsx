import React, { useState } from 'react';

interface CodeCanvasProps {
  contenido?: string;
}

const CodeCanvas: React.FC<CodeCanvasProps> = ({contenido}) => {
  const [code, setCode] = useState<string>(
    contenido ||
    `<input type="password" />
    <input type="number" />
    <input type="date" />
    <input type="checkbox" />
    <input type="radio" />
    <input type="file" />`
  );

  const [mode, setMode] = useState<'code' | 'preview'>('code');
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={styles.card}>
      {/* Barra Superior */}
      <div style={styles.header}>
        <span style={styles.title}>📄 HTML</span>
        <div style={styles.actions}>
          <button
            style={{ ...styles.btn, backgroundColor: mode === 'code' ? '#e0e0e0' : 'transparent' }}
            onClick={() => setMode('code')}
            title="Ver Código"
          >
            &lt;/&gt;
          </button>

          <button
            style={{ ...styles.btn, backgroundColor: mode === 'preview' ? '#e0e0e0' : 'transparent' }}
            onClick={() => setMode('preview')}
            title="Ejecutar"
          >
            ▷
          </button>

          <button style={styles.btn} onClick={handleCopy} title="Copiar código">
            {copied ? '✓' : '📋'}
          </button>
        </div>
      </div>

      {/* Cuerpo del Componente */}
      <div style={styles.content}>
        {mode === 'code' ? (
          <textarea
            style={styles.textarea}
            value={code}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
          />
        ) : (
          <iframe
            style={styles.iframe}
            title="preview"
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body { font-family: system-ui, sans-serif; padding: 15px; display: flex; flex-direction: column; gap: 8px; }
                  </style>
                </head>
                <body>${code}</body>
              </html>
            `}
          />
        )}
      </div>
    </div>
  );
}

export default CodeCanvas

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#f4f4f4',
    borderRadius: '12px',
    overflow: 'hidden',
    maxWidth: '650px',
    border: '1px solid #e5e5e5',
    fontFamily: 'system-ui, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    backgroundColor: '#f4f4f4',
  },
  title: { fontSize: '13px', fontWeight: '600', color: '#333' },
  actions: { display: 'flex', gap: '6px' },
  btn: {
    background: 'none',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#555',
  },
  content: { height: '220px' },
  textarea: {
    width: '100%',
    height: '100%',
    padding: '16px',
    backgroundColor: '#f4f4f4',
    border: 'none',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#2b5b84',
    outline: 'none',
    resize: 'none',
    boxSizing: 'border-box'
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: '#fff'
  }
};