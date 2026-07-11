type FloatingPetalsProps = {
  reducedMotion?: boolean;
};

export function FloatingPetals({ reducedMotion = false }: FloatingPetalsProps) {
  if (reducedMotion) return null;

  return (
    <div className="floating-petals" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} className="petal" style={{ ["--x" as never]: `${(index * 11) % 100}%`, ["--delay" as never]: `${index * 0.4}s` }} />
      ))}
    </div>
  );
}
