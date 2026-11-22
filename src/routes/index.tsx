import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, Counter, MagneticButton, TiltCard, Eyebrow } from "@/components/landing/fx";
import { Mascot } from "@/components/landing/Mascot";
import { HeroMock } from "@/components/landing/HeroMock";
import { OrbitHero } from "@/components/landing/OrbitHero";
import logo from "@/assets/mousehot-logo.webp.asset.json";
import { RoiCalculator, Quiz, BeforeAfter } from "@/components/landing/Interactive";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MouseHot — Sua operação digital em um só lugar" },
      { name: "description", content: "Crie contas no automático, pesquise perfis, prepare mídia em lote e agende Reels e Stories. Escale no orgânico e transforme tráfego em venda." },
      { property: "og:title", content: "MouseHot — Sua operação digital em um só lugar" },
      { property: "og:description", content: "Contas, conteúdo, Reels e Stories no automático. Tráfego orgânico que vira venda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const headline = ["Sua", "operação", "digital", "em", "um", "só", "lugar."];

const OFFICIAL = "https://mausehot.vercel.app";

function Nav() {
  const { scrollY } = useScroll();
  const [small, setSmall] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSmall(v > 40));
  return (
    <motion.header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4" animate={{ paddingTop: small ? 10 : 20 }}>
      <motion.nav animate={{ maxWidth: small ? 900 : 1240 }} className="flex w-full items-center justify-between rounded-full border border-border bg-background/70 px-5 py-3 backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-extrabold"><img src={logo.url} alt="" className="h-8 w-8 rounded-full" />Mouse<span className="-ml-2 text-primary">Hot</span></a>
        <div className="hidden gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#como" className="hover:text-foreground">Como funciona</a>
          <a href="#ferramentas" className="hover:text-foreground">Ferramentas</a>
          <a href="#calculadora" className="hover:text-foreground">Calculadora</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </div>
        <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-hot px-5 py-2.5 text-sm font-bold text-primary-foreground">Criar conta grátis</a>
      </motion.nav>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const blob = useTransform(scrollYProgress, [0, 1], [0, -200]);
  return (
    <section ref={ref} className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-36">
      <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <motion.div style={{ y: blob }} className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><Eyebrow>Operação orgânica em escala</Eyebrow></Reveal>
          <h1 className="mt-6 text-[clamp(3rem,7vw,5.8rem)] font-extrabold leading-[0.95]">
            {headline.map((w, i) => (
              <motion.span key={i} className={`mr-[0.22em] inline-block ${w === "digital" || w === "lugar." ? "text-gradient-hot" : ""}`}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
            ))}
          </h1>
          <Reveal delay={0.6}>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted-foreground md:text-xl">
              Organize a escala da sua operação no orgânico. Crie contas no automático, pesquise perfis, prepare vídeos em lote e agende Reels e Stories com uma biblioteca para cada conta. <strong className="text-foreground">Mais contas postando = mais tráfego = mais venda.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.75}>
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href={OFFICIAL}>Criar minha conta →</MagneticButton>
              <MagneticButton href="#como" variant="ghost">Ver como funciona</MagneticButton>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Teste de 15 minutos por convite · Preparo de mídia no navegador</p>
          </Reveal>
        </div>
        <motion.div style={{ y }} className="relative lg:col-span-6">
          <OrbitHero />
          <p className="mt-2 text-center text-sm text-muted-foreground">Tudo gira em torno de uma operação mais organizada.</p>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Contas dark", "Spam no Hot", "Criação automática de contas", "Reels agendados", "Stories agendados", "Fazenda de celulares", "Tráfego orgânico", "Infoprodutos", "Agências"];
  return (
    <div className="overflow-hidden border-y border-border bg-card/50 py-6">
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-12 font-display text-2xl font-bold text-muted-foreground">{t}<span className="text-primary">✦</span></span>)}
      </div>
    </div>
  );
}

const steps = [
  { n: "01", t: "Crie as contas e escolha os perfis", dor: "Criar conta por conta, na mão, o dia inteiro.", res: "Crie várias contas do Instagram no automático e compare perfis e subnichos no Instagram Intelligence antes de investir.", vis: ["Conta @dark_01 · criada ✓", "Conta @dark_02 · criada ✓", "Perfil referência · 1,2M views"] },
  { n: "02", t: "Do arquivo original à prévia com sua marca", dor: "Várias cópias do mesmo vídeo em pastas diferentes.", res: "Guarde o original, exporte a versão com sua marca e crie a prévia para divulgar — tudo em lote, no navegador.", vis: ["original.mp4", "com-marca.mp4", "previa.mp4"] },
  { n: "03", t: "Uma biblioteca para cada conta", dor: "Links e vídeos perdidos em conversas e planilhas.", res: "Reels e Stories separados por perfil. Importe uma pasta privada do Google Drive em um clique.", vis: ["Pasta no Google Drive", "Reels da conta", "Stories da conta"] },
  { n: "04", t: "Agende Reels e Stories e acompanhe", dor: "Horários conferidos conta por conta.", res: "Escolha dias e horários, revise a fila e veja o que foi publicado em cada perfil. Tráfego rodando enquanto você escala.", vis: ["Reel da manhã · 09:00 · Revisado", "Story · 12:00 · Agendado", "Reel da noite · 18:00 · Na fila"] },
];

function Steps() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(3, Math.floor(v * 4))));
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const s = steps[active]!;
  return (
    <section id="como" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <Eyebrow>Como funciona · {active + 1}/4</Eyebrow>
            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-muted"><motion.div className="h-full bg-gradient-hot" style={{ width: bar }} /></div>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.45 }}>
                <p className="mt-8 font-display text-8xl font-extrabold text-gradient-hot">{s.n}</p>
                <h2 className="mt-2 text-4xl font-bold md:text-5xl">{s.t}</h2>
                <p className="mt-5 text-lg text-destructive line-through decoration-2">{s.dor}</p>
                <p className="mt-2 text-xl font-semibold">{s.res}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, scale: 0.9, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.9, rotate: 3 }} transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-glow">
              {s.vis.map((v, i) => (
                <motion.div key={v} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12 }} className="mb-3 flex items-center gap-4 rounded-2xl bg-muted/60 p-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-hot" />
                  <span className="font-semibold">{v}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, sub, children, alt }: { id?: string; eyebrow: string; title: React.ReactNode; sub?: string; children: React.ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={`py-20 md:py-36 ${alt ? "bg-card/40" : ""}`}>
      <div className="mx-auto max-w-[1240px] px-6">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold leading-[1.02]">{title}</h2>
          {sub && <p className="mx-auto mt-5 max-w-[60ch] text-lg text-muted-foreground">{sub}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

const personas = [
  { e: "🐭", t: "Operação dark / Hot", d: "Suba dezenas de contas dark em paralelo e mantenha todas postando todo dia." },
  { e: "🎯", t: "Infoprodutores", d: "Tráfego orgânico constante para a oferta, sem pagar anúncio." },
  { e: "🏢", t: "Agências", d: "Bibliotecas e agendas por perfil para vários clientes com equipe enxuta." },
  { e: "📲", t: "Outros nichos digitais", d: "Mesma máquina de escala para qualquer nicho do digital." },
];

const tools = [
  { e: "⚡", t: "Criação automática de contas", d: "Crie várias contas do Instagram no automático e tenha a base pronta para escalar." },
  { e: "🔎", t: "Instagram Intelligence", d: "Pesquise e compare perfis e subnichos antes de investir em produção." },
  { e: "🧭", t: "Funil visual", d: "Desenhe o caminho do primeiro contato até a venda, por campanha." },
  { e: "🎬", t: "Preparo em lote", d: "Original, versão com marca e prévia — dezenas de vídeos de uma vez, no navegador." },
  { e: "📅", t: "Automatic Post · Reels", d: "Fila de Reels de todos os perfis, com dia, horário e histórico." },
  { e: "⭕", t: "Stories agendados", d: "Sequências de Stories programadas por conta para manter o perfil quente." },
  { e: "📱", t: "Fazenda de celulares", d: "Vários celulares conectados via USB a um computador Windows, operados de um só painel." },
  { e: "🗂️", t: "Biblioteca por conta", d: "Pasta privada do Google Drive vinculada a cada perfil, sem deixar nada público." },
];

function StoriesMock() {
  const stories = [
    { t: "08:00 · Bom dia + enquete", s: "🔗 Figurinha de link" },
    { t: "12:00 · Prévia do conteúdo", s: "@ Menção marcada" },
    { t: "18:00 · Chamada pro link", s: "🔗 Link + #hashtag" },
    { t: "21:00 · Caixinha de perguntas", s: "# Hashtag do nicho" },
  ];
  const stickers = [
    { e: "🔗", l: "Link", x: "12%", y: "30%" },
    { e: "@", l: "Menção", x: "52%", y: "48%" },
    { e: "#", l: "Hashtag", x: "18%", y: "64%" },
  ];
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <Reveal>
        <div className="flex justify-center gap-4">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} animate={{ y: [0, i % 2 ? 12 : -12, 0] }} transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              className="relative aspect-[9/16] w-28 overflow-hidden rounded-3xl border border-border bg-card p-2 sm:w-36">
              <div className="flex gap-1">{[0, 1, 2].map((k) => <div key={k} className="h-1 flex-1 overflow-hidden rounded bg-muted"><motion.div className="h-full bg-foreground" animate={{ width: ["0%", "100%"] }} transition={{ duration: 3, delay: k * 3, repeat: Infinity, repeatDelay: 6 }} /></div>)}</div>
              <div className="mt-2 flex items-center gap-1.5"><img src={logo.url} alt="" className="h-5 w-5 rounded-full" /><span className="text-[10px] font-bold">@dark_0{i + 1}</span></div>
              {stickers.map((st, k) => (
                <motion.div key={st.l} className="absolute flex items-center gap-1 rounded-full bg-foreground/90 px-1.5 py-0.5 text-[8px] font-bold text-background shadow sm:text-[9px]"
                  style={{ left: st.x, top: st.y }}
                  initial={{ scale: 0, rotate: -20 }} animate={{ scale: [0, 1.15, 1], rotate: 0, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 2.2, delay: 1 + k * 2.2 + i * 0.5, repeat: Infinity, repeatDelay: 4.4, times: [0, 0.15, 0.85, 1] }}>
                  <span>{st.e}</span>{st.l}
                </motion.div>
              ))}
              <div className="absolute inset-x-2 bottom-3 rounded-xl bg-gradient-hot p-2 text-center text-[10px] font-bold text-primary-foreground">Agendado ✓</div>
            </motion.div>
          ))}
        </div>
      </Reveal>
      <div className="space-y-3">
        {stories.map((t, i) => (
          <Reveal key={t.t} delay={i * 0.08}>
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4">
              <div>
                <span className="font-semibold">{t.t}</span>
                <p className="mt-1 text-xs font-bold text-primary">{t.s}</p>
              </div>
              <span className="shrink-0 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">Agendado</span>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.35}>
          <p className="pt-1 text-sm text-muted-foreground">Cada Story sai com <strong className="text-foreground">figurinha de link</strong>, <strong className="text-foreground">menção</strong> e <strong className="text-foreground">hashtag</strong> — tudo definido na hora de agendar.</p>
        </Reveal>
      </div>
    </div>
  );
}

function ReelsMock() {
  const feats = [
    { e: "🖼️", t: "Capa do Reel", d: "Escolha a capa que aparece no feed de cada perfil." },
    { e: "✍️", t: "Legenda", d: "Texto pronto por conta, sem copiar e colar na mão." },
    { e: "#️⃣", t: "Hashtags", d: "Conjuntos de hashtags por nicho, aplicados no agendamento." },
    { e: "🛡️", t: "Mais segurança", d: "Publicação pela API oficial da Meta: menos risco de queda de conta." },
  ];
  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="order-2 space-y-3 md:order-1">
        {feats.map((f, i) => (
          <Reveal key={f.t} delay={i * 0.08}>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4">
              <span className="text-2xl">{f.e}</span>
              <div>
                <p className="font-bold">{f.t}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{f.d}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="order-1 md:order-2">
        <div className="mx-auto w-64">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-glow">
            <div className="relative aspect-[9/16] bg-gradient-to-b from-primary/30 via-card to-background p-3">
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="absolute top-3 right-3 rounded-full bg-foreground/90 px-2.5 py-1 text-[10px] font-bold text-background">🖼️ Capa definida</motion.div>
              <div className="mt-8 flex items-center gap-1.5"><img src={logo.url} alt="" className="h-6 w-6 rounded-full" /><span className="text-[11px] font-bold">@dark_01</span></div>
              <div className="absolute inset-x-3 bottom-3 space-y-2">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="rounded-xl bg-background/70 p-2 text-[10px] font-semibold backdrop-blur">
                  Legenda: 3 erros que travam sua operação no orgânico…
                </motion.p>
                <div className="flex flex-wrap gap-1">
                  {["#trafegoorganico", "#rendadigital", "#mousehot"].map((h, k) => (
                    <motion.span key={h} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 + k * 0.15, type: "spring", stiffness: 300 }}
                      className="rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-bold text-primary">{h}</motion.span>
                  ))}
                </div>
                <div className="rounded-xl bg-gradient-hot p-2 text-center text-[10px] font-bold text-primary-foreground">Reel agendado · 18:00 ✓</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </div>
  );
}

const faqs = [
  ["Quanto custa?", "A MouseHot está em fase de testes. Quem entra agora usa antes de todo mundo e garante condição de fundador quando os planos forem divulgados."],
  ["A criação de contas é automática mesmo?", "Sim. A ferramenta cria várias contas do Instagram no automático para você montar a base da operação e escalar no orgânico."],
  ["Dá para agendar Stories, além de Reels?", "Sim. Cada conta tem fila própria de Reels e Stories, com dia, horário e histórico. O Story sai com figurinha de link, menção e hashtag; o Reel sai com capa, legenda e hashtags."],
  ["Como funciona a Fazenda de Celulares?", "Você conecta vários celulares via USB a um computador Windows e opera todos a partir do mesmo painel."],
  ["Funciona para agência e vários clientes?", "Você organiza contas profissionais autorizadas, com bibliotecas e agendas por perfil. As condições para agências ainda estão em definição."],
  ["Meus dados e perfis ficam seguros?", "A conexão do Instagram usa a autorização oficial da Meta e o preparo de mídia acontece no seu navegador."],
  ["Preciso de conta profissional no Instagram?", "Sim, para programar publicações no Automatic Post. As ferramentas de preparo funcionam sem conectar perfil."],
  ["Meus vídeos do Google Drive precisam ficar públicos?", "Não. A pasta continua privada: compartilhe com a identidade indicada pela MouseHot e vincule à biblioteca da conta."],
  ["Como funciona o convite de 15 minutos?", "O convite vale uma vez e vence 15 minutos após gerado. Ao iniciar, você tem 15 minutos para testar as ferramentas de preparo."],
  ["Posso criar uma conta sem convite?", "Sim. Ao clicar em Criar conta, você é levado à página oficial da MouseHot, cria sua conta, confirma o e-mail e aguarda a aprovação para entrar no painel."],
];

function ExitModal() {
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const { scrollYProgress } = useScroll();
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (v > 0.7 && !shown.current) { shown.current = true; setOpen(true); } });
  useEffect(() => {
    const h = (e: MouseEvent) => { if (e.clientY < 5 && !shown.current) { shown.current = true; setOpen(true); } };
    document.addEventListener("mouseout", h);
    return () => document.removeEventListener("mouseout", h);
  }, []);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md rounded-[2rem] border border-border bg-card p-8 text-center">
            <button onClick={() => setOpen(false)} aria-label="Fechar" className="absolute top-4 right-5 text-muted-foreground">✕</button>
            <div className="mx-auto mb-2 flex justify-center"><Mascot size={100} /></div>
            <h3 className="text-3xl font-bold">Antes de ir…</h3>
            <p className="mt-3 mb-6 text-muted-foreground">Garanta sua vaga no acesso antecipado e trave o preço de fundador.</p>
            <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-gradient-hot px-6 py-4 font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]">Criar minha conta na MouseHot →</a>
            <p className="mt-3 text-xs text-muted-foreground">Você será levado à página oficial para criar sua conta.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Index() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <Marquee />

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {[{ v: 10, s: "x", l: "mais contas por operador" }, { v: 6, s: "h", l: "recuperadas por semana" }, { v: 50, s: "", l: "vídeos exportados por lote" }, { v: 0, s: "", l: "Reels ou Stories esquecidos" }].map((k, i) => (
            <Reveal key={k.l} delay={i * 0.08} className="border-l-2 border-primary pl-5">
              <p className="font-display text-6xl font-extrabold"><Counter to={k.v} suffix={k.s} /></p>
              <p className="mt-2 text-muted-foreground">{k.l}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Números ilustrativos de operações em teste.</p>
      </section>

      <Steps />

      <Section id="ferramentas" eyebrow="Ferramentas" title={<>Tudo que sua operação usa, <span className="text-gradient-hot">no mesmo lugar.</span></>} sub="Cada ferramenta resolve uma etapa do orgânico — da criação da conta até o tráfego virar venda.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((t, i) => (
            <Reveal key={t.t} delay={(i % 4) * 0.07}>
              <TiltCard className="h-full"><div className="text-3xl">{t.e}</div><h3 className="mt-4 text-xl font-bold">{t.t}</h3><p className="mt-2 text-[15px] text-muted-foreground">{t.d}</p></TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Stories agendados" title={<>Perfil quente o dia inteiro, <span className="text-gradient-hot">sem você abrir o app.</span></>} sub="Programe a sequência de Stories de cada conta — com figurinha de link, menção e hashtag — e mantenha o tráfego rodando de manhã à noite." alt>
        <StoriesMock />
      </Section>

      <Section eyebrow="Reels completos" title={<>Reel agendado com capa, legenda e hashtag. <span className="text-gradient-hot">Do jeito que vende.</span></>} sub="Nada de post genérico: cada Reel sai completo, com a cara do perfil, e publicado pelo caminho oficial — mais segurança e menos risco de queda de conta.">
        <ReelsMock />
      </Section>

      <Section eyebrow="Por dentro do painel" title="Veja a fila rodando ao vivo." sub="Clique em “+ Agendar” e acompanhe o post percorrer a fila.">
        <div className="mx-auto max-w-xl"><HeroMock /></div>
      </Section>

      <Section eyebrow="Pare de apagar incêndio" title={<>Pare de apagar incêndio. <span className="text-gradient-hot">Comece a operar.</span></>} sub="Quando a operação cresce, importa onde está cada arquivo, quem vai publicar e o que já saiu. Arraste e compare." alt>
        <Reveal><BeforeAfter /></Reveal>
      </Section>

      <Section id="calculadora" eyebrow="Calculadora" title={<>Quanto o trabalho manual está te <span className="text-gradient-hot">custando?</span></>} sub="Mova os controles e descubra quantas horas e reais você recupera por mês.">
        <Reveal><RoiCalculator /></Reveal>
      </Section>

      <Section eyebrow="Para quem é" title="Feito para quem escala no orgânico." alt>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {personas.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="text-4xl">{p.e}</div>
                <h3 className="mt-5 text-2xl font-bold">{p.t}</h3>
                <p className="mt-3 text-muted-foreground">{p.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section eyebrow="Seu ponto de partida" title="Escolha seu ponto de partida.">
        <Reveal><Quiz /></Reveal>
      </Section>

      <Section eyebrow="Segurança" title={<>Mais segurança, <span className="text-gradient-hot">menos risco de queda de conta.</span></>} sub="Escala de verdade só funciona se a conta continuar de pé. Por isso cada publicação segue o caminho oficial." alt>
        <div className="grid gap-5 md:grid-cols-3">
          {[["🔒", "API oficial da Meta", "Publicação pela conexão aprovada da Meta: sem automação suspeita e com muito menos risco de bloqueio ou queda de conta."], ["☁️", "Drive privado", "Sua mídia fica na sua conta. Nós nunca a armazenamos."], ["⚡", "Processado no navegador", "Exportação local, rápida e sem upload de arquivos pesados."]].map(([e = "", t = "", d = ""], i) => (
            <Reveal key={t} delay={i * 0.08}><TiltCard className="h-full"><div className="text-3xl">{e}</div><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></TiltCard></Reveal>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="Dúvidas" title="Tudo que te impede de começar hoje.">
        <Reveal className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(([q = "", a = ""]) => (
              <AccordionItem key={q} value={q} className="rounded-2xl border border-border bg-card px-6">
                <AccordionTrigger className="text-left text-lg font-bold hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Section>

      <section id="acesso" className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-hot opacity-15" />
        <div className="relative mx-auto grid max-w-[1100px] items-center gap-12 px-6 md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center">
            <Mascot size={200} />
            <p className="mt-3 text-sm text-muted-foreground">Dê um toque no rato 👆</p>
          </div>
          <Reveal>
            <Eyebrow>Vagas do acesso antecipado limitadas</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1]">Sua próxima operação começa com <span className="text-gradient-hot">mais controle.</span></h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground">Mais contas postando viram tráfego. Tráfego vira venda. Crie sua conta e dê o primeiro passo hoje.</p>
            <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-hot px-8 py-5 text-lg font-bold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]">Criar minha conta na página oficial →</a>
            <p className="mt-3 text-sm text-muted-foreground">O cadastro acontece na página oficial da MouseHot.</p>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10 pb-28 text-center text-sm text-muted-foreground md:pb-10">© 2026 MouseHot · Sua operação digital em um só lugar.</footer>

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a href={OFFICIAL} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-gradient-hot py-4 text-center font-bold text-primary-foreground shadow-glow">Criar minha conta</a>
      </div>
      <ExitModal />
    </main>
  );
}
