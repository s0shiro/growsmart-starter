import { AuthButtons } from './AuthButton'

const Hero = () => {
  return (
    <div className='py-20 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32'>
      <div className='flex flex-wrap '>
        <div className='flex items-center w-full lg:w-1/2'>
          <div className='max-w-2xl mb-8'>
            <p className='py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
              nulla quia expedita iste fuga magni quam ut rerum in, commodi
              veniam praesentium error delectus facilis quos dolorem asperiores
              eaque obcaecati!
            </p>

            <div className='flex flex-col items-start sm:space-y-0 sm:items-center sm:flex-row'>
              <AuthButtons />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
