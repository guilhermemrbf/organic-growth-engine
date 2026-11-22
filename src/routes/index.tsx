import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal, Counter, MagneticButton, TiltCard, Eyebrow } from "@/components/landing/fx";
import { Mascot } from "@/components/landing/Mascot";
import { HeroMock } from "@/components/landing/HeroMock";
import { RoiCalculator, Quiz, BeforeAfter, AccessForm } from "@/components/landing/Interactive";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MouseHot — Opere 10 perfis com o esforço de 1" },
      { name: "description", content: "SaaS para escalar operações orgânicas no Instagram: análise de perfis, mídia em lote e agendamento de Reels." },
      { property: "og:title", content: "MouseHot — Escale seu orgânico no Instagram" },
      { property: "og:description", content: "Do perfil certo ao Reel no ar. Opere 10 perfis com o esforço de 1." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const headline = ["Opere", "10", "perfis", "com", "o", "esforço", "de", "1."];

function Nav() {
  const { scrollY } = useScroll();
  const [small, setSmall] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setSmall(v > 40));
  return (
    <motion.header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4" animate={{ paddingTop: small ? 10 : 20 }}>
      <motion.nav animate={{ maxWidth: small ? 900 : 1240 }} className="flex w-full items-center justify-between rounded-full border border-border bg-background/70 px-5 py-3 backdrop-blur-xl">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-extrabold"><span className="h-7 w-7 rounded-full bg-gradient-hot" />MouseHot</a>
        <div className="hidden gap-7 text-sm font-semibold text-muted-foreground md:flex">
          <a href="#como" className="hover:text-foreground">Como funciona</a>
          <a href="#calculadora" className="hover:text-foreground">Calculadora</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </div>
        <a href="#acesso" className="rounded-full bg-gradient-hot px-5 py-2.5 text-sm font-bold text-primary-foreground">Criar conta grátis</a>
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
          <Reveal><Eyebrow>Acesso antecipado aberto</Eyebrow></Reveal>
          <h1 className="mt-6 text-[clamp(3rem,7vw,5.8rem)] font-extrabold leading-[0.95]">
            {headline.map((w, i) => (
              <motion.span key={i} className={`mr-[0.22em] inline-block ${w === "10" || w === "1." ? "text-gradient-hot" : ""}`}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{w}</motion.span>
            ))}
          </h1>
          <Reveal delay={0.6}>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-muted-foreground md:text-xl">
              O MouseHot encontra o que viraliza no seu nicho, prepara a mídia em lote e agenda os Reels de todos os seus perfis. <strong className="text-foreground">Seu orgânico no piloto automático.</strong>
            </p>
          </Reveal>
          <Reveal delay={0.75}>
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton href="#acesso">Escalar minha operação grátis →</MagneticButton>
              <MagneticButton href="#como" variant="ghost">▶ Ver em 60 segundos</MagneticButton>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Sem cartão · Teste em 15 min · Mídia processada no seu navegador</p>
          </Reveal>
        </div>
        <motion.div style={{ y }} className="relative lg:col-span-6">
          <div className="absolute -top-16 -left-10 z-10 hidden md:block"><Mascot size={130} /></div>
          <HeroMock />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Agências", "Gestores de orgânico", "Infoprodutores", "Perfis dark", "Lojas locais", "Criadores", "Social media", "Operações multi-perfil"];
  return (
    <div className="overflow-hidden border-y border-border bg-card/50 py-6">
      <div className="flex w-max animate-marquee gap-12">
        {[...items, ...items].map((t, i) => <span key={i} className="flex items-center gap-12 font-display text-2xl font-bold text-muted-foreground">{t}<span className="text-primary">✦</span></span>)}
      </div>
    </div>
  );
}

const steps = [
  { n: "01", t: "Descubra o que já funciona", dor: "Você posta no escuro e torce.", res: "Encontre os Reels que mais performam no nicho em 2 minutos.", vis: ["@concorrente_a · 1,2M views", "@concorrente_b · 860k views", "@concorrente_c · 540k views"] },
  { n: "02", t: "Monte seu funil de conteúdo", dor: "Conteúdo solto não vende.", res: "Organize atração, conexão e venda por perfil, visualmente.", vis: ["Topo · 12 Reels", "Meio · 6 carrosséis", "Fundo · 3 ofertas"] },
  { n: "03", t: "Prepare mídia em lote", dor: "Horas editando um a um.", res: "Corte, legende e exporte 50 vídeos de uma vez, no navegador.", vis: ["lote_semana.zip · 48 arquivos", "Legendas aplicadas ✓", "Formato 9:16 ✓"] },
  { n: "04", t: "Agende e esqueça", dor: "Post esquecido = alcance perdido.", res: "Fila da semana de todos os perfis em uma tela, publicando sozinha.", vis: ["Seg 18h · @studiofit", "Ter 12h · @chefdacasa", "Qua 20h · @viagemlow"] },
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
  { e: "📈", t: "Gestor de orgânico", d: "Atenda o dobro de clientes sem contratar mais um editor." },
  { e: "🏢", t: "Agências", d: "Padronize a operação de 20+ perfis com uma equipe enxuta." },
  { e: "🎯", t: "Infoprodutores", d: "Mantenha o perfil aquecido todo dia enquanto foca no lançamento." },
  { e: "🧩", t: "Multi-perfil", d: "Rode perfis de nicho em paralelo, cada um com sua biblioteca." },
];

const faqs = [
  ["Preciso saber editar vídeo?", "Não. Você escolhe o modelo e o MouseHot aplica corte, formato e legenda em lote. Se você sabe arrastar um arquivo, sabe usar."],
  ["É seguro conectar meu Instagram?", "Sim. Usamos a API oficial da Meta e sua mídia fica no seu Drive privado. Nada de senha compartilhada, nada de risco de bloqueio."],
  ["Funciona para quantos perfis?", "Quantos você operar. Cada perfil tem biblioteca, funil e fila próprios — é exatamente aí que a escala acontece."],
  ["Quanto custa?", "Durante o acesso antecipado você entra grátis e trava um preço de fundador quando os planos abrirem. As vagas são limitadas para garantirmos suporte próximo."],
  ["E se eu não gostar?", "Você não informa cartão. Se não economizar horas na primeira semana, simplesmente não continua — sem burocracia."],
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
            <AccessForm />
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
          {[{ v: 6, s: "h", l: "recuperadas por semana, por pessoa" }, { v: 10, s: "x", l: "mais perfis por operador" }, { v: 50, s: "", l: "vídeos exportados por lote" }, { v: 0, s: "", l: "posts esquecidos na fila" }].map((k, i) => (
            <Reveal key={k.l} delay={i * 0.08} className="border-l-2 border-primary pl-5">
              <p className="font-display text-6xl font-extrabold"><Counter to={k.v} suffix={k.s} /></p>
              <p className="mt-2 text-muted-foreground">{k.l}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Números ilustrativos de operações em teste.</p>
      </section>

      <Steps />

      <Section eyebrow="Pare de apagar incêndio" title={<>Do caos ao <span className="text-gradient-hot">controle</span> em uma tarde.</>} sub="Arraste e veja a diferença entre operar no improviso e operar com sistema." alt>
        <Reveal><BeforeAfter /></Reveal>
      </Section>

      <Section id="calculadora" eyebrow="Calculadora" title={<>Quanto o trabalho manual está te <span className="text-gradient-hot">custando?</span></>} sub="Mova os controles e descubra quantas horas e reais você recupera por mês.">
        <Reveal><RoiCalculator /></Reveal>
      </Section>

      <Section eyebrow="Para quem é" title="Feito para quem vive de orgânico." alt>
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

      <Section eyebrow="Seu ponto de partida" title="3 cliques para descobrir por onde começar.">
        <Reveal><Quiz /></Reveal>
      </Section>

      <Section eyebrow="Segurança" title="Escala sem risco para suas contas." alt>
        <div className="grid gap-5 md:grid-cols-3">
          {[["🔒", "API oficial da Meta", "Conexão aprovada, sem automação suspeita nem risco de bloqueio."], ["☁️", "Drive privado", "Sua mídia fica na sua conta. Nós nunca a armazenamos."], ["⚡", "Processado no navegador", "Exportação local, rápida e sem upload de arquivos pesados."]].map(([e, t, d], i) => (
            <Reveal key={t} delay={i * 0.08}><TiltCard className="h-full"><div className="text-3xl">{e}</div><h3 className="mt-4 text-xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></TiltCard></Reveal>
          ))}
        </div>
      </Section>

      <Section id="faq" eyebrow="Dúvidas" title="Tudo que te impede de começar hoje.">
        <Reveal className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map(([q, a]) => (
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
            <h2 className="mt-5 text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold leading-[1]">Sua próxima semana pode ter <span className="text-gradient-hot">6 horas a mais.</span></h2>
            <p className="mt-4 mb-8 text-lg text-muted-foreground">Crie sua conta em 30 segundos e trave o preço de fundador.</p>
            <AccessForm />
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-border py-10 pb-28 text-center text-sm text-muted-foreground md:pb-10">© 2026 MouseHot · Escala para o orgânico.</footer>

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a href="#acesso" className="block rounded-full bg-gradient-hot py-4 text-center font-bold text-primary-foreground shadow-glow">Escalar minha operação grátis</a>
      </div>
      <ExitModal />
    </main>
  );
}
