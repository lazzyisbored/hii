import { useEffect, useMemo, useState } from "react";

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const mascot = {
  wave: asset("assets/mascots/wave.png"),
  celebrate: asset("assets/mascots/celebrate.png"),
  proud: asset("assets/mascots/proud.png"),
  focus: asset("assets/mascots/focus.png"),
  surprised: asset("assets/mascots/surprised.png"),
  sad: asset("assets/mascots/sad.png"),
  sleepy: asset("assets/mascots/sleepy.png"),
  gem: asset("assets/mascots/gem.png"),
  coach: asset("assets/mascots/coach.png"),
  run: asset("assets/mascots/run.png"),
  crown: asset("assets/mascots/crown.png"),
  heart: asset("assets/mascots/heart.png")
};

const seed = {
  version: 5,
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
    Leads: [
      { id: "all", name: "All leads", chip: "" },
      { id: "hot", name: "Hot inbound", chip: "Hot" },
      { id: "sla", name: "SLA risk", chip: "SLA risk" },
      { id: "unassigned", name: "Unassigned", chip: "Unassigned" }
    ],
    Deals: [
      { id: "all", name: "All deals", chip: "" },
      { id: "risk", name: "At risk", chip: "At risk" },
      { id: "closing", name: "Close this week", chip: "Close this week" },
      { id: "blocked", name: "Blocked", chip: "Blocked" }
    ],
    Contacts: [
      { id: "all", name: "All contacts", chip: "" },
      { id: "champions", name: "Champions", chip: "Champion" },
      { id: "dormant", name: "Dormant", chip: "Dormant" },
      { id: "gaps", name: "Coverage gaps", chip: "Coverage gap" }
    ],
    Activities: [
      { id: "all", name: "Today", chip: "" },
      { id: "due", name: "Due now", chip: "Due now" },
      { id: "overdue", name: "Overdue", chip: "Overdue" },
      { id: "xp", name: "High XP", chip: "High XP" }
    ],
    Inbox: [
      { id: "all", name: "All threads", chip: "" },
      { id: "intent", name: "High intent", chip: "High intent" },
      { id: "due", name: "Reply due", chip: "Reply due" },
      { id: "meeting", name: "Meeting likely", chip: "Meeting likely" }
    ]
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

const sections = {
  Home: { theme: "home", eyebrow: "Main mission", title: "Complete today's sales quest to protect your streak.", body: "Finish the highest-impact CRM actions, claim XP, and push the pipeline closer to Level 8.", mascot: mascot.coach, speech: "Pick a live record. I will react when you make progress.", primary: "Complete next action", primaryAction: "complete-next", secondary: "Command bar", secondaryAction: "command" },
  Leads: { theme: "leads", eyebrow: "Lead sprint", title: "Prioritize the warmest prospects.", body: "Filter, assign, contact, and inspect lead history without leaving the dashboard.", mascot: mascot.focus, speech: "Hot leads first. Speed wins the sprint.", primary: "Start lead sprint", primaryAction: "start-lead-sprint", secondary: "New lead", secondaryAction: "new-lead" },
  Deals: { theme: "deals", eyebrow: "Deal momentum", title: "Advance what can close next.", body: "Move stages, rescue at-risk deals, and keep next steps attached to every opportunity.", mascot: mascot.crown, speech: "No next step means no momentum.", primary: "Move next deal", primaryAction: "move-next-deal", secondary: "Open forecast", secondaryAction: "view-plan" },
  Contacts: { theme: "contacts", eyebrow: "Relationship map", title: "Grow coverage across every account.", body: "Revive dormant relationships, promote champions, and reduce single-threaded account risk.", mascot: mascot.heart, speech: "A second stakeholder can save the deal.", primary: "Strengthen relationships", primaryAction: "strengthen-relationships", secondary: "Add touch", secondaryAction: "complete-next" },
  Activities: { theme: "activities", eyebrow: "Today's quest board", title: "Finish the work that moves revenue.", body: "Work the queue, bank XP, and keep the streak protected with real completion state.", mascot: mascot.run, speech: "One done task changes the whole day.", primary: "Start focus block", primaryAction: "start-focus", secondary: "Complete next", secondaryAction: "complete-next" },
  Inbox: { theme: "inbox", eyebrow: "Priority inbox", title: "Reply where intent is highest.", body: "Sort by buying signal, clear SLA risk, and turn replies into meetings.", mascot: mascot.surprised, speech: "BrightTech is hot. Reply before the clock slips.", primary: "Clear priority inbox", primaryAction: "clear-inbox", secondary: "Reply next", secondaryAction: "complete-next" },
  Reports: { theme: "reports", eyebrow: "Revenue intelligence", title: "Understand what is moving and what is stuck.", body: "Review forecast, activity quality, conversion, streak impact, and team contribution.", mascot: mascot.gem, speech: "Reports turn motion into coaching.", primary: "Pipeline report", primaryAction: "report-pipeline", secondary: "Export CSV", secondaryAction: "export-view" },
  Automations: { theme: "automations", eyebrow: "Workflow builder", title: "Automate the repetitive revenue work.", body: "Create if-this-then-that rules for routing, reminders, SLA rescue, XP quests, and follow-ups.", mascot: mascot.coach, speech: "Let the system catch what humans miss.", primary: "Run preview", primaryAction: "automation-preview", secondary: "New rule", secondaryAction: "new-rule" },
  Settings: { theme: "settings", eyebrow: "Admin center", title: "Configure how the CRM behaves.", body: "Tune scoring, SLA rules, stages, fields, XP, notifications, imports, and team permissions.", mascot: mascot.proud, speech: "A real CRM should bend to the team.", primary: "Save settings", primaryAction: "save-settings", secondary: "Review import", secondaryAction: "review-import" }
};

const navItems = ["Home", "Leads", "Deals", "Contacts", "Activities", "Inbox", "Reports", "Automations", "Settings"];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("pipelineo-state-react") || "null");
    if (stored?.records) {
      const fresh = clone(seed);
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
        }
      };
    }
  } catch {
    // Fall through to a clean state if localStorage is malformed.
  }
  return clone(seed);
}

export default function App() {
  const [app, setApp] = useState(loadState);
  const [drawer, setDrawer] = useState(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [newLeadOpen, setNewLeadOpen] = useState(false);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [undoStack, setUndoStack] = useState([]);
  const [toast, setToast] = useState(null);
  const [pop, setPop] = useState(null);
  const [coach, setCoach] = useState({ src: mascot.proud, copy: "Nice work. Your pipeline is moving." });

  useEffect(() => {
    localStorage.setItem("pipelineo-state-react", JSON.stringify(app));
    document.body.dataset.uiDensity = app.ui.density;
  }, [app]);

  useEffect(() => {
    const handler = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === "Escape") {
        setCommandOpen(false);
        setNotificationsOpen(false);
        setDrawer(null);
        setNewLeadOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const activeSection = sections[app.activeView] || sections.Home;
  const openRecords = useMemo(() => allOpenRecords(app), [app]);
  const next = openRecords[0] || { id: "", name: "All clear", company: "pipelineo", view: "Home", note: "Every record has a next step complete.", next: "Claim reward", due: "Done" };
  const unreadNotifications = app.notifications.filter((item) => !item.read).length;
  const levelXp = app.user.xp % 350;

  function showReaction(src, copy, options = {}) {
    setCoach({ src, copy });
    setToast({ copy, undo: Boolean(options.undo) });
    setPop({ src, copy, small: Boolean(options.small), id: Date.now() });
    window.setTimeout(() => setToast(null), 1900);
    window.setTimeout(() => setPop(null), options.small ? 1050 : 1600);
  }

  function updateApp(mutator, options = {}) {
    setApp((current) => {
      const before = clone(current);
      const nextState = clone(current);
      mutator(nextState);
      if (options.undoLabel) {
        setUndoStack((stack) => [{ label: options.undoLabel, state: before }, ...stack].slice(0, 5));
      }
      return nextState;
    });
    if (options.reaction) {
      showReaction(options.reaction.src, options.reaction.copy, { undo: Boolean(options.undoLabel), small: options.reaction.small });
    }
  }

  function setSection(view, quiet = false) {
    setCommandOpen(false);
    setNotificationsOpen(false);
    updateApp((draft) => {
      draft.activeView = sections[view] ? view : "Home";
    });
    if (!quiet) {
      const state = sections[view] || sections.Home;
      showReaction(state.mascot, `${view} workspace loaded.`, { small: true });
    }
  }

  function handleAction(action) {
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
    if (openMap[action]) return setSection(openMap[action]);
    if (action === "brand") return setSection("Home");
    if (action === "new-lead") return setNewLeadOpen(true);
    if (action === "profile") return showReaction(mascot.proud, `Alex - Level ${app.user.level} - ${app.user.xp} XP`);
    if (action === "streak") return showReaction(mascot.crown, `${app.user.streak}-day streak. One action keeps it alive.`);
    if (action === "gems") return showReaction(mascot.gem, `${app.user.xp} XP banked. Keep going.`);
    if (action === "notifications") return setNotificationsOpen((value) => !value);
    if (action === "command") return setCommandOpen(true);
    if (action === "sync-now") {
      return updateApp(
        (draft) => touchSystem(draft),
        { reaction: { src: mascot.proud, copy: "CRM sync complete. Scores and alerts refreshed.", small: true } }
      );
    }
    if (action === "undo") return undoLast();
    if (action === "complete-next") return completeRecord(next.id);
    if (action === "start-lead-sprint") return completeNextIn("Leads");
    if (action === "move-next-deal") return moveDeal(app.records.Deals.find((item) => !item.touched)?.id);
    if (action === "strengthen-relationships") return completeNextIn("Contacts");
    if (action === "clear-inbox") return completeNextIn("Inbox");
    if (action === "start-focus") return showReaction(mascot.run, "25-minute focus block started. Work the first open record.");
    if (action === "claim-streak") return claim("Streak XP claimed. +15 XP.", mascot.crown, 15);
    if (action === "claim-quest") return claim("Daily quest reward claimed. +20 XP.", mascot.heart, 20);
    if (action === "clear-filters") {
      return updateApp(
        (draft) => {
          draft.filters[draft.activeView] = {};
          draft.ui.selected[draft.activeView] = [];
        },
        { reaction: { src: mascot.focus, copy: `${app.activeView} filters cleared.`, small: true } }
      );
    }
    if (action === "export-view") return showReaction(mascot.gem, `${app.activeView} exported as CSV mock.`);
    if (action === "automation-preview") return showReaction(mascot.coach, "Automation preview ran: 4 rules, 7 upcoming actions.");
    if (action === "new-rule") return showReaction(mascot.focus, "New automation rule drafted.");
    if (action === "save-settings") {
      return updateApp(
        (draft) => {
          if (typeof draft.settings.pipelineStages === "string") {
            draft.settings.pipelineStages = draft.settings.pipelineStages.split(",").map((stage) => stage.trim()).filter(Boolean);
          }
          appendLedger(draft, "Settings saved", 5);
          touchSystem(draft);
        },
        { undoLabel: "Save settings", reaction: { src: mascot.proud, copy: "Settings saved. CRM rules updated." } }
      );
    }
    if (action === "review-import") return showReaction(mascot.surprised, "Import review opened: 4 rows need field mapping.");
    if (action === "mark-alerts-read") {
      return updateApp(
        (draft) => {
          draft.notifications.forEach((item) => {
            item.read = true;
          });
          touchSystem(draft);
        },
        { undoLabel: "Mark alerts read", reaction: { src: mascot.proud, copy: "All alerts marked read." } }
      );
    }
    if (action === "share") return showReaction(mascot.celebrate, "Streak card copied.");
    if (action === "quests") return showReaction(mascot.focus, "Quest list reflects live CRM completion.");
    if (action === "coach") return showReaction(mascot.coach, "I will pop up whenever you make a move.");
    return showReaction(mascot.coach, "Action ready.");
  }

  function undoLast() {
    const [last, ...rest] = undoStack;
    if (!last) return showReaction(mascot.sleepy, "Nothing to undo.", { small: true });
    setUndoStack(rest);
    setApp(clone(last.state));
    setDrawer(null);
    setCommandOpen(false);
    setNotificationsOpen(false);
    showReaction(mascot.focus, `${last.label} undone.`, { small: true });
  }

  function claim(message, img, xp) {
    updateApp(
      (draft) => {
        appendLedger(draft, message, xp);
        touchSystem(draft);
      },
      { undoLabel: "Claim reward", reaction: { src: img, copy: message } }
    );
  }

  function completeNextIn(view) {
    const pool = view === "Home" ? allOpenRecords(app) : app.records[view].filter((item) => !item.touched).map((item) => ({ ...item, view }));
    const item = pool[0];
    if (!item) return showReaction(mascot.celebrate, "Everything in this queue is complete.");
    completeRecord(item.id);
  }

  function completeRecord(id) {
    const found = findRecord(app, id);
    if (!found) return;
    updateApp(
      (draft) => {
        const current = findRecord(draft, id);
        if (!current) return;
        current.record.touched = !current.record.touched;
        const delta = current.record.touched ? xpFor(current.view, current.record) : -Math.min(8, xpFor(current.view, current.record));
        appendLedger(draft, current.record.touched ? `${current.record.next} complete` : `${current.record.name} reopened`, delta);
        touchSystem(draft);
      },
      {
        undoLabel: found.record.touched ? `Reopen ${found.record.name}` : `Complete ${found.record.name}`,
        reaction: {
          src: found.record.touched ? mascot.focus : mascot.celebrate,
          copy: found.record.touched ? `${found.record.name} reopened.` : `${found.record.next} complete. +${xpFor(found.view, found.record)} XP.`
        }
      }
    );
  }

  function moveDeal(id) {
    const deal = app.records.Deals.find((item) => item.id === id) || app.records.Deals.find((item) => !item.touched);
    if (!deal) return;
    const stages = pipelineStages(app);
    const nextStage = stages[Math.min(stages.indexOf(deal.stage) + 1, stages.length - 1)] || "Proposal";
    moveDealToStage(deal.id, nextStage);
  }

  function moveDealToStage(id, stage) {
    const deal = app.records.Deals.find((item) => item.id === id);
    if (!deal) return;
    updateApp(
      (draft) => {
        const current = draft.records.Deals.find((item) => item.id === id);
        current.stage = stage;
        current.health = stage === "Won" || stage === "Contract" ? "Close this week" : "Needs next step";
        current.touched = stage === "Won" || current.touched;
        appendLedger(draft, `${current.name} moved to ${stage}`, 14);
        touchSystem(draft);
      },
      { undoLabel: `Move ${deal.name}`, reaction: { src: stage === "Won" ? mascot.crown : mascot.gem, copy: `${deal.name} moved to ${stage}. +14 XP.` } }
    );
  }

  function toggleSelection(id, checked) {
    const found = findRecord(app, id);
    if (!found) return;
    updateApp((draft) => {
      const selected = new Set(draft.ui.selected[found.view] || []);
      const nextChecked = typeof checked === "boolean" ? checked : !selected.has(id);
      if (nextChecked) selected.add(id);
      else selected.delete(id);
      draft.ui.selected[found.view] = [...selected];
    });
  }

  function setSort(key) {
    updateApp((draft) => {
      const current = draft.sort[draft.activeView] || {};
      const defaultDir = key === "stage" || key === "name" || key === "company" ? "asc" : "desc";
      draft.sort[draft.activeView] = { key, dir: current.key === key ? (current.dir === "desc" ? "asc" : "desc") : defaultDir };
    });
    showReaction(mascot.focus, "Sort updated.", { small: true });
  }

  function setDensity(mode) {
    updateApp((draft) => {
      draft.ui.density = mode === "compact" ? "compact" : "comfortable";
    });
    showReaction(mascot.coach, `${mode === "compact" ? "Compact" : "Comfortable"} density applied.`, { small: true });
  }

  function applyBatchAction(action) {
    const view = app.activeView;
    const ids = selectedIds(app, view);
    if (!ids.length) return showReaction(mascot.sleepy, "Select records first.", { small: true });
    updateApp(
      (draft) => {
        let earned = 0;
        ids.forEach((id) => {
          const found = findRecord(draft, id);
          if (!found) return;
          const { record } = found;
          if (action === "complete" && !record.touched) {
            record.touched = true;
            earned += xpFor(found.view, record);
          }
          if (action === "assign") record.owner = "Mina";
          if (action === "snooze") record.due = "Tomorrow";
          if (action === "archive") record.archived = true;
        });
        appendLedger(draft, `Batch ${action} ${ids.length} ${view.toLowerCase()}`, earned || 4);
        draft.ui.selected[view] = [];
        touchSystem(draft);
      },
      { undoLabel: `Batch ${action}`, reaction: { src: action === "archive" ? mascot.sleepy : mascot.celebrate, copy: `${ids.length} ${view.toLowerCase()} ${action === "complete" ? "completed" : action + "ed"}.` } }
    );
  }

  function saveLead(formData) {
    const name = String(formData.get("name") || "New prospect").trim();
    const value = Number(String(formData.get("value") || "$6,000").replace(/[^\d]/g, "") || 6000);
    updateApp(
      (draft) => {
        draft.records.Leads.unshift({
          id: `lead-${Date.now()}`,
          name,
          company: name.includes(" ") ? `${name.split(" ").at(-1)} Co.` : name,
          status: "New today",
          score: 72,
          value,
          owner: "Alex",
          due: "Now",
          next: String(formData.get("step") || "Discovery call"),
          source: "Manual",
          note: "Created from the quick-add form.",
          touched: false
        });
        draft.activeView = "Leads";
        appendLedger(draft, `Created lead ${name}`, 12);
        touchSystem(draft);
      },
      { undoLabel: `Create ${name}`, reaction: { src: mascot.gem, copy: "Lead saved. +12 XP and the sprint queue updated." } }
    );
    setNewLeadOpen(false);
  }

  function openRecord(id) {
    const found = findRecord(app, id);
    if (!found) return;
    setDrawer({ id, tab: app.drawerTab || "overview" });
    showReaction(sections[found.view].mascot, `${found.record.name} opened. Next step: ${found.record.next}.`, { small: true });
  }

  function saveRecord(id, fields) {
    const found = findRecord(app, id);
    if (!found) return;
    updateApp(
      (draft) => {
        const current = findRecord(draft, id);
        Object.entries(fields).forEach(([key, value]) => {
          if (key === "status") {
            if (current.view === "Deals") current.record.health = value;
            else current.record.status = value;
          } else {
            current.record[key] = value;
          }
        });
        appendLedger(draft, `Saved ${current.record.name}`, 5);
        touchSystem(draft);
      },
      { undoLabel: `Save ${found.record.name}`, reaction: { src: mascot.gem, copy: `${found.record.name} saved. +5 XP.` } }
    );
  }

  function archiveRecord(id) {
    const found = findRecord(app, id);
    if (!found) return;
    updateApp(
      (draft) => {
        const current = findRecord(draft, id);
        current.record.archived = !current.record.archived;
        appendLedger(draft, `${current.record.archived ? "Archived" : "Restored"} ${current.record.name}`, current.record.archived ? 2 : 4);
        touchSystem(draft);
      },
      { undoLabel: `Archive ${found.record.name}`, reaction: { src: mascot.sleepy, copy: `${found.record.name} archived.` } }
    );
    setDrawer(null);
  }

  function sendInboxReply(id) {
    const found = findRecord(app, id);
    if (!found) return;
    updateApp(
      (draft) => {
        const current = findRecord(draft, id);
        current.record.reply = replyDrafts[id] || replyDraft(current.record);
        current.record.touched = true;
        current.record.status = "Replied";
        appendLedger(draft, `Sent reply to ${current.record.name}`, 12);
        touchSystem(draft);
      },
      { undoLabel: `Reply to ${found.record.name}`, reaction: { src: mascot.celebrate, copy: `Reply sent to ${found.record.name}. +12 XP.` } }
    );
  }

  function applyReplyTemplate(template, recordId) {
    const templates = {
      pricing: "Hi, happy to help with pricing. I can send a quick breakdown and tailor it to your team size.",
      meeting: "Hi, the fastest next step is a 20-minute call. I can share options for today or tomorrow.",
      security: "Hi, I can answer the security questions and attach our implementation notes for your review."
    };
    setReplyDrafts((drafts) => ({ ...drafts, [recordId]: templates[template] || drafts[recordId] }));
    showReaction(mascot.focus, `${template} template inserted.`, { small: true });
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar app={app} setSection={setSection} handleAction={handleAction} />
        <main className="content">
          <Topbar app={app} unread={unreadNotifications} handleAction={handleAction} />
          <Mission app={app} section={activeSection} handleAction={handleAction} completeRecord={completeRecord} applyChip={(chip) => applyChip(app, updateApp, showReaction, chip)} />
          <Metrics app={app} showReaction={showReaction} />
          <WorkGrid
            app={app}
            next={next}
            openRecord={openRecord}
            handleAction={handleAction}
            completeRecord={completeRecord}
            moveDealToStage={moveDealToStage}
            setSort={setSort}
            setDensity={setDensity}
            toggleSelection={toggleSelection}
            applyBatchAction={applyBatchAction}
            setActiveInbox={(id) => updateApp((draft) => { draft.ui.activeInboxId = id; })}
            replyDrafts={replyDrafts}
            setReplyDrafts={setReplyDrafts}
            applyReplyTemplate={applyReplyTemplate}
            sendInboxReply={sendInboxReply}
            setReportTab={(tab) => updateApp((draft) => { draft.reportTab = tab; })}
            updateApp={updateApp}
            showReaction={showReaction}
          />
        </main>
        <RightRail app={app} coach={coach} handleAction={handleAction} setCoach={setCoach} showReaction={showReaction} />
      </div>

      {toast && <Toast toast={toast} canUndo={undoStack.length > 0} undoLast={undoLast} />}
      {pop && <MascotPop pop={pop} />}
      {drawer && <Drawer app={app} drawer={drawer} setDrawer={setDrawer} saveRecord={saveRecord} archiveRecord={archiveRecord} completeRecord={completeRecord} moveDeal={moveDeal} openRecord={openRecord} />}
      {commandOpen && <CommandPalette app={app} setCommandOpen={setCommandOpen} handleAction={handleAction} openRecord={openRecord} />}
      {notificationsOpen && <NotificationCenter app={app} handleAction={handleAction} openNotification={(id) => openNotification(app, updateApp, setSection, openRecord, showReaction, id)} />}
      {newLeadOpen && <LeadModal onClose={() => setNewLeadOpen(false)} onSave={saveLead} />}
    </>
  );
}

function Sidebar({ app, setSection, handleAction }) {
  return (
    <aside className="sidebar">
      <button className="brand" type="button" onClick={() => handleAction("brand")}>
        <span className="brand-mark"><img src={mascot.wave} alt="" /></span>
        <span>pipelineo</span>
      </button>
      <nav className="main-nav" aria-label="Primary">
        {navItems.map((view) => (
          <button key={view} className={`nav-item ${app.activeView === view ? "active" : ""}`} type="button" data-view={view} onClick={() => setSection(view)}>
            <span className="nav-symbol">{view === "Automations" ? "Z" : view[0]}</span>
            {view}
            {view === "Inbox" && <b>{app.notifications.filter((item) => !item.read).length}</b>}
          </button>
        ))}
      </nav>
      <section className="mini-coach">
        <div className="mini-ring"><strong>{app.user.streak}</strong><span>day streak</span></div>
        <p>Keep it alive</p>
        <img src={mascot.focus} alt="" />
        <button type="button" onClick={() => handleAction("claim-streak")}>Claim XP</button>
      </section>
    </aside>
  );
}

function Topbar({ app, unread, handleAction }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Today's sales game</p>
        <h1>Good morning, Alex!</h1>
      </div>
      <div className="top-actions">
        <button className="stat-pill streak" type="button" onClick={() => handleAction("streak")}><span>🔥</span><b>{app.user.streak}</b></button>
        <button className="stat-pill xp" type="button" onClick={() => handleAction("gems")}><span>◆</span><b>{app.user.xp} XP</b></button>
        <button className="stat-pill bell" type="button" onClick={() => handleAction("notifications")}><span>🔔</span><b>{unread}</b></button>
        <button className="stat-pill sync" type="button" onClick={() => handleAction("sync-now")}><span>●</span><b>{app.ui.system.health} · {app.ui.system.lastSynced}</b></button>
        <button className="primary-btn" type="button" onClick={() => handleAction("new-lead")}>New Lead</button>
        <button className="avatar-btn" type="button" onClick={() => handleAction("profile")} aria-label="Open profile">A</button>
      </div>
    </header>
  );
}

function Mission({ app, section, handleAction, completeRecord, applyChip }) {
  return (
    <section className={`mission-card ${section.theme}`}>
      <div className="mission-copy">
        <div className="mission-badges">
          {getBadges(app, app.activeView).map((badge) => (
            <button key={badge} type="button" className={isFilterActive(app, badge) ? "active" : ""} onClick={() => applyChip(badge)}>{badge}</button>
          ))}
        </div>
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        <p>{section.body}</p>
        <div className="quest-rows">
          {getQuests(app, app.activeView).map((quest, index) => (
            <button key={`${quest.id}-${index}`} type="button" className={quest.done ? "done" : ""} onClick={() => completeRecord(quest.id)}>
              <span className="quest-check">{quest.done ? "✓" : "!"}</span><b>{quest.label}</b><em>{quest.meta}</em><strong>{quest.xp}</strong>
            </button>
          ))}
        </div>
        <div className="hero-actions">
          <button className="primary-btn big-cta" type="button" onClick={() => handleAction(section.primaryAction)}>{section.primary}</button>
          <button className="ghost-btn" type="button" onClick={() => handleAction(section.secondaryAction)}>{section.secondary}</button>
        </div>
      </div>
      <div className="mission-mascot">
        <span className="confetti c1"></span><span className="confetti c2"></span><span className="confetti c3"></span><span className="confetti c4"></span>
        <img src={section.mascot} alt="" />
        <div className="speech">{section.speech}</div>
      </div>
    </section>
  );
}

function Metrics({ app, showReaction }) {
  return (
    <section className="metric-grid" aria-label="Progress metrics">
      {getMetrics(app, app.activeView).map((metric) => (
        <button key={metric.label} className={`metric-card ${metric.color}`} type="button" onClick={() => showReaction(mascot.focus, metric.detail)}>
          <span className="metric-symbol">{metric.symbol}</span>
          <small>{metric.label}</small>
          <strong>{metric.value}</strong>
          <em>{metric.reward}</em>
          <div className="progress"><i style={{ "--w": `${metric.width}%` }}></i></div>
        </button>
      ))}
    </section>
  );
}

function WorkGrid(props) {
  const { app } = props;
  if (app.activeView === "Home") return <HomeWork {...props} />;
  if (app.activeView === "Leads") return <LeadsWork {...props} />;
  if (app.activeView === "Deals") return <DealsWork {...props} />;
  if (app.activeView === "Contacts") return <ContactsWork {...props} />;
  if (app.activeView === "Activities") return <ActivitiesWork {...props} />;
  if (app.activeView === "Inbox") return <InboxWork {...props} />;
  if (app.activeView === "Reports") return <ReportsWork {...props} />;
  if (app.activeView === "Automations") return <AutomationsWork {...props} />;
  if (app.activeView === "Settings") return <SettingsWork {...props} />;
  return null;
}

function HomeWork({ app, next, openRecord, handleAction, completeRecord }) {
  return (
    <section className="work-grid">
      <article className="panel pipeline-panel">
        <div className="section-head">
          <div><p className="eyebrow">Operating cockpit</p><h2>Every click updates CRM data, XP, and recommendations.</h2></div>
          <button type="button" onClick={() => handleAction("command")}>Command bar</button>
        </div>
        <div className="journey-map">
          <span className="path-line"></span>
          {["Leads", "Deals", "Contacts", "Activities", "Inbox"].map((view) => {
            const count = app.records[view].filter((item) => !item.touched).length;
            return (
              <button key={view} className={`zone ${view.toLowerCase()}`} type="button" onClick={() => handleAction(`open-${view.toLowerCase()}`)}>
                <b>{view}</b><strong>{count}</strong><small>open items</small><img src={sections[view].mascot} alt="" />
              </button>
            );
          })}
        </div>
      </article>
      <article className="panel activities-panel">
        <div className="section-head">
          <div><p className="eyebrow">Next best action</p><h2>{next.name}</h2></div>
          <button type="button" onClick={() => completeRecord(next.id)}>Complete</button>
        </div>
        <button className="next-card" type="button" onClick={() => openRecord(next.id)}>
          <span>{next.view}</span><b>{next.company}</b><p>{next.note}</p><strong>{next.next}</strong>
        </button>
        <ul className="activity-list compact-list">
          {allOpenRecords(app).slice(0, 4).map((item) => (
            <li key={item.id}>
              <button type="button" onClick={() => openRecord(item.id)}><span>{item.view[0]}</span><p><b>{item.name}</b><small>{item.company}</small></p><time>{item.due}</time><strong>{item.next}</strong></button>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function LeadsWork(props) {
  const { app, openRecord } = props;
  const view = "Leads";
  const records = visibleRecords(app, view);
  return (
    <section className="work-grid">
      <article className="panel lead-triage real-workspace">
        <WorkspaceToolbar app={app} view={view} title="Work inbound by SLA, score reason, and owner." updateApp={props.updateApp} />
        <ViewTabs app={app} view={view} updateApp={props.updateApp} showReaction={props.showReaction} />
        <RecordControls app={app} view={view} records={records} {...props} />
        <div className="lead-sprint-strip">
          {records.slice(0, 3).map((record, index) => (
            <button key={record.id} type="button" className={`lead-priority ${index === 0 ? "top" : ""}`} onClick={() => openRecord(record.id)}>
              <span>{record.status}</span><strong>{record.score}</strong><b>{record.name}</b><small>{record.company} · {recordTrust(view, record).reason}</small>
            </button>
          ))}
        </div>
        <DataTable app={app} view={view} records={records} {...props} />
      </article>
      <OpsPanel app={app} view={view} {...props} />
    </section>
  );
}

function DealsWork(props) {
  const { app, openRecord, moveDealToStage } = props;
  const view = "Deals";
  const records = visibleRecords(app, view);
  const stages = pipelineStages(app);
  return (
    <section className="work-grid">
      <article className="panel deal-board-panel">
        <WorkspaceToolbar app={app} view={view} title="Forecast lanes with next-step and risk controls." updateApp={props.updateApp} />
        <ViewTabs app={app} view={view} updateApp={props.updateApp} showReaction={props.showReaction} />
        <RecordControls app={app} view={view} records={records} {...props} />
        <ForecastStrip app={app} records={records} updateApp={props.updateApp} showReaction={props.showReaction} />
        <div className="deal-board">
          {stages.map((stage) => {
            const cards = records.filter((record) => record.stage === stage || (stage === "Qualified" && !stages.includes(record.stage)));
            return (
              <section key={stage} className="deal-lane">
                <header><b>{stage}</b><span>{cards.length}</span></header>
                {cards.length ? cards.map((record) => (
                  <button key={record.id} type="button" className={`deal-card ${record.health.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => openRecord(record.id)}>
                    <PickDot app={app} view={view} record={record} toggleSelection={props.toggleSelection} />
                    <small>{record.health}</small><b>{record.name}</b><span>{compactMoney(record.value)} · {record.due}</span><em>{record.next}</em>
                    <i style={{ "--w": `${Math.min(96, Math.round(record.value / 170))}%` }}></i>
                  </button>
                )) : <div className="lane-empty">No deals</div>}
                {cards.map((record) => (
                  <button key={`${record.id}-${stage}`} type="button" className="ghost-btn" onClick={() => moveDealToStage(record.id, nextStage(app, record.stage))}>Move</button>
                ))}
              </section>
            );
          })}
        </div>
      </article>
      <OpsPanel app={app} view={view} {...props} />
    </section>
  );
}

function ContactsWork(props) {
  const { app, openRecord } = props;
  const view = "Contacts";
  const records = visibleRecords(app, view);
  return (
    <section className="work-grid">
      <article className="panel relationship-panel">
        <WorkspaceToolbar app={app} view={view} title="Account coverage map." updateApp={props.updateApp} />
        <ViewTabs app={app} view={view} updateApp={props.updateApp} showReaction={props.showReaction} />
        <RecordControls app={app} view={view} records={records} {...props} />
        <CoverageStrip records={records} app={app} updateApp={props.updateApp} showReaction={props.showReaction} />
        <div className="relationship-map">
          <div className="account-hub"><span>Accounts</span><strong>{new Set(records.map((item) => item.company)).size}</strong><small>coverage graph</small></div>
          {records.map((record, index) => (
            <button key={record.id} type="button" className={`contact-node n${index + 1} ${record.status.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => openRecord(record.id)}>
              <b>{initials(record.name)}</b><span>{record.name}</span><small>{record.role}</small>
            </button>
          ))}
        </div>
        <div className="contact-roster">
          {records.length ? records.map((record) => (
            <button key={record.id} type="button" className={`contact-card ${record.touched ? "completed" : ""}`} onClick={() => openRecord(record.id)}>
              <PickDot app={app} view={view} record={record} toggleSelection={props.toggleSelection} />
              <span>{record.status}</span><b>{record.name}</b><small>{record.company} · {record.role}</small><strong>{record.score}</strong>
            </button>
          )) : <EmptyState view={view} handleAction={props.handleAction} />}
        </div>
      </article>
      <OpsPanel app={app} view={view} {...props} />
    </section>
  );
}

function ActivitiesWork(props) {
  const { app, openRecord, completeRecord } = props;
  const view = "Activities";
  const records = visibleRecords(app, view);
  const hours = ["09:00", "10:00", "10:30", "12:00", "14:00", "16:00"];
  return (
    <section className="work-grid">
      <article className="panel day-planner-panel">
        <WorkspaceToolbar app={app} view={view} title="Calendar rhythm, focus state, and XP queue." updateApp={props.updateApp} />
        <ViewTabs app={app} view={view} updateApp={props.updateApp} showReaction={props.showReaction} />
        <RecordControls app={app} view={view} records={records} {...props} />
        <FocusStrip records={records} handleAction={props.handleAction} showReaction={props.showReaction} />
        <div className="day-planner">
          <div className="time-rail">{hours.map((hour) => <span key={hour}>{hour}</span>)}</div>
          <div className="schedule-lane">
            {records.map((record, index) => (
              <button key={record.id} type="button" className={`schedule-block s${index + 1} ${record.touched ? "completed" : ""}`} onClick={() => openRecord(record.id)}>
                <PickDot app={app} view={view} record={record} toggleSelection={props.toggleSelection} />
                <span>{record.due}</span><b>{record.name}</b><small>{record.company} · {record.status}</small><strong>+{record.xp} XP</strong>
              </button>
            ))}
          </div>
        </div>
      </article>
      <article className="panel quest-console">
        <div className="section-head"><div><p className="eyebrow">Focus queue</p><h2>Complete in order</h2></div><button type="button" onClick={() => props.handleAction("complete-next")}>Next</button></div>
        <div className="activity-checklist">
          {records.map((record) => (
            <button key={record.id} type="button" className={record.touched ? "done" : ""} onClick={() => completeRecord(record.id)}>
              <span>{record.touched ? "✓" : record.type[0]}</span><b>{record.name}</b><small>{record.next}</small><strong>+{record.xp}</strong>
            </button>
          ))}
        </div>
        <div className="coach-note"><img src={sections[view].mascot} alt="" /><p>{sections[view].speech}</p></div>
      </article>
    </section>
  );
}

function InboxWork(props) {
  const { app, setActiveInbox, replyDrafts, setReplyDrafts, applyReplyTemplate, sendInboxReply, openRecord } = props;
  const view = "Inbox";
  const records = visibleRecords(app, view);
  const active = records.find((record) => record.id === app.ui.activeInboxId) || records[0];
  const draft = active ? replyDrafts[active.id] ?? replyDraft(active) : "";
  return (
    <section className="work-grid">
      <article className="panel inbox-console">
        <WorkspaceToolbar app={app} view={view} title="Reply by buying signal, SLA clock, and suggested next step." updateApp={props.updateApp} />
        <ViewTabs app={app} view={view} updateApp={props.updateApp} showReaction={props.showReaction} />
        <RecordControls app={app} view={view} records={records} {...props} />
        <div className="inbox-layout">
          <div className="thread-list">
            {records.map((record) => (
              <button key={record.id} type="button" className={`thread-row ${record === active ? "selected" : ""} ${record.touched ? "completed" : ""}`} onClick={() => setActiveInbox(record.id)}>
                <PickDot app={app} view={view} record={record} toggleSelection={props.toggleSelection} />
                <span>{record.status}</span><b>{record.name}</b><small>{record.note}</small><strong>{record.due}</strong>
              </button>
            ))}
          </div>
          <div className="reply-pane">
            <p className="eyebrow">Suggested reply</p>
            <h2>{active?.name || "No thread selected"}</h2>
            <p>{active?.note || "Clear filters to see conversations."}</p>
            {active && <div className="reply-context"><TrustPill view={view} record={active} /><span>{active.next}</span></div>}
            <div className="template-row">
              {["pricing", "meeting", "security"].map((template) => (
                <button key={template} type="button" onClick={() => applyReplyTemplate(template, active.id)}>{template[0].toUpperCase() + template.slice(1)}</button>
              ))}
            </div>
            <textarea className="reply-box" value={draft} onChange={(event) => setReplyDrafts((drafts) => ({ ...drafts, [active.id]: event.target.value }))} />
            <div className="drawer-actions">
              {active && <><button type="button" onClick={() => openRecord(active.id)}>Open thread</button><button className="primary-btn" type="button" onClick={() => sendInboxReply(active.id)}>Send reply</button></>}
            </div>
          </div>
        </div>
      </article>
      <OpsPanel app={app} view={view} {...props} />
    </section>
  );
}

function ReportsWork({ app, setReportTab, handleAction, showReaction }) {
  const won = app.records.Deals.filter((deal) => deal.stage === "Won").length;
  const openValue = sum(app.records.Deals.filter((deal) => deal.stage !== "Won").map((deal) => deal.value));
  const completed = allRecords(app).filter((record) => record.touched).length;
  const conversion = Math.round((completed / Math.max(1, allRecords(app).length)) * 100);
  const tabs = [["pipeline", "Pipeline"], ["activity", "Activity"], ["team", "Team"], ["gamification", "XP impact"]];
  return (
    <section className="work-grid">
      <article className="panel report-suite">
        <div className="workspace-toolbar"><div><p className="eyebrow">Analytics suite</p><h2>Forecast, velocity, conversion, and gamification impact.</h2></div><button type="button" onClick={() => handleAction("export-view")}>Export CSV</button></div>
        <div className="report-tabs">{tabs.map(([id, label]) => <button key={id} type="button" className={app.reportTab === id ? "active" : ""} onClick={() => setReportTab(id)}>{label}</button>)}</div>
        <div className="report-cards">
          {[["Weighted pipeline", compactMoney(openValue), "Forecastable open value"], ["Won deals", won, "Closed this period"], ["CRM completion", `${conversion}%`, "Actions completed"], ["XP earned", app.user.xp, "Level progress"]].map(([label, value, note]) => (
            <button key={label} type="button" className="report-card" onClick={() => showReaction(mascot.gem, `${label}: ${value}`)}><small>{label}</small><strong>{value}</strong><span>{note}</span></button>
          ))}
        </div>
        <div className="funnel-chart">
          {["Leads", "Deals", "Contacts", "Activities", "Inbox"].map((view) => {
            const value = app.records[view].filter((record) => !record.touched).length;
            return <div key={view}><span>{view}</span><i style={{ "--w": `${Math.max(12, value * 18)}%` }}></i><b>{value}</b></div>;
          })}
        </div>
      </article>
      <article className="panel report-feed">
        <div className="section-head"><div><p className="eyebrow">Coaching feed</p><h2>What changed</h2></div><button type="button" onClick={() => handleAction("command")}>Cmd K</button></div>
        <div className="timeline expanded">{timelineItems(app).slice(0, 7).map((item) => <p key={item}>{item}</p>)}</div>
        <div className="coach-note"><img src={mascot.gem} alt="" /><p>Reports now read from live React state, not static dashboard cards.</p></div>
      </article>
    </section>
  );
}

function AutomationsWork({ handleAction }) {
  const rules = [
    ["Hot lead SLA rescue", "If lead score > 85 and due < 15m, notify owner and create call task.", "On"],
    ["No-next-step deal guard", "If a deal sits 3 days without a next step, create manager coaching alert.", "On"],
    ["High-intent reply quest", "If a message mentions pricing, add +12 XP reply quest.", "On"],
    ["Dormant champion revival", "If champion quiet for 21 days, schedule check-in.", "Draft"]
  ];
  return (
    <section className="work-grid">
      <article className="panel automation-builder">
        <div className="workspace-toolbar"><div><p className="eyebrow">Automation rules</p><h2>If-this-then-that workflows for revenue operations.</h2></div><button type="button" onClick={() => handleAction("new-rule")}>New rule</button></div>
        <div className="rule-list">
          {rules.map(([name, body, status], index) => <button key={name} type="button" className={`rule-card ${status.toLowerCase()}`} onClick={() => handleAction("automation-preview")}><span>{status}</span><b>{name}</b><small>{body}</small><strong>{index + 1}</strong></button>)}
        </div>
      </article>
      <article className="panel automation-preview">
        <div className="section-head"><div><p className="eyebrow">Run preview</p><h2>Next 24 hours</h2></div><button type="button" onClick={() => handleAction("automation-preview")}>Simulate</button></div>
        <div className="automation-flow">
          <div><b>Trigger</b><span>BrightTech asks about pricing</span></div>
          <div><b>Condition</b><span>Intent score above 90</span></div>
          <div><b>Action</b><span>Create reply quest and notify Alex</span></div>
          <div><b>Reward</b><span>+12 XP when sent</span></div>
        </div>
        <div className="coach-note"><img src={mascot.coach} alt="" /><p>Automation turns CRM hygiene into guided work instead of nagging.</p></div>
      </article>
    </section>
  );
}

function SettingsWork({ app, updateApp, handleAction }) {
  const stages = Array.isArray(app.settings.pipelineStages) ? app.settings.pipelineStages.join(", ") : app.settings.pipelineStages;
  function updateSetting(key, value) {
    updateApp((draft) => {
      draft.settings[key] = value;
    });
  }
  return (
    <section className="work-grid">
      <article className="panel settings-panel">
        <div className="workspace-toolbar"><div><p className="eyebrow">Admin settings</p><h2>Configure scoring, SLA, pipeline, XP, team, and import rules.</h2></div><button type="button" onClick={() => handleAction("save-settings")}>Save settings</button></div>
        <div className="settings-grid">
          <label>SLA minutes <input type="number" value={app.settings.slaMinutes} onChange={(event) => updateSetting("slaMinutes", event.target.value)} /></label>
          <label>Scoring model <input value={app.settings.scoring} onChange={(event) => updateSetting("scoring", event.target.value)} /></label>
          <label>Streak rule <input value={app.settings.streakRule} onChange={(event) => updateSetting("streakRule", event.target.value)} /></label>
          <label>Pipeline stages <input value={stages} onChange={(event) => updateSetting("pipelineStages", event.target.value)} /></label>
        </div>
        <div className="import-review">
          <p className="eyebrow">Import review</p>
          {app.imports.map((item) => <button key={item.id} type="button" onClick={() => handleAction("review-import")}><b>{item.file}</b><span>{item.mapped}/{item.rows} mapped</span><strong>{item.errors} errors</strong></button>)}
        </div>
      </article>
      <article className="panel team-panel">
        <div className="section-head"><div><p className="eyebrow">Team + permissions</p><h2>Owners</h2></div><button type="button" onClick={() => handleAction("command")}>Invite</button></div>
        <div className="team-list">{app.team.map((user) => <button key={user.id} type="button"><span>{user.name[0]}</span><b>{user.name}</b><small>{user.role}</small><strong>{user.xp} XP</strong></button>)}</div>
        <div className="coach-note"><img src={mascot.proud} alt="" /><p>Settings now control visible CRM behavior and can be edited locally.</p></div>
      </article>
    </section>
  );
}

function WorkspaceToolbar({ app, view, title, updateApp }) {
  const search = app.filters[view]?.search || "";
  return (
    <div className="workspace-toolbar">
      <div><p className="eyebrow">{workspaceEyebrow(view)}</p><h2>{title}</h2></div>
      <label className="search-box">Search <input type="search" value={search} placeholder="Name, company, next step" onChange={(event) => updateApp((draft) => { draft.filters[view] = { ...(draft.filters[view] || {}), search: event.target.value }; })} /></label>
    </div>
  );
}

function ViewTabs({ app, view, updateApp, showReaction }) {
  const tabs = app.views[view] || [];
  const active = app.filters[view]?.chip || "";
  return (
    <div className="view-tabs">
      {tabs.map((tab) => {
        const count = tab.chip ? app.records[view].filter((item) => recordBucket(item).toLowerCase().includes(tab.chip.toLowerCase())).length : app.records[view].length;
        return <button key={tab.id} type="button" className={active === tab.chip ? "active" : ""} onClick={() => applySavedView(app, updateApp, showReaction, view, tab.id)}>{tab.name}<b>{count}</b></button>;
      })}
      <button type="button" onClick={() => saveCurrentView(app, updateApp, showReaction, view)}>Save view</button>
    </div>
  );
}

function RecordControls({ app, view, records, setSort, setDensity, applyBatchAction }) {
  const selected = selectedIds(app, view).length;
  const density = app.ui.density || "comfortable";
  const sort = app.sort[view] || { key: defaultSortKey(view), dir: "desc" };
  return (
    <div className="record-controls">
      <div className="sync-line"><span>{records.length} visible</span><span>{selected ? `${selected} selected` : "No rows selected"}</span><span>{recordSystemLine(app, view)}</span></div>
      <div className="control-row">
        <div className="segmented" aria-label="Density">
          {["comfortable", "compact"].map((mode) => <button key={mode} type="button" className={density === mode ? "active" : ""} onClick={() => setDensity(mode)}>{mode}</button>)}
        </div>
        <div className="sort-pills" aria-label="Sort records">
          {sortOptions(view).map(([key, label]) => <button key={key} type="button" className={sort.key === key ? "active" : ""} onClick={() => setSort(key)}>{label}{sort.key === key ? (sort.dir === "asc" ? " ↑" : " ↓") : ""}</button>)}
        </div>
      </div>
      {selected > 0 && (
        <div className="batch-bar">
          <b>{selected} selected</b>
          {["complete", "assign", "snooze", "archive"].map((action) => <button key={action} type="button" onClick={() => applyBatchAction(action)}>{action === "assign" ? "Assign Mina" : titleCase(action)}</button>)}
        </div>
      )}
    </div>
  );
}

function DataTable({ app, view, records, openRecord, completeRecord, moveDealToStage, toggleSelection, handleAction, setSort }) {
  return (
    <div className="data-table" role="table" aria-label={`${view} records`}>
      <div className="table-row table-head" role="row">
        <span></span>
        {sortHeader(app, view, "name", mainColumn(view), setSort)}
        {sortHeader(app, view, "status", "Status", setSort)}
        {sortHeader(app, view, defaultSortKey(view), scoreColumn(view), setSort)}
        <span>Owner</span><span>Source</span><span>Reason</span><span></span>
      </div>
      {records.length ? records.map((record) => (
        <div key={record.id} className={`table-row ${record.touched ? "completed" : ""}`} role="row">
          <span className="select-cell"><input type="checkbox" checked={selectedIds(app, view).includes(record.id)} onChange={(event) => toggleSelection(record.id, event.target.checked)} aria-label={`Select ${record.name}`} /></span>
          <button type="button" className="record-main" onClick={() => openRecord(record.id)}><b>{record.name}</b><small>{record.company || record.role || record.type}</small></button>
          <span><mark>{record.status || record.health || record.stage}</mark></span>
          <span>{formatScore(view, record.score ?? record.health ?? record.stage ?? record.xp, record)}</span>
          <span>{record.owner || "Alex"}</span>
          <span className="trust-cell"><b>{recordTrust(view, record).source}</b><small>{recordTrust(view, record).updated} · {recordTrust(view, record).confidence}%</small></span>
          <span className="reason-cell">{recordTrust(view, record).reason}</span>
          <span className="row-actions">
            {view === "Deals" && <button type="button" onClick={() => moveDealToStage(record.id, nextStage(app, record.stage))}>Move</button>}
            <button type="button" onClick={() => completeRecord(record.id)}>{record.touched ? "Undo" : actionLabel(view)}</button>
          </span>
        </div>
      )) : <EmptyState view={view} handleAction={handleAction} />}
    </div>
  );
}

function sortHeader(app, view, key, label, setSort) {
  const sort = app.sort[view] || {};
  const suffix = sort.key === key ? (sort.dir === "asc" ? " ↑" : " ↓") : "";
  return <span key={key}><button type="button" onClick={() => setSort(key)}>{label}{suffix}</button></span>;
}

function PickDot({ app, view, record, toggleSelection }) {
  const selected = selectedIds(app, view).includes(record.id);
  return <span className={`pick-dot ${selected ? "selected" : ""}`} role="checkbox" aria-checked={selected} aria-label={`Select ${record.name}`} onClick={(event) => { event.stopPropagation(); toggleSelection(record.id); }}></span>;
}

function ForecastStrip({ app, records, updateApp, showReaction }) {
  const stages = pipelineStages(app);
  const total = sum(records.map((deal) => deal.value));
  return (
    <div className="forecast-strip">
      {stages.slice(0, 5).map((stage) => {
        const rows = records.filter((deal) => deal.stage === stage);
        return <button key={stage} type="button" onClick={() => applyChipDirect(updateApp, "Deals", stage)}><small>{stage}</small><b>{compactMoney(sum(rows.map((deal) => deal.value)))}</b><span>{rows.length} deals</span></button>;
      })}
      <button type="button" onClick={() => showReaction(mascot.gem, `Open pipeline value ${compactMoney(total)}`)}><small>Total open</small><b>{compactMoney(total)}</b><span>visible forecast</span></button>
    </div>
  );
}

function CoverageStrip({ app, records, updateApp }) {
  const companies = [...new Set(records.map((record) => record.company))];
  return (
    <div className="coverage-strip">
      {companies.slice(0, 4).map((company) => {
        const rows = records.filter((record) => record.company === company);
        const champion = rows.some((record) => /champion/i.test(record.status));
        return <button key={company} type="button" onClick={() => applyChipDirect(updateApp, "Contacts", champion ? "Champion" : "Coverage gap")}><small>{company}</small><b>{rows.length} contact{rows.length === 1 ? "" : "s"}</b><span>{champion ? "champion mapped" : "coverage gap"}</span></button>;
      })}
    </div>
  );
}

function FocusStrip({ records, handleAction, showReaction }) {
  const xp = sum(records.filter((record) => !record.touched).map((record) => record.xp));
  const due = records.filter((record) => /now|late|today/i.test(record.due || record.status || "")).length;
  return (
    <div className="focus-strip">
      <button type="button" onClick={() => handleAction("start-focus")}><small>Focus block</small><b>25:00</b><span>ready to start</span></button>
      <button type="button"><small>Due now</small><b>{due}</b><span>protect SLA</span></button>
      <button type="button" onClick={() => showReaction(mascot.run, `Open activity XP: ${xp}`)}><small>Bankable XP</small><b>+{xp}</b><span>remaining today</span></button>
    </div>
  );
}

function OpsPanel({ app, view, handleAction, showReaction }) {
  return (
    <article className={`panel ops-panel ${view.toLowerCase()}-ops`}>
      <div className="section-head"><div><p className="eyebrow">{opsEyebrow(view)}</p><h2>{sideTitle(view)}</h2></div><button type="button" onClick={() => handleAction("command")}>Cmd K</button></div>
      <div className="insight-grid vertical">
        {getSidebarStats(app, view).map(([label, value, note]) => <button key={label} type="button" className="insight-card" onClick={() => showReaction(mascot.focus, `${label}: ${value} ${note}`)}><small>{label}</small><strong>{value}</strong><span>{note}</span></button>)}
      </div>
      <div className="action-stack">{getSideActions(view).map(([label, action]) => <button key={label} type="button" onClick={() => handleAction(action)}>{label}</button>)}</div>
      <div className="coach-note"><img src={sections[view].mascot} alt="" /><p>{sections[view].speech}</p></div>
    </article>
  );
}

function RightRail({ app, coach, handleAction, setCoach, showReaction }) {
  const open = allOpenRecords(app).length;
  const complete = allRecords(app).length - open;
  const levelXp = app.user.xp % 350;
  return (
    <aside className="right-rail">
      <section className="game-panel">
        <div className="panel-block streak-block">
          <div className="section-head"><h2>Streak</h2><button type="button" onClick={() => handleAction("share")}>Share</button></div>
          <div className="big-streak"><strong>{app.user.streak}</strong><span>🔥</span></div>
          <p>Do not break the chain.</p>
          <div className="week">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <button key={`${day}-${index}`} className={index === 5 ? "today" : ""} type="button" onClick={() => showReaction(mascot.celebrate, `${day} streak day checked.`)}>{day}</button>)}</div>
        </div>
        <div className="panel-block xp-block">
          <div className="level-row"><b>Level {app.user.level}</b><span>{levelXp} / 350 XP</span></div>
          <div className="progress"><i style={{ "--w": `${Math.round((levelXp / 350) * 100)}%` }}></i></div>
          <small>{350 - levelXp} XP to Level {app.user.level + 1}</small>
        </div>
        <div className="panel-block quest-stack">
          <div className="section-head"><h2>Quests</h2><button type="button" onClick={() => handleAction("quests")}>All</button></div>
          {[
            ["✓", "Add 5 new leads", `${Math.min(complete, 6)}/6`, "+25 XP", complete >= 6],
            ["2", "Move 3 deals forward", `${Math.min(app.records.Deals.filter((item) => item.touched).length, 3)}/3`, "+20 XP", false],
            ["✓", "Schedule 4 meetings", `${Math.min(app.records.Activities.filter((item) => item.touched).length, 4)}/4`, "+25 XP", false]
          ].map(([icon, label, progress, xp, done]) => <button key={label} type="button" className={done ? "done" : ""}><span>{icon}</span><b>{label}</b><em>{progress}</em><strong>{xp}</strong></button>)}
        </div>
        <div className="panel-block coach-card">
          <div className="section-head"><h2>Coach Mood</h2><button type="button" onClick={() => handleAction("coach")}>Live</button></div>
          <div className="coach-stage"><img className="coach-main" src={coach.src} alt="" /><p>{coach.copy}</p></div>
          <div className="mood-row">
            {[["Focused", mascot.focus, "Focus mode. One next action at a time."], ["Happy", mascot.celebrate, "Happy mode. Claim that XP."], ["Fire", mascot.run, "Fire mode. Sprint through the quest feed."]].map(([label, src, copy], index) => (
              <button key={label} className={index === 0 ? "selected" : ""} type="button" onClick={() => setCoach({ src, copy })}>{label}</button>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}

function Drawer({ app, drawer, setDrawer, saveRecord, archiveRecord, completeRecord, moveDeal, openRecord }) {
  const found = findRecord(app, drawer.id);
  if (!found) return null;
  const { view, record } = found;
  const [fields, setFields] = useState({
    name: record.name || "",
    company: record.company || "",
    status: record.status || record.health || record.stage || "",
    owner: record.owner || "Alex",
    due: record.due || "",
    next: record.next || "",
    note: record.note || ""
  });
  const trust = recordTrust(view, record);
  return (
    <>
      <div className="drawer-backdrop" onClick={() => setDrawer(null)}></div>
      <aside className="detail-drawer open" aria-label="Record details">
        <button className="drawer-close" type="button" onClick={() => setDrawer(null)} aria-label="Close">×</button>
        <p className="eyebrow">{view} detail</p>
        <h2>{record.name}</h2>
        <p className="drawer-sub">{record.company || record.role || record.type} · {record.status || record.health || record.stage}</p>
        <div className="drawer-score"><strong>{record.score ?? (record.value ? compactMoney(record.value) : record.xp)}</strong><span>{scoreColumn(view)} · {trust.confidence}% confidence</span></div>
        <div className="drawer-trust"><b>{trust.reason}</b><span>{trust.source} · {trust.updated}</span></div>
        <div className="drawer-tabs">
          {["overview", "timeline", "related", "compose", "properties"].map((tab) => <button key={tab} type="button" className={drawer.tab === tab ? "active" : ""} onClick={() => setDrawer({ ...drawer, tab })}>{tab}</button>)}
        </div>
        {drawer.tab === "overview" && <DrawerOverview app={app} view={view} record={record} />}
        {drawer.tab === "timeline" && <div className="timeline expanded"><h3>Timeline</h3>{timelineItems(app, record).map((item) => <p key={item}>{item}</p>)}</div>}
        {drawer.tab === "related" && <RelatedGrid app={app} record={record} openRecord={openRecord} />}
        {drawer.tab === "compose" && <div className="composer"><textarea className="reply-box" defaultValue={`Log a note for ${record.name}: ${record.next}`}></textarea><button type="button">Log note</button></div>}
        {drawer.tab === "properties" && <PropertyEditor fields={fields} setFields={setFields} />}
        <div className="drawer-actions">
          {view === "Deals" && <button type="button" onClick={() => moveDeal(record.id)}>Advance stage</button>}
          <button type="button" onClick={() => archiveRecord(record.id)}>{record.archived ? "Restore" : "Archive"}</button>
          <button type="button" onClick={() => saveRecord(record.id, fields)}>Save</button>
          <button className="primary-btn" type="button" onClick={() => completeRecord(record.id)}>{record.touched ? "Undo completion" : actionLabel(view)}</button>
        </div>
      </aside>
    </>
  );
}

function DrawerOverview({ app, view, record }) {
  const account = app.accounts.find((item) => item.name === record.company);
  const trust = recordTrust(view, record);
  return (
    <dl>
      <div><dt>Next step</dt><dd>{record.next}</dd></div>
      <div><dt>Owner</dt><dd>{record.owner || "Alex"}</dd></div>
      <div><dt>Due</dt><dd>{record.due}</dd></div>
      <div><dt>Recommendation reason</dt><dd>{trust.reason}</dd></div>
      <div><dt>Source</dt><dd>{trust.source} · {trust.updated}</dd></div>
      <div><dt>Account</dt><dd>{account?.name || record.company || "Unlinked"}</dd></div>
      <div><dt>Notes</dt><dd>{record.note}</dd></div>
    </dl>
  );
}

function RelatedGrid({ app, record, openRecord }) {
  const account = app.accounts.find((item) => item.name === record.company);
  const related = allRecords(app).filter((item) => item.company === record.company && item.id !== record.id).slice(0, 6);
  return (
    <div className="related-grid">
      <div><small>Account</small><b>{account?.name || record.company || "No account"}</b><span>{account?.industry || "Unmapped"} · {account?.tier || "Unknown"}</span></div>
      {related.map((item) => <button key={item.id} type="button" onClick={() => openRecord(item.id)}><small>{item.view}</small><b>{item.name}</b><span>{item.next}</span></button>)}
    </div>
  );
}

function PropertyEditor({ fields, setFields }) {
  return (
    <div className="property-editor">
      {["name", "company", "status", "owner", "due", "next"].map((key) => <label key={key}>{titleCase(key)} <input value={fields[key]} onChange={(event) => setFields({ ...fields, [key]: event.target.value })} /></label>)}
      <label>Notes <textarea value={fields.note} onChange={(event) => setFields({ ...fields, note: event.target.value })}></textarea></label>
    </div>
  );
}

function CommandPalette({ app, setCommandOpen, handleAction, openRecord }) {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase();
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
  const records = allRecords(app).filter((record) => Object.values(record).join(" ").toLowerCase().includes(q)).slice(0, 6);
  return (
    <div className="command-palette">
      <div className="command-box">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search commands, records, companies, notes" autoFocus />
        <div className="command-results">
          <p className="eyebrow">Commands</p>
          {commands.slice(0, 5).map(([label, action, note]) => <button key={label} type="button" onClick={() => { handleAction(action); setCommandOpen(false); }}><b>{label}</b><small>{note}</small></button>)}
          <p className="eyebrow">Records</p>
          {records.length ? records.map((record) => <button key={record.id} type="button" onClick={() => { openRecord(record.id); setCommandOpen(false); }}><b>{record.name}</b><small>{record.view} · {record.company || record.type}</small></button>) : <div className="empty-state">No records found</div>}
        </div>
      </div>
    </div>
  );
}

function NotificationCenter({ app, handleAction, openNotification }) {
  return (
    <div className="notification-center">
      <div className="section-head"><div><p className="eyebrow">Notification center</p><h2>Revenue alerts</h2></div><button type="button" onClick={() => handleAction("mark-alerts-read")}>Read all</button></div>
      <div className="notification-list">
        {app.notifications.map((item) => <button key={item.id} type="button" className={item.read ? "read" : ""} onClick={() => openNotification(item.id)}><span>{item.urgency}</span><b>{item.kind}</b><small>{item.text}</small></button>)}
      </div>
    </div>
  );
}

function LeadModal({ onClose, onSave }) {
  return (
    <dialog className="modal" open>
      <form method="dialog" onSubmit={(event) => { event.preventDefault(); onSave(new FormData(event.currentTarget)); }}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close">×</button>
        <img className="modal-mascot" src={mascot.heart} alt="" />
        <h2>New Lead</h2>
        <label>Name <input name="name" placeholder="Company or contact" /></label>
        <label>Deal value <input name="value" placeholder="$8,000" /></label>
        <label>Next step <select name="step"><option>Discovery call</option><option>Demo</option><option>Proposal</option></select></label>
        <button className="primary-btn" type="submit">Save Lead</button>
      </form>
    </dialog>
  );
}

function Toast({ toast, canUndo, undoLast }) {
  return <div className={`toast show ${toast.undo && canUndo ? "has-action" : ""}`} role="status" aria-live="polite"><span>{toast.copy}</span>{toast.undo && canUndo && <button type="button" onClick={undoLast}>Undo</button>}</div>;
}

function MascotPop({ pop }) {
  return <div className={`mascot-pop show ${pop.small ? "small" : ""}`} role="status" aria-live="polite"><img src={pop.src} alt="" /><p>{pop.copy}</p></div>;
}

function EmptyState({ view, handleAction }) {
  return <div className="empty-state"><b>No {view.toLowerCase()} match this view.</b><span>Clear filters or create a new record to keep working.</span><button type="button" onClick={() => handleAction("clear-filters")}>Clear filters</button></div>;
}

function TrustPill({ view, record }) {
  const trust = recordTrust(view, record);
  return <span className="trust-pill"><b>{trust.source}</b><small>{trust.updated} · {trust.confidence}% confidence</small></span>;
}

function applyChip(app, updateApp, showReaction, chip) {
  const filter = chip.replace(/\s+\d+.*/, "").replace(/^\W+\s*/, "");
  updateApp((draft) => {
    draft.filters[draft.activeView] = { ...(draft.filters[draft.activeView] || {}), chip: isFilterActive(draft, chip) ? "" : filter };
  });
  showReaction(mascot.focus, filter ? `${filter} filter applied.` : "Filter cleared.", { small: true });
}

function applyChipDirect(updateApp, view, chip) {
  updateApp((draft) => {
    draft.filters[view] = { ...(draft.filters[view] || {}), chip };
  });
}

function applySavedView(app, updateApp, showReaction, view, viewId) {
  const tab = (app.views[view] || []).find((item) => item.id === viewId);
  if (!tab) return;
  updateApp((draft) => {
    draft.filters[view] = { ...(draft.filters[view] || {}), chip: tab.chip || "" };
  });
  showReaction(mascot.focus, `${tab.name} view loaded.`, { small: true });
}

function saveCurrentView(app, updateApp, showReaction, view) {
  const chip = app.filters[view]?.chip || "";
  const label = chip ? `${chip} custom` : `All ${view.toLowerCase()} custom`;
  updateApp((draft) => {
    draft.views[view].push({ id: `view-${Date.now()}`, name: label, chip });
  });
  showReaction(mascot.gem, `${label} saved.`);
}

function openNotification(app, updateApp, setSection, openRecord, showReaction, id) {
  const notification = app.notifications.find((item) => item.id === id);
  if (!notification) return;
  updateApp((draft) => {
    const item = draft.notifications.find((note) => note.id === id);
    item.read = true;
  });
  const found = findRecord(app, notification.record);
  if (found) {
    setSection(found.view, true);
    window.setTimeout(() => openRecord(notification.record), 0);
  }
  showReaction(mascot.surprised, notification.text);
}

function addXp(draft, amount) {
  draft.user.xp = Math.max(0, draft.user.xp + amount);
  draft.user.level = 7 + Math.floor(draft.user.xp / 350);
}

function appendLedger(draft, text, amount) {
  addXp(draft, amount);
  draft.xpLedger.unshift({ id: `xp-${Date.now()}`, text, amount, at: "Now" });
  if (draft.xpLedger.length > 20) draft.xpLedger.length = 20;
}

function touchSystem(draft) {
  draft.ui.system.lastSynced = "Just now";
  draft.ui.system.health = "Healthy";
}

function visibleRecords(app, view) {
  let rows = [...app.records[view]].filter((item) => !item.archived);
  const { chip = "", search = "" } = app.filters[view] || {};
  if (chip) rows = rows.filter((item) => [item.status, item.health, item.stage].some((value) => String(value || "").toLowerCase().includes(chip.toLowerCase())));
  if (search) {
    const q = search.toLowerCase();
    rows = rows.filter((item) => Object.values(item).join(" ").toLowerCase().includes(q));
  }
  const sort = app.sort[view] || { key: defaultSortKey(view), dir: "desc" };
  return rows.sort((a, b) => compareSortValues(sortValue(app, view, a, sort.key), sortValue(app, view, b, sort.key), sort.dir));
}

function findRecord(app, id) {
  for (const [view, rows] of Object.entries(app.records)) {
    const record = rows.find((item) => item.id === id);
    if (record) return { view, record };
  }
  return null;
}

function allRecords(app) {
  return Object.entries(app.records).flatMap(([view, rows]) => rows.map((item) => ({ ...item, view })));
}

function allOpenRecords(app) {
  return allRecords(app).filter((item) => !item.touched && !item.archived).sort((a, b) => Number(b.score || b.value || b.xp || 0) - Number(a.score || a.value || a.xp || 0));
}

function selectedIds(app, view) {
  return app.ui.selected[view] || [];
}

function getBadges(app, view) {
  if (view === "Home") return [`${app.user.streak} day streak`, `${app.user.xp} XP`, `${allOpenRecords(app).length} open actions`];
  if (!app.records[view]) {
    return view === "Reports" ? [`${compactMoney(sum(app.records.Deals.map((deal) => deal.value)))} pipeline`, `${allRecords(app).filter((item) => item.touched).length} done`, `${app.user.xp} XP`] : view === "Automations" ? ["4 active rules", "7 actions queued", "+12 XP rule"] : [`SLA ${app.settings.slaMinutes}m`, `${app.team.length} users`, `${app.imports[0].errors} import errors`];
  }
  const statuses = app.records[view].reduce((acc, item) => {
    const key = item.status || item.health || item.stage;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(statuses).slice(0, 4).map(([key, value]) => `${key} ${value}`);
}

function getQuests(app, view) {
  if (!app.records[view] && view !== "Home") {
    const next = allOpenRecords(app)[0] || allRecords(app)[0];
    return [
      { id: next.id, label: view === "Reports" ? "Review forecast risk" : view === "Automations" ? "Run automation preview" : "Review import errors", meta: "Admin", xp: "+8 XP", done: false },
      { id: next.id, label: "Complete next CRM action", meta: "System", xp: "+10 XP", done: false },
      { id: next.id, label: "Save configuration", meta: "Ops", xp: "+5 XP", done: false }
    ];
  }
  const rows = view === "Home" ? allOpenRecords(app).slice(0, 3) : app.records[view].slice(0, 3).map((item) => ({ ...item, view }));
  return rows.map((item) => ({ id: item.id, label: item.next || item.name, meta: item.company || item.due, xp: `+${xpFor(item.view, item)} XP`, done: item.touched }));
}

function getMetrics(app, view) {
  const records = view === "Home" ? allRecords(app) : app.records[view];
  if (!records) {
    return [
      { color: "green", symbol: "✓", label: "Completed", value: allRecords(app).filter((item) => item.touched).length, reward: "Live", width: 72, detail: "Completed work across the CRM." },
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

function recordTrust(view, record) {
  const source = record.source || { Deals: "Opportunity sync", Contacts: "Relationship graph", Activities: "Calendar task", Inbox: "Shared inbox" }[view] || "CRM record";
  return { source, updated: freshnessFor(record), confidence: confidenceFor(view, record), reason: reasonFor(view, record) };
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
  if (view === "Activities") return /overdue|late/i.test(`${record.status} ${record.due}`) ? "Overdue task" : `${record.type} due`;
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
  if (/\dm/.test(value) || /\dh/.test(value)) return `updated ${record.due} ago`;
  return "updated today";
}

function confidenceFor(view, record) {
  if (Number.isFinite(record.score)) return Math.min(98, Math.max(55, record.score));
  if (view === "Deals") return Math.min(94, 64 + Math.round((record.value || 0) / 900));
  if (view === "Activities") return record.status === "Overdue" ? 91 : 84;
  return 82;
}

function timelineItems(app, record) {
  if (!record) return app.xpLedger.map((item) => `${item.at} · ${item.text} · ${item.amount > 0 ? "+" : ""}${item.amount} XP`);
  return [`Now · ${record.name} viewed`, `Today · Next step set to "${record.next}"`, `Today · Owner is ${record.owner || "Alex"}`, "Yesterday · Score and activity signals refreshed", `Last week · ${record.company || record.type} linked to workspace`];
}

function recordSystemLine(app, view) {
  return { Leads: `HubSpot form + enrichment · ${app.ui.system.lastSynced}`, Deals: `CRM opportunity sync · ${app.ui.system.lastSynced}`, Contacts: `Email + calendar graph · ${app.ui.system.lastSynced}`, Activities: `Calendar + task queue · ${app.ui.system.lastSynced}`, Inbox: `Shared inbox signals · ${app.ui.system.lastSynced}` }[view] || `CRM sync · ${app.ui.system.lastSynced}`;
}

function sortOptions(view) {
  return { Leads: [["score", "Priority"], ["due", "SLA"], ["value", "Value"], ["name", "Name"]], Deals: [["value", "Value"], ["due", "Close date"], ["stage", "Stage"], ["name", "Name"]], Contacts: [["score", "Health"], ["company", "Account"], ["status", "Role risk"], ["name", "Name"]], Activities: [["due", "Due"], ["xp", "XP"], ["status", "State"], ["name", "Name"]], Inbox: [["score", "Intent"], ["due", "SLA"], ["status", "State"], ["name", "Name"]] }[view] || [["score", "Priority"], ["name", "Name"]];
}

function defaultSortKey(view) {
  return { Deals: "value", Activities: "due", Contacts: "score", Inbox: "score" }[view] || "score";
}

function sortValue(app, view, record, key) {
  if (key === "name") return record.name || "";
  if (key === "company") return record.company || "";
  if (key === "status") return record.status || record.health || record.stage || "";
  if (key === "stage") return pipelineStages(app).indexOf(record.stage);
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
  return 40;
}

function pipelineStages(app) {
  const stages = app.settings.pipelineStages;
  if (Array.isArray(stages)) return stages.length ? stages : seed.settings.pipelineStages;
  return String(stages || "").split(",").map((stage) => stage.trim()).filter(Boolean);
}

function nextStage(app, stage) {
  const stages = pipelineStages(app);
  return stages[Math.min(stages.indexOf(stage) + 1, stages.length - 1)] || "Proposal";
}

function replyDraft(record) {
  if (!record) return "Hi, happy to help. What time works best for a quick next step?";
  return record.reply || `Hi ${record.name}, happy to help. Based on your question, the fastest next step is to ${String(record.next || "book a meeting").toLowerCase()}.`;
}

function getSidebarStats(app, view) {
  const rows = app.records[view];
  const open = rows.filter((item) => !item.touched);
  const top = rows.length ? Math.max(...rows.map((item) => item.score || item.value || item.xp || 0)) : 0;
  return [["Open", open.length, "need action"], ["Done", rows.length - open.length, "completed"], ["Top score", top, "priority"]];
}

function getSideActions(view) {
  return { Leads: [["Contact top lead", "complete-next"], ["Create lead", "new-lead"], ["Focus sprint", "start-lead-sprint"]], Deals: [["Advance deal", "move-next-deal"], ["Open plan", "view-plan"], ["Complete next", "complete-next"]], Contacts: [["Log relationship touch", "complete-next"], ["Coverage plan", "view-plan"], ["Focus block", "start-focus"]], Activities: [["Start focus block", "start-focus"], ["Complete next", "complete-next"], ["Claim quest", "claim-quest"]], Inbox: [["Reply next", "complete-next"], ["Clear priority", "clear-inbox"], ["Open plan", "view-plan"]] }[view] || [];
}

function recordBucket(record) {
  return record.status || record.health || record.stage || record.type || "";
}

function workspaceEyebrow(view) {
  return { Leads: "Lead command center", Deals: "Pipeline board", Contacts: "Relationship map", Activities: "Day planner", Inbox: "Priority inbox" }[view] || view;
}

function opsEyebrow(view) {
  return { Leads: "Routing health", Deals: "Forecast guardrails", Contacts: "Coverage risk", Activities: "Execution state", Inbox: "Reply operations" }[view] || "Operations";
}

function sideTitle(view) {
  return { Leads: "SLA + ownership", Deals: "Forecast control", Contacts: "Coverage health", Activities: "Quest operations", Inbox: "Reply risk" }[view] || "Operations";
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

function isFilterActive(app, chip) {
  const filter = app.filters[app.activeView]?.chip || "";
  return Boolean(filter && chip.toLowerCase().includes(filter.toLowerCase()));
}

function xpFor(view, record) {
  return record.xp || { Leads: 10, Deals: 14, Contacts: 8, Activities: 10, Inbox: 12 }[view] || 8;
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

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

function titleCase(value) {
  return String(value).replace(/(^|\s)\w/g, (char) => char.toUpperCase());
}
