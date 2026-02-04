export default function Footer() {
    return (
        <footer className="relative bg-[#0A0A0A] pt-20 pb-10 px-6 border-t border-white/10">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">

                <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 text-white selection:bg-[#00A3FF] selection:text-white">
                    READY FOR A<br />TUNE-UP?
                </h2>

                <button className="group relative px-10 py-5 bg-white text-black text-lg font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95">
                    <span className="relative z-10 transition-colors group-hover:text-white">BOOK NOW</span>
                    <div className="absolute inset-0 bg-[#00A3FF] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                </button>

                <div className="mt-32 w-full flex flex-col md:flex-row justify-between items-center text-xs text-white/40 uppercase tracking-widest gap-4">
                    <p>© 2024 Apex Climate Systems</p>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
