"use client";

import "./BlogPage.scss";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function BlogPage({ params }) {
  const search = useSearchParams();
  const { title, desc, image } = Object.fromEntries(search.entries());
  console.log(params);

  return (
    <div className="blogPage">
      <Image src={image?image:"/next.svg"} width={100} height={100} alt="zzz"></Image>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}
