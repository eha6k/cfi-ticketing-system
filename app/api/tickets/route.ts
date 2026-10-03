"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type TicketDetail = {
  id: string;
  inSystemNumber: number;
  clientPlatformId: string;
  actualTicketReference: string;
  ticketType: string;
  regulatoryOrganization: string;
  reason: string;
  status: 'OPEN' | 'SOLVED' | 'SECONDARY_REVIEW' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  comments: { id: string; message: string; user: { name: string } }[];
  history: { id: string; action: string; createdAt: string; user: { name: string } }[];
};

export default function TicketDetailsPage() {
  const params = useParams();
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!params?.id) return;

    fetch(`/api/tickets/${params.id}`)
      .then((res) => res.json())
      .then((data) => setTicket(data));
  }, [params]);

  const handleAddComment = async () => {
    if (!newComment || !ticket) return;

    const res = await fetch(`/api/tickets/${ticket.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: newComment, userEmail: 'agent@cfi.local' }),
    });

    if (res.ok) {
      setNewComment('');
      const updated = await fetch(`/api/tickets/${ticket.id}`).then((r) => r.json());
      setTicket(updated);
    }
  };

  if (!ticket) return <div className="page-wrap">Loading...</div>;

  return (
    <main className="page-wrap">
      <div className="detail-header">
        <div>
          <div className="eyebrow">Ticket</div>
          <h1>#{ticket.inSystemNumber}</h1>
        </div>
        <span className={`status-pill status-open`}>{ticket.status}</span>
      </div>

      <section className="panel-card">
        <div className="detail-grid">
          <div><label>Client Platform ID</label><strong>{ticket.clientPlatformId}</strong></div>
          <div><label>Reference</label><strong>{ticket.actualTicketReference}</strong></div>
          <div><label>Type</label><strong>{ticket.ticketType}</strong></div>
          <div><label>Organization</label><strong>{ticket.regulatoryOrganization}</strong></div>
          <div><label>Created</label><strong>{new Date(ticket.createdAt).toLocaleString()}</strong></div>
          <div><label>Updated</label><strong>{new Date(ticket.updatedAt).toLocaleString()}</strong></div>
        </div>

        <div className="detail-block">
          <label>Reason</label>
          <p>{ticket.reason}</p>
        </div>
      </section>

      <section className="panel-card">
        <h2>Comments</h2>
        <div className="comment-list">
          {ticket.comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <strong>{comment.user.name}</strong>
              <p>{comment.message}</p>
            </div>
          ))}
        </div>

        <div className="comment-box">
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment" />
          <button className="primary-button" type="button" onClick={handleAddComment}>Post Comment</button>
        </div>
      </section>

      <section className="panel-card">
        <h2>Activity</h2>
        <ul className="activity-list">
          {ticket.history.map((item) => (
            <li key={item.id}>
              <strong>{item.user.name}</strong> — {item.action} <span>{new Date(item.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
