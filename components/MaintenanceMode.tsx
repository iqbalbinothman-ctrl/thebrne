import React, { useState, useEffect } from 'react';

const MaintenanceMode: React.FC = () => {
    // Calculate end time: current time + 32 hours
    const getEndTime = () => {
        const stored = localStorage.getItem('maintenanceEndTime');
        if (stored) {
            return parseInt(stored);
        }
        const endTime = Date.now() + (32 * 60 * 60 * 1000); // 32 hours in milliseconds
        localStorage.setItem('maintenanceEndTime', endTime.toString());
        return endTime;
    };

    const [timeLeft, setTimeLeft] = useState(() => {
        const endTime = getEndTime();
        return Math.max(0, endTime - Date.now());
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const endTime = getEndTime();
            const remaining = Math.max(0, endTime - Date.now());
            setTimeLeft(remaining);

            // Auto-hide when countdown reaches 0
            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Don't show if countdown finished
    if (timeLeft === 0) {
        return null;
    }

    // Calculate hours, minutes, seconds
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Blurred Background */}
            <div className="absolute inset-0 backdrop-blur-xl bg-black/30" />

            {/* Maintenance Popup */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-12 max-w-lg mx-4 text-center">
                <div className="mb-6">
                    <h1 className="text-4xl font-black uppercase tracking-wider mb-2">THEBRNE</h1>
                    <div className="w-20 h-1 bg-black mx-auto" />
                </div>

                <h2 className="text-2xl font-bold mb-4 text-gray-800">Under Maintenance</h2>
                <p className="text-gray-600 mb-8">We're upgrading our systems. Check back soon!</p>

                {/* Countdown Timer */}
                <div className="flex justify-center gap-6 mb-8">
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-black text-black bg-gray-100 rounded-lg px-6 py-4 min-w-[100px]">
                            {String(hours).padStart(2, '0')}
                        </div>
                        <span className="text-xs uppercase font-bold text-gray-500 mt-2 tracking-wider">Hours</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-4xl font-bold text-gray-400">:</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-black text-black bg-gray-100 rounded-lg px-6 py-4 min-w-[100px]">
                            {String(minutes).padStart(2, '0')}
                        </div>
                        <span className="text-xs uppercase font-bold text-gray-500 mt-2 tracking-wider">Minutes</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-4xl font-bold text-gray-400">:</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-black text-black bg-gray-100 rounded-lg px-6 py-4 min-w-[100px]">
                            {String(seconds).padStart(2, '0')}
                        </div>
                        <span className="text-xs uppercase font-bold text-gray-500 mt-2 tracking-wider">Seconds</span>
                    </div>
                </div>

                <p className="text-sm text-gray-400">
                    For urgent inquiries, contact us at{' '}
                    <a href="mailto:hello@thebrne.com" className="text-black font-bold underline">
                        hello@thebrne.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default MaintenanceMode;
