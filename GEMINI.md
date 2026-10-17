# Workspace Rules: Ambo University CMS (CMS_PHP)

## 1. Strict Project Focus & Workspace Isolation
* **Active Project Boundary**: All work, commands, code analysis, and answers must strictly pertain to this workspace (`c:\Users\hp\Desktop\CMS_PHP`).
* **Zero Cross-Project Contamination**: Never inspect, reference, cite, or search files, git history, or conversation transcripts belonging to unrelated projects (e.g., Paintshop, external client apps, or other Desktop folders).
* **Self-Contained Execution**: All assumptions, tests, dependencies, and file paths must remain scoped entirely within `CMS_PHP`.

## 2. Anti-Hallucination & Truthful Grounding
* **Verify Before Claiming**: Always check actual files on disk before reporting on features, test suites, or architectures.
* **No Phantom Technology**: Do not claim test runners, database migrations, or backend frameworks exist until verified with file checks or directory listings.
* **Acknowledge Prototype State**: This project currently consists of static HTML pages, CSS stylesheets, vanilla JavaScript (`assets/js/app.js` using `localStorage`), and PWA service worker/manifest. When backend PHP or MySQL features are not yet written, explicitly state they are pending implementation.

## 3. Project Identity & Domain Model
* **Project Name**: Ambo University Student-to-Teacher Complaint Management System (Ambo CMS).
* **Target Users & Roles**:
  * **Students**: File academic/assessment/departmental complaints, track progress via timeline, view status badges.
  * **Teachers**: View assigned complaints, review student submissions, provide feedback, submit formal responses.
  * **Administrators**: Review all complaints, assign complaints to specific faculty members, add admin remarks, confirm resolutions.
* **Security & Clean Architecture**:
  * Keep responsive styling clean across mobile and desktop.
  * Follow secure coding practices as backend PHP/MySQL features are introduced (prepared statements, authentication, role-based access control, input sanitization).
