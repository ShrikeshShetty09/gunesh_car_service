"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Mail, Phone, CheckCheck, Loader2 } from "lucide-react";

type Message = {
  id: string; name: string; phone: string; email?: string;
  message: string; isRead: boolean; createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((d) => { setMessages(d); setLoading(false); });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-outfit text-3xl font-bold text-white mb-1">Messages</h1>
        <p className="text-gray-400">Contact form submissions</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-amber-500" /></div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500 py-20">No messages yet</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelected(msg)}
              className="bg-neutral-900 border border-white/5 rounded-2xl p-5 cursor-pointer hover:border-amber-500/30 transition-all hover:-translate-y-1 group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-white font-bold">{msg.name}</h3>
                  <p className="text-gray-500 text-xs mt-0.5">{format(new Date(msg.createdAt), "dd MMM yyyy, hh:mm a")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{msg.phone}</span>
                {msg.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{msg.email}</span>}
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{msg.message}</p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-2xl leading-none">&times;</button>
            </div>
            <div className="flex gap-4 text-sm text-gray-400 mb-4">
              <a href={`tel:${selected.phone}`} className="flex items-center gap-1.5 text-amber-400 hover:underline"><Phone className="w-4 h-4" />{selected.phone}</a>
              {selected.email && <a href={`mailto:${selected.email}`} className="flex items-center gap-1.5 text-amber-400 hover:underline"><Mail className="w-4 h-4" />{selected.email}</a>}
            </div>
            <div className="bg-black/40 rounded-xl p-4 text-gray-300 leading-relaxed text-sm border border-white/5 mb-4">{selected.message}</div>
            <p className="text-gray-600 text-xs">{format(new Date(selected.createdAt), "dd MMMM yyyy, hh:mm a")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
