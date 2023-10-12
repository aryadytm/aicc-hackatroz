FROM mcr.microsoft.com/devcontainers/python:1-3.10-bullseye

# Additional production commands
WORKDIR /workdir
COPY . /workdir
RUN chmod -R 777 *
RUN pip install -r requirements.txt

RUN apt update -y
RUN apt install -y tesseract-ocr tesseract-ocr-eng