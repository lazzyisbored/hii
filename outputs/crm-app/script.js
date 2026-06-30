const toast = document.querySelector(".toast");
const modal = document.querySelector(".modal");
const missionCard = document.querySelector(".mission-card");
const missionCopy = document.querySelector(".mission-copy");
const missionMascot = document.querySelector(".mission-mascot");
const metricGrid = document.querySelector(".metric-grid");
const workGrid = document.querySelector(".work-grid");
const coachMain = document.querySelector(".coach-main");
const coachCopy = document.querySelector(".coach-stage p");
const xpPill = document.querySelector(".stat-pill.xp b");
const streakPill = document.querySelector(".stat-pill.streak b");
const notificationPill = document.querySelector(".stat-pill.bell b");
const levelRow = document.querySelector(".level-row span");
const levelProgress = document.querySelector(".xp-block .progress i");
const levelHint = document.querySelector(".xp-block small");

const mascot = {
  wave: "assets/mascots/wave.png",
  celebrate: "assets/mascots/celebrate.png",
  proud: "assets/mascots/proud.png",
  focus: "assets/mascots/focus.png",
  surprised: "assets/mascots/surprised.png",
  sad: "assets/mascots/sad.png",
  sleepy: "assets/mascots/sleepy.png",
  gem: "assets/mascots/gem.png",
  coach: "assets/mascots/coach.png",
  run: "assets/mascots/run.png",
  crown: "assets/mascots/crown.png",
  heart: "assets/mascots/heart.png"
};

const seed = {
  version: 4,
  user: { xp: 850, level: 7, streak: 23, completedToday: 18 },
  activeView: "Home",
  filters: {},
  sort: {},
  ui: {
    density: "comfortable",
    selected: {},
    activeInboxId: "msg-1",
    system: { lastSynced: "Just now", health: "Healthy", offline: false }
  },
  drawerTab: "overview",
  commandQuery: "",
  focusSession: null,
  reportTab: "pipeline",
  settings: {
    slaMinutes: 30,
    scoring: "Fit + intent + recency",
    streakRule: "1 completed revenue activity",
    pipelineStages: ["Qualified", "Proposal", "Negotiation", "Contract", "Won"],
    notifications: true
  },
  team: [
    { id: "user-1", name: "Alex", role: "AE", xp: 850 },
    { id: "user-2", name: "Mina", role: "SDR", xp: 720 },
    { id: "user-3", name: "Ravi", role: "Manager", xp: 640 }
  ],
  accounts: [
    { id: "acct-1", name: "Acme Inc.", industry: "SaaS", tier: "Strategic", arr: 42000, owner: "Alex", health: 72 },
    { id: "acct-2", name: "Northwind", industry: "Operations", tier: "Enterprise", arr: 56000, owner: "Alex", health: 64 },
    { id: "acct-3", name: "BrightTech", industry: "Technology", tier: "Growth", arr: 31000, owner: "Mina", health: 81 },
    { id: "acct-4", name: "Greenly Co.", industry: "Climate", tier: "SMB", arr: 27000, owner: "Alex", health: 76 }
  ],
  views: {
    Leads: [{ id: "all", name: "All leads", chip: "" }, { id: "hot", name: "Hot inbound", chip: "Hot" }, { id: "sla", name: "SLA risk", chip: "SLA risk" }, { id: "unassigned", name: "Unassigned", chip: "Unassigned" }],
    Deals: [{ id: "all", name: "All deals", chip: "" }, { id: "risk", name: "At risk", chip: "At risk" }, { id: "closing", name: "Close this week", chip: "Close this week" }, { id: "blocked", name: "Blocked", chip: "Blocked" }],
    Contacts: [{ id: "all", name: "All contacts", chip: "" }, { id: "champions", name: "Champions", chip: "Champion" }, { id: "dormant", name: "Dormant", chip: "Dormant" }, { id: "gaps", name: "Coverage gaps", chip: "Coverage gap" }],
    Activities: [{ id: "all", name: "Today", chip: "" }, { id: "due", name: "Due now", chip: "Due now" }, { id: "overdue", name: "Overdue", chip: "Overdue" }, { id: "xp", name: "High XP", chip: "High XP" }],
    Inbox: [{ id: "all", name: "All threads", chip: "" }, { id: "intent", name: "High intent", chip: "High intent" }, { id: "due", name: "Reply due", chip: "Reply due" }, { id: "meeting", name: "Meeting likely", chip: "Meeting likely" }]
  },
  notifications: [
    { id: "note-1", record: "lead-1", kind: "Lead intent", text: "Sarah M. opened pricing again.", urgency: "High", read: false },
    { id: "note-2", record: "deal-1", kind: "Deal risk", text: "Acme Expansion has no next step.", urgency: "High", read: false },
    { id: "note-3", record: "msg-1", kind: "Reply SLA", text: "BrightTech reply is due now.", urgency: "High", read: false },
    { id: "note-4", record: "contact-4", kind: "Coverage", text: "Greenly Co. is single-threaded.", urgency: "Medium", read: false }
  ],
  xpLedger: [
    { id: "xp-1", text: "Daily quest opened", amount: 25, at: "09:00" },
    { id: "xp-2", text: "Lead sprint prepared", amount: 15, at: "09:12" }
  ],
  achievements: [
    { id: "ach-1", title: "SLA Saver", progress: 60, goal: "Clear 5 SLA-risk items" },
    { id: "ach-2", title: "Pipeline Climber", progress: 44, goal: "Advance 8 deals" },
    { id: "ach-3", title: "Relationship Builder", progress: 70, goal: "Touch 10 contacts" }
  ],
  imports: [
    { id: "import-1", file: "webinar-leads.csv", rows: 42, mapped: 38, errors: 4, status: "Needs review" }
  ],
  records: {
    Leads: [
      { id: "lead-1", name: "Sarah M.", company: "Acme Inc.", status: "Hot", score: 92, value: 12400, owner: "Alex", due: "8m", next: "Call now", source: "Pricing page", note: "Visited pricing twice and opened the ROI email.", touched: false },
      { id: "lead-2", name: "Jordan Lee", company: "Northwind", status: "SLA risk", score: 84, value: 9300, owner: "Alex", due: "18m", next: "Assign owner", source: "Demo request", note: "Inbound form says budget approved this quarter.", touched: false },
      { id: "lead-3", name: "Maya Chen", company: "BrightTech", status: "New today", score: 78, value: 6800, owner: "Unassigned", due: "42m", next: "Send opener", source: "Webinar", note: "Asked about implementation timeline.", touched: false },
      { id: "lead-4", name: "Owen Price", company: "Greenly Co.", status: "Hot", score: 88, value: 8200, owner: "Alex", due: "1h", next: "Book demo", source: "Referral", note: "Warm intro from current customer.", touched: false },
      { id: "lead-5", name: "Priya Shah", company: "Stellar Ops", status: "Unassigned", score: 71, value: 5200, owner: "Unassigned", due: "2h", next: "Route lead", source: "Import", note: "CSV import matched an existing account.", touched: false }
    ],
    Deals: [
      { id: "deal-1", name: "Acme Expansion", company: "Acme Inc.", stage: "Proposal", health: "At risk", value: 11800, owner: "Alex", due: "11d", next: "Schedule follow-up", note: "No next step logged after proposal send.", touched: false },
      { id: "deal-2", name: "Greenly Renewal", company: "Greenly Co.", stage: "Contract", health: "Close this week", value: 8400, owner: "Alex", due: "Fri", next: "Resolve legal note", note: "Legal is reviewing data processing terms.", touched: false },
      { id: "deal-3", name: "BrightTech Team", company: "BrightTech", stage: "Qualified", health: "Needs next step", value: 6300, owner: "Alex", due: "Today", next: "Book stakeholder demo", note: "Champion wants finance included.", touched: false },
      { id: "deal-4", name: "Northwind Pilot", company: "Northwind", stage: "Negotiation", health: "Blocked", value: 15600, owner: "Alex", due: "2d", next: "Answer security", note: "Security questionnaire is blocking procurement.", touched: false }
    ],
    Contacts: [
      { id: "contact-1", name: "Priya Shah", company: "Northwind", role: "VP Operations", status: "Champion", score: 91, owner: "Alex", due: "Warm", next: "Ask for intro", note: "Strong advocate, can introduce finance.", touched: false },
      { id: "contact-2", name: "Marco Ruiz", company: "Acme Inc.", role: "Director IT", status: "Dormant", score: 41, owner: "Alex", due: "21d", next: "Send check-in", note: "Quiet since technical review.", touched: false },
      { id: "contact-3", name: "Ari Patel", company: "BrightTech", role: "Finance Lead", status: "New stakeholder", score: 73, owner: "Alex", due: "New", next: "Map influence", note: "Added by champion after pricing question.", touched: false },
      { id: "contact-4", name: "Nora Kim", company: "Greenly Co.", role: "COO", status: "Coverage gap", score: 64, owner: "Alex", due: "Gap", next: "Add decision maker", note: "Account is single-threaded.", touched: false }
    ],
    Activities: [
      { id: "act-1", name: "Call Sarah M.", company: "Acme Inc.", type: "Call", status: "Due now", xp: 10, due: "10:00", next: "Dial", note: "Streak saver activity.", touched: false },
      { id: "act-2", name: "Email Acme follow-up", company: "Acme Inc.", type: "Email", status: "High XP", xp: 8, due: "10:30", next: "Send", note: "Attach revised rollout plan.", touched: false },
      { id: "act-3", name: "Update Greenly notes", company: "Greenly Co.", type: "Admin", status: "Overdue", xp: 5, due: "Late", next: "Complete notes", note: "Calendar sync created a duplicate.", touched: false },
      { id: "act-4", name: "Send BrightTech proposal", company: "BrightTech", type: "Doc", status: "Focus", xp: 20, due: "Today", next: "Send proposal", note: "Proposal draft is ready.", touched: false }
    ],
    Inbox: [
      { id: "msg-1", name: "BrightTech", company: "BrightTech", status: "High intent", score: 96, due: "Due", next: "Reply with pricing", note: "Asked about seat pricing and rollout.", touched: false },
      { id: "msg-2", name: "Acme Inc.", company: "Acme Inc.", status: "Reply due", score: 84, due: "3h", next: "Send follow-up", note: "Waiting for revised timeline.", touched: false },
      { id: "msg-3", name: "Northwind", company: "Northwind", status: "Unread", score: 67, due: "New", next: "Read thread", note: "Stakeholder loop opened.", touched: false },
      { id: "msg-4", name: "Greenly Co.", company: "Greenly Co.", status: "Meeting likely", score: 88, due: "2pm", next: "Book meeting", note: "Demo response ready.", touched: false }
    ]
  }
};

let app = loadState();
let undoStack = [];

const sections = {
  Home: {
    theme: "home",
    eyebrow: "Main mission",
    title: "Complete today’s sales quest to protect your streak.",
    body: "Finish the highest-impact CRM actions, claim XP, and push the pipeline closer to Level 8.",
    mascot: mascot.coach,
    speech: "Pick a live record. I’ll react when you make progress.",
    primary: "Complete next action",
    primaryAction: "complete-next",
    secondary: "Command bar",
    secondaryAction: "command"
  },
  Leads: {
    theme: "leads",
    eyebrow: "Lead sprint",
    title: "Prioritize the warmest prospects.",
    body: "Filter, assign, contact, and inspect lead history without leaving the dashboard.",
    mascot: mascot.focus,
    speech: "Hot leads first. Speed wins the sprint.",
    primary: "Start lead sprint",
    primaryAction: "start-lead-sprint",
    secondary: "New lead",
    secondaryAction: "new-lead"
  },
  Deals: {
    theme: "deals",
    eyebrow: "Deal momentum",
    title: "Advance what can close next.",
    body: "Move stages, rescue at-risk deals, and keep next steps attached to every opportunity.",
    mascot: mascot.crown,
    speech: "No next step means no momentum.",
    primary: "Move next deal",
    primaryAction: "move-next-deal",
    secondary: "Open forecast",
    secondaryAction: "view-plan"
  },
  Contacts: {
    theme: "contacts",
    eyebrow: "Relationship map",
    title: "Grow coverage across every account.",
    body: "Revive dormant relationships, promote champions, and reduce single-threaded account risk.",
    mascot: mascot.heart,
    speech: "A second stakeholder can save the deal.",
    primary: "Strengthen relationships",
    primaryAction: "strengthen-relationships",
    secondary: "Add touch",
    secondaryAction: "complete-next"
  },
  Activities: {
    theme: "activities",
    eyebrow: "Today’s quest board",
    title: "Finish the work that moves revenue.",
    body: "Work the queue, bank XP, and keep the streak protected with real completion state.",
    mascot: mascot.run,
    speech: "One done task changes the whole day.",
    primary: "Start focus block",
    primaryAction: "start-focus",
    secondary: "Complete next",
    secondaryAction: "complete-next"
  },
  Inbox: {
    theme: "inbox",
    eyebrow: "Priority inbox",
    title: "Reply where intent is highest.",
    body: "Sort by buying signal, clear SLA risk, and turn replies into meetings.",
    mascot: mascot.surprised,
    speech: "BrightTech is hot. Reply before the clock slips.",
    primary: "Clear priority inbox",
    primaryAction: "clear-inbox",
    secondary: "Reply next",
    secondaryAction: "complete-next"
  },
  Reports: {
    theme: "reports",
    eyebrow: "Revenue intelligence",
    title: "Understand what is moving and what is stuck.",
    body: "Review forecast, activity quality, conversion, streak impact, and team contribution.",
    mascot: mascot.gem,
    speech: "Reports turn motion into coaching.",
    primary: "Pipeline report",
    primaryAction: "report-pipeline",
    secondary: "Export CSV",
    secondaryAction: "export-view"
  },
  Automations: {
    theme: "automations",
    eyebrow: "Workflow builder",
    title: "Automate the repetitive revenue work.",
    body: "Create if-this-then-that rules for routing, reminders, SLA rescue, XP quests, and follow-ups.",
    mascot: mascot.coach,
    speech: "Let the system catch what humans miss.",
    primary: "Run preview",
    primaryAction: "automation-preview",
    secondary: "New rule",
    secondaryAction: "new-rule"
  },
  Settings: {
    theme: "settings",
    eyebrow: "Admin center",
    title: "Configure how the CRM behaves.",
    body: "Tune scoring, SLA rules, stages, fields, XP, notifications, imports, and team permissions.",
    mascot: mascot.proud,
    speech: "A real CRM should bend to the team.",
    primary: "Save settings",
    primaryAction: "save-settings",
    secondary: "Review import",
    secondaryAction: "review-import"
  }
};

document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav-item");
  if (nav) return setSection(nav.dataset.view);

  const viewTab = event.target.closest("[data-view-tab]");
  if (viewTab) return applySavedView(viewTab.dataset.viewTab);

  const notification = event.target.closest("[data-notification]");
  if (notification) return openNotification(notification.dataset.notification);

  const drawerTab = event.target.closest("[data-drawer-tab]");
  if (drawerTab) return setDrawerTab(drawerTab.dataset.drawerTab, drawerTab.dataset.recordId);

  const saveRecord = event.target.closest("[data-save-record]");
  if (saveRecord) return saveRecordFromDrawer(saveRecord.dataset.saveRecord);

  const archiveRecord = event.target.closest("[data-archive-record]");
  if (archiveRecord) return archiveRecordById(archiveRecord.dataset.archiveRecord, archiveRecord);

  const template = event.target.closest("[data-template]");
  if (template) return applyReplyTemplate(template.dataset.template);

  const sendReply = event.target.closest("[data-send-reply]");
  if (sendReply) return sendInboxReply(sendReply.dataset.sendReply, sendReply);

  const reportTab = event.target.closest("[data-report-tab]");
  if (reportTab) return setReportTab(reportTab.dataset.reportTab);

  const saveView = event.target.closest("[data-save-view]");
  if (saveView) return saveCurrentView(saveView);

  const selector = event.target.closest("[data-select]");
  if (selector) return toggleRecordSelection(selector.dataset.select, selector.checked);

  const clearSelection = event.target.closest("[data-clear-selection]");
  if (clearSelection) return clearSelectionFor(app.activeView);

  const sort = event.target.closest("[data-sort]");
  if (sort) return setSort(sort.dataset.sort, sort);

  const density = event.target.closest("[data-density]");
  if (density) return setDensity(density.dataset.density, density);

  const batch = event.target.closest("[data-batch]");
  if (batch) return applyBatchAction(batch.dataset.batch, batch);

  const thread = event.target.closest("[data-thread]");
  if (thread) return selectInboxThread(thread.dataset.thread, thread);

  const detail = event.target.closest("[data-detail]");
  if (detail && !detail.matches(".metric-card, .insight-card")) {
    return react(mascot.focus, detail.dataset.detail, detail, { small: true });
  }

  const chip = event.target.closest("[data-chip]");
  if (chip) return applyFilter(chip.dataset.chip);

  const action = event.target.closest("[data-action]");
  if (action) return handleAction(action);

  const record = event.target.closest("[data-record]");
  if (record) return openRecord(record.dataset.record);

  const complete = event.target.closest("[data-complete]");
  if (complete) return completeRecord(complete.dataset.complete, complete);

  const stage = event.target.closest("[data-stage-move]");
  if (stage) return moveDeal(stage.dataset.stageMove);

  const metric = event.target.closest(".metric-card, .insight-card");
  if (metric) return react(mascot.focus, metric.dataset.detail || "Metric opened.", metric);

  const day = event.target.closest("[data-day]");
  if (day) {
    day.classList.toggle("off");
    return react(day.classList.contains("off") ? mascot.sad : mascot.celebrate, day.classList.contains("off") ? "Streak day marked pending." : "Streak day restored.", day);
  }

  const mood = event.target.closest("[data-mood]");
  if (mood) {
    document.querySelectorAll("[data-mood]").forEach((item) => item.classList.remove("selected"));
    mood.classList.add("selected");
    return react(mood.dataset.mood, mood.dataset.copy, mood);
  }

  if (event.target.closest(".drawer-backdrop, [data-close-drawer]")) closeDrawer();
});

document.addEventListener("input", (event) => {
  const commandSearch = event.target.closest("[data-command-search]");
  if (commandSearch) {
    app.commandQuery = commandSearch.value;
    renderCommandResults();
    return;
  }

  const setting = event.target.closest("[data-setting]");
  if (setting) {
    app.settings[setting.dataset.setting] = setting.value;
    saveState();
    return;
  }

  const search = event.target.closest("[data-search]");
  if (!search) return;
  app.filters[app.activeView] = { ...(app.filters[app.activeView] || {}), search: search.value };
  saveState();
  renderWork(app.activeView);
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openCommand();
  }
  if (event.key === "Escape") {
    closeDrawer();
    closeCommand();
  }
});

document.addEventListener("dragstart", (event) => {
  const deal = event.target.closest("[data-deal-drag]");
  if (!deal) return;
  event.dataTransfer?.setData("text/plain", deal.dataset.dealDrag);
});

document.addEventListener("dragover", (event) => {
  if (event.target.closest("[data-stage-drop]")) event.preventDefault();
});

document.addEventListener("drop", (event) => {
  const lane = event.target.closest("[data-stage-drop]");
  if (!lane) return;
  event.preventDefault();
  const id = event.dataTransfer?.getData("text/plain");
  if (id) moveDealToStage(id, lane.dataset.stageDrop, lane);
});

modal?.addEventListener("close", () => {
  if (modal.returnValue !== "save") return;
  const data = new FormData(modal.querySelector("form"));
  const name = String(data.get("name") || "New prospect").trim();
  const rawValue = String(data.get("value") || "$6,000").replace(/[^\d]/g, "");
  const value = Number(rawValue || 6000);
  rememberUndo(`Create ${name}`);
  app.records.Leads.unshift({
    id: `lead-${Date.now()}`,
    name,
    company: name.includes(" ") ? `${name.split(" ").at(-1)} Co.` : name,
    status: "New today",
    score: 72,
    value,
    owner: "Alex",
    due: "Now",
    next: String(data.get("step") || "Discovery call"),
    source: "Manual",
    note: "Created from the quick-add form.",
    touched: false
  });
  appendLedger(`Created lead ${name}`, 12);
  touchSystem();
  saveState();
  setSection("Leads", { quiet: true });
  react(mascot.gem, "Lead saved. +12 XP and the sprint queue updated.", document.querySelector("[data-action='new-lead']"), { undo: true });
  modal.querySelector("form").reset();
});

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("pipelineo-state") || "null");
    if (stored?.records) {
      const fresh = structuredClone(seed);
      return {
        ...fresh,
        ...stored,
        version: seed.version,
        settings: { ...fresh.settings, ...(stored.settings || {}) },
        views: { ...fresh.views, ...(stored.views || {}) },
        ui: {
          ...fresh.ui,
          ...(stored.ui || {}),
          selected: { ...fresh.ui.selected, ...(stored.ui?.selected || {}) },
          system: { ...fresh.ui.system, ...(stored.ui?.system || {}) }
        },
        notifications: stored.notifications || fresh.notifications,
        xpLedger: stored.xpLedger || fresh.xpLedger,
        achievements: stored.achievements || fresh.achievements,
        imports: stored.imports || fresh.imports,
        accounts: stored.accounts || fresh.accounts,
        team: stored.team || fresh.team,
        filters: stored.version === seed.version ? stored.filters || {} : {},
        commandQuery: "",
        drawerTab: stored.drawerTab || "overview"
      };
    }
  } catch {}
  return structuredClone(seed);
}

function saveState() {
  localStorage.setItem("pipelineo-state", JSON.stringify(app));
}

function setSection(view = "Home", options = {}) {
  closeCommand();
  closeNotificationCenter();
  app.activeView = sections[view] ? view : "Home";
  saveState();
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === app.activeView));
  renderAll();
  if (!options.quiet) react(sections[app.activeView].mascot, `${app.activeView} workspace loaded.`, document.querySelector(`.nav-item[data-view="${app.activeView}"]`), { small: true });
}

function renderAll() {
  applyUiState();
  renderStats();
  renderMission();
  renderMetrics();
  renderWork(app.activeView);
  renderRightRail();
}

function applyUiState() {
  document.body.dataset.uiDensity = app.ui?.density || "comfortable";
  document.querySelectorAll("[data-sync-status]").forEach((item) => {
    item.textContent = `${app.ui?.system?.health || "Healthy"} · ${app.ui?.system?.lastSynced || "Just now"}`;
  });
}

function renderStats() {
  const { xp, level, streak } = app.user;
  if (xpPill) xpPill.textContent = `${xp} XP`;
  if (streakPill) streakPill.textContent = streak;
  if (notificationPill) notificationPill.textContent = app.notifications.filter((item) => !item.read).length;
  const levelXp = xp % 350;
  if (levelRow) levelRow.textContent = `${levelXp} / 350 XP`;
  if (levelProgress) levelProgress.style.setProperty("--w", `${Math.min(100, Math.round((levelXp / 350) * 100))}%`);
  if (levelHint) levelHint.textContent = `${350 - levelXp} XP to Level ${level + 1}`;
}

function renderMission() {
  const state = sections[app.activeView];
  const badges = getBadges(app.activeView);
  missionCard.className = `mission-card ${state.theme}`;
  missionCopy.innerHTML = `
    <div class="mission-badges">${badges.map((badge) => `<button type="button" class="${isFilterActive(badge) ? "active" : ""}" data-chip="${escapeHtml(badge)}">${badge}</button>`).join("")}</div>
    <p class="eyebrow">${state.eyebrow}</p>
    <h2>${state.title}</h2>
    <p>${state.body}</p>
    <div class="quest-rows">${getQuests(app.activeView).map((quest) => `
      <button type="button" data-complete="${quest.id}">
        <span class="quest-check">${quest.done ? "✓" : "!"}</span><b>${quest.label}</b><em>${quest.meta}</em><strong>${quest.xp}</strong>
      </button>
    `).join("")}</div>
    <div class="hero-actions">
      <button class="primary-btn big-cta" type="button" data-action="${state.primaryAction}">${state.primary}</button>
      <button class="ghost-btn" type="button" data-action="${state.secondaryAction}">${state.secondary}</button>
    </div>
  `;
  missionMascot.innerHTML = `
    <span class="confetti c1"></span><span class="confetti c2"></span><span class="confetti c3"></span><span class="confetti c4"></span>
    <img src="${state.mascot}" alt="" />
    <div class="speech">${state.speech}</div>
  `;
}

function renderMetrics() {
  metricGrid.innerHTML = getMetrics(app.activeView).map(({ color, symbol, label, value, reward, width, detail }) => `
    <button class="metric-card ${color}" type="button" data-detail="${escapeHtml(detail)}">
      <span class="metric-symbol">${symbol}</span>
      <small>${label}</small>
      <strong>${value}</strong>
      <em>${reward}</em>
      <div class="progress"><i style="--w:${width}%"></i></div>
    </button>
  `).join("");
}

function renderWork(view) {
  if (view === "Home") return renderHomeWork();
  const renderers = {
    Leads: renderLeadsWork,
    Deals: renderDealsWork,
    Contacts: renderContactsWork,
    Activities: renderActivitiesWork,
    Inbox: renderInboxWork,
    Reports: renderReportsWork,
    Automations: renderAutomationsWork,
    Settings: renderSettingsWork
  };
  workGrid.innerHTML = renderers[view]?.() || renderLeadsWork();
}

function renderLeadsWork() {
  const view = "Leads";
  const records = visibleRecords(view);
  return `
    <article class="panel lead-triage real-workspace">
      <div class="workspace-toolbar">
        <div>
          <p class="eyebrow">Lead command center</p>
          <h2>Work inbound by SLA, score reason, and owner.</h2>
        </div>
        ${searchBox(view)}
      </div>
      ${renderViewTabs(view)}
      ${renderRecordControls(view, records)}
      <div class="lead-sprint-strip">
        ${records.slice(0, 3).map((record, index) => `
          <button type="button" class="lead-priority ${index === 0 ? "top" : ""}" data-record="${record.id}">
            <span>${record.status}</span><strong>${record.score}</strong><b>${record.name}</b><small>${record.company} · ${recordTrust(view, record).reason}</small>
          </button>
        `).join("")}
      </div>
      <div class="data-table" role="table" aria-label="${view} records">
        <div class="table-row table-head" role="row">
          ${tableHead(view)}
        </div>
        ${records.map((record) => tableRow(view, record)).join("") || emptyState(view)}
      </div>
    </article>
    ${renderOpsPanel(view)}
  `;
}

function renderDealsWork() {
  const view = "Deals";
  const stages = pipelineStages();
  const records = visibleRecords(view);
  return `
    <article class="panel deal-board-panel">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Pipeline board</p><h2>Forecast lanes with next-step and risk controls.</h2></div>
        ${searchBox(view)}
      </div>
      ${renderViewTabs(view)}
      ${renderRecordControls(view, records)}
      ${renderForecastStrip(records)}
      <div class="deal-board">
        ${stages.map((stage) => {
          const cards = records.filter((record) => record.stage === stage || (stage === "Qualified" && !stages.includes(record.stage)));
          return `
            <section class="deal-lane" data-stage-drop="${stage}">
              <header><b>${stage}</b><span>${cards.length}</span></header>
              ${cards.map((record) => `
                <button type="button" draggable="true" class="deal-card ${record.health.toLowerCase().replace(/\s+/g, "-")}" data-deal-drag="${record.id}" data-record="${record.id}">
                  ${selectionDot(view, record)}
                  <small>${record.health}</small><b>${record.name}</b><span>${compactMoney(record.value)} · ${record.due}</span>
                  <em>${record.next}</em>
                  <i style="--w:${Math.min(96, Math.round(record.value / 170))}%"></i>
                </button>
              `).join("") || `<div class="lane-empty">No deals</div>`}
            </section>
          `;
        }).join("")}
      </div>
    </article>
    ${renderOpsPanel(view)}
  `;
}

function renderContactsWork() {
  const view = "Contacts";
  const records = visibleRecords(view);
  return `
    <article class="panel relationship-panel">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Relationship map</p><h2>Account coverage map.</h2></div>
        ${searchBox(view)}
      </div>
      ${renderViewTabs(view)}
      ${renderRecordControls(view, records)}
      ${renderCoverageStrip(records)}
      <div class="relationship-map">
        <div class="account-hub">
          <span>Accounts</span>
          <strong>${new Set(records.map((item) => item.company)).size}</strong>
          <small>coverage graph</small>
        </div>
        ${records.map((record, index) => `
          <button type="button" class="contact-node n${index + 1} ${record.status.toLowerCase().replace(/\s+/g, "-")}" data-record="${record.id}">
            <b>${record.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</b>
            <span>${record.name}</span>
            <small>${record.role}</small>
          </button>
        `).join("")}
      </div>
      <div class="contact-roster">
        ${records.map((record) => `
          <button type="button" class="contact-card ${record.touched ? "completed" : ""}" data-record="${record.id}">
            ${selectionDot(view, record)}
            <span>${record.status}</span><b>${record.name}</b><small>${record.company} · ${record.role}</small><strong>${record.score}</strong>
          </button>
        `).join("") || emptyState(view)}
      </div>
    </article>
    ${renderOpsPanel(view)}
  `;
}

function renderActivitiesWork() {
  const view = "Activities";
  const records = visibleRecords(view);
  const hours = ["09:00", "10:00", "10:30", "12:00", "14:00", "16:00"];
  return `
    <article class="panel day-planner-panel">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Day planner</p><h2>Calendar rhythm, focus state, and XP queue.</h2></div>
        ${searchBox(view)}
      </div>
      ${renderViewTabs(view)}
      ${renderRecordControls(view, records)}
      ${renderFocusStrip(records)}
      <div class="day-planner">
        <div class="time-rail">
          ${hours.map((hour) => `<span>${hour}</span>`).join("")}
        </div>
        <div class="schedule-lane">
          ${records.map((record, index) => `
            <button type="button" class="schedule-block s${index + 1} ${record.touched ? "completed" : ""}" data-record="${record.id}">
              ${selectionDot(view, record)}
              <span>${record.due}</span><b>${record.name}</b><small>${record.company} · ${record.status}</small><strong>+${record.xp} XP</strong>
            </button>
          `).join("")}
        </div>
      </div>
    </article>
    <article class="panel quest-console">
      <div class="section-head"><div><p class="eyebrow">Focus queue</p><h2>Complete in order</h2></div><button type="button" data-action="complete-next">Next</button></div>
      <div class="activity-checklist">
        ${records.map((record) => `
          <button type="button" class="${record.touched ? "done" : ""}" data-complete="${record.id}">
            <span>${record.touched ? "✓" : record.type[0]}</span><b>${record.name}</b><small>${record.next}</small><strong>+${record.xp}</strong>
          </button>
        `).join("")}
      </div>
      <div class="coach-note"><img src="${sections[view].mascot}" alt="" /><p>${sections[view].speech}</p></div>
    </article>
  `;
}

function renderInboxWork() {
  const view = "Inbox";
  const records = visibleRecords(view);
  const active = records.find((record) => record.id === app.ui?.activeInboxId) || records[0];
  if (active) app.ui.activeInboxId = active.id;
  return `
    <article class="panel inbox-console">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Priority inbox</p><h2>Reply by buying signal, SLA clock, and suggested next step.</h2></div>
        ${searchBox(view)}
      </div>
      ${renderViewTabs(view)}
      ${renderRecordControls(view, records)}
      <div class="inbox-layout">
        <div class="thread-list">
          ${records.map((record) => `
            <button type="button" class="thread-row ${record === active ? "selected" : ""} ${record.touched ? "completed" : ""}" data-thread="${record.id}">
              ${selectionDot(view, record)}
              <span>${record.status}</span><b>${record.name}</b><small>${record.note}</small><strong>${record.due}</strong>
            </button>
          `).join("")}
        </div>
        <div class="reply-pane">
          <p class="eyebrow">Suggested reply</p>
          <h2>${active?.name || "No thread selected"}</h2>
          <p>${active?.note || "Clear filters to see conversations."}</p>
          ${active ? `<div class="reply-context">${renderTrustPill(view, active)}<span>${active.next}</span></div>` : ""}
          <div class="template-row">
            <button type="button" data-template="pricing">Pricing</button>
            <button type="button" data-template="meeting">Meeting</button>
            <button type="button" data-template="security">Security</button>
          </div>
          <textarea class="reply-box" data-reply-draft>${replyDraft(active)}</textarea>
          <div class="drawer-actions">
            ${active ? `<button type="button" data-record="${active.id}">Open thread</button><button class="primary-btn" type="button" data-send-reply="${active.id}">Send reply</button>` : ""}
          </div>
        </div>
      </div>
    </article>
    ${renderOpsPanel(view)}
  `;
}

function searchBox(view) {
  const search = app.filters[view]?.search || "";
  return `<label class="search-box">Search <input data-search type="search" value="${escapeHtml(search)}" placeholder="Name, company, next step" /></label>`;
}

function renderViewTabs(view) {
  const tabs = app.views[view] || [];
  const active = app.filters[view]?.chip || "";
  return `
    <div class="view-tabs">
      ${tabs.map((tab) => {
        const count = tab.chip ? app.records[view].filter((item) => recordBucket(item).toLowerCase().includes(tab.chip.toLowerCase())).length : app.records[view].length;
        return `<button type="button" class="${active === tab.chip ? "active" : ""}" data-view-tab="${tab.id}">${tab.name}<b>${count}</b></button>`;
      }).join("")}
      <button type="button" data-save-view>Save view</button>
    </div>
  `;
}

function renderRecordControls(view, records) {
  const selected = selectedIds(view).length;
  const density = app.ui?.density || "comfortable";
  const sort = app.sort[view] || { key: defaultSortKey(view), dir: "desc" };
  return `
    <div class="record-controls">
      <div class="sync-line">
        <span>${records.length} visible</span>
        <span>${selected ? `${selected} selected` : "No rows selected"}</span>
        <span>${recordSystemLine(view)}</span>
      </div>
      <div class="control-row">
        <div class="segmented" aria-label="Density">
          ${["comfortable", "compact"].map((mode) => `<button type="button" class="${density === mode ? "active" : ""}" data-density="${mode}">${mode}</button>`).join("")}
        </div>
        <div class="sort-pills" aria-label="Sort records">
          ${sortOptions(view).map(([key, label]) => `<button type="button" class="${sort.key === key ? "active" : ""}" data-sort="${key}">${label}${sort.key === key ? (sort.dir === "asc" ? " ↑" : " ↓") : ""}</button>`).join("")}
        </div>
      </div>
      ${selected ? `
        <div class="batch-bar">
          <b>${selected} selected</b>
          <button type="button" data-batch="complete">Complete</button>
          <button type="button" data-batch="assign">Assign Mina</button>
          <button type="button" data-batch="snooze">Snooze</button>
          <button type="button" data-batch="archive">Archive</button>
          <button type="button" data-clear-selection>Clear</button>
        </div>
      ` : ""}
    </div>
  `;
}

function tableHead(view) {
  return `
    <span></span>
    ${sortHeader(view, "name", mainColumn(view))}
    ${sortHeader(view, "status", "Status")}
    ${sortHeader(view, defaultSortKey(view), scoreColumn(view))}
    <span>Owner</span>
    <span>Source</span>
    <span>Reason</span>
    <span></span>
  `;
}

function sortHeader(view, key, label) {
  const sort = app.sort[view] || {};
  const suffix = sort.key === key ? (sort.dir === "asc" ? " ↑" : " ↓") : "";
  return `<span><button type="button" data-sort="${key}">${label}${suffix}</button></span>`;
}

function selectionDot(view, record) {
  const selected = selectedIds(view).includes(record.id);
  return `<span class="pick-dot ${selected ? "selected" : ""}" data-select="${record.id}" role="checkbox" aria-checked="${selected}" aria-label="Select ${escapeHtml(record.name)}"></span>`;
}

function renderForecastStrip(records) {
  const stages = pipelineStages();
  const total = sum(records.map((deal) => deal.value));
  return `
    <div class="forecast-strip">
      ${stages.slice(0, 5).map((stage) => {
        const rows = records.filter((deal) => deal.stage === stage);
        return `<button type="button" data-chip="${stage}"><small>${stage}</small><b>${compactMoney(sum(rows.map((deal) => deal.value)))}</b><span>${rows.length} deals</span></button>`;
      }).join("")}
      <button type="button" data-detail="Open pipeline value ${compactMoney(total)}"><small>Total open</small><b>${compactMoney(total)}</b><span>visible forecast</span></button>
    </div>
  `;
}

function renderCoverageStrip(records) {
  const companies = [...new Set(records.map((record) => record.company))];
  return `
    <div class="coverage-strip">
      ${companies.slice(0, 4).map((company) => {
        const rows = records.filter((record) => record.company === company);
        const champion = rows.some((record) => /champion/i.test(record.status));
        return `<button type="button" data-chip="${champion ? "Champion" : "Coverage gap"}"><small>${company}</small><b>${rows.length} contact${rows.length === 1 ? "" : "s"}</b><span>${champion ? "champion mapped" : "coverage gap"}</span></button>`;
      }).join("")}
    </div>
  `;
}

function renderFocusStrip(records) {
  const xp = sum(records.filter((record) => !record.touched).map((record) => record.xp));
  const due = records.filter((record) => /now|late|today/i.test(record.due || record.status || "")).length;
  return `
    <div class="focus-strip">
      <button type="button" data-action="start-focus"><small>Focus block</small><b>25:00</b><span>ready to start</span></button>
      <button type="button" data-chip="Due now"><small>Due now</small><b>${due}</b><span>protect SLA</span></button>
      <button type="button" data-detail="Open activity XP: ${xp}"><small>Bankable XP</small><b>+${xp}</b><span>remaining today</span></button>
    </div>
  `;
}

function renderOpsPanel(view) {
  return `
    <article class="panel ops-panel ${view.toLowerCase()}-ops">
      <div class="section-head"><div><p class="eyebrow">${opsEyebrow(view)}</p><h2>${sideTitle(view)}</h2></div><button type="button" data-action="command">Cmd K</button></div>
      <div class="insight-grid vertical">
        ${getSidebarStats(view).map(([label, value, note]) => `<button type="button" class="insight-card" data-detail="${label}: ${value} ${note}"><small>${label}</small><strong>${value}</strong><span>${note}</span></button>`).join("")}
      </div>
      <div class="action-stack">
        ${getSideActions(view).map(([label, action]) => `<button type="button" data-action="${action}">${label}</button>`).join("")}
      </div>
      <div class="coach-note"><img src="${sections[view].mascot}" alt="" /><p>${sections[view].speech}</p></div>
    </article>
  `;
}

function renderReportsWork() {
  const won = app.records.Deals.filter((deal) => deal.stage === "Won").length;
  const openValue = sum(app.records.Deals.filter((deal) => deal.stage !== "Won").map((deal) => deal.value));
  const completed = allRecords().filter((record) => record.touched).length;
  const conversion = Math.round((completed / Math.max(1, totalRecords())) * 100);
  const tabs = [["pipeline", "Pipeline"], ["activity", "Activity"], ["team", "Team"], ["gamification", "XP impact"]];
  return `
    <article class="panel report-suite">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Analytics suite</p><h2>Forecast, velocity, conversion, and gamification impact.</h2></div>
        <button type="button" data-action="export-view">Export CSV</button>
      </div>
      <div class="report-tabs">${tabs.map(([id, label]) => `<button type="button" class="${app.reportTab === id ? "active" : ""}" data-report-tab="${id}">${label}</button>`).join("")}</div>
      <div class="report-cards">
        ${[
          ["Weighted pipeline", compactMoney(openValue), "Forecastable open value"],
          ["Won deals", won, "Closed this period"],
          ["CRM completion", `${conversion}%`, "Actions completed"],
          ["XP earned", app.user.xp, "Level progress"]
        ].map(([label, value, note]) => `<button type="button" class="report-card" data-detail="${label}: ${value}"><small>${label}</small><strong>${value}</strong><span>${note}</span></button>`).join("")}
      </div>
      <div class="funnel-chart">
        ${["Leads", "Deals", "Contacts", "Activities", "Inbox"].map((view) => {
          const value = app.records[view].filter((record) => !record.touched).length;
          return `<div><span>${view}</span><i style="--w:${Math.max(12, value * 18)}%"></i><b>${value}</b></div>`;
        }).join("")}
      </div>
    </article>
    <article class="panel report-feed">
      <div class="section-head"><div><p class="eyebrow">Coaching feed</p><h2>What changed</h2></div><button type="button" data-action="command">Cmd K</button></div>
      <div class="timeline expanded">
        ${timelineItems().slice(0, 7).map((item) => `<p>${item}</p>`).join("")}
      </div>
      <div class="coach-note"><img src="${mascot.gem}" alt="" /><p>Reports now read from real CRM state, not static dashboard cards.</p></div>
    </article>
  `;
}

function renderAutomationsWork() {
  const rules = [
    ["Hot lead SLA rescue", "If lead score > 85 and due < 15m, notify owner and create call task.", "On"],
    ["No-next-step deal guard", "If a deal sits 3 days without a next step, create manager coaching alert.", "On"],
    ["High-intent reply quest", "If a message mentions pricing, add +12 XP reply quest.", "On"],
    ["Dormant champion revival", "If champion quiet for 21 days, schedule check-in.", "Draft"]
  ];
  return `
    <article class="panel automation-builder">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Automation rules</p><h2>If-this-then-that workflows for revenue operations.</h2></div>
        <button type="button" data-action="new-rule">New rule</button>
      </div>
      <div class="rule-list">
        ${rules.map(([name, body, status], index) => `
          <button type="button" class="rule-card ${status.toLowerCase()}" data-action="automation-preview">
            <span>${status}</span><b>${name}</b><small>${body}</small><strong>${index + 1}</strong>
          </button>
        `).join("")}
      </div>
    </article>
    <article class="panel automation-preview">
      <div class="section-head"><div><p class="eyebrow">Run preview</p><h2>Next 24 hours</h2></div><button type="button" data-action="automation-preview">Simulate</button></div>
      <div class="automation-flow">
        <div><b>Trigger</b><span>BrightTech asks about pricing</span></div>
        <div><b>Condition</b><span>Intent score above 90</span></div>
        <div><b>Action</b><span>Create reply quest and notify Alex</span></div>
        <div><b>Reward</b><span>+12 XP when sent</span></div>
      </div>
      <div class="coach-note"><img src="${mascot.coach}" alt="" /><p>Automation turns CRM hygiene into guided work instead of nagging.</p></div>
    </article>
  `;
}

function renderSettingsWork() {
  const stages = Array.isArray(app.settings.pipelineStages) ? app.settings.pipelineStages.join(", ") : app.settings.pipelineStages;
  return `
    <article class="panel settings-panel">
      <div class="workspace-toolbar">
        <div><p class="eyebrow">Admin settings</p><h2>Configure scoring, SLA, pipeline, XP, team, and import rules.</h2></div>
        <button type="button" data-action="save-settings">Save settings</button>
      </div>
      <div class="settings-grid">
        <label>SLA minutes <input data-setting="slaMinutes" type="number" value="${app.settings.slaMinutes}" /></label>
        <label>Scoring model <input data-setting="scoring" value="${escapeHtml(app.settings.scoring)}" /></label>
        <label>Streak rule <input data-setting="streakRule" value="${escapeHtml(app.settings.streakRule)}" /></label>
        <label>Pipeline stages <input data-setting="pipelineStages" value="${escapeHtml(stages)}" /></label>
      </div>
      <div class="import-review">
        <p class="eyebrow">Import review</p>
        ${app.imports.map((item) => `<button type="button" data-action="review-import"><b>${item.file}</b><span>${item.mapped}/${item.rows} mapped</span><strong>${item.errors} errors</strong></button>`).join("")}
      </div>
    </article>
    <article class="panel team-panel">
      <div class="section-head"><div><p class="eyebrow">Team + permissions</p><h2>Owners</h2></div><button type="button" data-action="command">Invite</button></div>
      <div class="team-list">
        ${app.team.map((user) => `<button type="button" data-detail="${user.name}: ${user.role}"><span>${user.name[0]}</span><b>${user.name}</b><small>${user.role}</small><strong>${user.xp} XP</strong></button>`).join("")}
      </div>
      <div class="coach-note"><img src="${mascot.proud}" alt="" /><p>Settings now control visible CRM behavior and can be edited locally.</p></div>
    </article>
  `;
}

function renderHomeWork() {
  const next = nextRecord();
  workGrid.innerHTML = `
    <article class="panel pipeline-panel">
      <div class="section-head">
        <div><p class="eyebrow">Operating cockpit</p><h2>Every click updates CRM data, XP, and recommendations.</h2></div>
        <button type="button" data-action="command">Command bar</button>
      </div>
      <div class="journey-map">
        <span class="path-line"></span>
        ${["Leads", "Deals", "Contacts", "Activities", "Inbox"].map((view) => {
          const rows = app.records[view];
          const count = rows.filter((item) => !item.touched).length;
          return `<button class="zone ${view.toLowerCase()}" type="button" data-action="open-${view.toLowerCase()}"><b>${view}</b><strong>${count}</strong><small>open items</small><img src="${sections[view].mascot}" alt="" /></button>`;
        }).join("")}
      </div>
    </article>
    <article class="panel activities-panel">
      <div class="section-head"><div><p class="eyebrow">Next best action</p><h2>${next.name}</h2></div><button type="button" data-complete="${next.id}">Complete</button></div>
      <button class="next-card" type="button" data-record="${next.id}">
        <span>${next.view}</span>
        <b>${next.company}</b>
        <p>${next.note}</p>
        <strong>${next.next}</strong>
      </button>
      <ul class="activity-list compact-list">${allOpenRecords().slice(0, 4).map((item) => `
        <li><button type="button" data-record="${item.id}"><span>${item.view[0]}</span><p><b>${item.name}</b><small>${item.company}</small></p><time>${item.due}</time><strong>${item.next}</strong></button></li>
      `).join("")}</ul>
    </article>
  `;
}

function renderRightRail() {
  const open = allOpenRecords().length;
  const complete = totalRecords() - open;
  const big = document.querySelector(".mini-ring strong");
  const bigText = document.querySelector(".big-streak strong");
  if (big) big.textContent = app.user.streak;
  if (bigText) bigText.textContent = app.user.streak;
  const questButtons = document.querySelectorAll(".quest-stack > button");
  questButtons.forEach((button, index) => {
    const progress = [complete, app.records.Deals.filter((item) => item.touched).length, app.records.Activities.filter((item) => item.touched).length][index] || 0;
    const target = [6, 3, 4][index];
    button.classList.toggle("done", progress >= target);
    const em = button.querySelector("em");
    if (em) em.textContent = `${Math.min(progress, target)}/${target}`;
  });
}

function tableRow(view, record) {
  const score = record.score ?? record.health ?? record.stage ?? record.xp;
  const trust = recordTrust(view, record);
  const selected = selectedIds(view).includes(record.id);
  return `
    <div class="table-row ${record.touched ? "completed" : ""}" role="row">
      <span class="select-cell"><input type="checkbox" data-select="${record.id}" ${selected ? "checked" : ""} aria-label="Select ${escapeHtml(record.name)}" /></span>
      <button type="button" class="record-main" data-record="${record.id}">
        <b>${record.name}</b><small>${record.company || record.role || record.type}</small>
      </button>
      <span><mark>${record.status || record.health || record.stage}</mark></span>
      <span>${formatScore(view, score, record)}</span>
      <span>${record.owner || "Alex"}</span>
      <span class="trust-cell"><b>${trust.source}</b><small>${trust.updated} · ${trust.confidence}%</small></span>
      <span class="reason-cell">${trust.reason}</span>
      <span class="row-actions">
        ${view === "Deals" ? `<button type="button" data-stage-move="${record.id}">Move</button>` : ""}
        <button type="button" data-complete="${record.id}">${record.touched ? "Undo" : actionLabel(view)}</button>
      </span>
    </div>
  `;
}

function openRecord(id) {
  const found = findRecord(id);
  if (!found) return;
  closeCommand();
  const { view, record } = found;
  const trust = recordTrust(view, record);
  app.drawerTab = app.drawerTab || "overview";
  saveState();
  ensureDrawer();
  document.querySelector(".drawer-backdrop").hidden = false;
  document.querySelector(".detail-drawer").classList.add("open");
  document.querySelector(".detail-drawer").innerHTML = `
    <button class="drawer-close" type="button" data-close-drawer aria-label="Close">×</button>
    <p class="eyebrow">${view} detail</p>
    <h2>${record.name}</h2>
    <p class="drawer-sub">${record.company || record.role || record.type} · ${record.status || record.health || record.stage}</p>
    <div class="drawer-score"><strong>${record.score ?? (record.value ? compactMoney(record.value) : record.xp)}</strong><span>${scoreColumn(view)} · ${trust.confidence}% confidence</span></div>
    <div class="drawer-trust"><b>${trust.reason}</b><span>${trust.source} · ${trust.updated}</span></div>
    <div class="drawer-tabs">
      ${["overview", "timeline", "related", "compose", "properties"].map((tab) => `<button type="button" class="${app.drawerTab === tab ? "active" : ""}" data-drawer-tab="${tab}" data-record-id="${record.id}">${tab}</button>`).join("")}
    </div>
    ${renderDrawerTab(view, record)}
    <div class="drawer-actions">
      ${view === "Deals" ? `<button type="button" data-stage-move="${record.id}">Advance stage</button>` : ""}
      <button type="button" data-archive-record="${record.id}">${record.archived ? "Restore" : "Archive"}</button>
      <button type="button" data-save-record="${record.id}">Save</button>
      <button class="primary-btn" type="button" data-complete="${record.id}">${record.touched ? "Undo completion" : actionLabel(view)}</button>
    </div>
  `;
  react(sections[view].mascot, `${record.name} opened. Next step: ${record.next}.`, document.querySelector(`[data-record="${id}"]`), { small: true });
}

function renderDrawerTab(view, record) {
  const account = app.accounts.find((item) => item.name === record.company);
  if (app.drawerTab === "timeline") {
    return `<div class="timeline expanded"><h3>Timeline</h3>${timelineItems(record).map((item) => `<p>${item}</p>`).join("")}</div>`;
  }
  if (app.drawerTab === "related") {
    const related = allRecords().filter((item) => item.company === record.company && item.id !== record.id).slice(0, 6);
    return `
      <div class="related-grid">
        <div><small>Account</small><b>${account?.name || record.company || "No account"}</b><span>${account?.industry || "Unmapped"} · ${account?.tier || "Unknown"}</span></div>
        ${related.map((item) => `<button type="button" data-record="${item.id}"><small>${item.view}</small><b>${item.name}</b><span>${item.next}</span></button>`).join("")}
      </div>
    `;
  }
  if (app.drawerTab === "compose") {
    return `
      <div class="composer">
        <div class="template-row"><button type="button" data-template="pricing">Pricing</button><button type="button" data-template="meeting">Meeting</button><button type="button" data-template="security">Security</button></div>
        <textarea class="reply-box" data-note-draft>Log a note for ${record.name}: ${record.next}</textarea>
        <button type="button" data-action="log-note">Log note</button>
      </div>
    `;
  }
  if (app.drawerTab === "properties") {
    return `
      <div class="property-editor">
        <label>Name <input data-field="name" value="${escapeHtml(record.name)}" /></label>
        <label>Company <input data-field="company" value="${escapeHtml(record.company || "")}" /></label>
        <label>Status <input data-field="status" value="${escapeHtml(record.status || record.health || record.stage || "")}" /></label>
        <label>Owner <input data-field="owner" value="${escapeHtml(record.owner || "Alex")}" /></label>
        <label>Due <input data-field="due" value="${escapeHtml(record.due || "")}" /></label>
        <label>Next step <input data-field="next" value="${escapeHtml(record.next || "")}" /></label>
        <label>Notes <textarea data-field="note">${escapeHtml(record.note || "")}</textarea></label>
      </div>
    `;
  }
  const trust = recordTrust(view, record);
  return `
    <dl>
      <div><dt>Next step</dt><dd>${record.next}</dd></div>
      <div><dt>Owner</dt><dd>${record.owner || "Alex"}</dd></div>
      <div><dt>Due</dt><dd>${record.due}</dd></div>
      <div><dt>Recommendation reason</dt><dd>${trust.reason}</dd></div>
      <div><dt>Source</dt><dd>${trust.source} · ${trust.updated}</dd></div>
      <div><dt>Account</dt><dd>${account?.name || record.company || "Unlinked"}</dd></div>
      <div><dt>Notes</dt><dd>${record.note}</dd></div>
    </dl>
  `;
}

function closeDrawer() {
  document.querySelector(".drawer-backdrop")?.setAttribute("hidden", "");
  document.querySelector(".detail-drawer")?.classList.remove("open");
}

function ensureDrawer() {
  if (document.querySelector(".detail-drawer")) return;
  document.body.insertAdjacentHTML("beforeend", `<div class="drawer-backdrop" hidden></div><aside class="detail-drawer" aria-label="Record details"></aside>`);
}

function setDrawerTab(tab, id) {
  app.drawerTab = tab;
  saveState();
  openRecord(id);
}

function saveRecordFromDrawer(id) {
  const found = findRecord(id);
  if (!found) return;
  const { view, record } = found;
  rememberUndo(`Save ${record.name}`);
  document.querySelectorAll(".detail-drawer [data-field]").forEach((field) => {
    const key = field.dataset.field;
    const value = field.value;
    if (key === "status") {
      if (view === "Deals") record.health = value;
      else record.status = value;
    } else {
      record[key] = value;
    }
  });
  appendLedger(`Saved ${record.name}`, 5);
  touchSystem();
  saveState();
  renderAll();
  openRecord(id);
  react(mascot.gem, `${record.name} saved. +5 XP.`, document.querySelector(`[data-save-record="${id}"]`), { undo: true });
}

function archiveRecordById(id, source) {
  const found = findRecord(id);
  if (!found) return;
  rememberUndo(`${found.record.archived ? "Restore" : "Archive"} ${found.record.name}`);
  found.record.archived = !found.record.archived;
  appendLedger(`${found.record.archived ? "Archived" : "Restored"} ${found.record.name}`, found.record.archived ? 2 : 4);
  touchSystem();
  saveState();
  renderAll();
  if (!found.record.archived) openRecord(id);
  else closeDrawer();
  react(found.record.archived ? mascot.sleepy : mascot.proud, `${found.record.name} ${found.record.archived ? "archived" : "restored"}.`, source, { undo: true });
}

function openCommand() {
  closeDrawer();
  closeNotificationCenter();
  ensureCommand();
  const palette = document.querySelector(".command-palette");
  palette.hidden = false;
  palette.querySelector("input").focus();
  renderCommandResults();
  react(mascot.coach, "Command mode ready. Fast reps use shortcuts.", document.querySelector("[data-action='command']"), { small: true });
}

function closeCommand() {
  document.querySelector(".command-palette")?.setAttribute("hidden", "");
}

function openNotificationCenter(source) {
  closeCommand();
  let panel = document.querySelector(".notification-center");
  if (!panel) {
    document.body.insertAdjacentHTML("beforeend", `<div class="notification-center" hidden></div>`);
    panel = document.querySelector(".notification-center");
  }
  panel.hidden = false;
  panel.innerHTML = `
    <div class="section-head"><div><p class="eyebrow">Notification center</p><h2>Revenue alerts</h2></div><button type="button" data-action="mark-alerts-read">Read all</button></div>
    <div class="notification-list">
      ${app.notifications.map((item) => `
        <button type="button" class="${item.read ? "read" : ""}" data-notification="${item.id}">
          <span>${item.urgency}</span><b>${item.kind}</b><small>${item.text}</small>
        </button>
      `).join("")}
    </div>
  `;
  react(mascot.surprised, `${app.notifications.filter((item) => !item.read).length} alerts need attention.`, source, { small: true });
}

function closeNotificationCenter() {
  document.querySelector(".notification-center")?.setAttribute("hidden", "");
}

function ensureCommand() {
  if (document.querySelector(".command-palette")) return;
  document.body.insertAdjacentHTML("beforeend", `
    <div class="command-palette" hidden>
      <div class="command-box">
        <input data-command-search placeholder="Search commands, records, companies, notes" />
        <div class="command-results"></div>
      </div>
    </div>
  `);
}

function renderCommandResults() {
  const box = document.querySelector(".command-results");
  if (!box) return;
  const q = (app.commandQuery || "").toLowerCase();
  const commands = [
    ["Create lead", "new-lead", "Add a new prospect"],
    ["Complete next action", "complete-next", "Finish the highest priority item"],
    ["Open Leads", "open-leads", "Lead command center"],
    ["Open Deals", "open-deals", "Pipeline board"],
    ["Open Contacts", "open-contacts", "Relationship map"],
    ["Open Activities", "open-activities", "Day planner"],
    ["Open Inbox", "open-inbox", "Priority replies"],
    ["Open Reports", "open-reports", "Revenue intelligence"],
    ["Open Settings", "open-settings", "Admin center"]
  ].filter(([label, , note]) => `${label} ${note}`.toLowerCase().includes(q));
  const records = allRecords().filter((record) => Object.values(record).join(" ").toLowerCase().includes(q)).slice(0, 6);
  box.innerHTML = `
    <p class="eyebrow">Commands</p>
    ${commands.slice(0, 5).map(([label, action, note]) => `<button type="button" data-action="${action}"><b>${label}</b><small>${note}</small></button>`).join("")}
    <p class="eyebrow">Records</p>
    ${records.map((record) => `<button type="button" data-record="${record.id}"><b>${record.name}</b><small>${record.view} · ${record.company || record.type}</small></button>`).join("") || `<div class="empty-state">No records found</div>`}
  `;
}

function applyFilter(chip) {
  const filter = chip.replace(/\s+\d+.*/, "").replace(/^\W+\s*/, "");
  app.filters[app.activeView] = { ...(app.filters[app.activeView] || {}), chip: isFilterActive(chip) ? "" : filter };
  saveState();
  renderAll();
  react(mascot.focus, filter ? `${filter} filter applied.` : "Filter cleared.", document.querySelector(`[data-chip="${cssEscape(chip)}"]`));
}

function applySavedView(viewId) {
  const tab = (app.views[app.activeView] || []).find((item) => item.id === viewId);
  if (!tab) return;
  app.filters[app.activeView] = { ...(app.filters[app.activeView] || {}), chip: tab.chip || "" };
  saveState();
  renderAll();
  react(mascot.focus, `${tab.name} view loaded.`, document.querySelector(`[data-view-tab="${viewId}"]`), { small: true });
}

function saveCurrentView(source) {
  const view = app.activeView;
  if (!app.records[view]) return;
  const chip = app.filters[view]?.chip || "";
  const label = chip ? `${chip} custom` : `All ${view.toLowerCase()} custom`;
  app.views[view].push({ id: `view-${Date.now()}`, name: label, chip });
  saveState();
  renderAll();
  react(mascot.gem, `${label} saved.`, source);
}

function ensureUi() {
  app.ui ||= structuredClone(seed.ui);
  app.ui.selected ||= {};
  app.ui.system ||= structuredClone(seed.ui.system);
  return app.ui;
}

function selectedIds(view) {
  return ensureUi().selected[view] || [];
}

function toggleRecordSelection(id, checked) {
  const found = findRecord(id);
  if (!found) return;
  const ui = ensureUi();
  const current = new Set(ui.selected[found.view] || []);
  const shouldSelect = typeof checked === "boolean" ? checked : !current.has(id);
  if (shouldSelect) current.add(id);
  else current.delete(id);
  ui.selected[found.view] = [...current];
  saveState();
  renderWork(found.view);
}

function clearSelectionFor(view) {
  ensureUi().selected[view] = [];
  saveState();
  renderWork(view);
}

function setSort(key, source) {
  const view = app.activeView;
  if (!app.records[view]) return;
  const current = app.sort[view] || {};
  const defaultDir = key === "stage" || key === "name" || key === "company" ? "asc" : "desc";
  app.sort[view] = { key, dir: current.key === key ? (current.dir === "desc" ? "asc" : "desc") : defaultDir };
  saveState();
  renderWork(view);
  react(mascot.focus, `${sortLabel(view, key)} sort ${app.sort[view].dir === "asc" ? "ascending" : "descending"}.`, source, { small: true });
}

function setDensity(mode, source) {
  ensureUi().density = mode === "compact" ? "compact" : "comfortable";
  saveState();
  renderAll();
  react(mascot.coach, `${ensureUi().density === "compact" ? "Compact" : "Comfortable"} density applied.`, source, { small: true });
}

function selectInboxThread(id, source) {
  ensureUi().activeInboxId = id;
  saveState();
  renderWork("Inbox");
  const found = findRecord(id);
  if (found) react(mascot.surprised, `${found.record.name} selected. Reply pane updated.`, source, { small: true });
}

function applyBatchAction(action, source) {
  const view = app.activeView;
  const ids = selectedIds(view);
  if (!ids.length) return react(mascot.sleepy, "Select records first.", source, { small: true });
  rememberUndo(`Batch ${action}`);
  let xp = 0;
  ids.forEach((id) => {
    const found = findRecord(id);
    if (!found) return;
    const { record } = found;
    if (action === "complete" && !record.touched) {
      record.touched = true;
      xp += xpFor(found.view, record);
    }
    if (action === "assign") record.owner = "Mina";
    if (action === "snooze") record.due = "Tomorrow";
    if (action === "archive") record.archived = true;
  });
  if (xp) appendLedger(`Batch completed ${ids.length} ${view.toLowerCase()}`, xp);
  else appendLedger(`Batch ${action} ${ids.length} ${view.toLowerCase()}`, action === "archive" ? 4 : 2);
  ensureUi().selected[view] = [];
  touchSystem();
  saveState();
  renderAll();
  const copy = action === "complete"
    ? `${ids.length} ${view.toLowerCase()} completed. +${xp} XP.`
    : `${ids.length} ${view.toLowerCase()} ${action === "assign" ? "assigned to Mina" : action === "snooze" ? "snoozed" : "archived"}.`;
  react(action === "archive" ? mascot.sleepy : mascot.celebrate, copy, source, { undo: true });
}

function openNotification(id) {
  const notification = app.notifications.find((item) => item.id === id);
  if (!notification) return;
  notification.read = true;
  saveState();
  renderStats();
  const found = findRecord(notification.record);
  if (found) {
    setSection(found.view, { quiet: true });
    openRecord(notification.record);
  }
  react(mascot.surprised, notification.text, document.querySelector(`[data-notification="${id}"]`));
}

function setReportTab(tab) {
  app.reportTab = tab;
  saveState();
  renderWork("Reports");
  react(mascot.gem, `${tab} report selected.`, document.querySelector(`[data-report-tab="${tab}"]`), { small: true });
}

function applyReplyTemplate(template) {
  const textarea = document.querySelector("[data-reply-draft]");
  if (!textarea) return;
  const templates = {
    pricing: "Hi, happy to help with pricing. I can send a quick breakdown and tailor it to your team size.",
    meeting: "Hi, the fastest next step is a 20-minute call. I can share options for today or tomorrow.",
    security: "Hi, I can answer the security questions and attach our implementation notes for your review."
  };
  textarea.value = templates[template] || textarea.value;
  react(mascot.focus, `${template} template inserted.`, document.querySelector(`[data-template="${template}"]`), { small: true });
}

function sendInboxReply(id, source) {
  const found = findRecord(id);
  if (!found) return;
  rememberUndo(`Reply to ${found.record.name}`);
  found.record.reply = document.querySelector("[data-reply-draft]")?.value || replyDraft(found.record);
  found.record.touched = true;
  found.record.status = "Replied";
  appendLedger(`Sent reply to ${found.record.name}`, 12);
  touchSystem();
  saveState();
  renderAll();
  react(mascot.celebrate, `Reply sent to ${found.record.name}. +12 XP.`, source, { undo: true });
}

function handleAction(button) {
  const action = button.dataset.action;
  const fromCommand = Boolean(button.closest(".command-palette"));
  const openMap = {
    "open-leads": "Leads",
    "open-deals": "Deals",
    "open-contacts": "Contacts",
    "open-activities": "Activities",
    "open-inbox": "Inbox",
    "open-reports": "Reports",
    "open-automations": "Automations",
    "open-settings": "Settings"
  };
  if (openMap[action]) {
    closeCommand();
    return setSection(openMap[action]);
  }
  const actions = {
    brand: () => setSection("Home"),
    "new-lead": () => {
      closeCommand();
      closeDrawer();
      modal?.showModal();
    },
    profile: () => react(mascot.proud, `Alex · Level ${app.user.level} · ${app.user.xp} XP`, button),
    streak: () => react(mascot.crown, `${app.user.streak}-day streak. One action keeps it alive.`, button),
    gems: () => react(mascot.gem, `${app.user.xp} XP banked. Keep going.`, button),
    notifications: () => openNotificationCenter(button),
    command: openCommand,
    "sync-now": () => {
      ensureUi().system.lastSynced = "Just now";
      ensureUi().system.health = "Healthy";
      touchSystem();
      saveState();
      renderAll();
      react(mascot.proud, "CRM sync complete. Scores and alerts refreshed.", button, { small: true });
    },
    undo: () => undoLast(button),
    "start-focus": () => react(mascot.run, "25-minute focus block started. Work the first open record.", button),
    "start-lead-sprint": () => setSection("Leads", { quiet: true }) || completeNextIn("Leads", button),
    "move-next-deal": () => setSection("Deals", { quiet: true }) || moveDeal(app.records.Deals.find((item) => !item.touched)?.id, button),
    "strengthen-relationships": () => setSection("Contacts", { quiet: true }) || completeNextIn("Contacts", button),
    "clear-inbox": () => setSection("Inbox", { quiet: true }) || completeNextIn("Inbox", button),
    "view-plan": () => react(mascot.coach, "Plan opened: filter risk, open detail, finish next step, claim XP.", button),
    "complete-next": () => completeNextIn(app.activeView, button),
    "clear-filters": () => {
      app.filters[app.activeView] = {};
      ensureUi().selected[app.activeView] = [];
      saveState();
      renderAll();
      react(mascot.focus, `${app.activeView} filters cleared.`, button, { small: true });
    },
    "claim-streak": () => claim(button, "Streak XP claimed. +15 XP.", mascot.crown, 15),
    "claim-quest": () => claim(button, "Daily quest reward claimed. +20 XP.", mascot.heart, 20),
    "report-pipeline": () => setSection("Reports"),
    "export-view": () => react(mascot.gem, `${app.activeView} exported as CSV mock.`, button),
    "automation-preview": () => react(mascot.coach, "Automation preview ran: 4 rules, 7 upcoming actions.", button),
    "new-rule": () => react(mascot.focus, "New automation rule drafted.", button),
    "save-settings": () => {
      rememberUndo("Save settings");
      if (typeof app.settings.pipelineStages === "string") app.settings.pipelineStages = app.settings.pipelineStages.split(",").map((stage) => stage.trim()).filter(Boolean);
      appendLedger("Settings saved", 5);
      touchSystem();
      saveState();
      renderAll();
      react(mascot.proud, "Settings saved. CRM rules updated.", button, { undo: true });
    },
    "review-import": () => react(mascot.surprised, "Import review opened: 4 rows need field mapping.", button),
    "mark-alerts-read": () => {
      rememberUndo("Mark alerts read");
      app.notifications.forEach((item) => item.read = true);
      touchSystem();
      saveState();
      renderStats();
      document.querySelector(".notification-center")?.setAttribute("hidden", "");
      react(mascot.proud, "All alerts marked read.", button, { undo: true });
    },
    "log-note": () => {
      rememberUndo("Log note");
      appendLedger("Note logged", 6);
      touchSystem();
      saveState();
      react(mascot.heart, "Note logged and timeline updated. +6 XP.", button, { undo: true });
    },
    share: () => react(mascot.celebrate, "Streak card copied.", button),
    quests: () => react(mascot.focus, "Quest list reflects live CRM completion.", button),
    coach: () => react(mascot.coach, "I’ll pop up whenever you make a move.", button)
  };
  actions[action]?.();
  if (fromCommand && action !== "new-lead") closeCommand();
}

function completeNextIn(view, source) {
  const pool = view === "Home" ? allOpenRecords() : app.records[view].filter((item) => !item.touched).map((item) => ({ ...item, view }));
  const next = pool[0];
  if (!next) return react(mascot.celebrate, "Everything in this queue is complete.", source);
  completeRecord(next.id, source);
}

function completeRecord(id, source) {
  const found = findRecord(id);
  if (!found) return;
  const { view, record } = found;
  rememberUndo(record.touched ? `Reopen ${record.name}` : `Complete ${record.name}`);
  record.touched = !record.touched;
  const delta = record.touched ? xpFor(view, record) : -Math.min(8, xpFor(view, record));
  appendLedger(record.touched ? `${record.next} complete` : `${record.name} reopened`, delta);
  touchSystem();
  saveState();
  renderAll();
  if (document.querySelector(".detail-drawer.open")) openRecord(id);
  react(record.touched ? mascot.celebrate : mascot.focus, record.touched ? `${record.next} complete. +${xpFor(view, record)} XP.` : `${record.name} reopened.`, source || document.querySelector(`[data-complete="${id}"]`), { undo: true });
}

function moveDeal(id, source) {
  const deal = app.records.Deals.find((item) => item.id === id) || app.records.Deals.find((item) => !item.touched);
  if (!deal) return;
  const stages = pipelineStages();
  const nextStage = stages[Math.min(stages.indexOf(deal.stage) + 1, stages.length - 1)] || "Proposal";
  moveDealToStage(deal.id, nextStage, source);
}

function moveDealToStage(id, stage, source) {
  const deal = app.records.Deals.find((item) => item.id === id);
  if (!deal) return;
  rememberUndo(`Move ${deal.name}`);
  deal.stage = stage;
  deal.health = stage === "Won" ? "Close this week" : stage === "Contract" ? "Close this week" : "Needs next step";
  deal.touched = stage === "Won" || deal.touched;
  appendLedger(`${deal.name} moved to ${stage}`, 14);
  touchSystem();
  saveState();
  renderAll();
  react(stage === "Won" ? mascot.crown : mascot.gem, `${deal.name} moved to ${stage}. +14 XP.`, source || document.querySelector(`[data-stage-move="${deal.id}"]`), { undo: true });
}

function claim(button, message, img, xp) {
  rememberUndo("Claim reward");
  appendLedger(message, xp);
  button.textContent = "Claimed";
  button.disabled = true;
  touchSystem();
  saveState();
  renderAll();
  react(img, message, button, { undo: true });
}

function react(src, copy, source, options = {}) {
  setCoach(src, copy);
  showToast(copy, { undo: Boolean(options.undo) });
  spark(source, options.small ? 6 : 12);
  popMascot(src, copy, options.small);
}

function setCoach(src, copy) {
  if (coachMain) {
    coachMain.src = src;
    coachMain.animate([{ transform: "translateX(-8px) scale(.86)", opacity: 0 }, { transform: "translateX(-8px) scale(1.06)", opacity: 1 }, { transform: "translateX(-8px) scale(1)", opacity: 1 }], { duration: 220, easing: "cubic-bezier(.2,.8,.2,1)" });
  }
  if (coachCopy) coachCopy.textContent = copy;
}

let popTimer;
function popMascot(src, copy, small = false) {
  let pop = document.querySelector(".mascot-pop");
  if (!pop) {
    document.body.insertAdjacentHTML("beforeend", `<div class="mascot-pop" role="status" aria-live="polite"><img alt="" /><p></p></div>`);
    pop = document.querySelector(".mascot-pop");
  }
  pop.querySelector("img").src = src;
  pop.querySelector("p").textContent = copy;
  pop.classList.toggle("small", Boolean(small));
  pop.classList.remove("show");
  requestAnimationFrame(() => pop.classList.add("show"));
  clearTimeout(popTimer);
  popTimer = setTimeout(() => pop.classList.remove("show"), small ? 950 : 1500);
}

let toastTimer;
function showToast(message, options = {}) {
  if (!toast) return;
  toast.classList.toggle("has-action", Boolean(options.undo && undoStack.length));
  toast.innerHTML = `<span>${escapeHtml(message)}</span>${options.undo && undoStack.length ? `<button type="button" data-action="undo">Undo</button>` : ""}`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show", "has-action"), 1800);
}

function spark(source, count = 8) {
  if (!source) return;
  const rect = source.getBoundingClientRect();
  for (let index = 0; index < count; index += 1) {
    const dot = document.createElement("span");
    dot.className = "spark";
    dot.style.left = `${rect.left + rect.width / 2}px`;
    dot.style.top = `${rect.top + rect.height / 2}px`;
    dot.style.setProperty("--x", `${(Math.random() - 0.5) * 140}px`);
    dot.style.setProperty("--y", `${-30 - Math.random() * 90}px`);
    document.body.appendChild(dot);
    dot.addEventListener("animationend", () => dot.remove(), { once: true });
  }
}

function getBadges(view) {
  if (view === "Home") return [`${app.user.streak} day streak`, `${app.user.xp} XP`, `${allOpenRecords().length} open actions`];
  if (!app.records[view]) {
    return view === "Reports"
      ? [`${compactMoney(sum(app.records.Deals.map((deal) => deal.value)))} pipeline`, `${allRecords().filter((item) => item.touched).length} done`, `${app.user.xp} XP`]
      : view === "Automations"
        ? ["4 active rules", "7 actions queued", "+12 XP rule"]
        : [`SLA ${app.settings.slaMinutes}m`, `${app.team.length} users`, `${app.imports[0].errors} import errors`];
  }
  const rows = app.records[view];
  const statuses = rows.reduce((acc, item) => {
    const key = item.status || item.health || item.stage;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(statuses).slice(0, 4).map(([key, value]) => `${key} ${value}`);
}

function getQuests(view) {
  if (!app.records[view] && view !== "Home") {
    return [
      { id: nextRecord().id, label: view === "Reports" ? "Review forecast risk" : view === "Automations" ? "Run automation preview" : "Review import errors", meta: "Admin", xp: "+8 XP", done: false },
      { id: allOpenRecords()[0]?.id || nextRecord().id, label: "Complete next CRM action", meta: "System", xp: "+10 XP", done: false },
      { id: allOpenRecords()[1]?.id || nextRecord().id, label: "Save configuration", meta: "Ops", xp: "+5 XP", done: false }
    ];
  }
  const rows = view === "Home" ? allOpenRecords().slice(0, 3) : app.records[view].slice(0, 3).map((item) => ({ ...item, view }));
  return rows.map((item) => ({ id: item.id, label: item.next || item.name, meta: item.company || item.due, xp: `+${xpFor(item.view, item)} XP`, done: item.touched }));
}

function getMetrics(view) {
  const records = view === "Home" ? allRecords() : app.records[view];
  if (!records) {
    return [
      { color: "green", symbol: "✓", label: "Completed", value: allRecords().filter((item) => item.touched).length, reward: "Live", width: 72, detail: "Completed work across the CRM." },
      { color: "gold", symbol: "!", label: "Alerts", value: app.notifications.filter((item) => !item.read).length, reward: "Now", width: 45, detail: "Unread operational alerts." },
      { color: "purple", symbol: "$", label: "Pipeline", value: compactMoney(sum(app.records.Deals.map((deal) => deal.value))), reward: "Forecast", width: 68, detail: "Total tracked deal value." },
      { color: "blue", symbol: "XP", label: "XP Ledger", value: app.xpLedger.length, reward: `${app.user.xp} XP`, width: 66, detail: "Recent gamified CRM actions." }
    ];
  }
  const open = records.filter((item) => !item.touched).length;
  const done = records.length - open;
  const value = sum(records.map((item) => item.value || 0));
  return [
    { color: "green", symbol: "✓", label: "Completed", value: done, reward: `+${done * 8} XP`, width: pct(done, records.length), detail: `${done} completed CRM actions.` },
    { color: "gold", symbol: "!", label: "Needs Action", value: open, reward: "Now", width: pct(open, records.length), detail: `${open} records still need attention.` },
    { color: "purple", symbol: "$", label: "Pipeline", value: compactMoney(value), reward: "Live", width: Math.min(95, Math.round(value / 500)), detail: `${compactMoney(value)} visible in this workspace.` },
    { color: "blue", symbol: "XP", label: "Level Progress", value: app.user.level, reward: `${app.user.xp} XP`, width: Math.round(((app.user.xp % 350) / 350) * 100), detail: `${350 - (app.user.xp % 350)} XP to next level.` }
  ];
}

function visibleRecords(view) {
  let rows = [...app.records[view]].filter((item) => !item.archived);
  const { chip = "", search = "" } = app.filters[view] || {};
  if (chip) rows = rows.filter((item) => [item.status, item.health, item.stage].some((value) => String(value || "").toLowerCase().includes(chip.toLowerCase())));
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((item) => Object.values(item).join(" ").toLowerCase().includes(q));
  }
  const sort = app.sort[view] || { key: defaultSortKey(view), dir: "desc" };
  return rows.sort((a, b) => compareSortValues(sortValue(view, a, sort.key), sortValue(view, b, sort.key), sort.dir));
}

function findRecord(id) {
  for (const [view, rows] of Object.entries(app.records)) {
    const record = rows.find((item) => item.id === id);
    if (record) return { view, record };
  }
  return null;
}

function nextRecord() {
  return allOpenRecords()[0] || { id: "", name: "All clear", company: "pipelineo", view: "Home", note: "Every record has a next step complete.", next: "Claim reward", due: "Done" };
}

function allRecords() {
  return Object.entries(app.records).flatMap(([view, rows]) => rows.map((item) => ({ ...item, view })));
}

function allOpenRecords() {
  return allRecords().filter((item) => !item.touched && !item.archived).sort((a, b) => Number(b.score || b.value || b.xp || 0) - Number(a.score || a.value || a.xp || 0));
}

function totalRecords() {
  return allRecords().length;
}

function rememberUndo(label) {
  undoStack.unshift({ label, state: structuredClone(app) });
  if (undoStack.length > 5) undoStack.length = 5;
}

function undoLast(source) {
  const last = undoStack.shift();
  if (!last) return react(mascot.sleepy, "Nothing to undo.", source, { small: true });
  app = structuredClone(last.state);
  saveState();
  closeDrawer();
  closeCommand();
  closeNotificationCenter();
  renderAll();
  setCoach(mascot.focus, `${last.label} undone.`);
  showToast(`${last.label} undone.`);
  spark(source, 8);
  popMascot(mascot.focus, `${last.label} undone.`, true);
}

function touchSystem() {
  ensureUi().system.lastSynced = "Just now";
  ensureUi().system.health = "Healthy";
}

function addXp(amount) {
  app.user.xp = Math.max(0, app.user.xp + amount);
  app.user.level = 7 + Math.floor(app.user.xp / 350);
}

function appendLedger(text, amount) {
  addXp(amount);
  app.xpLedger.unshift({ id: `xp-${Date.now()}`, text, amount, at: "Now" });
  if (app.xpLedger.length > 20) app.xpLedger.length = 20;
}

function xpFor(view, record) {
  return record.xp || { Leads: 10, Deals: 14, Contacts: 8, Activities: 10, Inbox: 12 }[view] || 8;
}

function isFilterActive(chip) {
  const filter = app.filters[app.activeView]?.chip || "";
  return Boolean(filter && chip.toLowerCase().includes(filter.toLowerCase()));
}

function getSidebarStats(view) {
  const rows = app.records[view];
  const open = rows.filter((item) => !item.touched);
  const top = rows.length ? Math.max(...rows.map((item) => item.score || item.value || item.xp || 0)) : 0;
  return [
    ["Open", open.length, "need action"],
    ["Done", rows.length - open.length, "completed"],
    ["Top score", top, "priority"]
  ];
}

function getSideActions(view) {
  return {
    Leads: [["Contact top lead", "complete-next"], ["Create lead", "new-lead"], ["Focus sprint", "start-lead-sprint"]],
    Deals: [["Advance deal", "move-next-deal"], ["Open plan", "view-plan"], ["Complete next", "complete-next"]],
    Contacts: [["Log relationship touch", "complete-next"], ["Coverage plan", "view-plan"], ["Focus block", "start-focus"]],
    Activities: [["Start focus block", "start-focus"], ["Complete next", "complete-next"], ["Claim quest", "claim-quest"]],
    Inbox: [["Reply next", "complete-next"], ["Clear priority", "clear-inbox"], ["Open plan", "view-plan"]]
  }[view] || [];
}

function recordSystemLine(view) {
  return {
    Leads: `HubSpot form + enrichment · ${ensureUi().system.lastSynced}`,
    Deals: `CRM opportunity sync · ${ensureUi().system.lastSynced}`,
    Contacts: `Email + calendar graph · ${ensureUi().system.lastSynced}`,
    Activities: `Calendar + task queue · ${ensureUi().system.lastSynced}`,
    Inbox: `Shared inbox signals · ${ensureUi().system.lastSynced}`
  }[view] || `CRM sync · ${ensureUi().system.lastSynced}`;
}

function recordTrust(view, record) {
  const source = record.source || {
    Deals: "Opportunity sync",
    Contacts: "Relationship graph",
    Activities: "Calendar task",
    Inbox: "Shared inbox"
  }[view] || "CRM record";
  return {
    source,
    updated: freshnessFor(record),
    confidence: confidenceFor(view, record),
    reason: reasonFor(view, record)
  };
}

function renderTrustPill(view, record) {
  const trust = recordTrust(view, record);
  return `<span class="trust-pill"><b>${trust.source}</b><small>${trust.updated} · ${trust.confidence}% confidence</small></span>`;
}

function reasonFor(view, record) {
  if (view === "Leads") {
    if (/pricing/i.test(record.source || record.note)) return "Pricing intent";
    if (/demo/i.test(record.source || record.next)) return "Demo request";
    if (/webinar/i.test(record.source || record.note)) return "Webinar engagement";
    if (/referral/i.test(record.source || "")) return "Warm referral";
    return "Needs routing";
  }
  if (view === "Deals") {
    if (/blocked|security/i.test(`${record.health} ${record.note}`)) return "Security blocker";
    if (/risk|no next/i.test(`${record.health} ${record.note}`)) return "No next step";
    if (/contract|legal/i.test(`${record.stage} ${record.note}`)) return "Legal review";
    return "Stage momentum";
  }
  if (view === "Contacts") {
    if (/champion/i.test(record.status)) return "Champion influence";
    if (/dormant/i.test(record.status)) return "Revival needed";
    if (/gap|single/i.test(`${record.status} ${record.note}`)) return "Coverage gap";
    return "Stakeholder mapped";
  }
  if (view === "Activities") {
    if (/overdue|late/i.test(`${record.status} ${record.due}`)) return "Overdue task";
    if (/focus|proposal/i.test(`${record.status} ${record.name}`)) return "Focus item";
    return `${record.type} due`;
  }
  if (view === "Inbox") {
    if (/pricing/i.test(`${record.next} ${record.note}`)) return "Pricing question";
    if (/meeting/i.test(`${record.status} ${record.next}`)) return "Meeting likely";
    if (/reply/i.test(record.status)) return "SLA risk";
    return "Unread buying signal";
  }
  return "CRM signal";
}

function freshnessFor(record) {
  const value = String(record.due || "").toLowerCase();
  if (/now|due|late|today|new/.test(value)) return "updated now";
  if (/\dm/.test(value)) return `updated ${record.due} ago`;
  if (/\dh/.test(value)) return `updated ${record.due} ago`;
  if (/tomorrow/.test(value)) return "updated today";
  return "updated today";
}

function confidenceFor(view, record) {
  if (Number.isFinite(record.score)) return Math.min(98, Math.max(55, record.score));
  if (view === "Deals") return Math.min(94, 64 + Math.round((record.value || 0) / 900));
  if (view === "Activities") return record.status === "Overdue" ? 91 : 84;
  return 82;
}

function sortOptions(view) {
  return {
    Leads: [["score", "Priority"], ["due", "SLA"], ["value", "Value"], ["name", "Name"]],
    Deals: [["value", "Value"], ["due", "Close date"], ["stage", "Stage"], ["name", "Name"]],
    Contacts: [["score", "Health"], ["company", "Account"], ["status", "Role risk"], ["name", "Name"]],
    Activities: [["due", "Due"], ["xp", "XP"], ["status", "State"], ["name", "Name"]],
    Inbox: [["score", "Intent"], ["due", "SLA"], ["status", "State"], ["name", "Name"]]
  }[view] || [["score", "Priority"], ["name", "Name"]];
}

function defaultSortKey(view) {
  return { Deals: "value", Activities: "due", Contacts: "score", Inbox: "score" }[view] || "score";
}

function sortLabel(view, key) {
  return sortOptions(view).find(([id]) => id === key)?.[1] || key;
}

function sortValue(view, record, key) {
  if (key === "name") return record.name || "";
  if (key === "company") return record.company || "";
  if (key === "owner") return record.owner || "";
  if (key === "status") return record.status || record.health || record.stage || "";
  if (key === "stage") return pipelineStages().indexOf(record.stage);
  if (key === "value") return Number(record.value || 0);
  if (key === "xp") return Number(record.xp || 0);
  if (key === "due") return urgencyRank(record.due);
  if (key === "score") return Number(record.score || record.value || record.xp || 0);
  return record[key] || "";
}

function compareSortValues(a, b, dir = "desc") {
  const multiplier = dir === "asc" ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") return (a - b) * multiplier;
  return String(a).localeCompare(String(b)) * multiplier;
}

function urgencyRank(value) {
  const due = String(value || "").toLowerCase();
  if (/late|overdue|due|now/.test(due)) return 100;
  if (/today|new/.test(due)) return 90;
  if (/\dm/.test(due)) return 80 - Number(due.match(/(\d+)m/)?.[1] || 0) / 10;
  if (/\dh/.test(due)) return 70 - Number(due.match(/(\d+)h/)?.[1] || 0);
  if (/fri|tomorrow|2d/.test(due)) return 50;
  if (/11d|21d/.test(due)) return 20;
  return 40;
}

function opsEyebrow(view) {
  return {
    Leads: "Routing health",
    Deals: "Forecast guardrails",
    Contacts: "Coverage risk",
    Activities: "Execution state",
    Inbox: "Reply operations"
  }[view] || "Operations";
}

function recordBucket(record) {
  return record.status || record.health || record.stage || record.type || "";
}

function pipelineStages() {
  const stages = app.settings.pipelineStages;
  if (Array.isArray(stages)) return stages.length ? stages : seed.settings.pipelineStages;
  return String(stages || "").split(",").map((stage) => stage.trim()).filter(Boolean);
}

function replyDraft(record) {
  if (!record) return "Hi, happy to help. What time works best for a quick next step?";
  return record.reply || `Hi ${record.name}, happy to help. Based on your question, the fastest next step is to ${String(record.next || "book a meeting").toLowerCase()}.`;
}

function timelineItems(record) {
  if (!record) {
    return app.xpLedger.map((item) => `${item.at} · ${item.text} · ${item.amount > 0 ? "+" : ""}${item.amount} XP`);
  }
  return [
    `Now · ${record.name} viewed in ${findRecord(record.id)?.view || app.activeView}`,
    `Today · Next step set to “${record.next}”`,
    `Today · Owner is ${record.owner || "Alex"}`,
    `Yesterday · Score and activity signals refreshed`,
    `Last week · ${record.company || record.type} linked to workspace`
  ];
}

function workspaceTitle(view) {
  return { Leads: "Lead table with filters and ownership", Deals: "Pipeline records with stage actions", Contacts: "Relationship coverage workspace", Activities: "Task queue with XP completion", Inbox: "Priority messages by intent" }[view];
}

function sideTitle(view) {
  return { Leads: "SLA + ownership", Deals: "Forecast control", Contacts: "Coverage health", Activities: "Quest operations", Inbox: "Reply risk" }[view];
}

function mainColumn(view) {
  return { Leads: "Lead", Deals: "Deal", Contacts: "Contact", Activities: "Activity", Inbox: "Thread" }[view] || "Record";
}

function scoreColumn(view) {
  return { Leads: "Score", Deals: "Value", Contacts: "Health", Activities: "XP", Inbox: "Intent" }[view] || "Score";
}

function actionLabel(view) {
  return { Leads: "Contact", Deals: "Complete", Contacts: "Touch", Activities: "Done", Inbox: "Reply" }[view] || "Done";
}

function formatScore(view, score, record) {
  if (view === "Deals") return compactMoney(record.value || 0);
  if (view === "Activities") return `+${record.xp} XP`;
  return score;
}

function emptyState(view) {
  return `<div class="empty-state"><b>No ${view.toLowerCase()} match this view.</b><span>Clear filters or create a new record to keep working.</span><button type="button" data-action="clear-filters">Clear filters</button></div>`;
}

function pct(value, total) {
  return total ? Math.round((value / total) * 100) : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function compactMoney(value) {
  if (!value) return "$0";
  return value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${value}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function cssEscape(value) {
  return String(value).replace(/"/g, '\\"');
}

renderAll();
