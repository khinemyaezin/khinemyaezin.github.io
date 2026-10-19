export default function TextReveal({ text, isVisible }: { text: string; isVisible: boolean }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
            transitionDelay: isVisible ? `${(i + 1) * 50}ms` : '0ms',
          }}
        >
          {char}
        </span>
      ))}
    </>
  );
}
