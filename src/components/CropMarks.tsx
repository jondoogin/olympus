/** Registration / crop marks at the four corners of the nearest positioned parent. */
export function CropMarks({ className }: { className?: string }) {
  return (
    <span className={`cropmarks ${className ?? ''}`} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}
