export async function downloadImage(src: string, filename: string) {
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const blob = await response.blob();

  // Create a temporary URL for the blob
  const url = window.URL.createObjectURL(blob);

  // Create a temporary anchor element to trigger the download
  const a = document.createElement("a");
  a.setAttribute("style", "display: none");
  a.href = url;
  a.download = filename; // Set the filename here
  document.body.appendChild(a);
  a.click();

  // Clean up
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
