import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import GlobalLeftMenu from './components/globalLeftMenu';
import './global.css';
import { cn } from './utils/tailwindcss';

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const handleClickMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  //sm(640), md(768), lg(1024), xl(1280), 2xl(1536).
  return (
    <div className='flex justify-end w-dvw h-dvh bg-base'>
      <GlobalLeftMenu />
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
              {Array.from({ length: 7 }).map((_, index) => {
                const isSelected = selectedId === index;

                return (
                  <div key={`portfolio_${index}`} className='w-full'>
                    {/* Placeholder to maintain grid layout */}
                    {isSelected && (
                      <div className='w-full bg-base rounded-3xl border-border flex flex-col border overflow-hidden opacity-0 pointer-events-none'>
                        <div className='bg-amber-300 h-[250px]' />
                        <div className='flex-1 bg-[#1E2023] p-6'>
                          <div className='h-[60px]' />
                        </div>
                      </div>
                    )}

                    <motion.div
                      layoutId={`card-container-${index}`}
                      onClick={
                        !isSelected
                          ? () => setSelectedId(isSelected ? null : index)
                          : undefined
                      }
                      className={`bg-base rounded-3xl border-border flex flex-col border overflow-hidden  ${
                        isSelected
                          ? 'fixed inset-0 z-50 m-auto w-[80%] max-w-full lg:max-w-5xl max-h-[90vh] overflow-y-auto'
                          : 'w-full cursor-pointer'
                      }`}
                      whileHover={
                        !isSelected
                          ? {
                              scale: 1.02,
                              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            }
                          : {}
                      }
                      transition={{
                        type: 'spring',
                        damping: 30,
                        stiffness: 300,
                      }}
                      style={{ originX: 0.5, originY: 0 }}
                    >
                      <motion.div
                        layoutId={`card-image-${index}`}
                        className='bg-amber-300 overflow-hidden'
                        style={{
                          height: isSelected ? '180px' : '250px',
                          minHeight: isSelected ? '30%' : '20',
                        }}
                        transition={{
                          type: 'spring',
                          damping: 30,
                          stiffness: 300,
                        }}
                      >
                        <img
                          src='/assets/images/bg-gradient.webp'
                          alt='bg-gradient'
                          className='h-full w-full object-cover'
                        />
                      </motion.div>

                      <motion.div
                        layoutId={`card-content-${index}`}
                        className='bg-[#1E2023] flex-1'
                        style={{ padding: isSelected ? '32px' : '24px' }}
                        transition={{
                          type: 'spring',
                          damping: 30,
                          stiffness: 300,
                        }}
                      >
                        <motion.div
                          className='h-full flex flex-col'
                          initial={false}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className='flex flex-row gap-3 justify-between items-start mb-2'>
                            <motion.h2
                              layoutId={`card-title-${index}`}
                              className='text-white font-inter flex-1'
                              style={{
                                fontSize: isSelected ? '30px' : '16px',
                                fontWeight: isSelected ? 'bold' : 'normal',
                              }}
                              transition={{
                                type: 'spring',
                                damping: 30,
                                stiffness: 300,
                              }}
                            >
                              Main Title {index + 1}
                            </motion.h2>
                            {isSelected && (
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedId(null);
                                }}
                                className='h-[40px] w-[40px] border border-border rounded-full flex items-center justify-center hover:bg-border transition-colors cursor-pointer'
                              >
                                <svg
                                  width='20'
                                  height='20'
                                  viewBox='0 0 20 20'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M15 5L5 15M5 5L15 15'
                                    stroke='#7D8189'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  />
                                </svg>
                              </motion.button>
                            )}
                          </div>
                          <div className='flex-1 justify-between flex flex-col'>
                            <div
                              className={cn(
                                'flex flex-col gap-6 duration-0',
                                isSelected ? 'flex-col-reverse ' : 'flex-col',
                              )}
                            >
                              <motion.div
                                layoutId={`card-description-${index}`}
                                className='text-text font-inter'
                                transition={{
                                  type: 'spring',
                                  damping: 30,
                                  stiffness: 300,
                                }}
                              >
                                {isSelected ? (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: 0.15 }}
                                  >
                                    <p className='mb-4 font-inter'>
                                      This is a detailed description for
                                      portfolio item {index + 1}. Here you can
                                      add more information about the project,
                                      technologies used, challenges faced, and
                                      solutions implemented.
                                    </p>
                                    <p className='mb-4 font-inter'>
                                      Lorem ipsum dolor sit amet, consectetur
                                      adipiscing elit. Sed do eiusmod tempor
                                      incididunt ut labore et dolore magna
                                      aliqua. Ut enim ad minim veniam, quis
                                      nostrud exercitation ullamco laboris.
                                    </p>
                                    <p className='font-inter'>
                                      You can add images, code snippets, live
                                      demos, or any other relevant content to
                                      showcase your work effectively.
                                    </p>
                                  </motion.div>
                                ) : (
                                  <p className='truncate font-inter'>
                                    Description for portfolio item {index + 1}
                                  </p>
                                )}
                              </motion.div>

                              {/* Tags - always visible */}
                              <motion.div
                                layoutId={`card-chips-${index}`}
                                className='flex flex-wrap gap-2'
                                transition={{
                                  type: 'spring',
                                  damping: 30,
                                  stiffness: 300,
                                }}
                              >
                                <div className='border border-border rounded-[50px] px-3 py-1 flex items-center justify-center'>
                                  <p className='text-text font-inter'>Text</p>
                                </div>
                              </motion.div>
                            </div>

                            {isSelected && (
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className='flex gap-4 mt-16'
                              >
                                <button className='font-inter px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors'>
                                  View Demo
                                </button>
                                <button className='font-inter px-6 py-3 border border-border rounded-lg font-semibold text-white hover:bg-border transition-colors'>
                                  View Code
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
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
            onClick={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
