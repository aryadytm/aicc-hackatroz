from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.param_functions import File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from linkedin_scraper import get_linkedin_profile
from pdf_to_text import get_text_from_pdf

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # allows all methods
    allow_headers=["*"],  # allows all headers
)

@app.get("/ping")
def ping() -> dict:
    return {"result": "pong"}


@app.get("/linkedin_profile/{username}")
def get_profile(username: str) -> dict:
    result = get_linkedin_profile(username)
    
    if len(str(result)) < 10:
        raise HTTPException(status_code=400, detail="Linkedin profile not found or backend server error.")
    
    return {"result": result}


@app.post("/pdf_to_text")
async def upload_pdf(file: UploadFile = File(...)):
    if file.filename.split('.')[-1].lower() != "pdf":
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a .pdf file.")

    pdf_content = file.file.read()
    extracted_text = get_text_from_pdf(pdf_content)
    
    return {"result": extracted_text}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=51323)
