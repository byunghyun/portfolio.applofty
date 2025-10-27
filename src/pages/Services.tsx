import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { servicesList } from '../constant/ServicesList';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const handleClickMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };
  const handleClickServiceCard = (index: number | null) => () => {
    setSelectedId(index);
  };

  return (
    <>
      <div className='relative w-full md:w-[calc(100%-280px)] flex flex-col items-center overflow-auto'>
        <header className='sticky z-10 top-0 bg-base flex md:hidden items-center justify-between min-h-[72px] w-full px-6 py-4 '>
          <div className='w-8 h-8 bg-white rounded-full' />
          <div className='cursor-pointer flex items-center justify-center w-10 h-10 bg-gray border border-border rounded-full '>
            <button className='cursor-pointer' onClick={handleClickMobileMenu}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='size-6 text-[#7D8189]'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                />
              </svg>
            </button>
          </div>
        </header>
        <div className='lg:w-full px-6 lg:px-8 xl:w-[900px] 2xl:w-[1240px] mt-12 md:mt-[102px] h-[calc(100%-72px)]'>
          <div>
            <header>
              <h3 className='text-[32px] font-inter font-bold text-white text-left truncate'>
                Test Transition
              </h3>
              <p className='text-[#7D8189] font-inter font-semibold mt-1.5 truncate'>
                Test Transition.
              </p>
            </header>
            <div className='grid lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 mt-8 pb-6 relative'>
              {servicesList.map((service, index) => (
                <ServiceCard
                  key={`portfolio_${index}`}
                  service={service}
                  index={index}
                  isSelected={selectedId === index}
                  onSelect={handleClickServiceCard(index)}
                  onClose={handleClickServiceCard(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/80 z-40'
            onClick={handleClickServiceCard(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
