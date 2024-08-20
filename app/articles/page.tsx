"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*&pagination[pageSize]=2`);
      const data = await res.json();
      setArticles(data.data || []);
    }
    fetchArticles();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${article.attributes.cover_image.data.attributes.url}`}
            alt={article.attributes.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{article.attributes.title}</h2>
            <p className="text-gray-500 text-sm mb-2">{article.attributes.author} • {new Date(article.attributes.publishedAt).toLocaleDateString()}</p>
            <p className="text-gray-700 mb-4">
              {article.attributes.content[0]?.children[0]?.text.substring(0, 150)}...
            </p>
            <Link href={`/articles/${article.id}`} className="text-blue-600 hover:underline">
              Read more
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}