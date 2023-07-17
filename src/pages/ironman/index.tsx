import Image from 'next/image';
import { Input } from 'postcss';
import React, { useEffect, useState } from 'react'

interface GifData {
    type: string, 
    id: string, 
    slug: string, 
    title: string,
    url: string,
    width: number,
    height: number,
}

function Ironman() {
    const [listData, setListData] = useState<GifData[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {
        fetchDataIronMan();
    }, []);

    const fetchDataIronMan =async () => {
        const url = 'https://api.giphy.com/v1/gifs/search';
        const apiKey = 'Y7IxAdAYjgpQs2o22XlF4rYqo9sZJKQS';
        const query = 'Iron Man';
        const limit = 9;

        try{
            const response = await fetch(`${url}?api_key=${apiKey}&q=${query}&limit=${limit}`);
            const data = await response.json();
    
            const gifs: GifData[] = data.data.map((gif: any) => ({
                type: gif.type, 
                id:gif.id, 
                slug: gif.slug, 
                title: gif.title,
                url: gif.images.downsized_large.url,
                height: gif.images.downsized_large.height,
                width: gif.images.downsized_large.width,
              }));
    
              setListData(gifs);
              setLoading(false);
        } catch(err: any){
            console.log(err)
        }
    }

  return (
    <div className='py-10 lg:px-20 text-center'>
        <h1 className='text-3xl font-bold'>IRON MAN GIPHY</h1>

        {loading ? <h2 className='text-center my-10 inline-block text-xl'>Sedang mengambil data ...</h2> : 
            <div className="iron-list grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 my-10 lg:my-20 gap-10">
                {listData && listData.map((data) => (
                    <div key={data.id} className='bg-gray-100 rounded-md overflow-hidden flex justify-center items-center' >
                        <img className='object-cover w-full h-full' src={data.url} width={data.width} height={data.height} alt={data.slug} />
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default Ironman