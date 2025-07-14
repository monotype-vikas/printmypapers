import React, { useState, useRef } from "react";
import "./ResumeBuilder.css";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [enhancedResume, setEnhancedResume] = useState(null);
  const [jobSuggestions, setJobSuggestions] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    targetRole: "",
    experience: "",
    skills: "",
  });
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      (file.type === "application/pdf" || file.type.startsWith("image/"))
    ) {
      setResumeFile(file);
    } else {
      alert("Please upload a PDF or image file.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const processResume = async () => {
    setIsProcessing(true);

    // Simulate AI processing (replace with actual API calls)
    setTimeout(() => {
      setEnhancedResume({
        originalFile: resumeFile,
        enhancedContent: generateEnhancedResume(userInfo, jobDescription),
        suggestions: generateResumeSuggestions(userInfo),
        score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
      });

      setJobSuggestions(generateJobSuggestions(userInfo));
      setCurrentStep(3);
      setIsProcessing(false);
    }, 3000);
  };

  const generateEnhancedResume = (info, jobDesc) => {
    return `
# ${info.name}
${info.currentRole} | ${info.email} | ${info.phone}

## Professional Summary
Experienced ${info.currentRole} with ${info.experience} years of expertise in ${
      info.skills
    }. Proven track record of delivering high-quality results and driving business growth.

## Skills
${info.skills}

## Experience
### ${info.currentRole}
- Led cross-functional teams to deliver projects on time and within budget
- Implemented process improvements resulting in 25% efficiency gains
- Collaborated with stakeholders to define project requirements and success metrics

## Education
Bachelor's Degree in Relevant Field

## Certifications
- Professional Certification in ${info.skills.split(",")[0]}
- Industry-specific training and workshops
    `;
  };

  const generateResumeSuggestions = (info) => {
    return [
      "Add quantifiable achievements with specific metrics",
      "Include relevant keywords from job descriptions",
      "Highlight leadership and project management experience",
      "Add industry-specific certifications",
      "Include a professional summary tailored to target roles",
    ];
  };

  const generateJobSuggestions = (info) => {
    const roles = [
      {
        title: `${info.targetRole || info.currentRole} - Senior Level`,
        company: "Tech Company Inc.",
        location: "Remote/Hybrid",
        salary: "$80,000 - $120,000",
        match: "95%",
      },
      {
        title: `${info.targetRole || info.currentRole} - Lead Position`,
        company: "Innovation Corp",
        location: "New York, NY",
        salary: "$90,000 - $130,000",
        match: "88%",
      },
      {
        title: `${info.targetRole || info.currentRole} - Manager`,
        company: "Growth Solutions",
        location: "San Francisco, CA",
        salary: "$100,000 - $150,000",
        match: "82%",
      },
    ];
    return roles;
  };

  const downloadResume = () => {
    const element = document.createElement("a");
    const file = new Blob([enhancedResume.enhancedContent], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${userInfo.name}_Enhanced_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setResumeFile(null);
    setJobDescription("");
    setEnhancedResume(null);
    setJobSuggestions([]);
    setUserInfo({
      name: "",
      email: "",
      phone: "",
      currentRole: "",
      targetRole: "",
      experience: "",
      skills: "",
    });
  };

  return (
    <section id="resume-builder" className="resume-builder">
      <div className="resume-container">
        <div className="section-header">
          <h2>🎯 Free AI Resume Builder</h2>
          <p>
            Upload your resume and get AI-powered enhancements plus job
            suggestions
          </p>
        </div>

        <div className="resume-content">
          {currentStep === 1 && (
            <div className="step-1">
              <div className="upload-section">
                <h3>📄 Upload Your Resume</h3>
                <div
                  className="upload-area"
                  onClick={() => fileInputRef.current.click()}
                >
                  <div className="upload-content">
                    <span className="upload-icon">📁</span>
                    <p>Click to upload your resume (PDF or Image)</p>
                    <p className="upload-hint">
                      We'll analyze and enhance your resume using AI
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </div>
                {resumeFile && (
                  <div className="file-info">
                    <span>✅ {resumeFile.name}</span>
                  </div>
                )}
              </div>

              <div className="job-description-section">
                <h3>💼 Job Description (Optional)</h3>
                <p>Add a job description to get targeted resume improvements</p>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here to get tailored suggestions..."
                  rows="6"
                />
              </div>

              <button
                className="next-btn"
                onClick={() => setCurrentStep(2)}
                disabled={!resumeFile}
              >
                Next: Add Your Details
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-2">
              <h3>👤 Your Information</h3>
              <p>Help us create a personalized enhanced resume</p>

              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label>Current Role *</label>
                  <input
                    type="text"
                    name="currentRole"
                    value={userInfo.currentRole}
                    onChange={handleInputChange}
                    placeholder="Software Engineer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Target Role</label>
                  <input
                    type="text"
                    name="targetRole"
                    value={userInfo.targetRole}
                    onChange={handleInputChange}
                    placeholder="Senior Software Engineer"
                  />
                </div>

                <div className="form-group">
                  <label>Years of Experience *</label>
                  <input
                    type="text"
                    name="experience"
                    value={userInfo.experience}
                    onChange={handleInputChange}
                    placeholder="5 years"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Key Skills *</label>
                  <textarea
                    name="skills"
                    value={userInfo.skills}
                    onChange={handleInputChange}
                    placeholder="JavaScript, React, Node.js, Python, AWS, Docker..."
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="button-group">
                <button className="back-btn" onClick={() => setCurrentStep(1)}>
                  ← Back
                </button>
                <button
                  className="process-btn"
                  onClick={processResume}
                  disabled={
                    !userInfo.name ||
                    !userInfo.currentRole ||
                    !userInfo.experience ||
                    !userInfo.skills
                  }
                >
                  🚀 Process Resume with AI
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-3">
              {isProcessing ? (
                <div className="processing">
                  <div className="loading-spinner"></div>
                  <h3>🤖 AI is Enhancing Your Resume</h3>
                  <p>
                    Analyzing your experience, skills, and job requirements...
                  </p>
                  <div className="progress-steps">
                    <div className="step">📄 Analyzing resume structure</div>
                    <div className="step">🎯 Identifying key achievements</div>
                    <div className="step">💡 Generating improvements</div>
                    <div className="step">🔍 Finding job opportunities</div>
                  </div>
                </div>
              ) : (
                <div className="results">
                  <div className="enhanced-resume-section">
                    <h3>✨ Enhanced Resume</h3>
                    <div className="resume-score">
                      <span className="score">
                        Resume Score: {enhancedResume.score}/100
                      </span>
                    </div>

                    <div className="resume-preview">
                      <pre>{enhancedResume.enhancedContent}</pre>
                    </div>

                    <div className="suggestions-section">
                      <h4>💡 AI Suggestions</h4>
                      <ul>
                        {enhancedResume.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>

                    <button className="download-btn" onClick={downloadResume}>
                      📥 Download Enhanced Resume
                    </button>
                  </div>

                  <div className="job-suggestions-section">
                    <h3>🎯 Job Opportunities</h3>
                    <p>
                      Based on your resume, here are some matching positions:
                    </p>

                    <div className="job-cards">
                      {jobSuggestions.map((job, index) => (
                        <div key={index} className="job-card">
                          <div className="job-header">
                            <h4>{job.title}</h4>
                            <span className="match-badge">
                              {job.match} Match
                            </span>
                          </div>
                          <div className="job-details">
                            <p>
                              <strong>Company:</strong> {job.company}
                            </p>
                            <p>
                              <strong>Location:</strong> {job.location}
                            </p>
                            <p>
                              <strong>Salary:</strong> {job.salary}
                            </p>
                          </div>
                          <button className="apply-btn">Apply Now</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button className="new-resume-btn" onClick={resetForm}>
                      🆕 Create Another Resume
                    </button>
                    <button
                      className="print-btn"
                      onClick={() => window.print()}
                    >
                      🖨️ Print Resume
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilder;
