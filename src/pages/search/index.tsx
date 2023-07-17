import Image from 'next/image';
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

function Search() {
    const [listData, setListData] = useState<GifData[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        fetchDataIronMan(input);
    }, [input]);

    const fetchDataIronMan =async (query: string) => {
        const url: string = 'https://api.giphy.com/v1/gifs/search';
        const apiKey: string = 'Y7IxAdAYjgpQs2o22XlF4rYqo9sZJKQS';
        // const query: string = 'Iron Man';
        const limit: number = 9;

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
        {/* <h1 className='text-3xl font-bold'>IRON MAN GIPHY</h1> */}

        <div>
            <input className='border py-2 px-4 rounded-md w-1/2' type='text' placeholder='Search input goes here' value={input} onChange={(e) => setInput(e.target.value)}/>
        </div>


        {input === '' ? <h2 className='text-center my-10 inline-block text-xl'>Tidak ada data.</h2> :
        loading ? <h2 className='text-center my-10 inline-block text-xl'>Sedang mengambil data ...</h2> : 
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

export default Search