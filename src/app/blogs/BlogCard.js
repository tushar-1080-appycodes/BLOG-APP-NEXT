import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";

export default function BlogCard({ id, title, desc, image, publisher }) {
  const router = useRouter();


  return (
    <div className="blogCard">
      <Image
        // src={image ? image : "/next.svg"}
        src={"/next.svg"}
        width={500}
        height={500}
        alt="zzz"
      />
      <h3>{title}</h3>
      <p>{desc}</p>
      <span>
        <button>
          {publisher}
        </button>
        
        <button onClick={() => id ? router.push(`/blogs/${id}`) : alert("id undefined")}>
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </span>
        
    </div>
  );
}
