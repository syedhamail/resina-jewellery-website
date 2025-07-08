import Image from 'next/image';
import Link from 'next/link';
import products from '../data/products';

export default function NewArrivals() {
  const newProducts = [...products].sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <section className="text-gray-600 body-font -mt-10 sm:-mt-16 md:-mt-20">
      <div className="container px-4 sm:px-5 py-12 sm:py-16 md:py-24 mx-auto">
        <h2 
          style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center"
        >
          New Arrivals
        </h2>
        <div className="flex flex-wrap -m-2 sm:-m-4">
          {newProducts.map((product) => (
            <Link
              href={`/products-detail/${product.id}`}
              key={product.id}
              className="w-1/2 sm:w-1/3 lg:w-1/5 p-2 sm:p-4"
            >
              <div className="block relative rounded overflow-hidden group aspect-[9/16]">
                <Image
                  alt={product.name}
                  className="object-cover object-center w-full h-full group-hover:opacity-0 transition-opacity duration-300"
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  width={180}
                  height={320}
                  priority={false}
                />
                {product.hoverImage && (
                  <Image
                    alt={`${product.name} hover`}
                    className="object-cover object-center w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    src={product.hoverImage}
                    width={180}
                    height={320}
                    priority={false}
                  />
                )}
              </div>
              <div className="text-center mt-2 sm:mt-4 flex flex-col items-center justify-center min-h-[80px] sm:min-h-[100px]">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">RESINA JEWELLERY</h3>
                <h2 className="text-gray-900 title-font text-sm sm:text-base md:text-lg font-medium line-clamp-2">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm sm:text-base">Rs {product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 sm:mt-8">
          <Link href="/products">
            <button className="bg-[#ef67c6] text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:bg-[#f42ab7] transition-colors duration-300 text-sm sm:text-base">
              View All
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}