'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImageBlock({
  src,
  alt,
  caption,
  width = 800,
  height = 500,
  className,
}: ImageBlockProps) {
  return (
    <figure className={cn('my-8', className)}>
      <div className="relative rounded-xl overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-800">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-center text-secondary-600 dark:text-secondary-400 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
