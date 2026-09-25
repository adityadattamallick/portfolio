import styles from "./Entry.module.css";

export function Entry({
  title,
  subtitle,
  period,
  badge,
  label,
  summary,
  points,
  tags,
  link,
}: {
  title: string;
  subtitle: string;
  period?: string;
  badge?: string;
  label?: string;
  summary?: string;
  points?: string[];
  tags?: string[];
  link?: { label: string; href: string };
}) {
  return (
    <article className={styles.entry}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {period && <p className={styles.period}>{period}</p>}
      </div>
      <p className={styles.subtitle}>
        {subtitle}
        {label && <span className={styles.label}>{label}</span>}
        {badge && <span className={styles.badge}>{badge}</span>}
      </p>
      {summary && <p className={styles.summary}>{summary}</p>}
      {points && points.length > 0 && (
        <ul className={styles.points}>
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
      {(tags?.length || link) && (
        <div className={styles.footer}>
          {tags && (
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
          {link && (
            <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {link.label} ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
