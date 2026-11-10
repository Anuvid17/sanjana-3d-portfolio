/**
 * Utility to reliably download files (like PDFs) even in iframes
 * by fetching as a blob and triggering an object URL download link.
 */
export async function downloadFile(url: string, filename: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
    return true;
  } catch (error) {
    console.warn('Blob download failed, trying direct link fallback:', error);
    // Fallback: direct navigation or opening in new window
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
    }, 1000);
    return false;
  }
}
