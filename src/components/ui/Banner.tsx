import { forwardRef, type ReactNode } from 'react';
import { cx } from './cx';
import { Alert, Check, Clock, Info, Lock } from './Icons';

export type BannerTone = 'info' | 'success' | 'waiting' | 'error' | 'locked';

const ICONS: Record<BannerTone, ReactNode> = {
  info: <Info />,
  success: <Check />,
  waiting: <Clock />,
  error: <Alert />,
  locked: <Lock />,
};

interface BannerProps {
  tone: BannerTone;
  children: ReactNode;
  role?: 'status' | 'alert';
  className?: string;
  /** Lets code move focus here, for example after submitting. */
  focusable?: boolean;
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { tone, children, role, className, focusable },
  ref,
) {
  return (
    <div ref={ref} className={cx('banner', `banner--${tone}`, className)} role={role} tabIndex={focusable ? -1 : undefined}>
      <span className="banner-icon">{ICONS[tone]}</span>
      <div className="banner-body">{children}</div>
    </div>
  );
});
