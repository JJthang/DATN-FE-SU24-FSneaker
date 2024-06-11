import { IProduct, IProductDetail } from '@/services/product/types'
import { EyeIcon, ShoppingCartIcon, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {} & Partial<IProductDetail> & Partial<IProduct>
export default function ProductItem({ _id, IdImages, name, sizes, price, promotionalPrice, importPrice }: Props) {
    return (
        <Link to={`/products/${_id}`} className='cursor-pointer group'>
            <div className='pt-6 relative pb-3 overflow-hidden'>
                <div className='relative rounded-md overflow-hidden'>
                    <img
                        src={
                            IdImages?.[0] ||
                            'https://product.hstatic.net/200000690551/product/mule_outfit3_ad305b65207844f38ea799b8e69b0d24_large.png'
                        }
                        alt=''
                    />
                    <img
                        src={
                            IdImages?.[1] ||
                            'https://product.hstatic.net/200000690551/product/gr1_3065ae8062014890a39116134a1aa31c_large.jpg'
                        }
                        alt=''
                        className='absolute top-0 left-0 right-0 bottom-0 object-cover opacity-0 group-hover:opacity-100 duration-500  transition-all'
                    />
                </div>
                {/* Another image show opacity when hover */}
                <div className='absolute group-hover:bottom-4 transition-all group-hover:opacity-100 opacity-0 duration-500 -bottom-4 left-0 right-0 flex justify-center items-center gap-2 px-2'>
                    <button
                        className='w-10 h-10 flex items-center justify-center text-neutral-950 bg-white hover:bg-neutral-950 hover:text-white outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none flex-1'
                        title='Xem nhanh'
                    >
                        <ShoppingCartIcon className='size-3 mr-2 text-xs' />
                        Thêm vào giỏ
                    </button>
                    <button
                        className='w-10 h-10 flex items-center justify-center border border-neutral-800 text-white bg-neutral-800 outline-none hover:opacity-90 transition-all rounded-md text-sm leading-none'
                        title='Xem nhanh'
                    >
                        <EyeIcon></EyeIcon>
                    </button>
                </div>
            </div>
            <div>
                <span className='text-xs'>+{sizes?.length || 0} kích thước</span>
                <p className='text-md my-1'>{name}</p>
                <div className='flex items-center gap-1'>
                    <span className='text-red-500 text-sm'>{price}đ</span>
                    <span className='text-neutral-300 text-xs line-through'>{promotionalPrice}đ</span>
                </div>
            </div>
        </Link>
    )
}
