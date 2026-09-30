import {
  BarChart3,
  Check,
  ChevronDown,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Smile,
  Tag,
  Users,
} from "lucide-react";

const conversations = [
  { initials: "MC", name: "Marina Costa", message: "Obrigada pelo retorno!", time: "14:32", active: true },
  { initials: "RL", name: "Rafael Lima", message: "Preciso de uma informação", time: "13:48" },
  { initials: "AS", name: "Ana Souza", message: "Arquivo enviado", time: "12:15" },
  { initials: "JP", name: "João Pedro", message: "Perfeito, combinado.", time: "11:52" },
];

export function InboxMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="product-window" aria-label="Demonstração da caixa de entrada da Trixus">
      <div className="window-bar">
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="ml-3 text-[10px] font-semibold text-muted-foreground">Atendimento · Caixa de entrada</span>
      </div>
      <div className={`grid min-h-0 flex-1 ${compact ? "grid-cols-[60px_1fr] sm:grid-cols-[64px_210px_1fr]" : "grid-cols-[60px_1fr] md:grid-cols-[70px_220px_1fr_190px]"}`}>
        <aside className="mock-sidebar">
          <div className="mock-logo">T</div>
          {[MessageCircle, Users, BarChart3, Tag].map((Icon, index) => (
            <div key={index} className={`mock-nav-icon ${index === 0 ? "is-active" : ""}`}><Icon /></div>
          ))}
          <div className="mt-auto h-7 w-7 rounded-full bg-secondary" />
        </aside>
        <div className="hidden border-r border-border bg-card sm:block">
          <div className="border-b border-border p-3">
            <div className="flex items-center justify-between text-xs font-semibold"><span>Conversas</span><span className="text-primary">12</span></div>
            <div className="mt-3 flex items-center gap-2 rounded-md bg-muted px-2 py-1.5 text-[10px] text-muted-foreground"><Search className="size-3" /> Buscar conversa</div>
          </div>
          <div className="p-1.5">
            {conversations.map((conversation) => (
              <div key={conversation.name} className={`flex gap-2 rounded-md p-2 ${conversation.active ? "bg-accent" : ""}`}>
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-[9px] font-bold text-primary">{conversation.initials}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-1"><span className="truncate text-[10px] font-semibold">{conversation.name}</span><span className="text-[8px] text-muted-foreground">{conversation.time}</span></div>
                  <p className="truncate text-[9px] text-muted-foreground">{conversation.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col bg-background">
          <div className="flex h-14 items-center justify-between border-b border-border px-3">
            <div className="flex min-w-0 items-center gap-2"><div className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-[9px] font-bold text-primary">MC</div><div className="min-w-0"><p className="truncate text-xs font-semibold">Marina Costa</p><p className="text-[9px] text-success">● Em atendimento</p></div></div>
            <MoreHorizontal className="size-4 text-muted-foreground" />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-2 p-3 sm:p-4">
            <div className="max-w-[78%] rounded-md rounded-bl-sm border border-border bg-card p-2 text-[10px] shadow-xs">Olá! Gostaria de saber mais sobre o acompanhamento dos chamados.<span className="mt-1 block text-right text-[8px] text-muted-foreground">14:28</span></div>
            <div className="ml-auto max-w-[78%] rounded-md rounded-br-sm bg-primary p-2 text-[10px] text-primary-foreground shadow-xs">Claro, Marina. Você acompanha todo o histórico e o responsável por cada conversa.<span className="mt-1 flex items-center justify-end gap-1 text-[8px] text-primary-foreground/70">14:30 <Check className="size-2.5" /></span></div>
            <div className="max-w-[78%] rounded-md rounded-bl-sm border border-border bg-card p-2 text-[10px] shadow-xs">Ótimo, obrigada pelo retorno!<span className="mt-1 block text-right text-[8px] text-muted-foreground">14:32</span></div>
          </div>
          <div className="m-3 flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-muted-foreground"><Paperclip className="size-3" /><span className="flex-1 text-[9px]">Digite uma mensagem...</span><Smile className="size-3" /><div className="grid size-6 place-items-center rounded bg-primary text-primary-foreground"><Send className="size-3" /></div></div>
        </div>
        {!compact && <aside className="hidden border-l border-border bg-card p-4 md:block"><div className="text-center"><div className="mx-auto grid size-12 place-items-center rounded-full bg-secondary text-xs font-bold text-primary">MC</div><p className="mt-2 text-xs font-semibold">Marina Costa</p><p className="text-[9px] text-muted-foreground">Cliente</p></div><div className="mt-5 space-y-3 border-t border-border pt-4 text-[9px]"><InfoRow label="Responsável" value="Lucas Mendes" /><InfoRow label="Departamento" value="Comercial" /><InfoRow label="Status" value="Em atendimento" /><div><p className="text-muted-foreground">Tags</p><span className="mt-1 inline-flex rounded bg-secondary px-2 py-1 text-primary">Nova oportunidade</span></div></div></aside>}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div><p className="text-muted-foreground">{label}</p><p className="mt-0.5 font-medium text-foreground">{value}</p></div>;
}

export function TeamMockup() {
  return (
    <div className="mini-product-panel">
      <div className="flex items-center justify-between border-b border-border p-4"><div><p className="text-xs font-semibold">Distribuição da equipe</p><p className="text-[10px] text-muted-foreground">Visão demonstrativa</p></div><span className="status-pill"><span /> Operação ativa</span></div>
      <div className="space-y-2 p-4">
        {[{ n: "Lucas Mendes", d: "Comercial", q: "4 conversas" }, { n: "Beatriz Alves", d: "Suporte", q: "3 conversas" }, { n: "Gabriel Rocha", d: "Relacionamento", q: "2 conversas" }].map((person, i) => <div key={person.n} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-md border border-border p-3"><div className="grid size-8 place-items-center rounded-full bg-secondary text-[9px] font-bold text-primary">{person.n.split(" ").map(x => x[0]).join("")}</div><div className="min-w-0"><p className="truncate text-[11px] font-semibold">{person.n}</p><p className="text-[9px] text-muted-foreground">{person.d}</p></div><div className="text-right"><p className="text-[9px] font-medium">{person.q}</p><div className="mt-1 h-1 w-12 rounded bg-muted"><div className="h-full rounded bg-primary" style={{ width: `${75 - i * 18}%` }} /></div></div></div>)}
      </div>
    </div>
  );
}

export function DashboardMockup() {
  return (
    <div className="mini-product-panel p-4 sm:p-5">
      <div className="flex items-center justify-between"><div><p className="text-xs font-semibold">Visão da operação</p><p className="text-[9px] text-muted-foreground">Dados demonstrativos</p></div><div className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[9px]">Hoje <ChevronDown className="size-3" /></div></div>
      <div className="mt-4 grid grid-cols-3 gap-2">{["Em atendimento", "Aguardando", "Concluídos"].map((label, i) => <div key={label} className="rounded-md bg-muted p-2.5"><p className="text-[8px] text-muted-foreground">{label}</p><p className="mt-1 text-lg font-semibold">{[12, 5, 28][i]}</p></div>)}</div>
      <div className="mt-4 flex h-32 items-end gap-2 rounded-md border border-border p-3">{[42, 68, 55, 82, 62, 92, 76, 58, 86, 70].map((height, i) => <div key={i} className="flex h-full flex-1 items-end rounded-t-sm bg-primary/15"><div className="w-full rounded-t-sm bg-primary" style={{ height: `${height}%` }} /></div>)}</div>
      <div className="mt-3 flex justify-between text-[8px] text-muted-foreground"><span>Volume de conversas</span><span>Acompanhamento operacional</span></div>
    </div>
  );
}