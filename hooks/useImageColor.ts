import { useState, useEffect } from 'react';

export const useImageColor = (imageUrl: string, fallbackColor: string = '#FFFFFF') => {
    const [color, setColor] = useState<string>(fallbackColor);

    useEffect(() => {
        if (!imageUrl) return;

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Resize for faster processing
            canvas.width = 50;
            canvas.height = 50;

            ctx.drawImage(img, 0, 0, 50, 50);

            try {
                const imageData = ctx.getImageData(0, 0, 50, 50);
                const data = imageData.data;
                const colorCounts: { [key: string]: number } = {};
                let maxCount = 0;
                let dominantColor = fallbackColor;

                // Simple quantization: round to nearest 32 to group similar colors
                const quantization = 32;

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const a = data[i + 3];

                    // Skip transparent pixels
                    if (a < 128) continue;

                    // Skip very dark or very white pixels to avoid boring colors
                    if ((r < 20 && g < 20 && b < 20) || (r > 240 && g > 240 && b > 240)) continue;

                    const rQ = Math.floor(r / quantization) * quantization;
                    const gQ = Math.floor(g / quantization) * quantization;
                    const bQ = Math.floor(b / quantization) * quantization;

                    const key = `${rQ},${gQ},${bQ}`;
                    colorCounts[key] = (colorCounts[key] || 0) + 1;

                    if (colorCounts[key] > maxCount) {
                        maxCount = colorCounts[key];
                        dominantColor = `rgb(${rQ + 16}, ${gQ + 16}, ${bQ + 16})`; // Add offset to center of bucket
                    }
                }

                // If we didn't find a dominant color (e.g. all black/white), default to fallback
                if (maxCount === 0) {
                    // Try simple average if no specific color stood out (rare)
                    setColor(fallbackColor);
                } else {
                    setColor(dominantColor);
                }

            } catch (e) {
                // Caused by CORS issues usually
                console.warn('Unable to extract color from image:', e);
                setColor(fallbackColor);
            }
        };

        img.onerror = () => {
            setColor(fallbackColor);
        }

    }, [imageUrl, fallbackColor]);

    return color;
};
