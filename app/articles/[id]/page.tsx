"use client";
import { useEffect, useState } from 'react';

type Article = {
  id: number;
  attributes: {
    title: string;
    content: any[];
    author: string;
    publishedAt: string;
    cover_image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
};

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles/${params.id}?populate=*`);
      const data = await res.json();
      setArticle(data.data || null);
    }
    fetchArticle();
  }, [params.id]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <img
        src={`${process.env.NEXT_PUBLIC_API_URL}${article.attributes.cover_image.data.attributes.url}`}
        alt={article.attributes.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{article.attributes.title}</h1>
      <p className="text-gray-500 text-sm mb-4">
        {article.attributes.author} • {new Date(article.attributes.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        {article.attributes.content.map((block, index) => (
          <p key={index} className="mb-4">
            {block.children[0]?.text}
          </p>
        ))}
      </div>
    </div>
  );
}
