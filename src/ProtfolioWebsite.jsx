import React, { useMemo } from "react";

function PortfolioWebsite({
  resumeName,
  resumeEmail,
  resumePhone,
  resumeLinkedIn,
  resumeGithub,
  resumeEducation,
  resumeSkills,
  resumeProjects,
  resumeExperience,
  resumeCertifications,
  resumeSummary,
  selectedCourse,
  selectedGlobalSkill,
  setActiveTab
}) {
  const skillsList = useMemo(() => {
    if (!resumeSkills?.trim()) return [];
    return resumeSkills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [resumeSkills]);

  const projectsList = useMemo(() => {
    if (!resumeProjects?.trim()) return [];
    return resumeProjects
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [resumeProjects]);

  const certificationsList = useMemo(() => {
    if (!resumeCertifications?.trim()) return [];
    return resumeCertifications
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }, [resumeCertifications]);

  const openGithub = () => {
    const url = (resumeGithub || "").trim();
    if (!url) return;

    const finalUrl = url.startsWith("http") ? url : `https://${url}`;
    window.open(finalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div style={styles.wrapper}>
      <nav style={styles.navbar}>
        <div style={styles.brand}>
          {resumeName || "Your Name"}
          <span style={styles.dot}>.</span>
        </div>

        <div style={styles.navLinks}>
          <a href="#portfolio-about" style={styles.navLink}>About</a>
          <a href="#portfolio-skills" style={styles.navLink}>Skills</a>
          <a href="#portfolio-projects" style={styles.navLink}>Projects</a>
          <a href="#portfolio-contact" style={styles.navLink}>Contact</a>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <p style={styles.tag}>PERSONAL PORTFOLIO</p>

          <h1 style={styles.mainHeading}>
            Hi, I'm{" "}
            <span style={styles.accent}>
              {resumeName || "Your Name"}
            </span>
          </h1>

          <p style={styles.subHeading}>
            {selectedCourse || "Student"} • {selectedGlobalSkill || "Aspiring Professional"}
          </p>

          <p style={styles.heroText}>
            {resumeSummary ||
              "I am building practical skills, strong projects, and real-world readiness through continuous learning and hands-on work."}
          </p>

          <div style={styles.heroButtons}>
            <button onClick={() => setActiveTab("Resume")} style={styles.primaryBtn}>
              Edit Resume
            </button>
            <button onClick={openGithub} style={styles.secondaryBtn}>
              Open GitHub
            </button>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.profileCard}>
            <div style={styles.avatar}>
              {(resumeName || "Y").charAt(0).toUpperCase()}
            </div>
            <h3 style={styles.profileName}>{resumeName || "Your Name"}</h3>
            <p style={styles.profileRole}>{selectedGlobalSkill || "Career Explorer"}</p>
            <p style={styles.profileMeta}>{resumeEmail || "your@email.com"}</p>
          </div>
        </div>
      </section>

      <section id="portfolio-about" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionLabel}>ABOUT ME</span>
          <h2 style={styles.sectionHeading}>A short introduction</h2>
        </div>

        <div style={styles.aboutCard}>
          <p style={styles.aboutText}>
            {resumeSummary ||
              "Add your professional summary in the Resume tab and it will appear here like a real portfolio website intro."}
          </p>
        </div>
      </section>

      <section style={styles.splitGrid}>
        <div style={styles.infoCard}>
          <span style={styles.sectionLabel}>EDUCATION</span>
          <h3 style={styles.cardHeading}>Academic Background</h3>
          <p style={styles.cardText}>{resumeEducation || "-"}</p>
        </div>

        <div style={styles.infoCard}>
          <span style={styles.sectionLabel}>EXPERIENCE</span>
          <h3 style={styles.cardHeading}>Internship / Experience</h3>
          <p style={styles.cardText}>{resumeExperience || "-"}</p>
        </div>
      </section>

      <section id="portfolio-skills" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionLabel}>SKILLS</span>
          <h2 style={styles.sectionHeading}>What I work with</h2>
        </div>

        <div style={styles.skillsWrap}>
          {skillsList.length > 0 ? (
            skillsList.map((skill, index) => (
              <span key={index} style={styles.skillChip}>
                {skill}
              </span>
            ))
          ) : (
            <p style={styles.cardText}>Add skills in Resume tab.</p>
          )}
        </div>
      </section>

      <section id="portfolio-projects" style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionLabel}>PROJECTS</span>
          <h2 style={styles.sectionHeading}>Featured Work</h2>
        </div>

        <div style={styles.projectsGrid}>
          {projectsList.length > 0 ? (
            projectsList.map((project, index) => (
              <div key={index} style={styles.projectCard}>
                <div style={styles.projectNumber}>0{index + 1}</div>
                <h3 style={styles.projectTitle}>Project {index + 1}</h3>
                <p style={styles.cardText}>{project}</p>
              </div>
            ))
          ) : (
            <p style={styles.cardText}>Add projects in Resume tab, one per line.</p>
          )}
        </div>
      </section>

      <section style={styles.splitGrid}>
        <div style={styles.infoCard}>
          <span style={styles.sectionLabel}>CERTIFICATIONS</span>
          <h3 style={styles.cardHeading}>Achievements</h3>

          {certificationsList.length > 0 ? (
            <div style={styles.certList}>
              {certificationsList.map((item, index) => (
                <div key={index} style={styles.certItem}>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <p style={styles.cardText}>Add certifications in Resume tab.</p>
          )}
        </div>

        <div id="portfolio-contact" style={styles.infoCard}>
          <span style={styles.sectionLabel}>CONTACT</span>
          <h3 style={styles.cardHeading}>Let's connect</h3>

          <div style={styles.contactList}>
            <p style={styles.cardText}><b>Email:</b> {resumeEmail || "-"}</p>
            <p style={styles.cardText}><b>Phone:</b> {resumePhone || "-"}</p>
            <p style={styles.cardText}><b>LinkedIn:</b> {resumeLinkedIn || "-"}</p>
            <p style={styles.cardText}><b>GitHub:</b> {resumeGithub || "-"}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  wrapper: {
    background: "#060608",
    color: "#fff",
    borderRadius: 28,
    overflow: "hidden",
    border: "1px solid rgba(255,99,71,0.2)"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    background: "rgba(6,6,8,0.85)",
    backdropFilter: "blur(10px)",
    zIndex: 5
  },
  brand: {
    fontSize: 24,
    fontWeight: 800
  },
  dot: {
    color: "#ff6347"
  },
  navLinks: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap"
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 24,
    padding: 32,
    background: "linear-gradient(135deg, #111 0%, #060608 60%, #151515 100%)"
  },
  heroLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  tag: {
    margin: 0,
    color: "#ff6347",
    fontWeight: 800,
    letterSpacing: 1,
    fontSize: 12
  },
  mainHeading: {
    margin: "12px 0 10px",
    fontSize: 46,
    lineHeight: 1.1
  },
  accent: {
    color: "#ff6347"
  },
  subHeading: {
    margin: 0,
    color: "#d1d5db",
    fontSize: 18,
    fontWeight: 700
  },
  heroText: {
    marginTop: 16,
    color: "#c7c7c7",
    lineHeight: 1.8,
    maxWidth: 700
  },
  heroButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 22
  },
  primaryBtn: {
    padding: "12px 18px",
    borderRadius: 14,
    border: "none",
    background: "#ff6347",
    color: "#000",
    cursor: "pointer",
    fontWeight: 700
  },
  secondaryBtn: {
    padding: "12px 18px",
    borderRadius: 14,
    border: "1px solid #ff6347",
    background: "transparent",
    color: "#ff6347",
    cursor: "pointer",
    fontWeight: 700
  },
  heroRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  profileCard: {
    width: "100%",
    maxWidth: 290,
    background: "#111",
    border: "1px solid rgba(255,99,71,0.25)",
    borderRadius: 24,
    padding: 24,
    textAlign: "center"
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: "50%",
    margin: "0 auto 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ff6347",
    color: "#000",
    fontSize: 32,
    fontWeight: 800
  },
  profileName: {
    margin: "0 0 6px"
  },
  profileRole: {
    margin: "0 0 8px",
    color: "#ff6347",
    fontWeight: 700
  },
  profileMeta: {
    margin: 0,
    color: "#c7c7c7"
  },
  section: {
    padding: 28,
    borderTop: "1px solid rgba(255,255,255,0.06)"
  },
  sectionHeader: {
    marginBottom: 18
  },
  sectionLabel: {
    color: "#ff6347",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1
  },
  sectionHeading: {
    margin: "8px 0 0",
    fontSize: 30
  },
  aboutCard: {
    background: "#111",
    border: "1px solid rgba(255,99,71,0.16)",
    borderRadius: 22,
    padding: 22
  },
  aboutText: {
    margin: 0,
    color: "#d1d5db",
    lineHeight: 1.9
  },
  splitGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    padding: 28,
    borderTop: "1px solid rgba(255,255,255,0.06)"
  },
  infoCard: {
    background: "#111",
    border: "1px solid rgba(255,99,71,0.16)",
    borderRadius: 22,
    padding: 22
  },
  cardHeading: {
    margin: "10px 0 12px"
  },
  cardText: {
    margin: 0,
    color: "#d1d5db",
    lineHeight: 1.8
  },
  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12
  },
  skillChip: {
    padding: "12px 16px",
    borderRadius: 999,
    background: "#ff6347",
    color: "#000",
    fontWeight: 700
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 18
  },
  projectCard: {
    background: "#111",
    border: "1px solid rgba(255,99,71,0.16)",
    borderRadius: 22,
    padding: 20
  },
  projectNumber: {
    fontSize: 13,
    fontWeight: 800,
    color: "#ff6347",
    marginBottom: 10
  },
  projectTitle: {
    margin: "0 0 10px"
  },
  certList: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  certItem: {
    padding: "12px 14px",
    borderRadius: 14,
    background: "#1a1a1a",
    border: "1px solid rgba(255,99,71,0.14)",
    color: "#d1d5db",
    fontWeight: 600
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
};

export default PortfolioWebsite;