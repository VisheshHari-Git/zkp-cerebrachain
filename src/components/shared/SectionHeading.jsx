export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${align === 'left' ? '' : 'mx-auto'} ${alignClass}`}>
      {eyebrow && (
        <span className="font-data text-xs tracking-[0.2em] uppercase text-signal/80">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold text-ink">{title}</h2>
      {description && <p className="text-mist text-base leading-relaxed">{description}</p>}
    </div>
  )
}
