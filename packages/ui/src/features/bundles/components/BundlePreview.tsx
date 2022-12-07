import React, { useEffect, useRef } from 'react';

import type { Bundle } from '../state';

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bundle Preview</title>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const handleError = (error) => {
        const root = document.getElementById('root');
        const head = document.createElement('h4');
        head.style.color = '#ef4444';
        head.innerText = error.name;
        const body = document.createElement('p');
        body.style.color = '#ef4444';
        body.innerText = error.message;
        root.appendChild(head);
        root.appendChild(body);
      };

      window.addEventListener('error', ({ error }) => {
        event.preventDefault();
        handleError(error);
      });

      window.addEventListener(
        'message',
        ({ data }) => {
          try {
            eval(data);
          } catch (error) {
            handleError(error);
          }
        },
        false
      );
    </script>
  </body>
</html>

`;

interface Props {
  bundle: Bundle | undefined;
}

const BundlePreview = ({ bundle }: Props): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current != null) iframeRef.current.srcdoc = html;
    const timer = setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(bundle?.content, '*');
    }, 150);
    return () => clearTimeout(timer);
  }, [bundle?.content]);

  return (
    <div className="flex-auto bg-white">
      {bundle?.error != null ? (
        <div className="p-4 text-error">{bundle.error}</div>
      ) : (
        <iframe
          ref={iframeRef}
          title="Bundle Preview"
          sandbox="allow-scripts"
          className="w-full h-full"
        />
      )}
    </div>
  );
};

export default BundlePreview;
