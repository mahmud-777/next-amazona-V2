/* eslint-disable @next/next/no-img-element */
import ProductItem from "@/components/products/ProductItem";
import data from "@/lib/data";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Next Amazona V2',
  description: process.env.NEXT_PUBLIC_APP_DESC ||
   'Nextjs, Server components, Next auth, daisyui, zustand',
}
export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <>
      <div className=" w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div 
            key={product._id}
            id={`slide-${index}`}
            className=" carousel-item relative w-full"
          >
            <Link href={`/product/${product.slug}`}>
              {/* <Image src={product.banner} alt={product.name} className=" w-full" width={300} height={300} /> */}
              <img src={product.banner} alt={product.name} className=" w-full" />
            </Link>

            <div className=" absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a 
                href={`#slde-${
                  index === 0 ? featuredProducts.length - 1 : index -1
                }`}
                className="btn btn-circle"
              >
                ❮ 
              </a>

              <a 
                href={`#slde-${
                  index === 0 ? featuredProducts.length - 1 : index -1
                }`}
                className="btn btn-circle"
              >
                ❯ 
              </a>
            </div>

          </div>
        ))}
      </div>
      <h2 className="text-2xl py-2">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* {data.products.map((product,i) => (
          <ProductItem key={i} product={product}/>
        ))} */}
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={convertDocToObj(product)}/>
        ))}
      </div>
    </>
  )
}
