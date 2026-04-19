import React from 'react';

export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <div className="supabase-loading">
            <div className="supabase-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring spinner-ring-2"></div>
                <div className="spinner-core"></div>
            </div>
            <p className="spinner-message">{message}</p>
            <style>{`
                .supabase-loading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 2rem;
                    gap: 1.5rem;
                }
                .supabase-spinner {
                    position: relative;
                    width: 60px;
                    height: 60px;
                }
                .spinner-ring {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    border: 3px solid transparent;
                    border-top-color: #d4a843;
                    animation: spinRing 1s linear infinite;
                }
                .spinner-ring-2 {
                    inset: 8px;
                    border-top-color: #a08030;
                    animation-duration: 0.7s;
                    animation-direction: reverse;
                }
                .spinner-core {
                    position: absolute;
                    inset: 18px;
                    border-radius: 50%;
                    background: radial-gradient(circle, #d4a843, #a08030);
                    animation: pulse 1s ease-in-out infinite alternate;
                }
                @keyframes spinRing {
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    from { opacity: 0.4; transform: scale(0.8); }
                    to   { opacity: 1;   transform: scale(1.1); }
                }
                .spinner-message {
                    color: #888;
                    font-size: 0.9rem;
                    letter-spacing: 0.05em;
                    font-style: italic;
                }
            `}</style>
        </div>
    );
}
