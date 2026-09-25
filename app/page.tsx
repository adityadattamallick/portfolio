import { Header } from "@/components/Header";
import { Section } from "@/components/Section";
import { Entry } from "@/components/Entry";
import { EmailLink } from "@/components/EmailLink";
import {
  profile,
  experience,
  research,
  projects,
  skills,
  education,
} from "@/data/profile";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top" className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.name}>{profile.name}</h1>
          <p className={styles.headline}>{profile.headline}</p>
          <p className={styles.intro}>{profile.intro}</p>
          <div className={styles.actions}>
            <EmailLink className={styles.primary}>Get in touch</EmailLink>
            {profile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondary}
              >
                {link.label}
              </a>
            ))}
          </div>
        </section>

        <Section id="experience" title="Experience">
          {experience.map((item) => (
            <Entry
              key={`${item.role}-${item.start}`}
              title={item.role}
              subtitle={item.organisation}
              period={`${item.start} – ${item.end}`}
              badge={item.status}
              summary={item.summary}
              points={item.points}
            />
          ))}
        </Section>

        <Section id="research" title="Research">
          {research.map((item) => (
            <Entry
              key={item.title}
              title={item.title}
              subtitle={item.context}
              period={item.period}
              label={item.authorship}
              summary={item.summary}
              points={item.points}
              tags={item.tags}
              link={item.link}
            />
          ))}
        </Section>

        <Section id="projects" title="Projects">
          {projects.map((item) => (
            <Entry
              key={item.title}
              title={item.title}
              subtitle={item.context}
              period={item.period}
              label={item.authorship}
              summary={item.summary}
              points={item.points}
              tags={item.tags}
              link={item.link}
            />
          ))}
        </Section>

        <Section id="skills" title="Skills">
          <dl className={styles.skills}>
            {skills.map((group) => (
              <div key={group.group} className={styles.skillRow}>
                <dt>{group.group}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="education" title="Education">
          <Entry
            title={education.degree}
            subtitle={education.institution}
            summary={`Relevant coursework: ${education.coursework.join(", ")}.`}
          />
        </Section>

        <Section id="contact" title="Contact">
          <div className={styles.contact}>
            <p>
              I&apos;m open to research collaborations and engineering roles.
              The best way to reach me is by email.
            </p>
            <EmailLink className={styles.email}>Email me</EmailLink>
            <ul className={styles.contactLinks}>
              {profile.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
