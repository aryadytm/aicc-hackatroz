import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeToASCII(text: string) {
  // Replace any non-ASCII characters with an empty string
  return text.replace(/[^\x00-\x7F]/g, "");
}

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

export const convertPDFToText = async (file: File) => {
  const pdfBase64: string = await toBase64(file)
  const pdf = await pdfjs.getDocument(pdfBase64).promise

  var maxPages = pdf._pdfInfo.numPages;
  var countPromises: Promise<any>[] = []; // collecting all page promises

  async function getTextContent(page: any) {
    var textContent = await page.getTextContent();
    return textContent.items.map(function (s: any) { return s.str; }).join(' '); // value page text
  }

  async function extractText() {
    for (var j = 1; j <= maxPages; j++) {
      var page = await pdf.getPage(j);
      countPromises.push(getTextContent(page));
    }
    // Wait for all pages and join text
    var texts = await Promise.all(countPromises);
    return texts.join('');
  }

  const result = await extractText()
  return result
}