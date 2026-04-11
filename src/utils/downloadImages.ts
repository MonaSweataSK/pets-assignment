const downloadImage = async (url: string): Promise<void> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  let filename = url.split('/').pop() || 'image';
  filename = filename.split('?')[0];
  if (!filename.includes('.')) {
    filename += '.jpg';
  }

  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(objectUrl);
};

/**
 downloads all selected images sequentially.small delay is added between each download to prevent browsers from blocking multiple downloads.
 */
export const downloadSelectedImages = async (urls: string[]): Promise<void> => {
  for (const url of urls) {
    await downloadImage(url);
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
};
