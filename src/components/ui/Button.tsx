import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from './cx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Primary is reserved for the one main action on the page: Submit. */
  variant?: 'primary' | 'secondary' | 'link';
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', iconBefore, iconAfter, className, children, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cx('btn', `btn--${variant}`, className)} {...rest}>
      {iconBefore}
      <span>{children}</span>
      {iconAfter}
    </button>
  );
});
