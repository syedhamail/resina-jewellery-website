import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-6 sm:py-8">
            <div className="container mx-auto px-4 sm:px-5 flex flex-col md:flex-row justify-between items-center">
                {/* Contact Information */}
                <div className="mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">
                    <h3 className="text-lg font-semibold text-indigo-400 mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                        Contact Us
                    </h3>
                    <p className="mb-1 text-sm sm:text-base">Sherabad Colony, Sector 36 A, Landhi Town, Karachi, Pakistan</p>
                    <p className="mb-1">
                        <a href="mailto:hamailsyed139@gmail.com" className="text-indigo-300 hover:text-indigo-100 transition-colors text-sm sm:text-base">
                            hamailsyed139@gmail.com
                        </a>
                    </p>
                    <p>
                        <a href="tel:+923363351905" className="text-indigo-300 hover:text-indigo-100 transition-colors text-sm sm:text-base">
                            +92 336 3351905
                        </a>
                    </p>
                </div>

                {/* Social Links and Copyright */}
                <div className="text-center w-full md:w-auto">
                    <div className="mb-3 sm:mb-4 flex justify-center md:justify-end">
                        <a 
                            href="https://www.instagram.com/syedhamail1234/?igsh=c2c4dDR0Y3JjM2Rp" 
                            className="text-indigo-300 hover:text-indigo-100 mx-2 transition-colors inline-block"
                            aria-label="Instagram"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.307.975.975 1.245 2.242 1.307 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.307 3.608-.975.975-2.242 1.245-3.608 1.307-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.307-.975-.975-1.245-2.242-1.307-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.307-3.608.975-.975 2.242-1.245 3.608-1.307 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.947.072-1.254.057-2.417.276-3.294.653-1.187.503-2.162 1.478-2.665 2.665-.377.877-.596 2.04-.653 3.294-.058 1.277-.072 1.688-.072 4.947s.014 3.67.072 4.947c.057 1.254.276 2.417.653 3.294.503 1.187 1.478 2.162 2.665 2.665.877.377 2.04.596 3.294.653 1.277.058 1.688.072 4.947.072s3.67-.014 4.947-.072c1.254-.057 2.417-.276 3.294-.653 1.187-.503 2.162-1.478 2.665-2.665.377-.877.596-2.04.653-3.294.058-1.277.072-1.688.072-4.947s-.014-3.67-.072-4.947c-.057-1.254-.276-2.417-.653-3.294-.503-1.187-1.478-2.162-2.665-2.665-.877-.377-2.04-.596-3.294-.653-1.277-.058-1.688-.072-4.947-.072z" />
                                <path d="M12 7.378c-2.552 0-4.622 2.07-4.622 4.622S9.448 16.622 12 16.622s4.622-2.07 4.622-4.622S14.552 7.378 12 7.378zm0 7.378c-1.661 0-3-1.343-3-3s1.339-3 3-3 3 1.343 3 3-1.339 3-3 3z" />
                                <path d="M17.25 6.75a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0z" />
                            </svg>
                        </a>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-400">
                        &copy; {new Date().getFullYear()} Resina Jewellery. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}