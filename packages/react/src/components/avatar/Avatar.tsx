import { forwardRef, useState, type ImgHTMLAttributes } from 'react';
import { cx, type Size } from '../../shared';
import './avatar.css';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'> {
  fallback?: string;
  size?: Size;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt = '', fallback, size = 'md', className, onError, ...props },
  ref,
) {
  const [hasError, setHasError] = useState(false);
  const showImage = Boolean(src) && !hasError;

  return (
    <span ref={ref} className={cx('z-avatar', className)} data-size={size}>
      {showImage ? (
        <img
          className="z-avatar__image"
          src={src}
          alt={alt}
          onError={(event) => {
            setHasError(true);
            onError?.(event);
          }}
          {...props}
        />
      ) : (
        <span
          className="z-avatar__fallback"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
        >
          {fallback}
        </span>
      )}
    </span>
  );
});

Avatar.displayName = 'Avatar';
