export default function AntiGravityBackground() {
    return (
        <div className="anti-gravity-container" style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>

            {/* Ambient Background Glows */}
            <div className="ambient-orbs" style={{ position: 'absolute', inset: 0, opacity: 0.05, pointerEvents: 'none' }}>
                <div style={{ position: 'absolute', top: '15%', left: '5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, var(--primary-glow) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: '5%', right: '5%', width: '35vw', height: '35vw', background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
            </div>
        </div>
    )
}

