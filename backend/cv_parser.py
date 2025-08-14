import os
import tempfile
from pathlib import Path
from typing import Dict

import nltk
import spacy
from pyresparser import ResumeParser


class CVParser:
    def __init__(self):
        self.setup_dependencies()

    def setup_dependencies(self):
        """Download required NLTK data and spaCy model if not present"""
        self.spacy_available = False
        try:
            # Download required NLTK data
            nltk.download("punkt", quiet=True)
            nltk.download("averaged_perceptron_tagger", quiet=True)
            nltk.download("maxent_ne_chunker", quiet=True)
            nltk.download("words", quiet=True)
            nltk.download("stopwords", quiet=True)

            # Check if spaCy model exists
            try:
                spacy.load("en_core_web_sm")
                self.spacy_available = True
                print("✅ spaCy model loaded successfully")
            except OSError:
                print("⚠️ spaCy model 'en_core_web_sm' not found.")
                print("Install with: python -m spacy download en_core_web_sm")
                self.spacy_available = False

        except Exception as e:
            print(f"Warning: Could not setup dependencies: {e}")
            self.spacy_available = False

    def parse_cv(self, file_path: str) -> Dict:
        """
        Parse CV and extract structured information
        """
        if not self.spacy_available:
            # Fall back to simple parsing if spaCy is not available
            print("⚠️ Using fallback parsing method (spaCy not available)")
            from simple_cv_parser import SimpleCVParser

            simple_parser = SimpleCVParser()
            return simple_parser.parse_cv(file_path)

        try:
            # Use pyresparser to extract information
            data = ResumeParser(file_path).get_extracted_data()

            # Structure the data for our application
            parsed_data = {
                "personal_info": {
                    "name": data.get("name", ""),
                    "email": data.get("email", ""),
                    "mobile_number": data.get("mobile_number", ""),
                },
                "skills": {
                    "technical_skills": data.get("skills", []),
                    "all_skills": data.get("skills", []),
                },
                "experience": {
                    "total_experience": data.get("total_experience", 0),
                    "experience_details": [],  # pyresparser doesn't provide detailed experience
                },
                "education": {
                    "degree": data.get("degree", []),
                    "education_details": [],
                },
                "projects": [],  # pyresparser doesn't extract projects specifically
                "ats_analysis": self.analyze_ats_compatibility(data),
                "raw_data": data,  # Keep original parsed data
            }

            return parsed_data

        except Exception as e:
            print(f"⚠️ pyresparser failed: {e}, falling back to simple parser")
            from simple_cv_parser import SimpleCVParser

            simple_parser = SimpleCVParser()
            return simple_parser.parse_cv(file_path)

    def analyze_ats_compatibility(self, data: Dict) -> Dict:
        """
        Analyze CV for ATS compatibility and provide feedback
        """
        score = 0
        feedback = []
        max_score = 100

        # Check for contact information (20 points)
        if data.get("name"):
            score += 10
        else:
            feedback.append(
                "❌ Name not found - ensure your name is clearly visible at the top"
            )

        if data.get("email"):
            score += 5
        else:
            feedback.append("❌ Email not detected - add a professional email address")

        if data.get("mobile_number"):
            score += 5
        else:
            feedback.append("❌ Phone number not found - include a contact number")

        # Check for skills (30 points)
        skills = data.get("skills", [])
        if len(skills) >= 5:
            score += 30
            feedback.append(
                f"✅ Good skills section with {len(skills)} skills detected"
            )
        elif len(skills) >= 1:
            score += 15
            feedback.append(
                f"⚠️ Only {len(skills)} skills detected - consider adding more relevant skills"
            )
        else:
            feedback.append(
                "❌ No skills detected - add a skills section with relevant technical skills"
            )

        # Check for experience (25 points)
        total_exp = data.get("total_experience", 0)
        if total_exp > 0:
            score += 25
            feedback.append(f"✅ Experience detected: {total_exp} years")
        else:
            score += 10
            feedback.append(
                "⚠️ Experience not clearly detected - ensure work experience is well formatted"
            )

        # Check for education (15 points)
        education = data.get("degree", [])
        if education:
            score += 15
            feedback.append(f"✅ Education detected: {', '.join(education)}")
        else:
            feedback.append(
                "❌ Education not detected - add your educational background"
            )

        # General ATS tips (10 points for structure)
        score += 10
        feedback.extend(
            [
                "💡 Use standard section headers like 'Experience', 'Education', 'Skills'",
                "💡 Use bullet points for better readability",
                "💡 Include relevant keywords from job descriptions",
                "💡 Use standard date formats (MM/YYYY)",
                "💡 Save as PDF to preserve formatting",
            ]
        )

        return {
            "score": min(score, max_score),
            "feedback": feedback,
            "grade": self.get_ats_grade(score),
        }

    def get_ats_grade(self, score: int) -> str:
        """Convert score to letter grade"""
        if score >= 90:
            return "A+ (Excellent ATS compatibility)"
        elif score >= 80:
            return "A (Very good ATS compatibility)"
        elif score >= 70:
            return "B (Good ATS compatibility)"
        elif score >= 60:
            return "C (Fair ATS compatibility)"
        else:
            return "D (Needs improvement for ATS compatibility)"

    def save_uploaded_file(self, file_content: bytes, filename: str) -> str:
        """Save uploaded file temporarily and return path"""
        # Create uploads directory if it doesn't exist
        upload_dir = Path("uploads")
        upload_dir.mkdir(exist_ok=True)

        # Create temporary file
        suffix = Path(filename).suffix
        temp_file = tempfile.NamedTemporaryFile(
            delete=False, suffix=suffix, dir=upload_dir
        )

        temp_file.write(file_content)
        temp_file.close()

        return temp_file.name

    def cleanup_file(self, file_path: str):
        """Remove temporary file"""
        try:
            os.unlink(file_path)
        except Exception:
            pass  # Ignore cleanup errors
