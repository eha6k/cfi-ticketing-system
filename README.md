:root {
  --cfi-navy: #1c2536;
  --cfi-navy-strong: #131b2c;
  --cfi-gold: #f7c948;
  --cfi-gold-soft: #fbe9a7;
  --cfi-blue: #235d9c;
  --cfi-surface: #f7fafc;
  --cfi-panel: #ffffff;
  --cfi-text: #1f2937;
  --cfi-muted: #6b7280;
  --cfi-border: rgba(28, 37, 54, 0.12);
  --success: #1f9d63;
  --warning: #d97706;
  --danger: #d14343;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background: var(--cfi-surface);
  color: var(--cfi-text);
  font-family: Arial, Helvetica, sans-serif;
}

a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }

.auth-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--cfi-navy-strong), var(--cfi-navy));
}

.auth-card {
  width: min(520px, calc(100% - 32px));
  background: rgba(255,255,255,0.98);
  border-radius: 18px;
  padding: 32px;
  box-shadow: 0 28px 60px rgba(0,0,0,0.18);
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 26px;
}

.brand-mark {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--cfi-navy), var(--cfi-blue));
  color: white;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.brand-label {
  color: var(--cfi-navy);
  font-weight: 700;
  font-size: 1.05rem;
}

.brand-subtitle {
  color: var(--cfi-muted);
  font-size: 0.8rem;
}

h1, h2, h3, p { margin-top: 0; }

.muted { color: var(--cfi-muted); }

.role-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 26px 0;
}

.role-option {
  padding: 14px 12px;
  border: 1px solid var(--cfi-border);
  background: #fff;
  border-radius: 12px;
  cursor: pointer;
  transition: all .2s ease;
}

.role-option.active {
  border-color: var(--cfi-gold);
  background: rgba(247, 201, 73, 0.12);
  box-shadow: inset 0 0 0 1px rgba(247, 201, 73, 0.3);
}

.primary-button {
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--cfi-gold), #dcae17);
  color: #1b1d20;
  padding: 12px 18px;
  font-weight: 700;
  cursor: pointer;
}

.primary-button.full {
  width: 100%;
  margin-top: 10px;
}

.dashboard-shell {
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  min-height: 100vh;
}

.sidebar {
  background: var(--cfi-navy);
  color: white;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.sidebar-brand strong,
.sidebar-brand small { display: block; }

.sidebar-brand small { color: rgba(255,255,255,0.7); }

.nav-stack {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-button {
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.8);
  text-align: left;
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
}

.nav-button.active {
  background: rgba(247, 201, 73, 0.12);
  color: white;
  border: 1px solid rgba(247, 201, 73, 0.35);
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid rgba(255,255,255,0.08);
  display: flex;
  justify-content: space-between;
  color: rgba(255,255,255,0.8);
}

.main-panel {
  padding: 28px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
}

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cfi-muted);
}

h1 { font-size: 2rem; margin: 6px 0 0; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 26px;
}

.stat-card {
  background: white;
  border-radius: 16px;
  padding: 20px 18px;
  border: 1px solid var(--cfi-border);
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04);
}

.stat-card span {
  display: block;
  color: var(--cfi-muted);
}

.stat-card strong {
  display: block;
  font-size: 2rem;
  margin-top: 8px;
}

.stat-card.navy strong { color: var(--cfi-navy); }
.stat-card.gold strong { color: #9a7600; }
.stat-card.orange strong { color: var(--warning); }
.stat-card.gray strong { color: var(--cfi-muted); }

.panel-card {
  background: white;
  border: 1px solid var(--cfi-border);
  border-radius: 16px;
  padding: 22px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04);
  margin-bottom: 24px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.inline-search input,
.form-grid input,
.form-card textarea,
.comment-box textarea {
  width: 100%;
  border: 1px solid var(--cfi-border);
  border-radius: 10px;
  padding: 10px 12px;
  background: #fff;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 12px 10px;
  border-bottom: 1px solid var(--cfi-border);
}

th {
  color: var(--cfi-muted);
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.clickable-row { cursor: pointer; }
.clickable-row:hover { background: rgba(28, 37, 54, 0.02); }

.status-pill {
  display: inline-flex;
  align-items: center;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
}

.status-open { background: rgba(35, 93, 156, 0.12); color: var(--cfi-blue); }
.status-solved { background: rgba(31, 157, 99, 0.12); color: var(--success); }
.status-review { background: rgba(217, 119, 6, 0.12); color: var(--warning); }
.status-closed { background: rgba(107, 114, 128, 0.12); color: var(--cfi-muted); }

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.form-card textarea,
.comment-box textarea {
  min-height: 120px;
  margin-top: 16px;
}

.actions-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
}

.page-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 36px 20px 60px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;
}

.detail-grid label,
.detail-block label {
  display: block;
  color: var(--cfi-muted);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 8px;
}

.detail-block {
  margin-top: 8px;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.comment-item {
  background: #f8fafc;
  border: 1px solid var(--cfi-border);
  border-radius: 12px;
  padding: 12px 14px;
}

.comment-item p { margin: 6px 0 0; }

.activity-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.activity-list li {
  background: #f8fafc;
  border-radius: 10px;
  border: 1px solid var(--cfi-border);
  padding: 12px 14px;
}

.activity-list span {
  color: var(--cfi-muted);
  font-size: 0.78rem;
}

@media (max-width: 900px) {
  .dashboard-shell { grid-template-columns: 1fr; }
  .sidebar { padding-bottom: 12px; }
  .stats-grid, .detail-grid, .form-grid { grid-template-columns: 1fr; }
}
