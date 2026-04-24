import React, { useEffect, useMemo, useState } from "react";
import { GoogleGenAI } from "@google/genai";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Login");

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedInternshipRole, setSelectedInternshipRole] = useState("");

  const [roadmapType, setRoadmapType] = useState("skill");
  const [summaryText, setSummaryText] = useState("");

  const [resumeName, setResumeName] = useState("");
  const [resumeEmail, setResumeEmail] = useState("");
  const [resumePhone, setResumePhone] = useState("");
  const [resumeLinkedIn, setResumeLinkedIn] = useState("");
  const [resumeGithub, setResumeGithub] = useState("");
  const [resumeEducation, setResumeEducation] = useState("");
  const [resumeSkills, setResumeSkills] = useState("");
  const [resumeProjects, setResumeProjects] = useState("");
  const [resumeExperience, setResumeExperience] = useState("");
  const [resumeCertifications, setResumeCertifications] = useState("");
  const [resumeSummary, setResumeSummary] = useState("");
  const [showResumePreview, setShowResumePreview] = useState(false);

  const [authMode, setAuthMode] = useState("login");
  const [loginName, setLoginName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [typewriterText, setTypewriterText] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me about degree, domain, skill, internship, roadmap, resume, portfolio, or summary."
    }
  ]);

  const ai = new GoogleGenAI({
    apiKey: process.env.REACT_APP_GEMINI_API_KEY
  });

  const courseSkills = {
    BSc: {
      General: ["Python", "SQL", "Excel", "Communication"],
      "AI/ML": ["Python", "Machine Learning", "Deep Learning", "TensorFlow"],
      "Data Science": ["Python", "SQL", "Pandas", "Power BI", "Data Visualization"],
      IT: ["Networking", "Linux", "Cyber Security", "Cloud Basics"],
      Biotechnology: ["Research", "Documentation", "Lab Skills"],
      Mathematics: ["Python", "Statistics", "Problem Solving", "Analytics"]
    },
    BTech: {
      "Computer Science": ["DSA", "Java", "DBMS", "OS", "System Design", "Web Development"],
      "AI/ML": ["Python", "Machine Learning", "Deep Learning", "TensorFlow"],
      "Data Science": ["Python", "SQL", "Power BI", "Analytics", "Pandas"],
      IT: ["Networking", "Linux", "Cloud Basics", "Cyber Security"],
      Electronics: ["Embedded Systems", "IoT", "C Programming"],
      Mechanical: ["AutoCAD", "Problem Solving", "Technical Design"],
      Civil: ["AutoCAD", "Project Planning", "Technical Drawing"]
    },
    BE: {
      "Computer Engineering": ["C++", "Java", "DSA", "DBMS", "Web Development"],
      IT: ["Networking", "Cloud Basics", "Cyber Security"],
      Electronics: ["Embedded Systems", "IoT", "C Programming"],
      Mechanical: ["AutoCAD", "Technical Design"],
      Civil: ["AutoCAD", "Project Planning"]
    },
    BCA: {
      General: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
      "Full Stack": ["React", "Node.js", "MongoDB", "Express", "JavaScript"],
      Data: ["SQL", "Excel", "Analytics", "Power BI"],
      Cyber: ["Networking", "Linux", "Cyber Security"]
    },
    MCA: {
      General: ["Java", "React", "Node.js", "SQL", "System Design"],
      "AI/ML": ["Python", "Machine Learning", "Deep Learning"],
      "Full Stack": ["React", "Node.js", "MongoDB", "SQL"],
      Data: ["Python", "SQL", "Analytics", "Power BI"]
    },
    BBA: {
      General: ["Communication", "Management", "Excel"],
      Marketing: ["Digital Marketing", "SEO", "Social Media Marketing"],
      Finance: ["Excel", "Financial Analysis", "Accounting"],
      HR: ["Communication", "Recruitment", "People Management"],
      Analytics: ["Excel", "Power BI", "Business Analytics"]
    },
    BCom: {
      General: ["Accounting", "Excel", "Communication"],
      Finance: ["Financial Analysis", "Excel", "Tally"],
      Banking: ["Finance Basics", "Communication", "Excel"],
      Analytics: ["Excel", "SQL", "Power BI"],
      Taxation: ["Tax Basics", "Accounting", "Excel"]
    },
    MBA: {
      General: ["Leadership", "Communication", "Excel", "Management"],
      Marketing: ["Digital Marketing", "Branding", "SEO"],
      Finance: ["Financial Analysis", "Excel", "Reporting"],
      HR: ["Recruitment", "Communication", "Leadership"],
      Operations: ["Project Management", "Analytics", "Excel"]
    },
    BA: {
      General: ["Communication", "Content Writing", "Research", "Presentation Skills"],
      English: ["Writing", "Editing", "Research"],
      Psychology: ["Research", "Communication", "Documentation"],
      Journalism: ["Content Writing", "Digital Media", "Communication"]
    },
    BDes: {
      General: ["UI/UX", "Figma", "Design Thinking", "Creativity"],
      UIUX: ["Figma", "Wireframing", "Prototyping", "User Research"],
      Graphic: ["Photoshop", "Illustrator", "Brand Design"]
    },
    Diploma: {
      General: ["HTML", "CSS", "JavaScript", "Basic Computer", "Communication"],
      CS: ["HTML", "CSS", "JavaScript", "SQL"],
      Mechanical: ["AutoCAD", "Technical Drawing"],
      Electrical: ["Circuit Basics", "Problem Solving"]
    },
    MSc: {
      General: ["Python", "SQL", "Analytics", "Research"],
      "Data Science": ["Python", "SQL", "Statistics", "Power BI"],
      Mathematics: ["Statistics", "Python", "Problem Solving"]
    },
    BEd: {
      General: ["Teaching Skills", "Communication", "Presentation"],
      Primary: ["Teaching Skills", "Communication"],
      Secondary: ["Presentation", "Classroom Planning"]
    },
    LLB: {
      General: ["Legal Research", "Communication", "Drafting"],
      Corporate: ["Research", "Documentation", "Drafting"]
    },
    BHM: {
      General: ["Hospitality", "Communication", "Management"],
      Hotel: ["Customer Service", "Communication", "Management"]
    },
    ITI: {
      General: ["Technical Skills", "Basic Computer", "Safety", "Practical Work"],
      Electrician: ["Electrical Basics", "Safety", "Problem Solving"]
    }
  };

  const highDemandSkills = [
    "HTML", "CSS", "JavaScript", "React", "Node.js", "Python", "SQL",
    "Excel", "Analytics", "Communication", "Machine Learning", "Deep Learning",
    "TensorFlow", "Power BI", "Pandas", "Data Visualization", "DSA", "Java",
    "DBMS", "OS", "System Design", "Web Development", "MongoDB",
    "Cyber Security", "Linux", "Cloud Basics", "Digital Marketing", "SEO",
    "Financial Analysis", "UI/UX", "Figma", "Research"
  ];

  const skillsDetails = {
    HTML: { category: "Frontend", demand: "High", salary: "3-5 LPA", difficulty: "Easy", time: "2-3 weeks", description: "Used to structure web pages." },
    CSS: { category: "Frontend", demand: "High", salary: "3-5 LPA", difficulty: "Easy", time: "2-3 weeks", description: "Used to style websites." },
    JavaScript: { category: "Frontend", demand: "Very High", salary: "4-8 LPA", difficulty: "Medium", time: "1-2 months", description: "Adds logic and interactivity." },
    React: { category: "Frontend", demand: "Very High", salary: "5-10 LPA", difficulty: "Medium", time: "1-2 months", description: "Builds modern UI." },
    "Node.js": { category: "Backend", demand: "High", salary: "5-10 LPA", difficulty: "Medium", time: "1-2 months", description: "Used for backend development." },
    Python: { category: "Programming", demand: "Very High", salary: "4-10 LPA", difficulty: "Medium", time: "1-2 months", description: "Useful in AI, ML, automation and data." },
    SQL: { category: "Database", demand: "High", salary: "4-8 LPA", difficulty: "Easy", time: "3-4 weeks", description: "Used to query and manage databases." },
    Excel: { category: "Productivity", demand: "High", salary: "3-6 LPA", difficulty: "Easy", time: "2-3 weeks", description: "Useful for analysis and reports." },
    Analytics: { category: "Data", demand: "High", salary: "4-7 LPA", difficulty: "Medium", time: "1 month", description: "Helps derive insights from data." },
    Communication: { category: "Soft Skill", demand: "Very High", salary: "Useful in all roles", difficulty: "Easy", time: "Continuous", description: "Improves teamwork and interviews." },
    "Machine Learning": { category: "AI", demand: "Very High", salary: "6-12 LPA", difficulty: "Medium", time: "2-3 months", description: "Used to build predictive models." },
    "Deep Learning": { category: "AI", demand: "High", salary: "8-15 LPA", difficulty: "Hard", time: "3-4 months", description: "Advanced neural network learning." },
    TensorFlow: { category: "AI Tool", demand: "High", salary: "6-12 LPA", difficulty: "Medium", time: "1 month", description: "Framework used for AI/ML models." },
    Pandas: { category: "Data Tool", demand: "High", salary: "4-8 LPA", difficulty: "Easy", time: "2-3 weeks", description: "Python library for data analysis." },
    "Power BI": { category: "BI Tool", demand: "High", salary: "4-8 LPA", difficulty: "Medium", time: "3-4 weeks", description: "Used for dashboards and reporting." },
    Networking: { category: "IT", demand: "High", salary: "3-6 LPA", difficulty: "Medium", time: "1-2 months", description: "Understanding and managing computer networks." },
    "Cyber Security": { category: "Security", demand: "Very High", salary: "5-12 LPA", difficulty: "Medium", time: "2-3 months", description: "Protects systems and data." },
    Linux: { category: "IT", demand: "High", salary: "4-8 LPA", difficulty: "Medium", time: "3-4 weeks", description: "Useful for servers, cloud and security." },
    "Cloud Basics": { category: "Cloud", demand: "High", salary: "5-10 LPA", difficulty: "Medium", time: "1 month", description: "Intro to cloud platforms and services." },
    DSA: { category: "Programming", demand: "Very High", salary: "5-15 LPA", difficulty: "Hard", time: "2-4 months", description: "Important for coding interviews." },
    Java: { category: "Programming", demand: "High", salary: "4-10 LPA", difficulty: "Medium", time: "1-2 months", description: "Popular backend and software language." },
    DBMS: { category: "CS Core", demand: "High", salary: "Important for tech roles", difficulty: "Medium", time: "3-4 weeks", description: "Database management concepts." },
    OS: { category: "CS Core", demand: "High", salary: "Important for tech roles", difficulty: "Medium", time: "3-4 weeks", description: "Operating system fundamentals." },
    "System Design": { category: "Architecture", demand: "High", salary: "8-20 LPA", difficulty: "Hard", time: "2-3 months", description: "Designing scalable systems." },
    "Web Development": { category: "Development", demand: "Very High", salary: "4-10 LPA", difficulty: "Medium", time: "2-4 months", description: "Building full websites and apps." },
    MongoDB: { category: "Database", demand: "High", salary: "4-8 LPA", difficulty: "Easy", time: "2-3 weeks", description: "NoSQL database for full stack apps." },
    "Digital Marketing": { category: "Marketing", demand: "High", salary: "3-7 LPA", difficulty: "Easy", time: "1 month", description: "Promoting brands using digital channels." },
    SEO: { category: "Marketing", demand: "High", salary: "3-6 LPA", difficulty: "Easy", time: "2-3 weeks", description: "Improves search ranking of websites." },
    "Financial Analysis": { category: "Finance", demand: "High", salary: "4-8 LPA", difficulty: "Medium", time: "1-2 months", description: "Used to evaluate financial performance." },
    "UI/UX": { category: "Design", demand: "High", salary: "4-8 LPA", difficulty: "Medium", time: "1-2 months", description: "Designing user-friendly interfaces." },
    Figma: { category: "Design Tool", demand: "High", salary: "4-7 LPA", difficulty: "Easy", time: "2-3 weeks", description: "Tool for UI/UX design and prototyping." },
    Research: { category: "Academic/Professional", demand: "High", salary: "Useful in many fields", difficulty: "Medium", time: "Continuous", description: "Important for analysis and documentation." }
  };

  const degreeDetails = {
    BSc: { title: "BSc Career Direction", summary: "BSc students should focus on domain-specific practical skills.", focus: "AI/ML, Data Science, IT, Research." },
    BTech: { title: "BTech Career Direction", summary: "Technical degree plus specialization improves placement chances.", focus: "Software, AI/ML, Data, IT." },
    BE: { title: "BE Career Direction", summary: "Engineering basics should be supported with projects.", focus: "Development, core engineering, tools." },
    BCA: { title: "BCA Career Direction", summary: "BCA students should build strong web and software skills.", focus: "Frontend, full stack, data, software." },
    MCA: { title: "MCA Career Direction", summary: "MCA with advanced projects creates a stronger profile.", focus: "Full stack, AI/ML, backend, system design." },
    BBA: { title: "BBA Career Direction", summary: "Business degree becomes stronger with analytics and tools.", focus: "Marketing, finance, HR, analytics." },
    BCom: { title: "BCom Career Direction", summary: "Commerce students should learn tools for analysis and reporting.", focus: "Finance, banking, accounting, analytics." },
    MBA: { title: "MBA Career Direction", summary: "Management plus real tools improves job readiness.", focus: "Marketing, HR, finance, operations." }
  };

  const skillBasedInternships = {
    HTML: [{ role: "Frontend Developer Intern", stipend: "₹5k-10k", duration: "2-3 months", mode: "Remote" }],
    CSS: [{ role: "Web Design Intern", stipend: "₹5k-10k", duration: "2-3 months", mode: "Remote" }],
    JavaScript: [{ role: "Frontend Developer Intern", stipend: "₹8k-15k", duration: "3 months", mode: "Hybrid" }],
    React: [{ role: "React Developer Intern", stipend: "₹10k-20k", duration: "3-6 months", mode: "Remote" }],
    "Node.js": [{ role: "Backend Developer Intern", stipend: "₹10k-20k", duration: "3-6 months", mode: "Remote" }],
    Python: [{ role: "Python Developer Intern", stipend: "₹8k-18k", duration: "3 months", mode: "Remote" }],
    SQL: [{ role: "Data Analyst Intern", stipend: "₹8k-15k", duration: "3 months", mode: "Hybrid" }],
    Excel: [{ role: "MIS Intern", stipend: "₹5k-12k", duration: "2-3 months", mode: "Onsite" }],
    Analytics: [{ role: "Business Analyst Intern", stipend: "₹8k-15k", duration: "3 months", mode: "Hybrid" }],
    Communication: [{ role: "HR Intern", stipend: "₹5k-10k", duration: "2-3 months", mode: "Onsite" }],
    "Machine Learning": [{ role: "ML Intern", stipend: "₹10k-20k", duration: "3-6 months", mode: "Remote" }],
    "Deep Learning": [{ role: "AI Intern", stipend: "₹10k-25k", duration: "3-6 months", mode: "Remote" }],
    "Power BI": [{ role: "BI Intern", stipend: "₹8k-15k", duration: "3 months", mode: "Hybrid" }],
    Networking: [{ role: "Network Support Intern", stipend: "₹6k-12k", duration: "2-3 months", mode: "Onsite" }],
    "Cyber Security": [{ role: "Cyber Security Intern", stipend: "₹10k-20k", duration: "3 months", mode: "Hybrid" }],
    Java: [{ role: "Java Developer Intern", stipend: "₹8k-18k", duration: "3 months", mode: "Remote" }],
    DSA: [{ role: "Software Intern", stipend: "₹10k-25k", duration: "3-6 months", mode: "Hybrid" }],
    "Digital Marketing": [{ role: "Digital Marketing Intern", stipend: "₹5k-12k", duration: "2-3 months", mode: "Remote" }],
    SEO: [{ role: "SEO Intern", stipend: "₹5k-10k", duration: "2-3 months", mode: "Remote" }],
    "Financial Analysis": [{ role: "Finance Intern", stipend: "₹6k-15k", duration: "2-3 months", mode: "Onsite" }],
    "UI/UX": [{ role: "UI/UX Intern", stipend: "₹8k-15k", duration: "3 months", mode: "Remote" }],
    Figma: [{ role: "Design Intern", stipend: "₹6k-12k", duration: "2-3 months", mode: "Remote" }]
  };

  const roadmapData = {
    HTML: ["Learn basic tags", "Practice semantic HTML", "Create forms", "Build mini pages", "Make a simple website"],
    CSS: ["Learn selectors", "Box model", "Flexbox/Grid", "Responsive design", "Clone pages"],
    JavaScript: ["Variables/functions", "Arrays/objects", "DOM", "ES6", "Mini projects"],
    React: ["Components", "Props", "State", "Hooks", "Build projects"],
    "Node.js": ["Node basics", "Express", "REST APIs", "Database", "Deploy backend"],
    Python: ["Learn syntax", "Functions", "Libraries", "Mini projects", "Domain practice"],
    SQL: ["Basics", "SELECT", "WHERE/JOIN", "Practice queries", "Mini DB project"],
    Excel: ["Formulas", "Sorting/filtering", "Charts", "Reports", "Dashboards"],
    Analytics: ["Data basics", "Read reports", "Interpret trends", "Insights", "Presentation"],
    Communication: ["Speaking", "Writing", "Interview practice", "Team interaction", "Confidence"],
    "Machine Learning": ["Learn Python", "ML basics", "Datasets", "Model building", "Projects"],
    "Deep Learning": ["Neural networks", "TensorFlow/PyTorch", "Model training", "Use cases", "Projects"],
    TensorFlow: ["Install", "Basics", "Build model", "Train model", "Mini project"],
    Pandas: ["Dataframes", "Cleaning", "Filtering", "Grouping", "Analysis"],
    "Power BI": ["Basics", "Data import", "Dashboards", "Reports", "Business case project"],
    Networking: ["Network basics", "IP concepts", "Routing", "Troubleshooting", "Labs"],
    "Cyber Security": ["Security basics", "Networking", "Linux", "Vulnerabilities", "Labs/projects"],
    Linux: ["Commands", "File system", "Permissions", "Shell", "Server practice"],
    "Cloud Basics": ["Cloud intro", "Compute", "Storage", "Deployment", "Mini project"],
    DSA: ["Arrays", "Strings", "Linked lists", "Trees/graphs", "Practice problems"],
    Java: ["Basics", "OOP", "Collections", "JDBC", "Projects"],
    DBMS: ["Database basics", "Normalization", "Queries", "ER diagrams", "Mini project"],
    OS: ["Processes", "Memory", "Scheduling", "Threads", "Revision"],
    "System Design": ["Basics", "Scalability", "Databases", "Caching", "Case studies"],
    "Web Development": ["HTML/CSS", "JavaScript", "React", "Backend basics", "Full project"],
    MongoDB: ["Collections", "CRUD", "Schema basics", "Integration", "Project"],
    "Digital Marketing": ["Marketing basics", "Social media", "Campaigns", "Ads", "Portfolio"],
    SEO: ["Keyword research", "On-page SEO", "Off-page SEO", "Tools", "Optimization"],
    "Financial Analysis": ["Accounts basics", "Ratios", "Excel models", "Reports", "Case study"],
    "UI/UX": ["Design basics", "Wireframing", "User flow", "Prototyping", "Portfolio"],
    Figma: ["Frames", "Components", "Auto layout", "Prototype", "Design file"],
    Research: ["Topic selection", "Data collection", "Analysis", "Documentation", "Presentation"]
  };

  const internshipRoadmaps = {
    "Frontend Developer Intern": ["Learn HTML, CSS, JavaScript", "Practice responsive UI", "Learn React basics", "Build 2 projects", "Upload on GitHub"],
    "React Developer Intern": ["Learn React deeply", "Use props/state/hooks", "Make reusable components", "Build 2 React apps", "Prepare portfolio"],
    "Backend Developer Intern": ["Learn Node.js and APIs", "Connect database", "Build project", "Deploy project", "Prepare applications"],
    "Python Developer Intern": ["Learn Python", "Work with libraries", "Build mini apps", "Practice logic", "Apply confidently"],
    "Data Analyst Intern": ["Learn Excel and SQL", "Practice data cleaning", "Build dashboards", "Analyze datasets", "Showcase insights"],
    "Business Analyst Intern": ["Learn analytics basics", "Understand business problems", "Create reports", "Practice presentation", "Apply"],
    "MIS Intern": ["Learn Excel advanced", "Practice reports", "Formatting", "Dashboards", "Resume"],
    "HR Intern": ["Improve communication", "Learn email etiquette", "Understand hiring basics", "Practice coordination", "Apply"],
    "ML Intern": ["Learn Python", "ML algorithms", "Datasets", "Projects", "Portfolio"],
    "AI Intern": ["ML basics", "Deep learning", "Frameworks", "Projects", "Portfolio"],
    "BI Intern": ["Excel basics", "Power BI", "Reports", "Dashboards", "Presentation"],
    "Network Support Intern": ["Network basics", "Troubleshooting", "Hardware concepts", "Monitoring", "Practical work"],
    "Cyber Security Intern": ["Linux", "Networking", "Security concepts", "Labs", "Portfolio"],
    "Java Developer Intern": ["Java basics", "OOP", "Backend concepts", "Project", "Resume prep"],
    "Software Intern": ["DSA", "Core CS subjects", "Projects", "GitHub", "Interview prep"],
    "Digital Marketing Intern": ["SEO basics", "Content strategy", "Social media", "Campaigns", "Portfolio"],
    "SEO Intern": ["Keyword research", "On-page SEO", "Off-page SEO", "Tools", "Practice"],
    "Finance Intern": ["Excel", "Reporting", "Financial analysis", "Case study", "Communication"],
    "UI/UX Intern": ["Figma", "Wireframes", "Prototype", "Case study", "Portfolio"],
    "Design Intern": ["Figma basics", "Design system", "Screens", "Prototype", "Portfolio"]
  };

  const currentDomains = useMemo(() => {
    if (!selectedCourse) return [];
    return Object.keys(courseSkills[selectedCourse] || {});
  }, [selectedCourse]);

  const currentSkills = useMemo(() => {
    if (!selectedCourse || !selectedDomain) return [];
    return courseSkills[selectedCourse]?.[selectedDomain] || [];
  }, [selectedCourse, selectedDomain]);

  const currentInternships = useMemo(() => {
    return skillBasedInternships[selectedSkill] || [];
  }, [selectedSkill]);

  const currentRoadmap = useMemo(() => {
    return roadmapData[selectedSkill] || [];
  }, [selectedSkill]);

  const currentInternshipRoadmap = useMemo(() => {
    return internshipRoadmaps[selectedInternshipRole] || [];
  }, [selectedInternshipRole]);

  const portfolioDisplaySkills = useMemo(() => {
    if (!resumeSkills.trim()) return [];
    return resumeSkills.split(",").map((s) => s.trim()).filter(Boolean);
  }, [resumeSkills]);

  const portfolioDisplayProjects = useMemo(() => {
    if (!resumeProjects.trim()) return [];
    return resumeProjects.split("\n").map((s) => s.trim()).filter(Boolean);
  }, [resumeProjects]);

  const portfolioDisplayCertifications = useMemo(() => {
    if (!resumeCertifications.trim()) return [];
    return resumeCertifications.split("\n").map((s) => s.trim()).filter(Boolean);
  }, [resumeCertifications]);

  useEffect(() => {
    const words = ["Frontend Developer", "Data Analyst", "Portfolio Creator"];
    let wordIndex = 0;
    let charIndex = 0;
    let typing = true;

    const interval = setInterval(() => {
      const currentWord = words[wordIndex];
      if (typing) {
        setTypewriterText(currentWord.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentWord.length) typing = false;
      } else {
        setTypewriterText(currentWord.slice(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          typing = true;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const generateCareerSummary = () => {
    const degree = selectedCourse || "Not selected";
    const domain = selectedDomain || "Not selected";
    const skill = selectedSkill || "Not selected";
    const internship = selectedInternshipRole || "Not selected";

    setSummaryText(`
Degree: ${degree}
Domain: ${domain}
Selected Skill: ${skill}
Selected Internship: ${internship}

Detailed Summary:
${degree} student ke liye ${domain} domain ek strong specialization path ho sakta hai. ${skill} jaisi skill practical advantage deti hai aur internship readiness improve karti hai. ${internship} role practical exposure deta hai, jisse resume aur portfolio strong hote hain.

Recommended Focus:
1. Degree concepts clear karo
2. Domain specific tools seekho
3. Selected skill me projects banao
4. Resume aur portfolio update karo
5. Internship applications start karo
    `.trim());
  };

  const handleAskAI = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const prompt = `
You are a helpful career guidance chatbot inside a student dashboard.

Student selections:
Degree: ${selectedCourse || "Not selected"}
Domain: ${selectedDomain || "Not selected"}
Skill: ${selectedSkill || "Not selected"}
Internship: ${selectedInternshipRole || "Not selected"}

Instructions:
- Reply in simple Hinglish.
- Keep answer practical and concise.
- Mention missing selections if needed.
- Help with roadmap, resume, portfolio, internship, and skills.

User question:
${userMessage}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      const botReply = response.text || "No response received.";

      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: botReply }
      ]);
    } catch (error) {
      console.error(error);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "AI error aa gaya. API key ya package setup check karo."
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleDownloadResume = () => {
    const content = `
${resumeName || "Your Name"}

Email: ${resumeEmail || "-"}
Phone: ${resumePhone || "-"}
LinkedIn: ${resumeLinkedIn || "-"}
GitHub: ${resumeGithub || "-"}

PROFESSIONAL SUMMARY
${resumeSummary || "-"}

EDUCATION
${resumeEducation || "-"}

SKILLS
${resumeSkills || "-"}

PROJECTS
${resumeProjects || "-"}

EXPERIENCE
${resumeExperience || "-"}

CERTIFICATIONS
${resumeCertifications || "-"}
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Resume.txt";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.page}>
      <div style={styles.topbar}>
        <div style={styles.logoWrap}>
          <div style={styles.logoCircle}>C</div>
          <div>
            <div style={styles.logoText}>CareerCraft</div>
            <div style={styles.logoSub}>Smart student dashboard</div>
          </div>
        </div>

        <button onClick={() => setActiveTab("Login")} style={styles.loginTopBtn}>
          {currentUser ? "Account" : "Login"}
        </button>
      </div>

      <div style={styles.layout}>
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Dashboard</h2>
          <button onClick={() => setActiveTab("Login")} style={activeTab === "Login" ? styles.navBtnActive : styles.navBtn}>Login</button>
          <button onClick={() => setActiveTab("Skills")} style={activeTab === "Skills" ? styles.navBtnActive : styles.navBtn}>Skills</button>
          <button onClick={() => setActiveTab("Internship")} style={activeTab === "Internship" ? styles.navBtnActive : styles.navBtn}>Internship</button>
          <button onClick={() => setActiveTab("Roadmap")} style={activeTab === "Roadmap" ? styles.navBtnActive : styles.navBtn}>Roadmap</button>
          <button onClick={() => setActiveTab("Resume")} style={activeTab === "Resume" ? styles.navBtnActive : styles.navBtn}>Resume</button>
          <button onClick={() => setActiveTab("Portfolio")} style={activeTab === "Portfolio" ? styles.navBtnActive : styles.navBtn}>Portfolio</button>
        </div>

        <div style={styles.content}>
          {activeTab === "Login" && (
            <div>
              <div style={styles.heroCard}>
                <h2 style={styles.title}>Login</h2>
                <p style={styles.textWhite}>Stable local login UI.</p>
              </div>

              <div style={styles.card}>
                {currentUser ? (
                  <div>
                    <h3 style={styles.sectionTitle}>Logged In</h3>
                    <p style={styles.text}><b>Name:</b> {currentUser.name}</p>
                    <p style={styles.text}><b>Email:</b> {currentUser.email}</p>
                    <button onClick={() => { setCurrentUser(null); setAuthMessage("Logout successful."); }} style={styles.primaryBtn}>Logout</button>
                  </div>
                ) : (
                  <>
                    <div style={styles.row}>
                      <button onClick={() => { setAuthMode("login"); setAuthMessage(""); }} style={authMode === "login" ? styles.primaryBtn : styles.secondaryBtn}>Login</button>
                      <button onClick={() => { setAuthMode("signup"); setAuthMessage(""); }} style={authMode === "signup" ? styles.primaryBtn : styles.secondaryBtn}>Signup</button>
                    </div>

                    {authMode === "signup" && (
                      <input type="text" placeholder="Full Name" value={loginName} onChange={(e) => setLoginName(e.target.value)} style={styles.input} />
                    )}

                    <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} style={styles.input} />
                    <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} style={styles.input} />

                    <button
                      onClick={() => {
                        if (!loginEmail.trim() || !loginPassword.trim()) {
                          setAuthMessage("Email aur password required hai.");
                          return;
                        }
                        setCurrentUser({ name: authMode === "signup" ? (loginName || "User") : "User", email: loginEmail });
                        setAuthMessage(authMode === "signup" ? "Signup successful." : "Login successful.");
                        setLoginName("");
                        setLoginEmail("");
                        setLoginPassword("");
                      }}
                      style={styles.primaryBtn}
                    >
                      {authMode === "signup" ? "Create Account" : "Login"}
                    </button>
                  </>
                )}
                {authMessage ? <p style={styles.text}>{authMessage}</p> : null}
              </div>
            </div>
          )}

          {activeTab === "Skills" && (
            <div>
              <div style={styles.heroCard}>
                <h2 style={styles.title}>Skills Discovery</h2>
                <p style={styles.textWhite}>Degree + domain ke hisaab se skills discover karo.</p>
              </div>

              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>Choose Degree</h3>
                <div style={styles.row}>
                  <select
                    value={selectedCourse}
                    onChange={(e) => {
                      setSelectedCourse(e.target.value);
                      setSelectedDomain("");
                      setSelectedSkill("");
                      setSelectedInternshipRole("");
                      setSummaryText("");
                    }}
                    style={styles.select}
                  >
                    <option value="">Select Degree</option>
                    {Object.keys(courseSkills).map((degree) => (
                      <option key={degree} value={degree}>{degree}</option>
                    ))}
                  </select>

                  {selectedCourse && (
                    <select
                      value={selectedDomain}
                      onChange={(e) => {
                        setSelectedDomain(e.target.value);
                        setSelectedSkill("");
                        setSelectedInternshipRole("");
                        setSummaryText("");
                      }}
                      style={styles.select}
                    >
                      <option value="">Select Domain</option>
                      {currentDomains.map((domain) => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {selectedCourse && degreeDetails[selectedCourse] && (
                <div style={styles.card}>
                  <h3 style={styles.sectionTitle}>{degreeDetails[selectedCourse].title}</h3>
                  <p style={styles.text}><b>Why this degree alone is not enough:</b> {degreeDetails[selectedCourse].summary}</p>
                  <p style={styles.text}><b>Best direction:</b> {degreeDetails[selectedCourse].focus}</p>
                </div>
              )}

              <div style={styles.gridTwo}>
                <div style={styles.card}>
                  <h3 style={styles.sectionTitle}>Domain Skills</h3>
                  {currentSkills.length === 0 ? (
                    <p style={styles.text}>Pehle degree aur domain select karo.</p>
                  ) : (
                    <ul style={styles.cleanList}>
                      {currentSkills.map((skill) => (
                        <li key={skill} onClick={() => { setSelectedSkill(skill); setSummaryText(""); }} style={selectedSkill === skill ? styles.selectedListItem : styles.listItem}>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div style={styles.card}>
                  <h3 style={styles.sectionTitle}>High Demand Skills</h3>
                  <ul style={styles.cleanList}>
                    {highDemandSkills.map((skill) => (
                      <li key={skill} onClick={() => { setSelectedSkill(skill); setSummaryText(""); }} style={selectedSkill === skill ? styles.selectedListItem : styles.listItem}>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {selectedSkill && skillsDetails[selectedSkill] && (
                <div style={styles.card}>
                  <h3 style={styles.sectionTitle}>Skill Details</h3>
                  <div style={styles.detailsGrid}>
                    <div><b>Name:</b> {selectedSkill}</div>
                    <div><b>Category:</b> {skillsDetails[selectedSkill].category}</div>
                    <div><b>Demand:</b> {skillsDetails[selectedSkill].demand}</div>
                    <div><b>Salary:</b> {skillsDetails[selectedSkill].salary}</div>
                    <div><b>Difficulty:</b> {skillsDetails[selectedSkill].difficulty}</div>
                    <div><b>Learning Time:</b> {skillsDetails[selectedSkill].time}</div>
                  </div>
                  <p style={{ ...styles.text, marginTop: 12 }}>
                    <b>Description:</b> {skillsDetails[selectedSkill].description}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "Internship" && (
            <div>
              <div style={styles.heroCard}>
                <h2 style={styles.title}>Internship Opportunities</h2>
                <p style={styles.textWhite}>Selected skill ke hisaab se internships dekho.</p>
              </div>

              {!selectedSkill ? (
                <div style={styles.emptyCard}>Select a skill from Skills tab first.</div>
              ) : (
                <div style={styles.cardsWrap}>
                  {currentInternships.map((item, index) => (
                    <div key={index} style={styles.internCard}>
                      <div style={styles.badge}>Internship</div>
                      <h3 style={styles.internTitle}>{item.role}</h3>
                      <p style={styles.text}>💰 {item.stipend}</p>
                      <p style={styles.text}>⏳ {item.duration}</p>
                      <p style={styles.text}>📍 {item.mode}</p>
                      <button
                        onClick={() => {
                          setSelectedInternshipRole(item.role);
                          setRoadmapType("internship");
                          setSummaryText("");
                          setActiveTab("Roadmap");
                        }}
                        style={styles.primaryBtn}
                      >
                        View Roadmap
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "Roadmap" && (
            <div>
              <div style={styles.heroCard}>
                <h2 style={styles.title}>Roadmap</h2>
                <p style={styles.textWhite}>Skill wise, internship wise, ya summary dekh sakte ho.</p>
              </div>

              <div style={styles.row}>
                <button onClick={() => setRoadmapType("skill")} style={roadmapType === "skill" ? styles.primaryBtn : styles.secondaryBtn}>Skill Wise</button>
                <button onClick={() => setRoadmapType("internship")} style={roadmapType === "internship" ? styles.primaryBtn : styles.secondaryBtn}>Internship Wise</button>
                <button onClick={() => { setRoadmapType("summary"); generateCareerSummary(); }} style={roadmapType === "summary" ? styles.primaryBtn : styles.secondaryBtn}>Summary</button>
              </div>

              {roadmapType === "skill" && (
                selectedSkill ? (
                  <div style={styles.card}>
                    <h3 style={styles.sectionTitle}>Roadmap for {selectedSkill}</h3>
                    <div style={styles.roadmapWrap}>
                      {currentRoadmap.map((step, index) => (
                        <div key={index} style={styles.roadmapStep}>
                          <div style={styles.stepNumber}>{index + 1}</div>
                          <div style={styles.stepText}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={styles.emptyCard}>Skill wise roadmap dekhne ke liye pehle skill select karo.</div>
                )
              )}

              {roadmapType === "internship" && (
                selectedInternshipRole ? (
                  <div style={styles.card}>
                    <h3 style={styles.sectionTitle}>Roadmap for {selectedInternshipRole}</h3>
                    <div style={styles.roadmapWrap}>
                      {currentInternshipRoadmap.map((step, index) => (
                        <div key={index} style={styles.roadmapStep}>
                          <div style={styles.stepNumber}>{index + 1}</div>
                          <div style={styles.stepText}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={styles.emptyCard}>Internship wise roadmap ke liye pehle internship select karo.</div>
                )
              )}

              {roadmapType === "summary" && (
                <div style={styles.card}>
                  <h3 style={styles.sectionTitle}>Career Summary</h3>
                  <p style={{ ...styles.text, whiteSpace: "pre-line" }}>
                    {summaryText || "Select degree, domain, skill, and internship first."}
                  </p>
                </div>
              )}

              <div style={styles.card}>
                <h3 style={styles.sectionTitle}>AI Career Chatbot</h3>
                <p style={styles.text}>Ask anything about roadmap, skills, internships, resume, portfolio, or career guidance.</p>

                <div style={styles.row}>
                  <button onClick={() => setChatInput("degree summary")} style={styles.secondaryBtn}>Degree</button>
                  <button onClick={() => setChatInput("domain summary")} style={styles.secondaryBtn}>Domain</button>
                  <button onClick={() => setChatInput("skill summary")} style={styles.secondaryBtn}>Skill</button>
                  <button onClick={() => setChatInput("internship summary")} style={styles.secondaryBtn}>Internship</button>
                  <button onClick={() => setChatInput("roadmap summary")} style={styles.secondaryBtn}>Roadmap</button>
                </div>

                <div style={styles.chatBox}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} style={msg.role === "user" ? styles.userBubble : styles.aiBubble}>
                      {msg.text}
                    </div>
                  ))}
                  {chatLoading && <div style={styles.aiBubble}>Thinking...</div>}
                </div>

                <div style={styles.chatInputRow}>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAskAI();
                    }}
                    placeholder="Ask anything..."
                    style={styles.chatInput}
                  />
                  <button onClick={handleAskAI} style={styles.primaryBtn}>Ask AI</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Resume" && (
            <div>
              <div style={styles.heroCard}>
                <h2 style={styles.title}>Resume Builder</h2>
                <p style={styles.textWhite}>Build a clean, simple resume.</p>
              </div>

              <div style={styles.resumeLayout}>
                <div style={styles.card}>
                  <h3 style={styles.sectionTitle}>Resume Details</h3>
                  <input type="text" placeholder="Full Name" value={resumeName} onChange={(e) => setResumeName(e.target.value)} style={styles.input} />
                  <input type="email" placeholder="Email" value={resumeEmail} onChange={(e) => setResumeEmail(e.target.value)} style={styles.input} />
                  <input type="text" placeholder="Phone" value={resumePhone} onChange={(e) => setResumePhone(e.target.value)} style={styles.input} />
                  <input type="text" placeholder="LinkedIn" value={resumeLinkedIn} onChange={(e) => setResumeLinkedIn(e.target.value)} style={styles.input} />
                  <input type="text" placeholder="GitHub" value={resumeGithub} onChange={(e) => setResumeGithub(e.target.value)} style={styles.input} />
                  <textarea placeholder="Professional Summary" value={resumeSummary} onChange={(e) => setResumeSummary(e.target.value)} style={styles.textarea} />
                  <textarea placeholder="Education" value={resumeEducation} onChange={(e) => setResumeEducation(e.target.value)} style={styles.textarea} />
                  <textarea placeholder="Skills (comma separated)" value={resumeSkills} onChange={(e) => setResumeSkills(e.target.value)} style={styles.textarea} />
                  <textarea placeholder="Projects (one per line)" value={resumeProjects} onChange={(e) => setResumeProjects(e.target.value)} style={styles.textarea} />
                  <textarea placeholder="Experience / Internship" value={resumeExperience} onChange={(e) => setResumeExperience(e.target.value)} style={styles.textarea} />
                  <textarea placeholder="Certifications (one per line)" value={resumeCertifications} onChange={(e) => setResumeCertifications(e.target.value)} style={styles.textarea} />

                  <div style={styles.row}>
                    <button onClick={handleAutoGenerateSummary} style={styles.secondaryBtn}>Auto Generate Summary</button>
                    <button onClick={() => setShowResumePreview(true)} style={styles.primaryBtn}>Generate Resume</button>
                    <button onClick={handleDownloadResume} style={styles.secondaryBtn}>Download Resume</button>
                  </div>
                </div>

                <div style={styles.resumePreview}>
                  <div style={styles.resumeHeader}>
                    <h2 style={{ margin: 0 }}>{resumeName || "Your Name"}</h2>
                    <p style={styles.resumeTopLine}>{resumeEmail || "your@email.com"} | {resumePhone || "Phone Number"}</p>
                    <p style={styles.resumeTopLine}>{resumeLinkedIn || "LinkedIn"} | {resumeGithub || "GitHub"}</p>
                  </div>

                  {showResumePreview ? (
                    <>
                      <div style={styles.resumeSection}><h4 style={styles.resumeSectionTitle}>Professional Summary</h4><p>{resumeSummary || "-"}</p></div>
                      <div style={styles.resumeSection}><h4 style={styles.resumeSectionTitle}>Education</h4><p>{resumeEducation || "-"}</p></div>
                      <div style={styles.resumeSection}><h4 style={styles.resumeSectionTitle}>Skills</h4><p>{resumeSkills || "-"}</p></div>
                      <div style={styles.resumeSection}><h4 style={styles.resumeSectionTitle}>Projects</h4><p>{resumeProjects || "-"}</p></div>
                      <div style={styles.resumeSection}><h4 style={styles.resumeSectionTitle}>Experience / Internship</h4><p>{resumeExperience || "-"}</p></div>
                      <div style={styles.resumeSection}><h4 style={styles.resumeSectionTitle}>Certifications</h4><p>{resumeCertifications || "-"}</p></div>
                    </>
                  ) : (
                    <div style={styles.resumePlaceholder}>Fill details and click <b>Generate Resume</b>.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Portfolio" && (
            <div style={styles.portfolioWebsiteModern}>
              <nav style={styles.portfolioNavbar}>
                <div style={styles.portfolioBrand}>
                  {resumeName || "Your Name"}<span style={{ color: "#38bdf8" }}>.</span>
                </div>
                <div style={styles.portfolioNavLinks}>
                  <span>Home</span>
                  <span>About</span>
                  <span>Projects</span>
                  <span>Contact</span>
                </div>
              </nav>

              <section style={styles.portfolioHeroModern}>
                <div style={styles.portfolioHeroLeft}>
                  <p style={styles.portfolioMiniTag}>PERSONAL PORTFOLIO</p>
                  <h1 style={styles.portfolioMainHeading}>
                    Hello! <br />
                    I'm <span style={styles.portfolioAccent}>{resumeName || "Your Name"}</span>
                  </h1>
                  <p style={styles.portfolioSubHeading}>
                    {typewriterText}
                    <span style={styles.cursorBlink}>|</span>
                  </p>
                  <p style={styles.portfolioHeroText}>
                    {resumeSummary || "I build modern, responsive, and interactive web experiences with practical skills and real projects."}
                  </p>
                </div>

                <div style={styles.portfolioHeroRight}>
                  <div style={styles.portfolioProfileCard}>
                    <div style={styles.portfolioAvatar}>
                      {(resumeName || "Y").charAt(0).toUpperCase()}
                    </div>
                    <h3 style={styles.portfolioProfileName}>{resumeName || "Your Name"}</h3>
                    <p style={styles.portfolioProfileRole}>
                      {selectedCourse || "Student"} • {selectedDomain || "Domain"}
                    </p>
                    <p style={styles.portfolioProfileMeta}>{resumeEmail || "your@email.com"}</p>
                  </div>
                </div>
              </section>

              <section style={styles.portfolioSectionModern}>
                <div style={styles.portfolioSectionHeader}>
                  <span style={styles.portfolioSectionLabel}>SKILLS</span>
                  <h2 style={styles.portfolioSectionHeading}>What I work with</h2>
                </div>

                <div style={styles.portfolioSkillsModernWrap}>
                  {portfolioDisplaySkills.length > 0 ? (
                    portfolioDisplaySkills.map((skill, index) => (
                      <span key={index} style={styles.portfolioSkillModernChip}>{skill}</span>
                    ))
                  ) : (
                    <p style={styles.portfolioCardText}>Add skills in Resume tab.</p>
                  )}
                </div>
              </section>

              <section style={styles.portfolioSectionModern}>
                <div style={styles.portfolioSectionHeader}>
                  <span style={styles.portfolioSectionLabel}>PROJECTS</span>
                  <h2 style={styles.portfolioSectionHeading}>Featured Work</h2>
                </div>

                <div style={styles.portfolioProjectsModernGrid}>
                  {portfolioDisplayProjects.length > 0 ? (
                    portfolioDisplayProjects.map((project, index) => (
                      <div key={index} style={styles.portfolioProjectModernCard}>
                        <div style={styles.portfolioProjectNumber}>0{index + 1}</div>
                        <h3 style={styles.portfolioProjectTitle}>Project {index + 1}</h3>
                        <p style={styles.portfolioCardText}>{project}</p>
                      </div>
                    ))
                  ) : (
                    <p style={styles.portfolioCardText}>Add projects in Resume tab.</p>
                  )}
                </div>
              </section>

              <section style={styles.portfolioSplitGrid}>
                <div style={styles.portfolioInfoCard}>
                  <span style={styles.portfolioSectionLabel}>CERTIFICATIONS</span>
                  <h3 style={styles.portfolioCardHeading}>Achievements</h3>
                  {portfolioDisplayCertifications.length > 0 ? (
                    <div style={styles.portfolioCertList}>
                      {portfolioDisplayCertifications.map((item, index) => (
                        <div key={index} style={styles.portfolioCertItem}>{item}</div>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.portfolioCardText}>Add certifications in Resume tab.</p>
                  )}
                </div>

                <div style={styles.portfolioInfoCard}>
                  <span style={styles.portfolioSectionLabel}>CONTACT</span>
                  <h3 style={styles.portfolioCardHeading}>Let's connect</h3>
                  <div style={styles.portfolioContactList}>
                    <p style={styles.portfolioCardText}><b>Email:</b> {resumeEmail || "-"}</p>
                    <p style={styles.portfolioCardText}><b>Phone:</b> {resumePhone || "-"}</p>
                    <p style={styles.portfolioCardText}><b>LinkedIn:</b> {resumeLinkedIn || "-"}</p>
                    <p style={styles.portfolioCardText}><b>GitHub:</b> {resumeGithub || "-"}</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #ffffff 0%, #f8f4ff 50%, #f5f0ff 100%)",
    fontFamily: "Arial, sans-serif",
    color: "#2b1f45"
  },
  topbar: {
    height: 72,
    background: "#ffffff",
    borderBottom: "1px solid #eee6ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
    position: "sticky",
    top: 0,
    zIndex: 20
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff)",
    color: "#5b21b6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: "#4c1d95"
  },
  logoSub: {
    fontSize: 12,
    color: "#8b7aa8"
  },
  loginTopBtn: {
    padding: "10px 18px",
    borderRadius: 12,
    border: "1px solid #ddd6fe",
    background: "#f5f3ff",
    color: "#5b21b6",
    fontWeight: 700,
    cursor: "pointer"
  },
  layout: {
    display: "flex",
    padding: 24,
    gap: 20
  },
  sidebar: {
    width: 240,
    background: "linear-gradient(180deg, #ede9fe 0%, #e9d5ff 100%)",
    borderRadius: 24,
    padding: 22,
    color: "#4c1d95",
    boxShadow: "0 12px 30px rgba(196,181,253,0.35)"
  },
  sidebarTitle: {
    marginTop: 0,
    marginBottom: 20
  },
  navBtn: {
    display: "block",
    width: "100%",
    marginBottom: 12,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #ddd6fe",
    background: "rgba(255,255,255,0.7)",
    color: "#5b21b6",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: 600
  },
  navBtnActive: {
    display: "block",
    width: "100%",
    marginBottom: 12,
    padding: "12px 14px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff)",
    color: "#4c1d95",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: 700
  },
  content: {
    flex: 1
  },
  heroCard: {
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff, #ffffff)",
    color: "#4c1d95",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    boxShadow: "0 16px 40px rgba(196,181,253,0.28)"
  },
  card: {
    background: "#ffffff",
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
    boxShadow: "0 10px 30px rgba(196,181,253,0.18)",
    border: "1px solid #f1ebff"
  },
  emptyCard: {
    background: "#ffffff",
    border: "1px dashed #c4b5fd",
    color: "#6d5a9c",
    borderRadius: 20,
    padding: 24,
    fontWeight: 600
  },
  title: {
    margin: 0,
    fontSize: 28
  },
  text: {
    color: "#6d5a9c",
    lineHeight: 1.6
  },
  textWhite: {
    color: "#5b4b78",
    lineHeight: 1.6
  },
  row: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #ddd6fe",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    marginBottom: 12
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #ddd6fe",
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    marginBottom: 12
  },
  select: {
    minWidth: 240,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #ddd6fe",
    outline: "none",
    background: "#fff"
  },
  primaryBtn: {
    padding: "12px 18px",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff)",
    color: "#4c1d95",
    cursor: "pointer",
    fontWeight: 700
  },
  secondaryBtn: {
    padding: "12px 18px",
    borderRadius: 14,
    border: "1px solid #d8c9ff",
    background: "#fff",
    color: "#5d3ebc",
    cursor: "pointer",
    fontWeight: 700
  },
  sectionTitle: {
    marginTop: 0,
    color: "#4c1d95"
  },
  gridTwo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20
  },
  cleanList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  listItem: {
    padding: "12px 14px",
    borderRadius: 14,
    marginBottom: 10,
    background: "#faf7ff",
    border: "1px solid #efe7ff",
    cursor: "pointer",
    fontWeight: 600
  },
  selectedListItem: {
    padding: "12px 14px",
    borderRadius: 14,
    marginBottom: 10,
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff)",
    border: "1px solid #c4b5fd",
    cursor: "pointer",
    fontWeight: 700,
    color: "#4c1d95"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12
  },
  cardsWrap: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20
  },
  internCard: {
    background: "#ffffff",
    borderRadius: 22,
    padding: 20,
    border: "1px solid #f0e9ff",
    boxShadow: "0 10px 30px rgba(196,181,253,0.18)"
  },
  badge: {
    display: "inline-block",
    marginBottom: 10,
    padding: "6px 10px",
    borderRadius: 999,
    background: "#f5f3ff",
    color: "#7c3aed",
    fontSize: 12,
    fontWeight: 700
  },
  internTitle: {
    marginTop: 0,
    color: "#4c1d95"
  },
  roadmapWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 14
  },
  roadmapStep: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: 16,
    background: "#faf7ff",
    border: "1px solid #efe7ff"
  },
  stepNumber: {
    minWidth: 34,
    height: 34,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff)",
    color: "#4c1d95",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700
  },
  stepText: {
    fontWeight: 600,
    color: "#4a3970"
  },
  resumeLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20
  },
  resumePreview: {
    background: "#ffffff",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(196,181,253,0.18)",
    border: "1px solid #f0e9ff",
    height: "fit-content"
  },
  resumeHeader: {
    background: "linear-gradient(135deg, #ede9fe, #f5f3ff, #ffffff)",
    color: "#4c1d95",
    padding: 24
  },
  resumeTopLine: {
    margin: "8px 0 0 0",
    color: "#5b4b78"
  },
  resumeSection: {
    padding: "18px 24px",
    borderTop: "1px solid #f3ecff"
  },
  resumeSectionTitle: {
    marginTop: 0,
    marginBottom: 8,
    color: "#7c3aed"
  },
  resumePlaceholder: {
    padding: 24,
    color: "#6d5a9c"
  },
  portfolioWebsiteModern: {
    background: "#0f172a",
    borderRadius: 30,
    overflow: "hidden",
    border: "1px solid #1e293b",
    boxShadow: "0 18px 45px rgba(2, 6, 23, 0.35)"
  },
  portfolioNavbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 28px",
    borderBottom: "1px solid rgba(148,163,184,0.12)",
    background: "rgba(15,23,42,0.95)",
    color: "#f8fafc"
  },
  portfolioBrand: {
    fontSize: 20,
    fontWeight: 800,
    color: "#f8fafc"
  },
  portfolioNavLinks: {
    display: "flex",
    gap: 22,
    color: "#cbd5e1",
    fontWeight: 600
  },
  portfolioHeroModern: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 24,
    padding: 32,
    background: "linear-gradient(135deg, #0f172a 0%, #111827 55%, #1e293b 100%)"
  },
  portfolioHeroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  portfolioMiniTag: {
    margin: 0,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "1px",
    color: "#38bdf8"
  },
  portfolioMainHeading: {
    margin: "12px 0 10px",
    fontSize: 44,
    lineHeight: 1.1,
    color: "#f8fafc"
  },
  portfolioAccent: {
    color: "#38bdf8"
  },
  portfolioSubHeading: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#cbd5e1",
    minHeight: 28
  },
  cursorBlink: {
    color: "#38bdf8"
  },
  portfolioHeroText: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 1.8,
    color: "#cbd5e1"
  },
  portfolioHeroRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  portfolioProfileCard: {
    width: "100%",
    maxWidth: 280,
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: 24,
    padding: 24,
    textAlign: "center"
  },
  portfolioAvatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    margin: "0 auto 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#38bdf8",
    color: "#082f49",
    fontSize: 30,
    fontWeight: 800
  },
  portfolioProfileName: {
    margin: "0 0 6px",
    color: "#f8fafc"
  },
  portfolioProfileRole: {
    margin: "0 0 8px",
    color: "#38bdf8",
    fontWeight: 700
  },
  portfolioProfileMeta: {
    margin: 0,
    color: "#cbd5e1"
  },
  portfolioSectionModern: {
    padding: 28,
    borderTop: "1px solid #1e293b",
    background: "#0f172a"
  },
  portfolioSectionHeader: {
    marginBottom: 18
  },
  portfolioSectionLabel: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "1px",
    color: "#38bdf8"
  },
  portfolioSectionHeading: {
    margin: "8px 0 0",
    color: "#f8fafc",
    fontSize: 28
  },
  portfolioSplitGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    padding: 28,
    borderTop: "1px solid #1e293b",
    background: "#0f172a"
  },
  portfolioInfoCard: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: 22,
    padding: 22
  },
  portfolioCardHeading: {
    margin: "10px 0 12px",
    color: "#f8fafc"
  },
  portfolioCardText: {
    margin: 0,
    color: "#cbd5e1",
    lineHeight: 1.8
  },
  portfolioSkillsModernWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12
  },
  portfolioSkillModernChip: {
    padding: "12px 16px",
    borderRadius: 999,
    background: "#0f172a",
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    fontWeight: 700
  },
  portfolioProjectsModernGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18
  },
  portfolioProjectModernCard: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: 22,
    padding: 20
  },
  portfolioProjectNumber: {
    fontSize: 13,
    fontWeight: 800,
    color: "#38bdf8",
    marginBottom: 10
  },
  portfolioProjectTitle: {
    margin: "0 0 10px",
    color: "#f8fafc"
  },
  portfolioCertList: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  portfolioCertItem: {
    padding: "12px 14px",
    borderRadius: 14,
    background: "#0f172a",
    border: "1px solid #334155",
    color: "#e2e8f0",
    fontWeight: 600
  },
  portfolioContactList: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  chatBox: {
    background: "#ffffff",
    border: "1px solid #e9d5ff",
    borderRadius: 16,
    padding: 16,
    maxHeight: 320,
    overflowY: "auto",
    marginTop: 14,
    marginBottom: 14,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  userBubble: {
    alignSelf: "flex-end",
    background: "linear-gradient(135deg, #c4b5fd, #e9d5ff)",
    color: "#2b1f45",
    padding: "10px 14px",
    borderRadius: "14px 14px 4px 14px",
    maxWidth: "80%",
    fontWeight: 600,
    whiteSpace: "pre-wrap"
  },
  aiBubble: {
    alignSelf: "flex-start",
    background: "#f8f4ff",
    color: "#4c1d95",
    padding: "10px 14px",
    borderRadius: "14px 14px 14px 4px",
    maxWidth: "80%",
    border: "1px solid #e9d5ff",
    whiteSpace: "pre-wrap",
    lineHeight: 1.6
  },
  chatInputRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
    flexWrap: "wrap"
  },
  chatInput: {
    flex: 1,
    minWidth: 240,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #ddd6fe",
    outline: "none",
    background: "#fff"
  }
};

export default Dashboard;