import io
import fitz
import pytesseract
import re
import string

from PIL import Image


pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'


def get_text_from_pdf(pdf_file_content: bytes) -> str:
    # Initialize a memory file for the given content
    pdf_file_io = io.BytesIO(pdf_file_content)

    # Initialize PyMuPDF document object with memory file
    doc = fitz.open("pdf", pdf_file_io.read())
    extracted_text = ''

    for page in doc:
        # Extract text directly from the page
        extracted_text += page.get_text()

        # Extract text from images
        for img_index in page.get_images(full=True):
            base_image = doc.extract_image(img_index[0])
            img_bytes = base_image["image"]

            # Open the image using PIL
            img = Image.open(io.BytesIO(img_bytes))
            
            # Use pytesseract to do OCR on the image
            extracted_text += pytesseract.image_to_string(img)

    return cleanup_text(extracted_text)


def cleanup_text(yaml_str: str) -> str:
    # Remove non printable character
    yaml_str = ''.join(filter(lambda x: x in string.printable, yaml_str))
    # Remove quotes (single and double)
    yaml_str = re.sub(r'["\']', '', yaml_str)
    # Remove redundant "\" escapes
    yaml_str = re.sub(r'\\{1,}', '', yaml_str)
    # Remove double/triple newlines
    yaml_str = re.sub(r'\n{2,}', '\n', yaml_str)
    # Remove double/triple spaces
    yaml_str = re.sub(r' {2,}', ' ', yaml_str)
    return yaml_str
    

if __name__ == "__main__":
    path_to_pdf = "test_files/cv_arya.pdf"
    # Call get_text_from_pdf function
    extracted_text = get_text_from_pdf(open(path_to_pdf, "rb").read())
    print("Results:", extracted_text)