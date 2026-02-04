"use client";

import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const FRAME_COUNT = 192;

export default function HVACScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Scroll progress for the entire 500vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 20,
        restDelta: 0.001,
    });

    // Map progress (0-1) to frame index (0-191)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            // Pre-allocate array
            const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
            let loadedCount = 0;

            // Load in batches to avoid choking the network/CPU
            const BATCH_SIZE = 10;

            for (let i = 0; i < FRAME_COUNT; i += BATCH_SIZE) {
                const batchPromises = [];
                for (let j = i; j < Math.min(i + BATCH_SIZE, FRAME_COUNT); j++) {
                    const promise = new Promise<void>((resolve) => {
                        const img = new Image();
                        img.src = `/sequence/frame_${j}.jpg`;
                        img.onload = async () => {
                            try {
                                // Critical: Decode before using to prevent jank on first draw
                                await img.decode();
                            } catch (e) {
                                // Ignore decode errors
                            }
                            loadedImages[j] = img;
                            loadedCount++;
                            setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
                            resolve();
                        };
                        img.onerror = () => {
                            loadedCount++; // Count error as done to not block
                            resolve();
                        };
                    });
                    batchPromises.push(promise);
                }
                await Promise.all(batchPromises);
            }

            setImages(loadedImages);
            setIsLoading(false);
        };

        loadImages();
    }, []);

    // Animation Loop
    useEffect(() => {
        if (!canvasRef.current || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: alpha false
        if (!ctx) return;

        // Handle High-DPI (Retina)
        const dpr = window.devicePixelRatio || 1;
        // Internal resolution
        canvas.width = 1920;
        canvas.height = 1080;

        const render = () => {
            const index = Math.round(frameIndex.get());
            const clampedIndex = Math.min(Math.max(index, 0), FRAME_COUNT - 1);
            const img = images[clampedIndex];

            if (img && img.complete && img.naturalHeight !== 0) {
                // Clear and draw
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw image contained/centered
                // Simple approach: draw full canvas for now
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            } else {
                // Fallback if image missing (for placeholder mode)
                ctx.fillStyle = "#111";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.font = "40px sans-serif";
                ctx.fillStyle = "#333";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`FRAME ${clampedIndex}`, canvas.width / 2, canvas.height / 2);
            }

            requestAnimationFrame(render);
        };

        const unsubscribe = frameIndex.on("change", () => {
            // The render loop is running via RAF, but we could optimize to only render on change
            // For now, let's just let RAF handle it for smoothness
        });

        // Start loop
        const rafId = requestAnimationFrame(render);

        return () => {
            unsubscribe();
            cancelAnimationFrame(rafId);
        };
    }, [images, frameIndex, isLoading]);

    // Opacity transforms for overlays
    const opacityBeatA = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacityBeatB = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]);
    const opacityBeatC = useTransform(scrollYProgress, [0.45, 0.55, 0.7], [0, 1, 0]);
    const opacityBeatD = useTransform(scrollYProgress, [0.7, 0.8, 0.95], [0, 1, 0]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0A] text-white">
                <h2 className="text-2xl font-bold tracking-widest mb-4">SYSTEM INITIALIZING...</h2>
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#00A3FF] transition-all duration-100 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
                <p className="mt-2 text-xs text-white/40 font-mono">{loadingProgress}%</p>
            </div>
        )
    }

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-[#0A0A0A]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Canvas Layer */}
                <canvas
                    ref={canvasRef}
                    className="max-w-full max-h-screen object-contain"
                    style={{ width: "100%", height: "100%" }}
                />

                {/* Text Overlays Layer */}
                <div className="absolute inset-0 pointer-events-none">

                    {/* Beat A: The Hook */}
                    <motion.div style={{ opacity: opacityBeatA }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter sm:text-9xl mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                            ATMOSPHERE.<br />ENGINEERED.
                        </h1>
                        <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide">
                            Precision climate control for modern living.
                        </p>
                    </motion.div>

                    {/* Beat B: Efficiency */}
                    <motion.div style={{ opacity: opacityBeatB }} className="absolute inset-0 flex items-center px-4 md:px-20">
                        <div className="max-w-xl text-left">
                            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-[#00A3FF]">
                                MAXIMUM<br />EFFICIENCY.
                            </h2>
                            <p className="text-xl text-white/80">
                                Inverter technology that slashes energy costs by 40%.
                                Silent operation. Pure comfort.
                            </p>
                        </div>
                    </motion.div>

                    {/* Beat C: Deployment */}
                    <motion.div style={{ opacity: opacityBeatC }} className="absolute inset-0 flex items-center justify-end px-4 md:px-20">
                        <div className="max-w-xl text-right">
                            <h2 className="text-5xl md:text-7xl font-bold mb-4 text-white">
                                RAPID<br />DEPLOYMENT.
                            </h2>
                            <p className="text-xl text-white/80">
                                24-hour installation. White-glove service. <br />
                                Zero mess. Zero downtime.
                            </p>
                        </div>
                    </motion.div>

                    {/* Beat D: Closing */}
                    <motion.div style={{ opacity: opacityBeatD }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
                            STAY COMFORTABLE.
                        </h2>
                        <div className="px-6 py-3 border border-white/20 rounded-full backdrop-blur-md bg-white/5">
                            <span className="text-white/80 uppercase tracking-widest text-sm">Book your system tune-up today</span>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
