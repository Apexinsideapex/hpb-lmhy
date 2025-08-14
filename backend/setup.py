#!/usr/bin/env python3
"""
Setup script for Job Tracker backend
This script installs required dependencies for CV parsing
"""

import os
import subprocess

import nltk


def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(
            command, shell=True, check=True, capture_output=True, text=True
        )
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e.stderr}")
        return False


def main():
    print("🚀 Setting up Job Tracker Backend")
    print("=" * 50)

    # Install Python dependencies
    if not run_command("uv sync", "Installing Python dependencies"):
        print("\n❌ Failed to install dependencies. Please ensure uv is installed.")
        print("Install uv with: curl -LsSf https://astral.sh/uv/install.sh | sh")
        return False

    # Download spaCy model
    if not run_command(
        "uv run python -m spacy download en_core_web_sm",
        "Downloading spaCy English model",
    ):
        print("\n⚠️  spaCy model download failed. CV parsing may not work optimally.")
        print("You can manually download it later with:")
        print("python -m spacy download en_core_web_sm")

    # Download nltk packages
    print("Downloading nltk dependencies")
    if nltk.download("stopwords"):
        print("\n Sucessfully downloaded nltk packages")
    else:
        print("Issue in nltk download")

    # Create uploads directory
    uploads_dir = "uploads"
    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)
        print(f"✅ Created {uploads_dir} directory")

    print("\n🎉 Setup completed!")
    print("\nTo start the backend server:")
    print("1. Activate the virtual environment: source .venv/bin/activate")
    print("2. Run the server: python main.py")
    print("\nThe API will be available at http://localhost:8000")
    print("API documentation at http://localhost:8000/docs")


if __name__ == "__main__":
    main()
