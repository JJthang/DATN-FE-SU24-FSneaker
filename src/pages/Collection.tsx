import BreadCrumb, { IBreadCrumb } from '@/components/breadcrumb'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import ProductItem from '@/features/product/_components/product-item'
import { getCategory, getCategoryDetails } from '@/services/category/requests'
import { IFCATEGORY_DETAIL, IFPRODUCT_DETAIL } from '@/types/category'
import { EyeIcon, FilterIcon, ShoppingCartIcon } from 'lucide-react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import ReactSlider from 'react-slider'

const Collection = () => {
    const { id: categoryId } = useParams()
    const { data : data1} = useQuery({
        queryFn: () => getCategoryDetails(categoryId!),
        queryKey: ['/categoryDetaikl', categoryId],
    })
    console.log(data1);
    const { data } = useQuery({ queryFn: () => getCategory(String(categoryId)), queryKey: ['/category', categoryId], enabled: !!categoryId })
    const breadcrumb: IBreadCrumb[] = [
        {
            title: data?.name || ''
        }
    ]

    const renderItemProduct = (vals: IFCATEGORY_DETAIL) => {
        return <Link to={`/products/${vals.productDetails[0].productDetailId}`} className='cursor-pointer group'>
        <div className='pt-6 relative pb-3 overflow-hidden'>
            <div className='relative rounded-md overflow-hidden'>
                <img
                    src={'https://product.hstatic.net/200000690551/product/mule_outfit3_ad305b65207844f38ea799b8e69b0d24_large.png'}
                    alt=''
                />
                <img
                    src={'https://product.hstatic.net/200000690551/product/gr1_3065ae8062014890a39116134a1aa31c_large.jpg'}
                    alt=''
                    className='absolute top-0 left-0 right-0 bottom-0 object-cover opacity-0 group-hover:opacity-100 duration-500  transition-all'
                />
            </div>
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
            <span className='text-xs'>+{vals.productDetails?.length || 0} kích thước</span>
            <p className='text-md my-1'>{vals.nameProduct}</p>
            <div className='flex items-center gap-2'>
                <span className='text-red-500 font-semibold text-sm'>{vals.productDetails[0].price}đ</span>
                <span className='text-neutral-300 text-sm line-through'>{vals.productDetails[0].promotionalPrice}đ</span>
            </div>
        </div>
    </Link>
    }



    return (
        <div className='pb-10'>
            <BreadCrumb links={breadcrumb} />
            <div className='app-container text-[#333] flex gap-10 pt-5'>
                <div className='w-[300px] h-20 md:block hidden'>
                    <FilerSection />
                </div>
                <div className='flex-1'>
                    <div className='flex md:items-center gap-3 flex-col md:flex-row'>
                        <div className='flex-1 flex items-center gap-3'>
                            <h1 className='text-2xl'>{data1 && data1[0]?.nameCategory}</h1>
                            <p className='text-sm relative top-1 flex-1'>{data1?.length || 0} sản phẩm </p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='flex-1 md:hidden'>
                                <Sheet>
                                    <SheetTrigger>
                                        <button className='outline-none flex gap-2 items-center border border-neutral-200 py-2 px-4 rounded-md text-sm'>
                                            Bộ Lọc
                                            <FilterIcon size={16} />
                                        </button>
                                    </SheetTrigger>
                                    <SheetContent side={'left'}>
                                        <FilerSection />
                                    </SheetContent>
                                </Sheet>
                            </div>
                            <div className='flex gap-3 items-center justify-center'>
                                <p className='text-base relative top-1 flex-1'>Sắp xếp theo</p>
                                <Select>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Tên A-Z' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='1'>
                                            <div className='cursor-pointer hover:text-teal-900'>Tên A-Z</div>
                                        </SelectItem>
                                        {/* <SelectItem value='2'>Sản phẩm nổi bật</SelectItem> */}
                                        <SelectItem value='3'>
                                            <div className='cursor-pointer hover:text-teal-900'>Giá tăng dần</div>
                                        </SelectItem>
                                        <SelectItem value='4'>
                                            <div className='cursor-pointer hover:text-teal-900'>Giá giảm dần</div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-3 gap-y-5'>
                        {data1?.map((product) => (renderItemProduct(product)))}
                    </div>
                    {data1 && data1?.length < 1 && (<div className='w-full h-[300px] flex justify-center items-center'>No Data</div>)}
                </div>
            </div>
        </div>
    )
}

const FilerSection = () => {
    return (
        <>
            <h1 className='text-2xl'>Bộ lọc</h1>
            <div>
                <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>Khoảng giá</AccordionTrigger>
                        <AccordionContent className='py-4'>
                            <ReactSlider
                                className='horizontal-slider'
                                thumbClassName='w-4 h-4 bg-neutral-700 rounded-full hidden'
                                trackClassName='pt-3'
                                defaultValue={[0, 100000]}
                                ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
                                renderThumb={(props: any, state: any) => <div {...props}>{state.valueNow}</div>}
                                pearling
                                minDistance={10}
                            />
                            <Slider defaultValue={[33]} max={100} step={1} min={20} />

                            <div className='mt-4 flex items-center justify-between'>
                                <span className='text-sm font-bold'>1.000.000 đ</span>
                                <span className='text-sm font-bold'>5.000.000 đ</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type='single' collapsible defaultValue='1'>
                    <AccordionItem value='1' className='border-none'>
                        <AccordionTrigger className='text-left text-lg hover:no-underline'>Size</AccordionTrigger>
                        <AccordionContent className='flex flex-wrap gap-3'>
                            {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((size, index) => (
                                <div
                                    key={index}
                                    className='flex items-center space-x-2 w-12 h-12 border rounded-md border-neutral-400 justify-center text-neutral-700 cursor-pointer hover:bg-neutral-700 hover:text-white'
                                >
                                    {size}
                                </div>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}
export default Collection
