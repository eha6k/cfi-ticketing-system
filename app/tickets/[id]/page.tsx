"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const statusColors: Record<string, string> = {
  OPEN: 'status-open',
  SOLVED: 'status-solved',
  'SECONDARY_REVIEW': 'status-review',
  CLOSED: 'status-closed',
};

type Ticket = {
  id: string;
  inSystemNumber: number;
  clientPlatformId: string;
  actualTicketReference: string;
  ticketType: string;
  regulatoryOrganization: string;
  status: 'OPEN' | 'SOLVED' | 'SECONDARY_REVIEW' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  createdBy: { name: string };
  comments: { message: string }[];
};

export default function DashboardPage() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [role, setRole] = useState<string>('ADMIN');
  const [title, setTitle] = useState('');
  const [clientPlatformId, setClientPlatformId] = useState('');
  const [reference, setReference] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [type, setType] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    const userRole = localStorage.getItem('cfi-role') ?? 'ADMIN';
    setRole(userRole);

    if (!userRole) {
      router.push('/');
      return;
    }

    fetch('/api/tickets')
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch(() => setTickets([]));
  }, [router]);

  const stats = useMemo(() => {
    const open = tickets.filter((t) => t.status === 'OPEN').length;
    const solved = tickets.filter((t) => t.status === 'SOLVED').length;
    const review = tickets.filter((t) => t.status === 'SECONDARY_REVIEW').length;
    const closed = tickets.filter((t) => t.status === 'CLOSED').length;

    return { open, solved, review, closed };
  }, [tickets]);

  const handleCreateTicket = async () => {
    const payload = {
      clientPlatformId,
      actualTicketReference: reference,
      regulatoryOrganization: regOrg,
      ticketType: type,
      reason,
      createdByEmail: `${role.toLowerCase()}@cfi.local`,
    };

    const response = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const created = await response.json();
      router.push(`/tickets/${created.id}`);
    }
  };

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">CFI</div>
          <div>
            <strong>Ticketing</strong>
            <small>Operations Panel</small>
          </div>
        </div>

        <nav className="nav-stack">
          <button className="nav-button active" type="button">Tickets Overview</button>
          <button className="nav-button" type="button">Reports</button>
          <button className="nav-button" type="button">User Management</button>
          <button className="nav-button" type="button">System Settings</button>
          <button className="nav-button" type="button">Import Existing Tickets</button>
        </nav>

        <div className="sidebar-footer">
          <span>Active role</span>
          <strong>{role}</strong>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">Dashboard</div>
            <h1>Tickets Overview</h1>
          </div>
          <button className="primary-button" type="button" onClick={() => {}}>+ Add Ticket</button>
        </header>

        <section className="stats-grid">
          <div className="stat-card navy">
            <span>Open</span>
            <strong>{stats.open}</strong>
          </div>
          <div className="stat-card gold">
            <span>Solved</span>
            <strong>{stats.solved}</strong>
          </div>
          <div className="stat-card orange">
            <span>Secondary Review</span>
            <strong>{stats.review}</strong>
          </div>
          <div className="stat-card gray">
            <span>Closed</span>
            <strong>{stats.closed}</strong>
          </div>
        </section>

        <section className="panel-card">
          <div className="panel-header">
            <h2>Ticket list</h2>
            <div className="inline-search">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Search tickets" />
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>In-System Ticket Number</th>
                  <th>Client Platform ID</th>
                  <th>Reference</th>
                  <th>Type</th>
                  <th>Organization</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} onClick={() => router.push(`/tickets/${ticket.id}`)} className="clickable-row">
                    <td>{ticket.inSystemNumber}</td>
                    <td>{ticket.clientPlatformId}</td>
                    <td>{ticket.actualTicketReference}</td>
                    <td>{ticket.ticketType}</td>
                    <td>{ticket.regulatoryOrganization}</td>
                    <td>
                      <span className={`status-pill ${statusColors[ticket.status]}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel-card form-card">
          <div className="panel-header">
            <h2>Create ticket</h2>
          </div>

          <div className="form-grid">
            <input placeholder="Client Platform ID" value={clientPlatformId} onChange={(e) => setClientPlatformId(e.target.value)} />
            <input placeholder="Actual Ticket Reference Number" value={reference} onChange={(e) => setReference(e.target.value)} />
            <input placeholder="Regulatory Organization" value={regOrg} onChange={(e) => setRegOrg(e.target.value)} />
            <input placeholder="Ticket Type" value={type} onChange={(e) => setType(e.target.value)} />
          </div>

          <textarea placeholder="Reason for the ticket" value={reason} onChange={(e) => setReason(e.target.value)} />

          <div className="actions-row">
            <button className="primary-button" type="button" onClick={handleCreateTicket}>Save Ticket</button>
          </div>
        </section>
      </main>
    </div>
  );
}
