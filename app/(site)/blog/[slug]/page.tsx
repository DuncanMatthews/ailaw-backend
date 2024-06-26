
'use client'
 
import { useParams } from 'next/navigation'
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { Metadata } from "next";
import Image from "next/image";
import BlogData from "@/components/Blog/blogData";

// export const metadata: Metadata = {
//   title: "Blog Details Page - Ai Lawyer SaaS Boilerplate",
//   description: "This is Blog details page for Ai Lawyer Pro",
//   // other metadata
// };

//find the post for the params





const SingleBlogPage =  () => {
  const {slug} = useParams<{ slug: string }>(); // Updated line

  const post = BlogData.find(item => item.slug === slug);
  console.log("post", post);




  if (!post) {
    return <div>Post not found</div>;
  }


  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            <div className="md:w-1/2 lg:w-[32%]">
              {/* Sidebar content */}
              {/* ... */}
            </div>

            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={post.mainImage}
                      alt={post.title}
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
                  {post.title}
                </h2>
                <div>
               


                </div>
                <div className='flex gap-5'>
                <div>
  <Image 
    src={post.author?.image || '/images/user/kellen-gordon.jpg'} 
    alt={post.author?.name || 'Author Image'} 
    width={40} 
    height={40} 
    className='border-2 border-stroke rounded-full mb-1'
  />
</div>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Author: </span> {post.author?.name}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">Published On: {post.publishedAt}</span>
                  </li>
                  </ul>
                  </div>

                <div className="blog-details">
                  {post.body?.split("\n").map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;