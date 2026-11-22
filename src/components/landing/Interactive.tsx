import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MagneticButton } from "./fx";

function Field({ label, v, set, mn, mx, unit }: { label: string; v: number; set: (n: number) => void; mn: number; mx: number; unit: string }) {
  return (
    <label className="block">
      <div className="mb-2 flex justify-between text-sm"><span className="font-semibold">{label}</span><span className="font-display text-lg font-bold text-primary">{v} {unit}</span></div>
      <input type="range" min={mn} max={mx} value={v} onChange={(e) => set(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
    </label>
  );
}

export function RoiCalculator() {
  const [perfis, setPerfis] = useState(5);
  const [posts, setPosts] = useState(5);
  const [min, setMin] = useState(25);
  const [valor, setValor] = useState(50);
  const horas = Math.round((perfis * posts * min * 4.3 * 0.7) / 60);
  const reais = horas * valor;
  return (
    <div className="grid gap-8 rounded-[2rem] border border-border bg-card p-6 md:grid-cols-2 md:p-10">
      <div className="space-y-6">
        <Field label="Perfis que você opera" v={perfis} set={setPerfis} mn={1} mx={30} unit="" />
        <Field label="Posts por perfil / semana" v={posts} set={setPosts} mn={1} mx={21} unit="" />
        <Field label="Minutos por post (manual)" v={min} set={setMin} mn={5} mx={90} unit="min" />
        <Field label="Quanto vale sua hora" v={valor} set={setValor} mn={10} mx={300} unit="R$" />
      </div>
      <div className="flex flex-col justify-between rounded-3xl bg-gradient-hot p-8 text-primary-foreground">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest opacity-80">Você recupera por mês</p>
          <motion.p key={horas} initial={{ scale: 0.9, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-7xl font-extrabold leading-none">{horas}h</motion.p>
          <motion.p key={reais} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-3 font-display text-3xl font-bold">
            ≈ {reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          </motion.p>
          <p className="mt-2 text-sm opacity-80">Estimativa considerando 70% do trabalho manual automatizado.</p>
        </div>
        <a href="#acesso" className="mt-8 inline-flex justify-center rounded-full bg-background px-6 py-4 font-bold text-foreground transition-transform hover:scale-[1.03]">Quero essas {horas}h de volta →</a>
      </div>
    </div>
  );
}

const quiz = [
  { q: "Quantos perfis você opera hoje?", o: ["1 a 2", "3 a 10", "Mais de 10"] },
  { q: "Onde você mais perde tempo?", o: ["Achar o que postar", "Preparar mídia", "Agendar e publicar"] },
  { q: "Qual seu objetivo agora?", o: ["Crescer um perfil", "Escalar vários", "Montar agência"] },
];
const recs: Record<string, { t: string; d: string; cta: string }> = {
  "Achar o que postar": { t: "Comece pela Análise de Perfis", d: "Descubra os formatos que já viralizam no seu nicho e replique em minutos.", cta: "Analisar meu nicho grátis" },
  "Preparar mídia": { t: "Comece pelo Preparo em Lote", d: "Corte, legende e exporte dezenas de Reels de uma vez, direto no navegador.", cta: "Preparar meu primeiro lote" },
  "Agendar e publicar": { t: "Comece pelo Agendador", d: "Monte a fila da semana de todos os perfis em uma tela e nunca mais perca horário.", cta: "Montar minha fila agora" },
};

export function Quiz() {
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<string[]>([]);
  const pick = (o: string) => { setAns([...ans, o]); setStep(step + 1); };
  const rec = recs[ans[1] ?? ""] ?? recs["Preparar mídia"]!;
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-border bg-card p-8 md:p-12">
      <div className="mb-8 flex gap-2">{quiz.map((_, i) => <div key={i} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><motion.div className="h-full bg-gradient-hot" animate={{ width: step > i ? "100%" : "0%" }} /></div>)}</div>
      <AnimatePresence mode="wait">
        {step < 3 ? (
          <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
            <p className="mb-2 text-sm font-semibold text-muted-foreground">Pergunta {step + 1} de 3</p>
            <h3 className="mb-6 text-3xl font-bold">{quiz[step]!.q}</h3>
            <div className="grid gap-3">
              {quiz[step]!.o.map((o) => (
                <motion.button key={o} whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }} onClick={() => pick(o)}
                  className="rounded-2xl border border-border bg-background/50 p-5 text-left font-semibold transition-colors hover:border-primary hover:bg-primary/10">{o}</motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div key="r" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-primary">Seu plano ideal</p>
            <h3 className="mb-3 text-3xl font-bold">{rec.t}</h3>
            <p className="mb-8 text-muted-foreground">{rec.d}</p>
            <div className="flex flex-col items-center gap-4">
              <MagneticButton href="#acesso">{rec.cta} →</MagneticButton>
              <button onClick={() => { setStep(0); setAns([]); }} className="text-sm text-muted-foreground underline">Refazer</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const chaos = ["Planilha_final_v7.xlsx", "Drive sem pasta", "Post esquecido", "Print no WhatsApp", "Legenda perdida", "Horário errado"];
  const order = ["Biblioteca por perfil", "Fila da semana pronta", "Lote exportado", "Publicação automática", "Métricas em 1 tela", "Zero post perdido"];
  return (
    <div className="relative h-[420px] select-none overflow-hidden rounded-[2rem] border border-border">
      <div className="absolute inset-0 bg-surface p-8 text-surface-foreground">
        <p className="mb-6 text-right text-sm font-bold uppercase tracking-widest text-primary">Depois · com MouseHot</p>
        <div className="ml-auto grid max-w-md grid-cols-2 gap-3">{order.map((o) => <div key={o} className="rounded-xl border border-surface-foreground/10 bg-background/5 p-4 text-sm font-bold">✓ {o}</div>)}</div>
      </div>
      <div className="absolute inset-0 bg-muted p-8" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <p className="mb-6 text-sm font-bold uppercase tracking-widest text-destructive">Antes · no improviso</p>
        <div className="relative h-64 max-w-md">{chaos.map((c, i) => (
          <div key={c} className="absolute rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-semibold"
            style={{ left: `${(i * 37) % 60}%`, top: `${(i * 53) % 80}%`, transform: `rotate(${(i % 2 ? 1 : -1) * (4 + i * 2)}deg)` }}>✕ {c}</div>
        ))}</div>
      </div>
      <div className="pointer-events-none absolute inset-y-0 w-1 bg-primary" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-hot font-bold text-primary-foreground shadow-glow">⇆</div>
      </div>
      <input aria-label="Comparar antes e depois" type="range" min={0} max={100} value={pos} onChange={(e) => setPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
    </div>
  );
}

export function AccessForm() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <AnimatePresence mode="wait">
      {done ? (
        <motion.div key="ok" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-accent/15 p-8 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-accent-foreground">✓</motion.div>
          <p className="font-display text-2xl font-bold">Vaga garantida!</p>
          <p className="mt-2 text-muted-foreground">Enviamos seu acesso para {email}.</p>
        </motion.div>
      ) : (
        <motion.form key="f" exit={{ opacity: 0, y: -10 }} onSubmit={(e) => { e.preventDefault(); if (email.includes("@")) setDone(true); }} className="space-y-3">
          <button type="button" onClick={() => { setEmail("sua conta Google"); setDone(true); }} className="flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-6 py-4 font-bold text-background transition-transform hover:scale-[1.02]">
            <span className="font-display text-lg">G</span> Continuar com Google
          </button>
          <div className="flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />ou<span className="h-px flex-1 bg-border" /></div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="flex-1 rounded-full border border-input bg-background px-5 py-4 outline-none focus:border-primary" />
            <button className="rounded-full bg-gradient-hot px-6 py-4 font-bold text-primary-foreground shadow-glow">Criar minha conta</button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
