from datetime import datetime
from enum import Enum
from typing import List, Optional

try:
    from cv_parser import CVParser
    cv_parser = CVParser()
    print("✅ Using advanced CV parser (pyresparser)")
except ImportError as e:
    print(f"⚠️ Advanced parser not available: {e}")
    print("🔄 Using simple CV parser fallback")
    from simple_cv_parser import SimpleCVParser
    cv_parser = SimpleCVParser()
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Job Tracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class JobStatus(str, Enum):
    SAVED = "saved"
    APPLIED = "applied"
    INTERVIEW = "interview"
    OFFER = "offer"
    REJECTED = "rejected"


class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Job(BaseModel):
    id: Optional[str] = None
    company: str
    position: str
    salary: Optional[str] = None
    location: Optional[str] = None
    status: JobStatus = JobStatus.SAVED
    priority: Priority = Priority.MEDIUM
    application_date: Optional[datetime] = None
    deadline: Optional[datetime] = None
    job_url: Optional[str] = None
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class Contact(BaseModel):
    id: Optional[str] = None
    job_id: str
    name: str
    email: Optional[str] = None
    role: Optional[str] = None
    notes: Optional[str] = None


class Analytics(BaseModel):
    total_applications: int
    response_rate: float
    interviews_scheduled: int
    offers_received: int
    applications_this_week: int
    applications_this_month: int


class UserProfile(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    mobile_number: Optional[str] = None
    skills: List[str] = []
    total_experience: float = 0
    education: List[str] = []
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CVParseResponse(BaseModel):
    personal_info: dict
    skills: dict
    experience: dict
    education: dict
    projects: List[dict]
    ats_analysis: dict
    raw_data: dict


# Mock data storage (replace with database)
jobs_db = []
contacts_db = []
user_profiles_db = []

# CV parser is initialized above


@app.get("/")
async def root():
    return {"message": "Job Tracker API"}

@app.get("/api/test")
async def test_endpoint():
    return {"status": "Backend is working", "cv_parser": type(cv_parser).__name__}


@app.get("/api/jobs", response_model=List[Job])
async def get_jobs(status: Optional[JobStatus] = None):
    if status:
        return [job for job in jobs_db if job.status == status]
    return jobs_db


@app.post("/api/jobs", response_model=Job)
async def create_job(job: Job):
    # TODO: Add to database
    # TODO: Generate unique ID
    # TODO: Set timestamps
    return job


@app.get("/api/jobs/{job_id}", response_model=Job)
async def get_job(job_id: str):
    # TODO: Fetch from database
    pass


@app.put("/api/jobs/{job_id}", response_model=Job)
async def update_job(job_id: str, job: Job):
    # TODO: Update in database
    return job


@app.delete("/api/jobs/{job_id}")
async def delete_job(job_id: str):
    # TODO: Delete from database
    return {"message": "Job deleted"}


@app.get("/api/contacts", response_model=List[Contact])
async def get_contacts(job_id: Optional[str] = None):
    if job_id:
        return [contact for contact in contacts_db if contact.job_id == job_id]
    return contacts_db


@app.post("/api/contacts", response_model=Contact)
async def create_contact(contact: Contact):
    # TODO: Add to database
    return contact


@app.get("/api/analytics", response_model=Analytics)
async def get_analytics():
    # TODO: Calculate analytics from database
    return Analytics(
        total_applications=0,
        response_rate=0.0,
        interviews_scheduled=0,
        offers_received=0,
        applications_this_week=0,
        applications_this_month=0,
    )


@app.post("/api/cv/upload", response_model=CVParseResponse)
async def upload_and_parse_cv(file: UploadFile = File(...)):
    """
    Upload CV and parse it to extract structured information
    """
    print(f"📁 Received file: {file.filename}")
    
    # Validate file type
    if not file.filename or not file.filename.lower().endswith((".pdf", ".doc", ".docx")):
        raise HTTPException(
            status_code=400, detail="Only PDF, DOC, and DOCX files are supported"
        )

    # Validate file size (max 10MB)
    file_content = await file.read()
    print(f"📏 File size: {len(file_content)} bytes")
    
    if len(file_content) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be less than 10MB")

    temp_file_path = None
    try:
        # Save uploaded file temporarily
        print("💾 Saving file temporarily...")
        temp_file_path = cv_parser.save_uploaded_file(file_content, file.filename)
        print(f"✅ File saved to: {temp_file_path}")

        # Parse the CV
        print("🔍 Parsing CV...")
        parsed_data = cv_parser.parse_cv(temp_file_path)
        print(f"✅ CV parsed successfully")
        print(f"📊 Parser result: {parsed_data}")

        return CVParseResponse(**parsed_data)

    except Exception as e:
        print(f"❌ Error processing CV: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing CV: {str(e)}")
    finally:
        # Clean up temporary file
        if temp_file_path:
            print(f"🗑️ Cleaning up: {temp_file_path}")
            cv_parser.cleanup_file(temp_file_path)


@app.post("/api/profile", response_model=UserProfile)
async def create_user_profile(profile: UserProfile):
    """
    Create user profile from parsed CV data
    """
    # TODO: Save to database
    # TODO: Generate unique ID
    # TODO: Set timestamps
    user_profiles_db.append(profile)
    return profile


@app.get("/api/profile/{user_id}", response_model=UserProfile)
async def get_user_profile(user_id: str):
    """
    Get user profile by ID
    """
    # TODO: Fetch from database
    for profile in user_profiles_db:
        if profile.id == user_id:
            return profile
    raise HTTPException(status_code=404, detail="Profile not found")


@app.put("/api/profile/{user_id}", response_model=UserProfile)
async def update_user_profile(user_id: str, profile: UserProfile):
    """
    Update user profile
    """
    # TODO: Update in database
    return profile


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
