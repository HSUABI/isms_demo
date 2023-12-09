#pip install pytesseract pdf2image
#C:\Program Files\Tesseract-OCR\tesseract.exe
import PyPDF2
from konlpy.tag import Okt
import re

def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

def find_password_info(text):
    tokenizer = Okt()
    tokens = tokenizer.morphs(text)

    max_usage_period = "정보를 찾을 수 없음"
    threshold = "정보를 찾을 수 없음"

    for i, token in enumerate(tokens):
        # 비밀번호 최대 사용 기간 찾기
        if token == '비밀번호' and ('최대' in tokens[i+1:i+5] and '기간' in tokens[i+1:i+5]):
            for j in range(i+1, min(i+10, len(tokens))):
                if tokens[j].isdigit() and (tokens[j+1] == '일' or tokens[j+1].startswith('일')):
                    max_usage_period = tokens[j]
                    break

        # 비밀번호 임계값 찾기
        if token == '비밀번호' and '임계' in tokens[i+1:i+5]:
            for j in range(i+1, min(i+10, len(tokens))):
                if tokens[j].isdigit():
                    threshold = tokens[j]
                    break

    return max_usage_period, threshold

# 예제 사용
pdf_path = './sample.pdf'  # 여기에 PDF 파일 경로를 입력하세요
extracted_text = extract_text_from_pdf(pdf_path)
max_usage_period, threshold = find_password_info(extracted_text)

# 텍스트를 'pdf2txt.txt' 파일로 출력
with open('pdf2txt.txt', 'w', encoding='utf-8') as txt_file:
    txt_file.write(extracted_text)
    
with open('output_moonseo.txt', 'w', encoding='utf-8') as file:
    file.write(f"비밀번호 최대 사용 기간: {max_usage_period}일\n")
    file.write(f"비밀번호 임계값: {threshold}\n")
