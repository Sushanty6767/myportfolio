import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, Phone, Plus, RotateCcw, Smartphone, X } from "lucide-react";
import character from "@/assets/sushant-3d.png";
import { certifications, GOOGLE_FORM_URL, navItems, projects, skillGroups } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      {...(reduce ? {} : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? "nav-solid" : ""}`}>
      <a href="#home" className="nav-logo">SC</a>
      <a href="mailto:sushantchaturvedi537@gmail.com" className="nav-mail">sushantchaturvedi537@gmail.com</a>
      <nav className="nav-links" aria-label="Main navigation">
        {navItems.slice(1).map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
      </nav>
      <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(true)}><Menu /></button>
      {open && (
        <div className="nav-sheet">
          <button className="nav-burger" aria-label="Close menu" onClick={() => setOpen(false)}><X /></button>
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}
        </div>
      )}
    </header>
  );
}

function Socials() {
  return (
    <aside className="socials" aria-label="Social links">
      <a href="https://github.com/Sushanty6767" target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
      <a href="https://linkedin.com/in/sushantch" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
      <a href="mailto:sushantchaturvedi537@gmail.com" aria-label="Email"><Mail /></a>
      <a href="tel:+918004169783" aria-label="Phone"><Phone /></a>
    </aside>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const touchActive = useRef(false);
  const [tiltAvailable, setTiltAvailable] = useState(false);
  const [tiltEnabled, setTiltEnabled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scrollY = useTransform(scrollYProgress, [0, 0.3], [0, reduce ? 0 : 120]);
  const scrollRotate = useTransform(scrollYProgress, [0, 0.3], [0, reduce ? 0 : -3]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.3], [1, reduce ? 1 : 0.93]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const spring = { stiffness: 115, damping: 18, mass: 0.7 };
  const characterX = useSpring(pointerX, spring);
  const characterY = useSpring(pointerY, spring);
  const characterTiltX = useSpring(tiltX, spring);
  const characterTiltY = useSpring(tiltY, spring);
  const spotlightX = useTransform(characterX, (value) => value * 0.55);
  const spotlightY = useTransform(characterY, (value) => value * 0.3);
  const [w, setW] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setW((v) => (v + 1) % 2), 2600);
    return () => clearInterval(t);
  }, [reduce]);
  useEffect(() => {
    setTiltAvailable(!reduce && "DeviceOrientationEvent" in window);
  }, [reduce]);
  useEffect(() => {
    if (!tiltEnabled || reduce) return;
    const onOrientation = (event: DeviceOrientationEvent) => {
      if (event.gamma === null || event.beta === null) return;
      const horizontal = Math.max(-1, Math.min(1, event.gamma / 28));
      const vertical = Math.max(-1, Math.min(1, (event.beta - 45) / 32));
      pointerX.set(horizontal * 22);
      pointerY.set(vertical * 12);
      tiltX.set(vertical * -4);
      tiltY.set(horizontal * 7);
    };
    window.addEventListener("deviceorientation", onOrientation, { passive: true });
    return () => window.removeEventListener("deviceorientation", onOrientation);
  }, [pointerX, pointerY, reduce, tiltEnabled, tiltX, tiltY]);
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    tiltX.set(0);
    tiltY.set(0);
  };
  const moveCharacter = (event: PointerEvent<HTMLElement>) => {
    if (reduce || (event.pointerType === "touch" && !touchActive.current)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    pointerX.set(x * 24);
    pointerY.set(y * 14);
    tiltX.set(y * -4);
    tiltY.set(x * 7);
  };
  const startTouch = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "touch" || reduce) return;
    touchActive.current = true;
    setTiltEnabled(false);
    moveCharacter(event);
  };
  const endTouch = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") touchActive.current = false;
  };
  const enableTilt = async () => {
    if (reduce) return;
    const Orientation = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    if (Orientation.requestPermission) {
      const permission = await Orientation.requestPermission();
      if (permission !== "granted") return;
    }
    resetPointer();
    setTiltEnabled(true);
  };
  const resetCharacter = () => {
    touchActive.current = false;
    setTiltEnabled(false);
    resetPointer();
  };
  const roles = [["An", "AI/ML"], ["A", "DEVELOPER"]] as const;
  return (
    <section
      id="home"
      className="hero"
      onPointerDown={startTouch}
      onPointerMove={moveCharacter}
      onPointerUp={endTouch}
      onPointerCancel={endTouch}
      onPointerLeave={(event) => { if (event.pointerType !== "touch") resetPointer(); }}
    >
      <motion.div className="spotlight" style={{ x: spotlightX, y: spotlightY }} aria-hidden="true" />
      <div className="dust" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 8) * 0.9}s` }} />)}</div>
      <motion.div className="hero-left" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease }}>
        <p>Hello! I'm</p>
        <h1>SUSHANT<br />CHATURVEDI</h1>
      </motion.div>
      <motion.figure className="hero-figure" style={{ y: scrollY, rotate: scrollRotate, scale: scrollScale }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.3, ease }}>
        <motion.div
          className="character-stage"
          style={{ x: characterX, y: characterY, rotateX: characterTiltX, rotateY: characterTiltY }}
        >
          <motion.div className="character-shadow" style={{ x: spotlightX }} aria-hidden="true" />
          <img src={character} alt="3D character of Sushant coding at his desk" fetchPriority="high" />
        </motion.div>
        <figcaption className="character-controls">
          {tiltAvailable && (
            <Button type="button" variant="line" size="sm" aria-pressed={tiltEnabled} onClick={enableTilt} title="Use phone tilt to move character">
              <Smartphone /> {tiltEnabled ? "Tilt active" : "Use phone tilt"}
            </Button>
          )}
          <Button type="button" variant="iconGhost" size="icon" onClick={resetCharacter} title="Reset character position" aria-label="Reset character position">
            <RotateCcw />
          </Button>
        </figcaption>
      </motion.figure>
      <motion.div className="hero-right" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.45, ease }}>
        <p>{roles[w]![0]}</p>
        <div className="role-swap">
          <motion.span key={w} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease }}>{roles[w]![1]}</motion.span>
        </div>
        <div className="role-ghost">{roles[(w + 1) % 2]![1]}</div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about wrap">
      <Reveal><h3 className="label">About me</h3></Reveal>
      <Reveal delay={0.1}>
        <p className="about-text">
          Computer Science & Engineering (AI/ML) undergraduate at Galgotias University, building <span>intelligent software</span>, generative AI apps and practical machine learning solutions with Python and Java.
        </p>
      </Reveal>
    </section>
  );
}

function WhatIDo() {
  const cards = [
    { title: "AI / ML", sub: "Description", text: "Designing machine learning workflows and generative AI apps — from data prep and modelling to LLM-powered chat interfaces.", tags: skillGroups.filter((g) => ["AI / Generative AI", "Data & Machine Learning"].includes(g.label)).flatMap((g) => g.skills) },
    { title: "DEVELOP", sub: "Description", text: "Building reliable applications with solid object-oriented design, data structures and clean database integration.", tags: skillGroups.filter((g) => ["Programming", "Core CS", "Tools"].includes(g.label)).flatMap((g) => g.skills) },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="skills" className="whatido wrap">
      <Reveal><h2 className="big-title">WHAT<br /><span>I DO</span></h2></Reveal>
      <div className="do-cards">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12}>
            <button className={`do-card ${open === i ? "is-open" : ""}`} onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
              <span className="corner tl" /><span className="corner br" />
              <h3>{c.title}</h3>
              <h4>{c.sub}</h4>
              <p>{c.text}</p>
              <div className="do-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <Plus className="do-plus" />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Career() {
  const items = [
    { role: "B.Tech CSE (AI/ML)", place: "Galgotias University", year: "2024", text: "Greater Noida · CGPA 7.0/10 · Expected graduation 2028." },
    { role: "Pre-Qualifier", place: "Smart India Hackathon", year: "2025", text: "Cleared the internal pre-qualifier round of SIH 2025." },
    ...certifications.map(([name, org, year]) => ({ role: name, place: org, year, text: "Certification" })),
  ];
  return (
    <section id="certifications" className="career wrap">
      <Reveal><h2 className="big-title">MY JOURNEY<br /><span>& CERTIFICATIONS</span></h2></Reveal>
      <div className="timeline">
        <div className="timeline-line" aria-hidden="true" />
        {items.map((it, i) => (
          <Reveal key={it.role} className="t-item" delay={i * 0.05}>
            <div><h4>{it.role}</h4><h5>{it.place}</h5></div>
            <strong>{it.year}</strong>
            <p>{it.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Work() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section id="projects" className="work wrap">
      <Reveal><h2 className="big-title">MY <span>WORK</span></h2></Reveal>
      <div className="work-grid">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <article className="work-card">
              <span className="work-num">{p.number}</span>
              <h3>{p.title}</h3>
              <p className="work-kicker">{p.kicker}</p>
              <p>{p.description}</p>
              <div className="do-tags">{p.technologies.map((t) => <span key={t}>{t}</span>)}</div>
              {open === p.title && (
                <dl className="work-detail">
                  <dt>Problem</dt><dd>{p.problem}</dd>
                  <dt>Solution</dt><dd>{p.solution}</dd>
                  <dt>Build</dt><dd>{p.implementation}</dd>
                  <dt>Result</dt><dd>{p.results}</dd>
                </dl>
              )}
              <div className="work-actions">
                <button onClick={() => setOpen(open === p.title ? null : p.title)}>{open === p.title ? "Hide details" : "Case study"}</button>
                <a href={p.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  type FormErrors = { name?: string; email?: string; message?: string };
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const next: FormErrors = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Please enter a valid email.";
    if (!message) {
      next.message = "Please enter a message.";
    } else if (message.length < 10) {
      next.message = "Please add at least 10 characters.";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      window.open(GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <section id="contact" className="contact wrap">
      <Reveal><h2 className="big-title">LET'S <span>CONNECT</span></h2></Reveal>
      <div className="contact-grid">
        <Reveal className="contact-info">
          <h4>Email</h4><a href="mailto:sushantchaturvedi537@gmail.com">sushantchaturvedi537@gmail.com</a>
          <h4>Phone</h4><a href="tel:+918004169783">+91 80041 69783</a>
          <h4>Social</h4>
          <a href="https://github.com/Sushanty6767" target="_blank" rel="noreferrer">GitHub <ArrowUpRight /></a>
          <a href="https://linkedin.com/in/sushantch" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>
        </Reveal>
        <Reveal delay={0.1}>
          <form className="contact-form" onSubmit={submit} noValidate>
            <label>Name<input name="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
            <label>Email<input name="email" type="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
            <label>Message<textarea name="message" rows={4} placeholder="Tell me about your idea" aria-invalid={Boolean(errors.message)} />{errors.message && <small>{errors.message}</small>}</label>
            {submitted && <p style={{ color: "var(--primary)", fontSize: "0.85rem", margin: 0 }}>Please complete the contact form to send your message.</p>}
            <button type="submit" className="send">Send message <ArrowUpRight /></button>
          </form>
        </Reveal>
      </div>
      <footer className="foot">Designed & built by <span>Sushant Chaturvedi</span> · 2026</footer>
    </section>
  );
}

export function Portfolio() {
  return (
    <main className="portfolio">
      <Nav />
      <Socials />
      <Hero />
      <About />
      <WhatIDo />
      <Career />
      <Work />
      <Contact />
    </main>
  );
}
