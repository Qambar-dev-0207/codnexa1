import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Codnexa | Strategy, Design & Development Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0b0f17',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(27, 146, 154, 0.25) 0%, rgba(11, 15, 23, 0) 50%), radial-gradient(circle at 20% 80%, rgba(22, 90, 139, 0.25) 0%, rgba(11, 15, 23, 0) 50%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            <span style={{ color: '#165a8b' }}>COD</span>
            <span style={{ color: '#1b929a' }}>NEXA</span>
          </div>
          <div
            style={{
              width: '1px',
              height: '24px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <div
            style={{
              fontSize: '16px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#8b9bb4',
            }}
          >
            Studio
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '900px' }}>
          <div
            style={{
              fontSize: '54px',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            Strategy, Design & Development Studio
          </div>
          <div
            style={{
              fontSize: '24px',
              lineHeight: 1.5,
              color: '#94a3b8',
              fontWeight: 400,
            }}
          >
            We build high-fidelity digital platforms, brand identities, and software services for ambitious brands.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '32px',
          }}
        >
          <div style={{ fontSize: '18px', color: '#1b929a', fontWeight: 600, letterSpacing: '0.05em' }}>
            https://codnexa.com
          </div>
          <div style={{ fontSize: '16px', color: '#64748b' }}>
            High-Fidelity Engineering
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
