
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="mt-24 overflow-hidden relative">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 md:py-12 lg:py-16 relative z-10">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse transition-opacity hover:opacity-80">
                            <Image
                                src="/prashan_logo.svg"
                                alt="Prashan Logo"
                                width={32}
                                height={32}
                                className="invert dark:invert-0"
                            />
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-foreground tracking-tight">
                                Prashan
                            </span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        {/* <div>
                            <h2 className="mb-6 text-sm font-semibold text-foreground uppercase">Resources</h2>
                            <ul className="text-foreground/70 font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:text-foreground transition-colors">Documentation</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">Templates</Link>
                                </li>
                            </ul>
                        </div> */}
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-foreground uppercase">Follow us</h2>
                            <ul className="text-foreground/70 font-medium">
                                <li className="mb-4">
                                    <Link href="https://github.com/PrashanAI" className="hover:text-foreground transition-colors">Github</Link>
                                </li>
                                <li>
                                    <Link href="https://x.com/Prashan364660" className="hover:text-foreground transition-colors">Twitter</Link>
                                </li>
                            </ul>
                        </div>
                        {/* <div>
                            <h2 className="mb-6 text-sm font-semibold text-foreground uppercase">Legal</h2>
                            <ul className="text-foreground/70 font-medium">
                                <li className="mb-4">
                                    <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:text-foreground transition-colors">Terms &amp; Conditions</Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
                <hr className="my-6 border-black/5 dark:border-white/5 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-foreground/60 sm:text-center">
                        © {new Date().getFullYear()}{" "}
                        <Link href="/" className="hover:text-foreground transition-colors">
                            Prashan
                        </Link>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-3 text-foreground/60">
                        <Link
                            href="https://github.com/PrashanAI"
                            className="btn-glass btn-glass-icon"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                            href="https://x.com/Prashan364660"
                            className="btn-glass btn-glass-icon"
                            aria-label="Twitter / X"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                            </svg>
                            <span className="sr-only">Twitter</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Big Background Name */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none -mb-6 md:-mb-10 lg:-mb-16 select-none opacity-[0.03] dark:opacity-[0.05]">
                <span className="text-[12vw] leading-none font-bold text-black dark:text-white uppercase tracking-tighter">
                    Prashan
                </span>
            </div>
        </footer>
    );
}
