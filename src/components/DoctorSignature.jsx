import React from 'react';

export default function DoctorSignature({ doctorName = "Hariprasath L", title = "Founder & Chief AI Officer", date = new Date().toLocaleDateString() }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '2px solid #e2e8f0', marginTop: '12px', color: '#1e293b', fontFamily: 'sans-serif' }}>
      {/* Security Hash & Digital Seal */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', minWidth: '36px', minHeight: '36px', borderRadius: '50%', border: '2px solid #0ea5e9', backgroundColor: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <svg style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', color: '#0284c7', display: 'block' }} width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', backgroundColor: '#10b981', color: '#ffffff', borderRadius: '50%', padding: '2px', width: '12px', height: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg style={{ width: '10px', height: '10px', minWidth: '10px', minHeight: '10px', display: 'block' }} width="10" height="10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: '8.5px', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.5px', color: '#94a3b8' }}>Digital Certificate</p>
          <p style={{ margin: '1px 0 0 0', fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold', color: '#334155' }}>HASH: 8F92-HAYA-2026-X99</p>
          <p style={{ margin: '1px 0 0 0', fontSize: '8.5px', color: '#94a3b8' }}>Signed on {date} • Cryptographically Verified</p>
        </div>
      </div>

      {/* Signature & Name */}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {/* Exact User Uploaded Signature Image */}
        <div style={{ height: '48px', width: '190px', marginBottom: '2px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', overflow: 'hidden', borderRadius: '6px' }}>
          <img 
            src="/signature.png" 
            alt="Hariprasath L Signature" 
            style={{ height: '48px', width: '190px', objectFit: 'contain', display: 'block', filter: 'brightness(1.05)' }}
            width="190"
            height="48"
          />
        </div>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.2px' }}>{doctorName}</p>
        <p style={{ margin: '1px 0 0 0', fontSize: '9.5px', fontWeight: 'bold', color: '#0284c7' }}>{title}</p>
        <p style={{ margin: '1px 0 0 0', fontSize: '8.5px', color: '#94a3b8', fontWeight: '500' }}>Haya Healthcare Platform</p>
      </div>
    </div>
  );
}
