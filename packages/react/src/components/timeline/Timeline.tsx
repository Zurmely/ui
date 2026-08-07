import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../shared';
import './timeline.css';

export type TimelineOrientation = 'horizontal' | 'vertical';

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  orientation?: TimelineOrientation;
  children: ReactNode;
}

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { orientation = 'vertical', className, children, ...props },
  ref,
) {
  return (
    <ol
      ref={ref}
      className={cx('z-timeline', className)}
      data-orientation={orientation}
      {...props}
    >
      {children}
    </ol>
  );
});
Timeline.displayName = 'Timeline';

export interface TimelineItemProps extends Omit<LiHTMLAttributes<HTMLLIElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  date?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
}

export const TimelineItem = forwardRef<HTMLLIElement, TimelineItemProps>(function TimelineItem(
  { title, description, date, icon, className, children, ...props },
  ref,
) {
  const body = children ?? description;

  return (
    <li ref={ref} className={cx('z-timeline__item', className)} {...props}>
      <div className="z-timeline__rail" aria-hidden="true">
        <div className="z-timeline__indicator">{icon ?? <span className="z-timeline__dot" />}</div>
        <div className="z-timeline__connector" />
      </div>
      <div className="z-timeline__content">
        {date ? <div className="z-timeline__date">{date}</div> : null}
        {title ? <div className="z-timeline__title">{title}</div> : null}
        {body ? <div className="z-timeline__description">{body}</div> : null}
      </div>
    </li>
  );
});
TimelineItem.displayName = 'TimelineItem';
