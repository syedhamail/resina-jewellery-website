"use client";

import React, { useState } from "react";
import products from "../data/products";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";

export default function ProductsPage() {
  // Filter states
  const [filters, setFilters] = useState({
    priceRange: "",
    trendingNow: false,
    newArrivals: false,
  });

  // Mobile filter drawer state
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtered products
  const filteredProducts = products
    .filter((product) => {
      const matchesPrice =
        !filters.priceRange ||
        (filters.priceRange === "$0-$2000" && product.price <= 2000) ||
        (filters.priceRange === ">2000" && product.price > 2000);
      const matchesTrending = !filters.trendingNow || product.price <= 2200;
      const matchesNewArrivals = !filters.newArrivals || true;
      return matchesPrice && matchesTrending && matchesNewArrivals;
    })
    .sort((a, b) => (filters.newArrivals ? b.id - a.id : 0))
    .slice(0, filters.newArrivals ? 10 : products.length);

  // Paginate products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className="bg-[#FAF3EB]">
      {/* Header Section */}
      <Header />

      {/* Products Section */}
      <section className="min-h-screen mt-5 mb-20">
        {/* Header */}
        <header className="text-gray-900 py-4">
          <div className="container mx-auto px-4 sm:px-5 text-center">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-semibold" 
              style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
            >
              Our Products
            </h1>
          </div>
        </header>

        {/* Mobile Filter Button */}
        <div className="container mx-auto px-4 sm:px-5 md:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full bg-indigo-600 text-white py-2 rounded-md mb-4 flex items-center justify-center"
          >
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
            <svg
              className={`ml-2 w-4 h-4 transition-transform ${showMobileFilters ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-5 py-6 md:py-10 flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Filters Sidebar - Mobile */}
          {showMobileFilters && (
            <div className="md:hidden w-full bg-white p-4 rounded-lg shadow-md mb-4">
              <h2 className="text-lg font-semibold text-indigo-600 mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                Filters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    value={filters.priceRange}
                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="$0-$2000">Rs 0 - 2000</option>
                    <option value=">2000">Rs {">"} 2000</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.trendingNow}
                    onChange={(e) => setFilters({ ...filters, trendingNow: e.target.checked })}
                  />
                  <label className="text-sm font-medium text-gray-700">Trending Now</label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={filters.newArrivals}
                    onChange={(e) => setFilters({ ...filters, newArrivals: e.target.checked })}
                  />
                  <label className="text-sm font-medium text-gray-700">New Arrivals</label>
                </div>
              </div>
            </div>
          )}

          {/* Filters Sidebar - Desktop */}
          <aside className="hidden md:block w-full md:w-1/4 lg:w-1/5 bg-white p-4 md:p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-indigo-600 mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
              Filters
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                >
                  <option value="">All</option>
                  <option value="$0-$2000">Rs 0 - 2000</option>
                  <option value=">2000">Rs {">"} 2000</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.trendingNow}
                  onChange={(e) => setFilters({ ...filters, trendingNow: e.target.checked })}
                />
                <label className="text-sm font-medium text-gray-700">Trending Now</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={filters.newArrivals}
                  onChange={(e) => setFilters({ ...filters, newArrivals: e.target.checked })}
                />
                <label className="text-sm font-medium text-gray-700">New Arrivals</label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {paginatedProducts.map((product) => (
                <Link href={`/products-detail/${product.id}`} key={product.id} className="block">
                  <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
                    <div className="relative w-full aspect-square">
                      <Image
                        src={Array.isArray(product.image) ? product.image[0] : product.image}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      />
                    </div>
                    <div className="mt-3 flex-grow">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1" style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
                        {product.name}
                      </h3>
                      <p className="text-indigo-600 font-semibold text-sm sm:text-base">Rs {product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {paginatedProducts.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No products match your filters.</p>
            )}

            {(totalPages > 1 || currentPage > 1) && (
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2">
                <button
                  className="w-full sm:w-auto bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-gray-600 text-sm sm:text-base">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="w-full sm:w-auto bg-indigo-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
}