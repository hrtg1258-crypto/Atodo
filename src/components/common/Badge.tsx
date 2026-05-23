import styles from './Badge.module.css';

interface BadgeProps {
  color?: string;
  bgColor?: string;
  children: React.ReactNode;
}

export function Badge({ color, bgColor, children }: BadgeProps) {
  return (
    <span
      className={styles.badge}
      style={{
        color: color ? `var(--${color})` : undefined,
        backgroundColor: bgColor ? `var(--${bgColor})` : undefined,
      }}
    >
      {children}
    </span>
  );
}
