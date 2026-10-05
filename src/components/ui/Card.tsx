import { useId, type ReactNode } from 'react';
import { cx } from './cx';

interface CardProps {
  title: string;
  description?: ReactNode;
  /** Shown at the right of the title, for example a request status. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Card({ title, description, aside, className, children }: CardProps) {
  const id = useId();
  return (
    <section className={cx('card', className)} aria-labelledby={id}>
      <div className="card-header">
        <h2 id={id} className="card-title">
          {title}
        </h2>
        {aside}
      </div>
      {description && <div className="card-description">{description}</div>}
      {children}
    </section>
  );
}
