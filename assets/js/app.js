(function () {
  'use strict';

  const STORAGE_KEYS = {
    THEME: 'ambo_cms_theme',
    USER: 'ambo_cms_user',
    COMPLAINTS: 'ambo_cms_complaints',
  };

  /**
   * STATUTORY SANCTIONS CATALOG
   * Grounded strictly in Federal Negarit Gazette Proclamation No. 1152/2019
   * (Articles 31, 32, 33(2), 38, 42(7), 53, 56, 57) & University Senate Legislation.
   */
  const STATUTORY_SANCTIONS = {
    minor: [
      { id: 'oral_warning', label: 'Oral Warning (Documented in Unit File)', maxDays: 0 },
      { id: 'written_warning_1', label: 'First Formal Written Warning (Unit Level)', maxDays: 0 },
      { id: 'written_warning_2', label: 'Second Formal Written Warning (Vice Director Level)', maxDays: 0 },
      { id: 'remark_panel', label: 'Convene Independent Remarking Panel (Art. 42(7))', maxDays: 7 },
      { id: 'refer_disciplinary', label: 'Refer to Disciplinary Committee (Misconduct Exceeds Unit Authority)', maxDays: 0 }
    ],
    serious: [
      { id: 'final_reprimand', label: 'Final Formal Written Reprimand (University Level)' },
      { id: 'fine_1_month', label: 'Salary Fine: 1 Month Salary Deduction' },
      { id: 'fine_3_months', label: 'Salary Fine: Up to 3 Months Salary Deduction' },
      { id: 'withhold_promotion', label: 'Withholding of Next Academic Rank Promotion (1 to 2 Years)' },
      { id: 'withhold_increment', label: 'Withholding of Annual Salary Increment (1 to 2 Years)' },
      { id: 'suspension', label: 'Temporary Suspension from Teaching & Campus Privileges' },
      { id: 'dismissal', label: 'Dismissal & Termination of Contract' }
    ]
  };

  /**
   * Default complaints grounded in real Ambo University operational cases
   */
  const DEFAULT_COMPLAINTS = [
    {
      id: 'CMP-101',
      studentName: 'Abebe Kebede',
      studentId: 'ugr/12345/16',
      isIdentitySealed: false,
      department: 'Information Technology',
      course: 'SAD',
      track: 'academic',
      statutoryRef: 'Art. 42(7) - Assessment Redress',
      category: 'Assessment & Grading',
      severity: 'normal',
      urgency: 'high',
      title: 'Unfair Grading on Mid-Exam Question 4',
      message: 'My final answer was mathematically correct according to the reference slides, but points were deducted without explanation. I request a re-evaluation under Article 42(7).',
      status: 'pending',
      assignedTeacher: null,
      adminRemark: null,
      teacherReply: null,
      declineReason: null,
      submittedDate: '2026-10-12',
      timeline: [
        { time: '2026-10-12 09:30', title: 'Submitted', text: 'Complaint filed by student Abebe Kebede under Art. 42(7).' },
        { time: '2026-10-12 09:31', title: 'Pending Department Triage', text: 'Routed to Department Head for initial assessment review.' }
      ]
    },
    {
      id: 'CMP-102',
      studentName: 'Seladin Bergecho',
      studentId: 'ugr/14298/16',
      isIdentitySealed: false,
      department: 'Information Technology',
      course: 'IP',
      track: 'academic',
      statutoryRef: 'Art. 42(7) - Course Administration',
      category: 'Communication',
      severity: 'normal',
      urgency: 'medium',
      title: 'Lab Project Submission Schedule Not Communicated',
      message: 'The deadline for Project Milestone 2 was changed without prior notice in the lecture hall, affecting students commuting from distant campuses.',
      status: 'in_progress',
      assignedTeacher: 'Mr. Eyuel',
      adminRemark: 'Assigned to Mr. Eyuel by Department Head for clarification.',
      teacherReply: null,
      declineReason: null,
      submittedDate: '2026-10-08',
      timeline: [
        { time: '2026-10-08 14:15', title: 'Submitted', text: 'Complaint filed by student Seladin Bergecho.' },
        { time: '2026-10-09 10:00', title: 'Assigned', text: 'Assigned to Mr. Eyuel by Department Head.' },
        { time: '2026-10-09 11:20', title: 'Under Review', text: 'Instructor marked complaint as In Progress.' }
      ]
    },
    {
      id: 'CMP-103',
      studentName: 'Adane Girma',
      studentId: 'ugr/11054/16',
      isIdentitySealed: false,
      department: 'Electrical and Computer Engineering',
      course: 'DSA',
      track: 'academic',
      statutoryRef: 'Art. 42(7) - Attendance Policy',
      category: 'Attendance Policy',
      severity: 'normal',
      urgency: 'medium',
      title: 'Irregular Attendance Records During Field Trip',
      message: 'Students on an official university visit were marked absent for the Monday lab session.',
      status: 'needs_confirmation',
      assignedTeacher: 'Mr. Eyuel',
      adminRemark: 'Please review official field permission slip.',
      teacherReply: 'I have verified the departmental permission letter. Attendance records have been adjusted to Excused for all attendees.',
      declineReason: null,
      submittedDate: '2026-10-05',
      timeline: [
        { time: '2026-10-05 11:00', title: 'Submitted', text: 'Complaint filed by Adane Girma.' },
        { time: '2026-10-06 09:40', title: 'Assigned', text: 'Assigned to course teacher Mr. Eyuel.' },
        { time: '2026-10-10 16:20', title: 'Response Submitted', text: 'Teacher drafted resolution; sent to Department Head for final confirmation.' }
      ]
    },
    {
      id: 'CMP-104',
      studentName: 'Degu Debebe',
      studentId: 'ugr/15670/16',
      isIdentitySealed: false,
      department: 'Computer Science',
      course: 'OS',
      track: 'academic',
      statutoryRef: 'Art. 42(7) - Assessment Ledger',
      category: 'Assessment & Grading',
      severity: 'normal',
      urgency: 'high',
      title: 'Missing Lab Assessment Result in Portal',
      message: 'My Lab Exam score of 15% was not submitted to the central database.',
      status: 'resolved',
      assignedTeacher: 'Mr. Bekele',
      adminRemark: 'Department Head confirmed and updated student portal ledger.',
      teacherReply: 'Lab score sheet was corrected and submitted to department registrar on Oct 03.',
      declineReason: null,
      submittedDate: '2026-09-28',
      timeline: [
        { time: '2026-09-28 10:00', title: 'Submitted', text: 'Complaint filed.' },
        { time: '2026-09-29 11:30', title: 'Assigned', text: 'Assigned to Mr. Bekele.' },
        { time: '2026-10-03 14:00', title: 'Response Submitted', text: 'Teacher verified mark sheets.' },
        { time: '2026-10-04 09:15', title: 'Resolved', text: 'Department Head confirmed resolution. Case closed.' }
      ]
    },
    {
      id: 'CMP-105',
      studentName: 'Kenenisa Tola',
      studentId: 'ugr/16789/16',
      isIdentitySealed: true,
      department: 'Computer Science',
      course: 'OS',
      track: 'disciplinary',
      statutoryRef: 'Art. 38(1)(e) & Art. 57(1) - Harassment & Misconduct',
      category: 'Severe Misconduct / Harassment',
      severity: 'serious',
      urgency: 'critical',
      title: 'Intimidation and Retaliatory Grading Threat',
      message: 'Complainant reports direct threats of academic penalty after raising concerns regarding unauthorized textbook sales in class. Complainant identity is sealed under Article 38.',
      status: 'committee_review',
      assignedTeacher: 'Mr. Bekele',
      adminRemark: 'Disciplinary Committee & Gender Directorate co-assigned. Identity sealed from instructor.',
      teacherReply: null,
      declineReason: null,
      submittedDate: '2026-10-14',
      timeline: [
        { time: '2026-10-14 11:20', title: 'Submitted (Identity Sealed)', text: 'Severe complaint filed. Identity protected from instructor under Art. 38.' },
        { time: '2026-10-14 11:25', title: 'Gender Directorate Alerted', text: 'Gender Affairs Directorate co-assigned for protection & advisory support (Art. 57(1)).' },
        { time: '2026-10-14 14:00', title: 'ASDC Docket Registered', text: 'Academic Staff Disciplinary Committee commenced preliminary fact-finding.' }
      ]
    },
    {
      id: 'CMP-106',
      studentName: 'Tigist Alemu',
      studentId: 'ugr/18901/16',
      isIdentitySealed: false,
      department: 'Information Technology',
      course: 'SAD',
      track: 'academic',
      statutoryRef: 'Non-Academic Facility Issue',
      category: 'Other',
      severity: 'normal',
      urgency: 'low',
      title: 'Library Study Space Insufficient Heating',
      message: 'Study cubicles in the engineering library branch lack functional power outlets and heating in the evening hours.',
      status: 'declined',
      assignedTeacher: null,
      adminRemark: null,
      teacherReply: null,
      declineReason: 'Out of scope: Complaint management system handles academic & disciplinary processes under Proclamation No. 1152/2019. Routed to Campus Facilities Directorate.',
      submittedDate: '2026-10-15',
      timeline: [
        { time: '2026-10-15 08:45', title: 'Submitted', text: 'Complaint filed.' },
        { time: '2026-10-15 11:30', title: 'Declined by Admin', text: 'Declined as out-of-scope non-teaching facility issue; routed to Campus Facilities Directorate.' }
      ]
    },
    {
      id: 'CMP-107',
      studentName: 'Marta Chala',
      studentId: 'ugr/19204/16',
      isIdentitySealed: true,
      department: 'Information Technology',
      course: 'DSA',
      track: 'disciplinary',
      statutoryRef: 'Art. 38(1)(e) & Art. 33(2) - Serious Breach',
      category: 'Severe Misconduct / Harassment',
      severity: 'serious',
      urgency: 'critical',
      title: 'Demand of Unofficial Payments for Course Exemption',
      message: 'Evidence provided demonstrating extortion attempt regarding practical laboratory marks. Identity sealed under Article 38.',
      status: 'council_deliberation',
      assignedTeacher: 'Mr. Eyuel',
      adminRemark: 'ASDC completed investigation dossier; proposed 1-year suspension to University Council (Art. 57).',
      teacherReply: 'I deny these allegations and submitted my written statement to the committee during the hearing.',
      declineReason: null,
      submittedDate: '2026-10-02',
      timeline: [
        { time: '2026-10-02 08:30', title: 'Submitted (Identity Sealed)', text: 'Complaint filed under Article 38 sealed identity mode.' },
        { time: '2026-10-04 10:00', title: 'ASDC Inquiry Hearing', text: 'Hearing conducted. Teacher submitted written defense under Art. 31(1)(i).' },
        { time: '2026-10-18 15:30', title: 'Submitted to University Council', text: 'Investigation Dossier & Sanction Proposal transmitted to University Council (Art. 57) for deliberation.' }
      ]
    },
    {
      id: 'CMP-108',
      studentName: 'Bonsa Desta',
      studentId: 'ugr/20114/16',
      isIdentitySealed: false,
      department: 'Information Technology',
      course: 'IP',
      track: 'academic',
      statutoryRef: 'Art. 42(7) & Senate Statute Appellate Window',
      category: 'Assessment & Grading',
      severity: 'normal',
      urgency: 'high',
      title: 'Statutory Appeal: Arbitrary Exam Re-Evaluation Penalty',
      message: 'Complainant lodged formal statutory appeal to the University President within the 7-day appellate window, appealing the HoD remarking decision and requesting an independent Ad-Hoc Appellate Panel review.',
      status: 'appealed',
      assignedTeacher: 'Mr. Eyuel',
      adminRemark: 'Statutory 7-day appeal filed to the Office of the President. Awaiting Presidential appointment of Ad-Hoc Review Panel.',
      teacherReply: 'Initial grade stood following departmental review.',
      declineReason: null,
      submittedDate: '2026-10-22',
      timeline: [
        { time: '2026-10-22 14:00', title: 'HoD Resolution Endorsed', text: 'Department Head signed off on initial review.' },
        { time: '2026-10-25 09:30', title: 'Statutory Appeal Lodged', text: 'Student submitted 7-day statutory appeal to the University President.' }
      ]
    }
  ];

  function getComplaints() {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLAINTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(DEFAULT_COMPLAINTS));
      return DEFAULT_COMPLAINTS;
    }
    try {
      let list = JSON.parse(raw);
      let updated = false;
      DEFAULT_COMPLAINTS.forEach(def => {
        if (!list.some(c => c.id === def.id)) {
          list.push(def);
          updated = true;
        }
      });
      if (updated) {
        localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(list));
      }
      return list;
    } catch (e) {
      return DEFAULT_COMPLAINTS;
    }
  }

  function saveComplaints(complaints) {
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaints));
  }

  function getComplaintById(id) {
    const list = getComplaints();
    return list.find(c => c.id === id) || null;
  }

  /**
   * Verified Student, Sealed Identity Firewall:
   * Accused faculty members NEVER see the complainant's name or ID if sealed.
   * Investigating authorities see the verified identity with a legal protection badge.
   */
  function getSanitizedComplainant(complaint, viewerRole) {
    if (!complaint) return { name: 'Unknown', studentId: 'N/A', isSealed: false };

    const isSealed = Boolean(complaint.isIdentitySealed);
    if (isSealed && viewerRole === 'teacher') {
      return {
        name: 'Verified Enrolled Student',
        studentId: 'Identity Sealed',
        isSealed: true,
        displayBadge: 'Sealed Identity (Protected by University Statute)'
      };
    }

    return {
      name: complaint.studentName,
      studentId: complaint.studentId,
      isSealed: isSealed,
      displayBadge: isSealed ? 'Identity Sealed from Faculty (Confidential Committee View)' : 'Standard Attribution'
    };
  }

  /**
   * Dynamic SLA calculation based on urgency level
   */
  function calculateSla(submittedDate, urgency) {
    const totalDays = urgency === 'critical' ? 2 : (urgency === 'high' ? 3 : (urgency === 'medium' ? 5 : 7));
    const sub = new Date(submittedDate);
    const now = new Date();
    const diffDays = Math.floor((now - sub) / (1000 * 60 * 60 * 24));
    const remaining = totalDays - diffDays;

    return {
      totalDays,
      daysRemaining: remaining,
      isOverdue: remaining < 0,
      badgeText: remaining > 0 ? `${remaining} Working Days Left` : `${Math.abs(remaining)} Days Overdue`,
      urgencyLabel: urgency ? urgency.toUpperCase() : 'MEDIUM'
    };
  }

  function addComplaint(data) {
    const list = getComplaints();
    const nextNumber = 100 + list.length + 1;
    const newId = `CMP-${nextNumber}`;
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toISOString().replace('T', ' ').substring(0, 16);

    const isSerious = data.severity === 'serious' || data.track === 'disciplinary';
    const initialStatus = isSerious ? 'committee_review' : 'pending';
    const isSealed = Boolean(data.isIdentitySealed);

    const timeline = [
      {
        time: timeStr,
        title: isSealed ? 'Submitted (Identity Sealed)' : 'Submitted',
        text: isSealed 
          ? `Complaint registered with identity sealed under Article 38. Real identity verified via active student credentials.`
          : `Complaint registered by student ${data.studentName || 'Student'}.`
      }
    ];

    if (isSerious) {
      timeline.push({
        time: timeStr,
        title: 'Referred to ASDC & Gender Directorate',
        text: 'Misconduct classification routed case to Academic Staff Disciplinary Committee and Gender Directorate (Art. 57(1)).'
      });
    } else {
      timeline.push({
        time: timeStr,
        title: 'Pending Department Triage',
        text: 'Awaiting academic triage by Department Head under Article 42(7).'
      });
    }

    const newRecord = {
      id: newId,
      studentName: data.studentName || 'Student',
      studentId: data.studentId || 'ugr/00000/16',
      isIdentitySealed: isSealed,
      department: data.department || 'Information Technology',
      course: data.course || 'General',
      track: isSerious ? 'disciplinary' : 'academic',
      statutoryRef: isSerious ? 'Art. 38(1)(e) - Misconduct Protection' : 'Art. 42(7) - Assessment Redress',
      category: data.category || 'General',
      severity: isSerious ? 'serious' : (data.severity || 'normal'),
      urgency: data.urgency || (isSerious ? 'critical' : 'medium'),
      title: data.title || 'Untitled Complaint',
      message: data.message || '',
      status: initialStatus,
      assignedTeacher: data.assignedTeacher || null,
      adminRemark: isSerious ? 'Automated Referral: Disciplinary Committee & Gender Directorate Triage.' : null,
      teacherReply: null,
      teacherAttachment: null,
      declineReason: null,
      submittedDate: dateStr,
      incidentDate: data.incidentDate || dateStr,
      attachmentName: data.attachmentName || null,
      timeline: timeline
    };

    list.unshift(newRecord);
    saveComplaints(list);
    return newRecord;
  }

  function updateComplaintStatus(id, updates) {
    const list = getComplaints();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return null;

    const item = list[idx];
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);

    if (updates.status) item.status = updates.status;
    if (updates.severity) item.severity = updates.severity;
    if (updates.assignedTeacher !== undefined) item.assignedTeacher = updates.assignedTeacher;
    if (updates.adminRemark !== undefined) item.adminRemark = updates.adminRemark;
    if (updates.teacherReply !== undefined) item.teacherReply = updates.teacherReply;
    if (updates.teacherAttachment !== undefined) item.teacherAttachment = updates.teacherAttachment;
    if (updates.declineReason !== undefined) item.declineReason = updates.declineReason;
    if (updates.committeeDecision !== undefined) item.committeeDecision = updates.committeeDecision;
    if (updates.sanctionOrdered !== undefined) item.sanctionOrdered = updates.sanctionOrdered;
    if (updates.councilResolution !== undefined) item.councilResolution = updates.councilResolution;
    if (updates.incidentDate !== undefined) item.incidentDate = updates.incidentDate;
    if (updates.attachmentName !== undefined) item.attachmentName = updates.attachmentName;
    if (updates.isIdentitySealed !== undefined) item.isIdentitySealed = updates.isIdentitySealed;

    if (updates.timelineEvent) {
      item.timeline.push({
        time: now,
        title: updates.timelineEvent.title,
        text: updates.timelineEvent.text
      });
    }

    list[idx] = item;
    saveComplaints(list);
    return item;
  }

  function escalateComplaint(id, reason) {
    return updateComplaintStatus(id, {
      status: 'escalated',
      severity: 'serious',
      adminRemark: `Escalated to Academic Affairs Vice Director / Disciplinary Committee. Reason: "${reason}"`,
      timelineEvent: {
        title: 'Escalated to Higher Authority',
        text: `Case escalated for statutory review. Rationale: "${reason}"`
      }
    });
  }

  function submitCommitteeDecision(id, decisionData) {
    return updateComplaintStatus(id, {
      status: 'council_deliberation',
      committeeDecision: decisionData.decisionText,
      sanctionOrdered: decisionData.actionRecommended,
      adminRemark: `ASDC Hearing Completed: Finding "${decisionData.findingRuling}". Transmitted to University Council (Art. 57).`,
      timelineEvent: {
        title: 'Dossier Transmitted to University Council',
        text: `Investigation concluded on ${decisionData.hearingDate || 'date'}. Finding: ${decisionData.findingRuling}. Proposed Sanction: ${decisionData.actionRecommended}. Transmitted for Council deliberation under Art. 57.`
      }
    });
  }

  function submitCouncilResolution(id, resolutionData) {
    return updateComplaintStatus(id, {
      status: 'president_sanction_issued',
      councilResolution: resolutionData.resolutionText,
      sanctionOrdered: resolutionData.sanctionDecided,
      adminRemark: `Council Voted: ${resolutionData.actionType} sanction. Submitted to University President (Art. 53) for executive decree.`,
      timelineEvent: {
        title: 'Council Deliberation Completed',
        text: `University Council (${resolutionData.quorumCount || '24'} members present) voted to ${resolutionData.actionType} sanction: "${resolutionData.sanctionDecided}". Decree submitted to University President.`
      }
    });
  }

  function issuePresidentDecree(id, decreeData) {
    const text = typeof decreeData === 'string' ? decreeData : (decreeData && decreeData.decreeText ? decreeData.decreeText : 'Executive Sanction Decree promulgated');
    const sanction = (decreeData && decreeData.sanction) ? decreeData.sanction : 'Statutory Sanction Ratified';
    const decreeNo = (decreeData && decreeData.decreeNumber) ? decreeData.decreeNumber : `AU/PRES/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`;

    return updateComplaintStatus(id, {
      status: 'resolved',
      executiveDecreeNo: decreeNo,
      sanctionOrdered: sanction,
      adminRemark: `Executive Sanction Decree ${decreeNo} issued by University President under Article 53(1)(k). Sanction: "${sanction}". 7-day statutory appeal window activated.`,
      timelineEvent: {
        title: `Presidential Decree Promulgated (${decreeNo})`,
        text: `University President signed official executive decree under Article 53(1)(k). Sanction: "${sanction}". Directive: "${text}". Notice dispatched to Academic Registrar, Dean, HoD, and respondent staff member. 7-working-day appeal window opened.`
      }
    });
  }

  function remandToCommittee(id, reason) {
    return updateComplaintStatus(id, {
      status: 'committee_review',
      adminRemark: `Remanded to ASDC by University President: ${reason}`,
      timelineEvent: {
        title: 'Remanded by President for Procedural Review',
        text: `Case remanded to ASDC docket under Art. 31(1)(i). Presidential directive: "${reason}"`
      }
    });
  }

  function appointAppellatePanel(id, panelData) {
    const lead = (panelData && panelData.leadReviewer) ? panelData.leadReviewer : 'Senior Faculty Panelist';
    const directive = (panelData && panelData.directive) ? panelData.directive : 'De novo procedural and evidentiary re-examination';
    return updateComplaintStatus(id, {
      status: 'appellate_review',
      appellateLead: lead,
      adminRemark: `Ad-Hoc Appellate Review Panel appointed by University President under Senate Statute. Lead Reviewer: ${lead}.`,
      timelineEvent: {
        title: 'Appellate Review Panel Appointed (Art. 53)',
        text: `University President appointed a 3-5 member neutral Ad-Hoc Appellate Review Panel to examine petition de novo. Lead Reviewer: ${lead}. Directive: "${directive}".`
      }
    });
  }

  function fileStatutoryAppeal(id, appealData) {
    const grounds = (appealData && appealData.grounds) ? appealData.grounds : 'Disputed factual findings and severity of sanction';
    return updateComplaintStatus(id, {
      status: 'appealed',
      appealDate: new Date().toISOString().split('T')[0],
      appealGrounds: grounds,
      adminRemark: `Statutory 7-day appeal lodged to the Office of the President. Awaiting Presidential review.`,
      timelineEvent: {
        title: 'Statutory 7-Day Appeal Lodged to President',
        text: `Appellant filed formal appellate petition to the University President within statutory window. Grounds: "${grounds}".`
      }
    });
  }

  function endorseHoDResolution(id, remarks) {
    return updateComplaintStatus(id, {
      status: 'resolved',
      adminRemark: `Department Head verified marking sheets and endorsed faculty resolution under Article 42(7). Registrar ledger updated. ${remarks || ''}`,
      timelineEvent: {
        title: 'HoD Resolution Endorsed',
        text: `Department Head signed off on academic resolution. Academic records updated and closed.`
      }
    });
  }

  function referToAsdc(id, referralData) {
    const authority = (referralData && referralData.targetAuthority) ? referralData.targetAuthority : 'Academic Staff Disciplinary Committee (ASDC)';
    const reason = (referralData && referralData.referralReason) ? referralData.referralReason : 'Allegation exceeds unit-level jurisdiction under Senate Statutes';
    return updateComplaintStatus(id, {
      status: 'committee_review',
      referredAuthority: authority,
      adminRemark: `Department Head formally referred case to ${authority}: ${reason}`,
      timelineEvent: {
        title: `Statutory Referral to ${authority}`,
        text: `Case transferred out of unit jurisdiction to ${authority} pursuant to Proclamation 1152/2019. Grounds: "${reason}".`
      }
    });
  }

  function issueGenderInjunction(id, injunctionData) {
    const order = (injunctionData && injunctionData.protectiveOrder) ? injunctionData.protectiveOrder : 'Immediate course evaluation reassignment / anti-retaliation protection';
    return updateComplaintStatus(id, {
      genderInjunctionActive: true,
      adminRemark: `Gender Directorate Protective Order Issued: ${order}. Article 38 sealed identity enforced.`,
      timelineEvent: {
        title: 'Gender Directorate Anti-Retaliation Injunction Issued',
        text: `Director of Gender Affairs issued protective directive pursuant to Articles 38(1)(e) & 57(1): "${order}". Respondent prohibited from evaluating complainant.`
      }
    });
  }

  function getUserJurisdiction(user) {
    if (!user) return 'guest';
    if (user.adminSubRole) return user.adminSubRole; // 'president', 'hod', 'gender'
    return user.role; // 'student', 'teacher', 'committee', 'admin'
  }

  function declineComplaint(id, reason) {
    return updateComplaintStatus(id, {
      status: 'declined',
      declineReason: reason,
      timelineEvent: {
        title: 'Declined by Administrator',
        text: `Complaint declined as out-of-scope under Proclamation 1152/2019. Reason: "${reason}"`
      }
    });
  }

  function getDisplayStatus(status, userRole) {
    if (userRole === 'student') {
      if (status === 'needs_confirmation' || status === 'assigned') return 'in_progress';
      if (status === 'escalated' || status === 'committee_review' || status === 'council_deliberation') return 'escalated';
    }
    return status;
  }

  function getStatusLabel(status, userRole) {
    if (status === 'pending') return 'Pending Triage';
    if (status === 'assigned') return 'Assigned to Instructor';
    if (status === 'in_progress') return 'Under Review';
    if (status === 'needs_confirmation') return 'Awaiting HoD Verification';
    if (status === 'committee_review') return 'ASDC Hearing Docket';
    if (status === 'council_deliberation') return 'University Council Review (Art. 57)';
    if (status === 'pending_presidential_decree') return 'Awaiting Presidential Decree';
    if (status === 'appealed') return 'Statutory Appeal Lodged';
    if (status === 'appellate_review') return 'Under Appellate Panel Review';
    if (status === 'president_sanction_issued') return 'President Sanction Issued';
    if (status === 'escalated') return 'Referred to ASDC';
    if (status === 'declined') return 'Declined';
    if (status === 'resolved') return 'Resolved';
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  }

  function getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
  }

  function logout() {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 400);
  }

  function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
      padding: 12px 20px;
      border-radius: 8px;
      font-size: 0.92rem;
      font-weight: 600;
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      pointer-events: auto;
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(10px);
      display: flex;
      align-items: center;
      gap: 10px;
    `;

    if (type === 'success') toast.style.backgroundColor = '#059669';
    else if (type === 'danger' || type === 'error') toast.style.backgroundColor = '#dc2626';
    else if (type === 'warning') toast.style.backgroundColor = '#d97706';
    else toast.style.backgroundColor = '#2563eb';

    toast.innerHTML = message;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
    document.documentElement.dataset.theme = saved;
    updateThemeButtons(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.dataset.theme || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    updateThemeButtons(next);
  }

  function renderThemeSwitchSvg(theme) {
    if (theme === 'dark') {
      return `
        <svg class="theme-switch-svg dark" width="46" height="24" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0.5" y="0.5" width="45" height="23" rx="11.5" fill="#1e293b" stroke="#334155" stroke-width="1"/>
          <circle cx="12" cy="12" r="3" fill="#64748b" opacity="0.4"/>
          <path d="M12 6.5v1M12 16.5v1M6.5 12h1M16.5 12h1M8.1 8.1l.7.7M15.2 15.2l.7.7M8.1 15.9l.7-.7M15.2 8.8l.7-.7" stroke="#64748b" stroke-width="1" stroke-linecap="round" opacity="0.4"/>
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
            <circle cx="34" cy="12" r="9.5" fill="#0f172a" stroke="#475569" stroke-width="0.75" />
            <path d="M33 7.8a4.5 4.5 0 0 0 4.2 4.2 4.8 4.8 0 1 1-4.2-4.2z" fill="#60a5fa" />
            <circle cx="37" cy="8.5" r="0.8" fill="#93c5fd" />
            <circle cx="31" cy="15.5" r="0.6" fill="#93c5fd" opacity="0.8" />
          </g>
        </svg>
      `;
    } else {
      return `
        <svg class="theme-switch-svg light" width="46" height="24" viewBox="0 0 46 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="0.5" y="0.5" width="45" height="23" rx="11.5" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
          <path d="M34.5 7.5a4.5 4.5 0 0 0 4.2 4.2 5 5 0 1 1-4.2-4.2z" fill="#94a3b8" opacity="0.45"/>
          <circle cx="38" cy="8.5" r="0.8" fill="#94a3b8" opacity="0.45"/>
          <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))">
            <circle cx="12" cy="12" r="9.5" fill="#ffffff" />
            <circle cx="12" cy="12" r="4.2" fill="#f59e0b" />
            <path d="M12 4.8v1.4M12 17.8v1.4M4.8 12h1.4M17.8 12h1.4M6.9 6.9l1 1M16.1 16.1l1 1M6.9 17.1l1-1M16.1 7.9l1-1" stroke="#f59e0b" stroke-width="1.3" stroke-linecap="round"/>
          </g>
        </svg>
      `;
    }
  }

  function updateThemeButtons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = renderThemeSwitchSvg(theme);
      btn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });
  }

  /**
   * AUTHENTIC STATUTORY DEMO ACCOUNTS
   * Grounded in Proclamation No. 1152/2019 governance hierarchy
   */
  const DEMO_USERS = {
    student: {
      id: 1,
      name: 'Abebe Kebede',
      role: 'student',
      email: 'student@ambo.edu.et',
      studentId: 'ugr/12345/16',
      department: 'Information Technology',
      title: 'Undergraduate Student'
    },
    teacher: {
      id: 5,
      name: 'Mr. Eyuel',
      role: 'teacher',
      email: 'eyuel.t@ambo.edu.et',
      staffId: 'FAC/4891/08',
      department: 'Information Technology',
      title: 'Course Instructor / Faculty Member'
    },
    hod: {
      id: 6,
      name: 'Dr. Gemechu',
      role: 'admin',
      adminSubRole: 'hod',
      email: 'hod.it@ambo.edu.et',
      staffId: 'HOD/2041/04',
      department: 'Information Technology',
      title: 'Head of Department (Tier 1 Academic Authority)'
    },
    gender: {
      id: 9,
      name: 'Sister Aster',
      role: 'committee',
      adminSubRole: 'gender',
      email: 'gender.director@ambo.edu.et',
      staffId: 'GEN/3301/10',
      department: 'Gender and Social Inclusion Directorate',
      title: 'Director of Gender Affairs (Statutory Member - Art. 57(1))'
    },
    committee: {
      id: 8,
      name: 'Dr. Daniel',
      role: 'committee',
      email: 'asdc.chair@ambo.edu.et',
      staffId: 'UDC/7710/05',
      department: 'Academic Staff Disciplinary Committee (ASDC)',
      title: 'Disciplinary Committee Chairperson'
    },
    president: {
      id: 10,
      name: 'Prof. Bayisa',
      role: 'admin',
      adminSubRole: 'president',
      email: 'president@ambo.edu.et',
      staffId: 'PRES/001/01',
      department: 'Office of the President',
      title: 'University President & Council Chair (Art. 52 & 57)'
    }
  };

  function setupTelegramPopover(user) {
    if (!user) {
      const existing = document.getElementById('telegramPopover');
      if (existing) existing.remove();
      return;
    }
    const active = user;
    const initial = (active.name || 'U').charAt(0).toUpperCase();

    let popover = document.getElementById('telegramPopover');
    if (!popover) {
      popover = document.createElement('aside');
      popover.id = 'telegramPopover';
      popover.className = 'telegram-popover';
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('aria-label', 'Profile Information');
      document.body.appendChild(popover);
    }

    const roleTitle = active.title || (active.role === 'student' ? 'Undergraduate Student' : 'University Staff');
    const idVal = active.studentId || active.staffId || 'ID/0000/00';

    popover.innerHTML = `
      <div class="telegram-card-header">
        <div class="telegram-user-info">
          <div class="telegram-avatar-badge">${initial}</div>
          <div class="telegram-meta">
            <h3>${active.name}</h3>
            <p>${idVal}</p>
          </div>
        </div>
        <button type="button" id="teleCloseBtn" class="telegram-close-btn" aria-label="Close profile popover">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="telegram-card-body">
        <div class="telegram-detail-row">
          <span class="telegram-label">Full Name</span>
          <span class="telegram-value">${active.name}</span>
        </div>
        <div class="telegram-detail-row">
          <span class="telegram-label">Identifier</span>
          <span class="telegram-value" style="font-family: monospace;">${idVal}</span>
        </div>
        <div class="telegram-detail-row">
          <span class="telegram-label">Statutory Designation</span>
          <span class="telegram-value">${roleTitle}</span>
        </div>
        <div class="telegram-detail-row">
          <span class="telegram-label">Affiliated Unit</span>
          <span class="telegram-value">${active.department || 'Ambo University'}</span>
        </div>
      </div>
    `;

    const closeBtn = document.getElementById('teleCloseBtn');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        popover.classList.remove('open');
      };
    }

    const trigger = document.getElementById('navProfileTrigger');
    if (trigger) {
      trigger.onclick = (e) => {
        e.stopPropagation();
        popover.classList.toggle('open');
      };
    }

    document.addEventListener('click', (e) => {
      if (popover && popover.classList.contains('open')) {
        if (!popover.contains(e.target) && (!trigger || !trigger.contains(e.target))) {
          popover.classList.remove('open');
        }
      }
    });
  }

  function renderNavigation() {
    const user = getCurrentUser();
    const navLinksContainer = document.getElementById('navLinks');
    const userBadgeContainer = document.getElementById('navUserBadge');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    const mobileToggle = document.getElementById('mobileNavToggle');
    if (mobileToggle && navLinksContainer) {
      mobileToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('open');
      });
    }

    if (!navLinksContainer) return;

    let linksHtml = '';
    const jurisdiction = getUserJurisdiction(user);

    if (!user) {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'submission_guide.html' ? 'active' : ''}" href="submission_guide.html">Statutory Guide</a></li>
      `;
    } else if (jurisdiction === 'student') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'student_dashboard.html' ? 'active' : ''}" href="student_dashboard.html">Dashboard</a></li>
        <li><a class="nav-link ${currentPage === 'my_complaints.html' ? 'active' : ''}" href="my_complaints.html">My Complaints</a></li>
      `;
    } else if (jurisdiction === 'teacher') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'teacher_dashboard.html' ? 'active' : ''}" href="teacher_dashboard.html">Faculty Cases</a></li>
      `;
    } else if (jurisdiction === 'president') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'admin_dashboard.html' ? 'active' : ''}" href="admin_dashboard.html">Executive Portal</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Dockets</a></li>
      `;
    } else if (jurisdiction === 'hod') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'admin_dashboard.html' ? 'active' : ''}" href="admin_dashboard.html">HoD Triage</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Complaints</a></li>
      `;
    } else if (jurisdiction === 'gender') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'admin_dashboard.html' ? 'active' : ''}" href="admin_dashboard.html">Safe Harbor Docket</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Complaints</a></li>
      `;
    } else if (jurisdiction === 'committee') {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'committee_dashboard.html' ? 'active' : ''}" href="committee_dashboard.html">ASDC Hearing Docket</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Complaints</a></li>
      `;
    } else {
      linksHtml += `
        <li><a class="nav-link ${currentPage === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
        <li><a class="nav-link ${currentPage === 'admin_dashboard.html' ? 'active' : ''}" href="admin_dashboard.html">Administration</a></li>
        <li><a class="nav-link ${currentPage === 'admin_all_complaints.html' ? 'active' : ''}" href="admin_all_complaints.html">All Complaints</a></li>
      `;
    }

    navLinksContainer.innerHTML = linksHtml;

    if (userBadgeContainer) {
      if (user && currentPage !== 'login.html') {
        const initial = (user.name || 'U').charAt(0).toUpperCase();
        const profilePillHtml = `
          <button type="button" id="navProfileTrigger" class="nav-profile-pill" aria-label="Open Profile Details" title="Click to view credentials">
            <span class="nav-profile-avatar">${initial}</span>
            <span>${user.name}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        `;

        const activeRoleKey = Object.keys(DEMO_USERS).find(k => DEMO_USERS[k].name === user.name) || user.role;

        userBadgeContainer.innerHTML = `
          ${profilePillHtml}
          <select id="quickDemoSwitch" class="nav-user-select" title="Active Statutory Role (Switch in 1-Click)">
            <option value="student" ${activeRoleKey === 'student' ? 'selected' : ''}>Student (Abebe)</option>
            <option value="teacher" ${activeRoleKey === 'teacher' ? 'selected' : ''}>Teacher (Mr. Eyuel)</option>
            <option value="hod" ${activeRoleKey === 'hod' ? 'selected' : ''}>Dept Head (Dr. Gemechu)</option>
            <option value="gender" ${activeRoleKey === 'gender' ? 'selected' : ''}>Gender Director (Sister Aster)</option>
            <option value="committee" ${activeRoleKey === 'committee' ? 'selected' : ''}>ASDC Chair (Dr. Daniel)</option>
            <option value="president" ${activeRoleKey === 'president' ? 'selected' : ''}>President (Prof. Bayisa)</option>
          </select>
          <button class="nav-logout-btn" id="logoutBtn" title="Log out">Logout</button>
        `;
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', logout);
        setupTelegramPopover(user);
      } else {
        userBadgeContainer.innerHTML = `
          <select id="quickDemoSwitch" class="nav-user-select" title="Select demo profile">
            <option value="" disabled selected>Statutory Role ▾</option>
            <option value="student">Student (Abebe)</option>
            <option value="teacher">Teacher (Mr. Eyuel)</option>
            <option value="hod">Dept Head (Dr. Gemechu)</option>
            <option value="gender">Gender Director (Sister Aster)</option>
            <option value="committee">ASDC Chair (Dr. Daniel)</option>
            <option value="president">President (Prof. Bayisa)</option>
          </select>
          <a class="nav-login-btn ${currentPage === 'login.html' ? 'active' : ''}" href="login.html">Sign In</a>
        `;
        setupTelegramPopover(null);
      }

      const demoSelect = document.getElementById('quickDemoSwitch');
      if (demoSelect) {
        demoSelect.addEventListener('change', (e) => {
          switchDemoRole(e.target.value);
        });
      }
    }
  }

  function switchDemoRole(roleKey) {
    if (!DEMO_USERS[roleKey]) return;
    const targetUser = DEMO_USERS[roleKey];
    setCurrentUser(targetUser);
    showToast(`Switched to: ${targetUser.name} (${targetUser.title})`, 'success', 2200);
    setTimeout(() => {
      const jur = getUserJurisdiction(targetUser);
      if (jur === 'student') window.location.href = 'student_dashboard.html';
      else if (jur === 'teacher') window.location.href = 'teacher_dashboard.html';
      else if (jur === 'committee') window.location.href = 'committee_dashboard.html';
      else window.location.href = 'admin_dashboard.html';
    }, 280);
  }

  function debounce(fn, delay = 250) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const DRAFT_STORAGE_KEY = 'ambo_cms_draft_complaint';

  function initDraftAutoSave() {
    const form = document.getElementById('complaintForm');
    if (!form) return;

    const monitoredFields = ['department', 'courseName', 'complaintTitle', 'urgency', 'complaintMessage'];

    try {
      const rawDraft = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (rawDraft) {
        const draft = JSON.parse(rawDraft);
        let restoredCount = 0;
        monitoredFields.forEach(field => {
          const el = document.getElementById(field);
          if (el && draft[field] !== undefined && draft[field] !== '') {
            el.value = draft[field];
            restoredCount++;
          }
        });
        if (draft.track) {
          const trackRadio = form.querySelector(`input[name="track"][value="${draft.track}"]`);
          if (trackRadio) trackRadio.checked = true;
        }
        if (draft.isIdentitySealed) {
          const sealCheck = document.getElementById('isIdentitySealed');
          if (sealCheck) sealCheck.checked = true;
        }
      }
    } catch (e) {
      console.warn('[Ambo CMS] Draft restoration error:', e);
    }

    const saveDraftDebounced = debounce(() => {
      const draft = {};
      monitoredFields.forEach(field => {
        const el = document.getElementById(field);
        if (el) draft[field] = el.value;
      });
      const selectedTrack = form.querySelector('input[name="track"]:checked');
      if (selectedTrack) draft.track = selectedTrack.value;
      const sealCheck = document.getElementById('isIdentitySealed');
      if (sealCheck) draft.isIdentitySealed = sealCheck.checked;
      sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
    }, 350);

    form.addEventListener('input', saveDraftDebounced);
    form.addEventListener('change', saveDraftDebounced);
    form.addEventListener('submit', () => sessionStorage.removeItem(DRAFT_STORAGE_KEY));
  }

  function initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => reg.update())
          .catch(err => console.log('[Ambo CMS PWA] SW failed:', err));
      });
    }
  }

  window.AmboCMS = {
    getComplaints,
    getComplaintById,
    getSanitizedComplainant,
    calculateSla,
    addComplaint,
    updateComplaintStatus,
    escalateComplaint,
    referToAsdc,
    endorseHoDResolution,
    submitCommitteeDecision,
    submitCouncilResolution,
    issuePresidentDecree,
    remandToCommittee,
    appointAppellatePanel,
    fileStatutoryAppeal,
    issueGenderInjunction,
    getUserJurisdiction,
    declineComplaint,
    getDisplayStatus,
    getStatusLabel,
    getCurrentUser,
    setCurrentUser,
    switchDemoRole,
    logout,
    showToast,
    toggleTheme,
    debounce,
    DEMO_USERS,
    STATUTORY_SANCTIONS,
    DEFAULT_COMPLAINTS
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderNavigation();
    initDraftAutoSave();
    initPWA();
  });

})();
