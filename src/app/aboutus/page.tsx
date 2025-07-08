"use client";
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Image from 'next/image';

export default function AboutSection() {
    return (
        <main className='bg-[#FAF3EB]'>
            {/* Header Component */}
            <Header />

            {/* About Us Section */}
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-16 mx-auto">
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Image Section - Full width on mobile/tablet, half on desktop */}
                        <div className="w-full lg:w-1/2 lg:h-[700px] mb-8 lg:mb-0 lg:pr-8">
                            <div className="relative aspect-square w-full">
                                <Image
                                    alt="Resina Jewellery Craftsmanship"
                                    className="object-cover object-center rounded-lg"
                                    src="/girl-wearing-earring-img2.png"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Content Section - Full width on mobile/tablet, half on desktop */}
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">About Us</h1>
                            
                            <p className="mb-6 text-sm md:text-base">
                                Resina Jewellery, launched in mid-2025, is a modern handmade jewellery brand based in Pakistan. We specialize in crafting elegant, resin-based accessories that celebrate individuality, creativity, and timeless style.
                            </p>

                            {/* Mobile/Tablet Accordion - Shows on screens smaller than lg (1024px) */}
                            <div className="lg:hidden space-y-4">
                                {/* What Makes Us Special */}
                                <details className="border-b border-gray-200 pb-4">
                                    <summary className="text-lg md:text-xl font-semibold text-gray-900 cursor-pointer list-none">
                                        ✨ What Makes Us Special?
                                    </summary>
                                    <ul className="list-disc list-inside mt-2 space-y-2 text-sm md:text-base">
                                        <li className="mb-2">
                                            <strong>Handmade with Love</strong>
                                            <br />Every piece is thoughtfully hand-poured using premium resin, delicate inclusions, and artistic details—making each item truly unique.
                                        </li>
                                        <li className="mb-2">
                                            <strong>Elegant & Unique Designs</strong>
                                            <br />Our designs are inspired by nature, art, and modern aesthetics—blending soft colors and bold forms to help you express your style effortlessly.
                                        </li>
                                        <li>
                                            <strong>Limited Edition Collections</strong>
                                            <br />We don{`'`}t mass-produce. Each piece is part of a limited collection—crafted to be as special as the person wearing it.
                                        </li>
                                    </ul>
                                </details>

                                {/* Core Values */}
                                <details className="border-b border-gray-200 pb-4">
                                    <summary className="text-lg md:text-xl font-semibold text-gray-900 cursor-pointer list-none">
                                        💖 Our Core Values
                                    </summary>
                                    <ul className="list-disc list-inside mt-2 space-y-2 text-sm md:text-base">
                                        <li className="mb-2">
                                            <strong>Quality & Craftsmanship</strong>
                                            <br />We use high-quality, durable resin that is water-resistant and long-lasting—so your jewellery shines beautifully for years to come.
                                        </li>
                                        <li className="mb-2">
                                            <strong>Customer-Centered</strong>
                                            <br />We{`'`}re committed to providing a smooth and delightful shopping experience, with personal care and attention in every order.
                                        </li>
                                        <li>
                                            <strong>Eco-Conscious Choices</strong>
                                            <br />We use safe materials and eco-friendly packaging—because we believe beauty should be kind to the planet too.
                                        </li>
                                    </ul>
                                </details>

                                {/* Delivery Info */}
                                <details className="border-b border-gray-200 pb-4">
                                    <summary className="text-lg md:text-xl font-semibold text-gray-900 cursor-pointer list-none">
                                        🚚 Delivery Across Pakistan
                                    </summary>
                                    <p className="mt-2 text-sm md:text-base">
                                        Currently, Resina Jewellery delivers nationwide within Pakistan—from cities to small towns—with secure and reliable shipping.
                                    </p>
                                </details>

                                {/* Vision */}
                                <details className="border-b border-gray-200 pb-4">
                                    <summary className="text-lg md:text-xl font-semibold text-gray-900 cursor-pointer list-none">
                                        🌿 Our Vision
                                    </summary>
                                    <p className="mt-2 text-sm md:text-base">
                                        To empower self-expression through elegant, handcrafted jewellery that tells your story. At Resina, we believe that beauty is personal—and every piece should reflect the unique you.
                                    </p>
                                </details>
                            </div>

                            {/* Desktop Content - Shows on lg screens and larger (1024px+) */}
                            <div className="hidden lg:block space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">✨ What Makes Us Special?</h2>
                                    <ul className="list-disc list-inside space-y-3 mb-6">
                                        <li>
                                            <strong>Handmade with Love</strong>
                                            <br />Every piece is thoughtfully hand-poured using premium resin, delicate inclusions, and artistic details—making each item truly unique.
                                        </li>
                                        <li>
                                            <strong>Elegant & Unique Designs</strong>
                                            <br />Our designs are inspired by nature, art, and modern aesthetics—blending soft colors and bold forms to help you express your style effortlessly.
                                        </li>
                                        <li>
                                            <strong>Limited Edition Collections</strong>
                                            <br />We don{`'`}t mass-produce. Each piece is part of a limited collection—crafted to be as special as the person wearing it.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">💖 Our Core Values</h2>
                                    <ul className="list-disc list-inside space-y-3 mb-6">
                                        <li>
                                            <strong>Quality & Craftsmanship</strong>
                                            <br />We use high-quality, durable resin that is water-resistant and long-lasting—so your jewellery shines beautifully for years to come.
                                        </li>
                                        <li>
                                            <strong>Customer-Centered</strong>
                                            <br />We{`'`}re committed to providing a smooth and delightful shopping experience, with personal care and attention in every order.
                                        </li>
                                        <li>
                                            <strong>Eco-Conscious Choices</strong>
                                            <br />We use safe materials and eco-friendly packaging—because we believe beauty should be kind to the planet too.
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">🚚 Delivery Across Pakistan</h2>
                                    <p className="mb-6">
                                        Currently, Resina Jewellery delivers nationwide within Pakistan—from cities to small towns—with secure and reliable shipping.
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">🌿 Our Vision</h2>
                                    <p>
                                        To empower self-expression through elegant, handcrafted jewellery that tells your story. At Resina, we believe that beauty is personal—and every piece should reflect the unique you.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Component */}
            <Footer />
        </main>
    );
}