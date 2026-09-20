package com.alumniconnect.service.ai;

import com.alumniconnect.entity.AIMessage;
import com.alumniconnect.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("mockAIService")
public class MockAIService implements AIService {

    @Override
    public String getProviderName() {
        return "AlumniConnect Career AI (Rule-Based Engine)";
    }

    @Override
    public String generateResponse(String prompt, List<AIMessage> history, String mode, User user) {
        String lowerPrompt = prompt.toLowerCase();

        if (mode != null && mode.equalsIgnoreCase("RESUME_FEEDBACK")) {
            return generateResumeFeedback(prompt, "General Tech Role");
        }

        if (mode != null && mode.equalsIgnoreCase("INTERVIEW_PREP")) {
            return generateInterviewPrepAdvice(prompt);
        }

        if (lowerPrompt.contains("resume") || lowerPrompt.contains("cv") || lowerPrompt.contains("portfolio")) {
            return generateResumeFeedback(prompt, "Target Role");
        }

        if (lowerPrompt.contains("interview") || lowerPrompt.contains("questions") || lowerPrompt.contains("coding test")) {
            return generateInterviewPrepAdvice(prompt);
        }

        if (lowerPrompt.contains("alumni") || lowerPrompt.contains("mentor") || lowerPrompt.contains("connect")) {
            return generateNetworkingAdvice(user != null ? user.getName() : "Student");
        }

        if (lowerPrompt.contains("java") || lowerPrompt.contains("spring") || lowerPrompt.contains("react") || lowerPrompt.contains("python") || lowerPrompt.contains("skill")) {
            return generateSkillRoadmap(prompt);
        }

        return generateGeneralCareerAdvice(prompt, user != null ? user.getName() : "Student");
    }

    @Override
    public String generateCareerAdvice(User user, String targetRole, List<String> currentSkills) {
        String studentName = (user != null && user.getName() != null) ? user.getName() : "Student";
        String roleStr = (targetRole != null && !targetRole.isBlank()) ? targetRole : "Software Engineer";
        String skillsStr = (currentSkills != null && !currentSkills.isEmpty()) ? String.join(", ", currentSkills) : "Java, React, SQL";

        return String.format(
            "### Customized Career Roadmap for %s\n\n" +
            "**Target Role:** %s\n" +
            "**Current Skill Base:** %s\n\n" +
            "#### 🚀 Step 1: Core Competency Mastery\n" +
            "- Deepen mastery of core skills (%s) by building full-stack production projects with proper authentication and unit test coverage.\n" +
            "- Understand microservices fundamentals, Docker containerization, and RESTful API standards.\n\n" +
            "#### 💡 Step 2: High-Impact Skill Additions\n" +
            "- **Cloud Deployment:** Practice deploying backend services to AWS EC2 or Render with MySQL databases.\n" +
            "- **System Design:** Learn load balancing, Redis caching, and relational database indexing strategies.\n\n" +
            "#### 🤝 Step 3: Alumni Connect Network Strategy\n" +
            "- Connect with alumni currently working as **%s**.\n" +
            "- Request 15-minute mock technical interviews and portfolio reviews through the AlumniConnect Mentorship module.\n\n" +
            "#### 📈 Action Items for Next 30 Days\n" +
            "1. Refactor existing projects to use standard architecture pattern (DTOs, Services, Controller validation).\n" +
            "2. Send 3 mentorship connection requests to alumni in target companies.\n" +
            "3. Prepare 2 STAR-format project stories for behavioral interviews.",
            studentName, roleStr, skillsStr, skillsStr, roleStr
        );
    }

    @Override
    public String generateResumeFeedback(String resumeText, String targetRole) {
        return "### 📄 AI Resume Analysis & Optimization Plan\n\n" +
               "#### ✅ Strengths Detected\n" +
               "- Solid educational background and clear technology stack alignment.\n" +
               "- Inclusion of practical project implementations.\n\n" +
               "#### 🔍 Key Improvement Areas\n" +
               "1. **Quantify Achievements:** Use metric-driven bullet points (e.g., *'Optimized SQL queries reducing response latency by 35%'* instead of *'Wrote SQL queries'*).\n" +
               "2. **ATS Optimization:** Ensure industry keywords like `JWT Authentication`, `Spring Data JPA`, `Vite`, `REST APIs`, and `Git` appear clearly under a **Core Competencies** section.\n" +
               "3. **Action Verbs:** Start every bullet point with strong active verbs: *Engineered*, *Architected*, *Implemented*, *Deployed*, *Refactored*.\n\n" +
               "#### 💡 Recommended Structure\n" +
               "- **Header:** Name, Email, LinkedIn, GitHub, Portfolio URL.\n" +
               "- **Summary:** 2-sentence elevator pitch highlighting your core stack and career ambition.\n" +
               "- **Technical Skills:** Categorized by Languages, Frameworks, Databases, Tools.\n" +
               "- **Projects:** 2-3 detailed projects with live links and repository links.\n" +
               "- **Education & Certifications.**";
    }

    private String generateInterviewPrepAdvice(String prompt) {
        return "### 🎯 Technical & Behavioral Interview Preparation Guide\n\n" +
               "#### 1. Core Technical Concepts to Master\n" +
               "- **Backend (Java / Spring Boot):** Dependency Injection (`@Autowired`), Component Scanning, Lifecycle of Beans, JPA/Hibernate N+1 Query problem, Transaction Management (`@Transactional`).\n" +
               "- **Security:** JWT flow, BCrypt password hashing, Stateless session management vs Session cookies.\n" +
               "- **Frontend (React):** Virtual DOM reconciliation, `useEffect` dependencies, State management patterns, Custom Hooks.\n" +
               "- **Databases:** Indexing, Foreign Key CASCADE rules, Normalization (1NF to 3NF), Inner vs Outer Joins.\n\n" +
               "#### 2. Behavioral STAR Method Framework\n" +
               "- **Situation:** Briefly set the stage.\n" +
               "- **Task:** Describe the problem or goal.\n" +
               "- **Action:** Focus on *your* specific technical contributions.\n" +
               "- **Result:** Share measurable outcomes or lessons learned.\n\n" +
               "#### 3. Pro Tip\n" +
               "Schedule a **Mock Interview Session** with an alumnus via the AlumniConnect Mentorship tab to get live feedback!";
    }

    private String generateNetworkingAdvice(String studentName) {
        return String.format(
            "### 🤝 Alumni Connection & Outreach Strategy for %s\n\n" +
            "Networking with alumni is 5x more effective than cold job applications. Here is a proven 3-step approach:\n\n" +
            "#### 1. Personalized Connection Request Message Template\n" +
            "```text\n" +
            "Hi [Alumni Name],\n" +
            "I'm a computer science student at our university interested in [Target Field/Role]. " +
            "I noticed your impressive experience at [Company Name] and would love to learn about your career journey. " +
            "Would you be open to a brief 15-minute mentorship chat?\n" +
            "Best regards,\n" +
            "%s\n" +
            "```\n\n" +
            "#### 2. Best Practices During Outreach\n" +
            "- Always research the alumnus's current role before sending a message.\n" +
            "- Ask insightful questions about their transition from college to industry.\n" +
            "- Express genuine gratitude and send a follow-up thank-you note within 24 hours.",
            studentName, studentName
        );
    }

    private String generateSkillRoadmap(String prompt) {
        return "### 🛠️ Industry Skill Roadmap & Project Recommendations\n\n" +
               "#### Recommended Tech Stack Mastery Path\n" +
               "1. **Java & Spring Boot 3:** Master REST API design, DTO mapping, Spring Security JWT filter chains, and Flyway database migrations.\n" +
               "2. **Modern React & Frontend:** Master hooks (`useState`, `useEffect`, `useContext`), clean layout components, and dynamic UI state handling.\n" +
               "3. **Database Architecture:** Learn MySQL indexing, schema migration best practices, and relational entity mappings (`@ManyToOne`, `@OneToMany`).\n" +
               "4. **Cloud & DevOps Basics:** Build CI/CD pipelines, containerize backend apps with Docker, and host frontend on Vercel/Netlify.\n\n" +
               "#### Capstone Project Ideas\n" +
               "- **Alumni Connect Platform:** Full-stack networking portal with job board and AI career recommendations.\n" +
               "- **Distributed Task Management System:** Multi-tenant workspace app with real-time updates and notification system.";
    }

    private String generateGeneralCareerAdvice(String prompt, String studentName) {
        return String.format(
            "Hello **%s**! I am your **AlumniConnect AI Career Assistant**.\n\n" +
            "I can help you navigate your career preparation with personalized advice. How can I assist you today?\n\n" +
            "#### 🌟 What You Can Ask Me:\n" +
            "- **Career Roadmap:** *'What skills do I need to become a Full-Stack Developer?'*\n" +
            "- **Resume Feedback:** *'How can I optimize my resume for ATS software?'*\n" +
            "- **Interview Prep:** *'What top Spring Boot and React questions will I face in technical interviews?'*\n" +
            "- **Alumni Outreach:** *'How do I approach alumni for mentorship or referrals?'*\n\n" +
            "Try picking one of the quick options above or type your question below!",
            studentName
        );
    }
}
