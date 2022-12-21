import { Link } from "@shopify/hydrogen"

const TopCollections = () => {
    return (
        <div className='flex bg-gray-200'>
            <div className='flex lg:h-[500px] space-x-24 justify-center mx-auto overflow-hidden'>
                <div className='w-1/3 my-auto space-y-3'>
                    <div className='flex space-x-4 font-bold lg:text-8xl text-4xl'>
                        <p>N</p>
                        <p>E</p>
                        <p>W</p>
                    </div>
                    <div className='flex space-x-4 font-bold lg:text-5xl text-2xl'>
                        <p>A</p>
                        <p>R</p>
                        <p>R</p>
                        <p>I</p>
                        <p>V</p>
                        <p>A</p>
                        <p>L</p>
                        <p>S</p>
                    </div>
                    <div className='lg:pt-12 pt-8'>
                        <Link to='/collections' className='px-4 py-2 bg-gray-900 text-white rounded-lg'>
                            Explore
                        </Link>
                    </div>
                </div>
                <div className='w-1/3 my-auto'>
                    <div>
                        <img 
                            src="https://raw.githubusercontent.com/bedimcode/responsive-ecommerce-website/master/assets/img/home.png" 
                            alt="not found" 
                            className='w-full object-cover'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopCollections