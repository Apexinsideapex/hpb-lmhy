import os
import tempfile
import re
from typing import Dict, List
from pathlib import Path
import pdfplumber
from docx import Document

class SimpleCVParser:
    """A simple CV parser that doesn't rely on pyresparser for debugging"""
    
    def __init__(self):
        pass
    
    def parse_cv(self, file_path: str) -> Dict:
        """Parse CV and extract basic information"""
        try:
            # Extract text based on file type
            text = self.extract_text(file_path)
            
            if not text:
                return self.get_empty_response("Could not extract text from file")
            
            # Extract information using simple regex patterns
            personal_info = self.extract_personal_info(text)
            skills = self.extract_skills(text)
            experience = self.extract_experience(text)
            education = self.extract_education(text)
            
            parsed_data = {
                "personal_info": personal_info,
                "skills": skills,
                "experience": experience,
                "education": education,
                "projects": [],
                "ats_analysis": self.analyze_ats_compatibility(text, personal_info, skills, education),
                "raw_data": {"extracted_text": text[:500] + "..." if len(text) > 500 else text}
            }
            
            return parsed_data
            
        except Exception as e:
            return self.get_empty_response(f"Error parsing CV: {str(e)}")
    
    def extract_text(self, file_path: str) -> str:
        """Extract text from PDF or DOCX file"""
        file_ext = Path(file_path).suffix.lower()
        
        try:
            if file_ext == '.pdf':
                return self.extract_pdf_text(file_path)
            elif file_ext in ['.doc', '.docx']:
                return self.extract_docx_text(file_path)
            else:
                return ""
        except Exception as e:
            print(f"Error extracting text: {e}")
            return ""
    
    def extract_pdf_text(self, file_path: str) -> str:
        """Extract text from PDF"""
        text = ""
        try:
            with pdfplumber.open(file_path) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
        except Exception as e:
            print(f"Error reading PDF: {e}")
        return text
    
    def extract_docx_text(self, file_path: str) -> str:
        """Extract text from DOCX"""
        text = ""
        try:
            doc = Document(file_path)
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"
        except Exception as e:
            print(f"Error reading DOCX: {e}")
        return text
    
    def extract_personal_info(self, text: str) -> Dict:
        """Extract personal information using regex"""
        personal_info = {"name": "", "email": "", "mobile_number": ""}
        
        # Extract email
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        email_match = re.search(email_pattern, text)
        if email_match:
            personal_info["email"] = email_match.group()
        
        # Extract phone number (simple patterns)
        phone_patterns = [
            r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b',  # US format
            r'\b\(\d{3}\)\s*\d{3}[-.]?\d{4}\b',  # (123) 456-7890
            r'\+\d{1,3}[-.\s]?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b'  # International
        ]
        
        for pattern in phone_patterns:
            phone_match = re.search(pattern, text)
            if phone_match:
                personal_info["mobile_number"] = phone_match.group()
                break
        
        # Extract name (first line that looks like a name)
        lines = text.split('\n')
        for line in lines[:5]:  # Check first 5 lines
            line = line.strip()
            if len(line.split()) == 2 and line.replace(' ', '').isalpha() and len(line) > 5:
                personal_info["name"] = line
                break
        
        return personal_info
    
    def extract_skills(self, text: str) -> Dict:
        """Extract skills using common programming/technical terms"""
        common_skills = [
            "Python", "Java", "JavaScript", "React", "Node.js", "SQL", "HTML", "CSS",
            "Git", "Docker", "AWS", "Azure", "MongoDB", "PostgreSQL", "MySQL",
            "FastAPI", "Django", "Flask", "Express", "Vue.js", "Angular",
            "Machine Learning", "Data Science", "TensorFlow", "Pandas", "NumPy"
        ]
        
        found_skills = []
        text_lower = text.lower()
        
        for skill in common_skills:
            if skill.lower() in text_lower:
                found_skills.append(skill)
        
        return {
            "technical_skills": found_skills,
            "all_skills": found_skills
        }
    
    def extract_experience(self, text: str) -> Dict:
        """Extract experience information"""
        # Look for years of experience patterns
        exp_patterns = [
            r'(\d+)\+?\s*years?\s*of\s*experience',
            r'(\d+)\+?\s*years?\s*experience',
            r'experience:?\s*(\d+)\+?\s*years?'
        ]
        
        total_exp = 0
        for pattern in exp_patterns:
            match = re.search(pattern, text.lower())
            if match:
                total_exp = int(match.group(1))
                break
        
        return {
            "total_experience": total_exp,
            "experience_details": []
        }
    
    def extract_education(self, text: str) -> Dict:
        """Extract education information"""
        education_keywords = [
            "Bachelor", "Master", "PhD", "Doctorate", "MBA", "B.S.", "M.S.",
            "Computer Science", "Engineering", "Business", "Mathematics"
        ]
        
        found_education = []
        for keyword in education_keywords:
            if keyword.lower() in text.lower():
                found_education.append(keyword)
        
        return {
            "degree": found_education,
            "education_details": []
        }
    
    def analyze_ats_compatibility(self, text: str, personal_info: Dict, skills: Dict, education: Dict) -> Dict:
        """Simple ATS analysis"""
        score = 0
        feedback = []
        
        # Contact information (30 points)
        if personal_info.get('name'):
            score += 10
            feedback.append("✅ Name detected")
        else:
            feedback.append("❌ Name not clearly detected")
        
        if personal_info.get('email'):
            score += 10
            feedback.append("✅ Email found")
        else:
            feedback.append("❌ Email not found")
        
        if personal_info.get('mobile_number'):
            score += 10
            feedback.append("✅ Phone number found")
        else:
            feedback.append("❌ Phone number not found")
        
        # Skills (40 points)
        skills_count = len(skills.get('technical_skills', []))
        if skills_count >= 5:
            score += 40
            feedback.append(f"✅ Good skills section ({skills_count} skills)")
        elif skills_count >= 1:
            score += 20
            feedback.append(f"⚠️ Some skills found ({skills_count} skills)")
        else:
            feedback.append("❌ No technical skills detected")
        
        # Education (20 points)
        if education.get('degree'):
            score += 20
            feedback.append("✅ Education section found")
        else:
            feedback.append("❌ Education not clearly detected")
        
        # General formatting (10 points)
        score += 10
        feedback.append("✅ File successfully parsed")
        
        return {
            "score": min(score, 100),
            "feedback": feedback,
            "grade": self.get_ats_grade(score)
        }
    
    def get_ats_grade(self, score: int) -> str:
        """Convert score to letter grade"""
        if score >= 90:
            return "A+ (Excellent)"
        elif score >= 80:
            return "A (Very Good)"
        elif score >= 70:
            return "B (Good)"
        elif score >= 60:
            return "C (Fair)"
        else:
            return "D (Needs Improvement)"
    
    def get_empty_response(self, error_msg: str) -> Dict:
        """Return empty response structure with error"""
        return {
            "personal_info": {"name": "", "email": "", "mobile_number": ""},
            "skills": {"technical_skills": [], "all_skills": []},
            "experience": {"total_experience": 0, "experience_details": []},
            "education": {"degree": [], "education_details": []},
            "projects": [],
            "ats_analysis": {"score": 0, "feedback": [f"❌ {error_msg}"], "grade": "Error"},
            "raw_data": {"error": error_msg}
        }
    
    def save_uploaded_file(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file temporarily and return path"""
        upload_dir = Path("uploads")
        upload_dir.mkdir(exist_ok=True)
        
        suffix = Path(filename).suffix
        temp_file = tempfile.NamedTemporaryFile(
            delete=False, 
            suffix=suffix,
            dir=upload_dir
        )
        
        temp_file.write(file_content)
        temp_file.close()
        
        return temp_file.name

    def cleanup_file(self, file_path: str):
        """Remove temporary file"""
        try:
            os.unlink(file_path)
        except Exception:
            pass