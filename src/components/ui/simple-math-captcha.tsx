// src/components/ui/simple-math-captcha.tsx
'use client';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface SimpleMathCaptchaProps {
    onVerify: (ok: boolean) => void;
}

export interface SimpleMathCaptchaRef {
    reset: () => void;
}

const SimpleMathCaptcha = forwardRef<SimpleMathCaptchaRef, SimpleMathCaptchaProps>(
    ({ onVerify }, ref) => {
        const [a, setA] = useState(0);
        const [b, setB] = useState(0);
        const [answer, setAnswer] = useState('');
        const [verified, setVerified] = useState(false);

        const generate = () => {
            const x = Math.floor(Math.random() * 9) + 1;
            const y = Math.floor(Math.random() * 9) + 1;
            setA(x);
            setB(y);
            setAnswer('');
            setVerified(false);
            onVerify(false);
        };

        useEffect(() => {
            generate();
        }, []);

        const check = () => {
            const ok = a + b === Number(answer);
            setVerified(ok);
            onVerify(ok);
        };

        // Expose reset method
        useImperativeHandle(ref, () => ({
            reset: generate,
        }));

        return (
            <div className="flex items-center gap-2 text-base">
                <span className="font-medium">{a} + {b} =</span>
                <input
                    type="text"
                    value={answer}
                    onChange={e => setAnswer(e.target.value.replace(/\D/g, ''))}
                    onBlur={check}
                    placeholder="?"
                    className="w-12 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[var(--link-color)]"
                    style={{ borderColor: 'var(--border-color)' }}
                    disabled={verified}
                />
                {verified ? (
                    <span className="text-green-600">✓</span>
                ) : (
                    <button type="button" onClick={generate} className="text-base font-bold hover:text-green-600">
                        Verify
                    </button>
                )}
            </div>
        );
    }
);

SimpleMathCaptcha.displayName = 'SimpleMathCaptcha';
export default SimpleMathCaptcha;