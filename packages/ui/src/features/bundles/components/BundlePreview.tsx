import React, { useEffect, useRef } from 'react';

import type { Bundle } from '../state';

interface Props {
  bundle: Bundle | undefined;
}

const BundlePreview = ({ bundle }: Props): JSX.Element => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current != null)
      iframeRef.current.src = '/bundle-preview.html';
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
