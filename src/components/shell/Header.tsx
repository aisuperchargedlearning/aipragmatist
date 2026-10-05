import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { strings } from '../../content/strings';
import type { User } from '../../domain/types';
import { ChevronDown } from '../ui/Icons';

interface HeaderProps {
  user?: User | null;
  onResetDemo?: () => void;
  onSignOut?: () => void;
}

export function Header({ user, onResetDemo, onSignOut }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const items = () => Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]') ?? []);

  useEffect(() => {
    if (!open) return;
    items()[0]?.focus();
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [open]);

  const close = (returnFocus = true) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  };

  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLButtonElement);
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      list[(index + 1) % list.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      list[(index - 1 + list.length) % list.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      list[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      list[list.length - 1]?.focus();
    } else if (e.key === 'Tab') {
      close(false);
    }
  };

  const choose = (action?: () => void) => {
    close();
    action?.();
  };

  return (
    <header className="app-header">
      {user && (
        <button
          type="button"
          className="skip-link"
          onClick={() => document.getElementById('main')?.focus()}
        >
          {strings.skipToForm}
        </button>
      )}
      <div className="brand">
        <span className="wordmark">{strings.wordmark}</span>
        <span className="header-title">{strings.appName}</span>
      </div>

      {user && (
        <div className="account" ref={wrapRef}>
          <button
            ref={buttonRef}
            type="button"
            className="avatar-button"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls="account-menu"
            aria-label={strings.header.accountMenu(user.name)}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="avatar" aria-hidden="true">
              {user.initials}
            </span>
            <ChevronDown size={20} />
          </button>
          {open && (
            <ul id="account-menu" ref={menuRef} role="menu" className="menu" aria-label={user.name} onKeyDown={onMenuKeyDown}>
              <li role="none">
                <button type="button" role="menuitem" tabIndex={-1} onClick={() => choose(onResetDemo)}>
                  {strings.header.resetDemo}
                </button>
              </li>
              <li role="none">
                <button type="button" role="menuitem" tabIndex={-1} onClick={() => choose(onSignOut)}>
                  {strings.header.signOut}
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </header>
  );
}
