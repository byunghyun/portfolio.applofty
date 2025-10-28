import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../utils/tailwindcss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import ReactPlayer from 'react-player';
import type { ServiceCardProps } from './types';
import type { Swiper as SwiperType } from 'swiper';

export default function ServiceCard({
  service,
  index,
  isSelected,
  onSelect,
  onClose,
}: ServiceCardProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number | null>(
    null,
  );
  const mainSwiperRef = useRef<SwiperType | null>(null);

  // Combine videos and images into one media array
  const allMedia = [
    ...service.videoContentUrl.map((url) => ({ type: 'video' as const, url })),
    ...service.imageContentUrls.map((url) => ({ type: 'image' as const, url })),
  ];

  const handleClickCloseCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleClickOffSiteLink = (url: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank');
  };

  const handleMediaClick = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMediaIndex(index);
  };

  const handleImageHover = (imageUrl: string) => (e: React.MouseEvent) => {
    setHoveredImage(imageUrl);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredImage) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const handleCloseMediaModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMediaIndex(null);
  };

  const handleSelectGalleryMedia = (index: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedMediaIndex(index);
    // Sync main swiper to selected index
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };
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
        onClick={!isSelected ? onSelect : undefined}
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
            src={service.thumbnailImageUrl}
            alt={service.title}
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
                {service.title}
              </motion.h2>
              {isSelected && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleClickCloseCard}
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
                      className='space-y-6'
                    >
                      {/* Description and Summary */}
                      <div>
                        <p className='mb-4 font-inter'>{service.description}</p>
                        <p className='mb-4 font-inter text-lg font-semibold text-white'>
                          {service.summary}
                        </p>
                      </div>

                      {/* Work Details */}
                      <div>
                        <h3 className='text-white font-inter font-semibold mb-3 text-lg'>
                          주요 작업 내용
                        </h3>
                        {service.workDetails.map((detail, i) => (
                          <p key={i} className='mb-2 font-inter'>
                            {detail}
                          </p>
                        ))}
                      </div>

                      {/* Contribution */}
                      <div>
                        <h3 className='text-white font-inter font-semibold mb-3 text-lg'>
                          기여도: {service.contribution.totalPercent}%
                        </h3>
                        <ul className='list-disc list-inside space-y-2'>
                          {service.contribution.description.map((item, i) => (
                            <li key={i} className='font-inter text-text'>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className='mb-15'>
                        <h3 className='text-white font-inter font-semibold mb-4 text-lg'>
                          기술 스택
                        </h3>
                        <div className='space-y-5'>
                          {service.techStack.fe.length > 0 && (
                            <div>
                              <p className='text-white font-inter font-medium mb-2'>
                                Frontend
                              </p>
                              <div className='flex flex-wrap gap-2'>
                                {service.techStack.fe.map((tech, i) => (
                                  <span
                                    key={i}
                                    className='px-3 py-1 bg-border rounded-lg text-text font-inter text-sm'
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {service.techStack.be.length > 0 && (
                            <div>
                              <p className='text-white font-inter font-medium mb-2'>
                                Backend
                              </p>
                              <div className='flex flex-wrap gap-2'>
                                {service.techStack.be.map((tech, i) => (
                                  <span
                                    key={i}
                                    className='px-3 py-1 bg-border rounded-lg text-text font-inter text-sm'
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {service.techStack.infra.length > 0 && (
                            <div>
                              <p className='text-white font-inter font-medium mb-2'>
                                Infrastructure
                              </p>
                              <div className='flex flex-wrap gap-2'>
                                {service.techStack.infra.map((tech, i) => (
                                  <span
                                    key={i}
                                    className='px-3 py-1 bg-border rounded-lg text-text font-inter text-sm'
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Image and Video Gallery */}
                      {(service.imageContentUrls.length > 0 ||
                        service.videoContentUrl.length > 0) && (
                        <div>
                          <h3 className='text-white font-inter font-semibold mb-3 text-lg'>
                            갤러리
                          </h3>
                          <div className='swiper-custom-nav'>
                            <Swiper
                              modules={[Pagination]}
                              pagination={{ clickable: true }}
                              spaceBetween={16}
                              slidesPerView={2.5}
                              className='rounded-lg'
                            >
                              {allMedia.map((media, i) => (
                                <SwiperSlide key={`media-${i}`}>
                                  <div
                                    className='w-full aspect-video bg-gray rounded-lg overflow-hidden cursor-pointer'
                                    onClick={handleMediaClick(i)}
                                    onMouseEnter={
                                      media.type === 'image'
                                        ? handleImageHover(media.url)
                                        : undefined
                                    }
                                    onMouseMove={
                                      media.type === 'image'
                                        ? handleMouseMove
                                        : undefined
                                    }
                                    onMouseLeave={
                                      media.type === 'image'
                                        ? handleImageLeave
                                        : undefined
                                    }
                                  >
                                    {media.type === 'video' ? (
                                      <div className='w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center relative'>
                                        <svg
                                          width='48'
                                          height='48'
                                          viewBox='0 0 24 24'
                                          fill='white'
                                          xmlns='http://www.w3.org/2000/svg'
                                        >
                                          <path d='M8 5v14l11-7z' />
                                        </svg>
                                      </div>
                                    ) : (
                                      <img
                                        src={media.url}
                                        alt={`${service.title} - ${i + 1}`}
                                        className='w-full h-full object-cover transition-transform duration-200 hover:scale-105'
                                        draggable={false}
                                      />
                                    )}
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <p className='truncate font-inter'>{service.description}</p>
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
                  {service.chips.map((chip) => (
                    <div
                      key={chip.id}
                      className='border border-border rounded-[50px] px-3 py-1 flex items-center justify-center'
                    >
                      <p className='text-text font-inter'>{chip.value}</p>
                    </div>
                  ))}
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
                  {service.project.demoUrl && (
                    <button
                      onClick={handleClickOffSiteLink(service.project.demoUrl)}
                      className='font-inter px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors'
                    >
                      View Demo
                    </button>
                  )}
                  {service.project.githubUrl && (
                    <button
                      onClick={handleClickOffSiteLink(
                        service.project.githubUrl,
                      )}
                      className='font-inter px-6 py-3 border border-border rounded-lg font-semibold text-white hover:bg-border transition-colors'
                    >
                      View Code
                    </button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Image Preview Tooltip */}
      {hoveredImage && (
        <div
          className='fixed pointer-events-none z-9999'
          style={{
            left: `${mousePosition.x + 20}px`,
            top: `${mousePosition.y - 180}px`,
          }}
        >
          <div className='bg-base border-2 border-border rounded-lg shadow-2xl p-2 max-w-md'>
            <img
              src={hoveredImage}
              alt='Preview'
              className='w-80 h-auto object-contain rounded'
            />
          </div>
        </div>
      )}

      {/* Media Modal */}
      {selectedMediaIndex !== null && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/90 z-100'
            onClick={handleCloseMediaModal}
          />

          {/* Modal Content */}
          <div className='fixed inset-0 z-101 flex items-center justify-center'>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className='bg-base rounded-lg w-full h-full overflow-hidden flex flex-col'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className='flex justify-end p-4'>
                <button
                  onClick={handleCloseMediaModal}
                  className='h-10 w-10 border border-border rounded-full flex items-center justify-center hover:bg-border transition-colors cursor-pointer'
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
                </button>
              </div>

              {/* Main Media */}
              <div className='flex-1 flex items-center justify-center px-8 pb-4'>
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  initialSlide={selectedMediaIndex}
                  onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
                  onSlideChange={(swiper) => {
                    setSelectedMediaIndex(swiper.activeIndex);
                  }}
                  touchStartPreventDefault={false}
                  touchMoveStopPropagation={false}
                  threshold={10}
                  className='w-full h-full'
                >
                  {allMedia.map((media, i) => (
                    <SwiperSlide key={`main-media-${i}`}>
                      <div className='w-full h-full flex items-center justify-center'>
                        {media.type === 'video' ? (
                          <div className='w-full h-full flex items-center justify-center'>
                            <div className='aspect-video w-full max-h-full'>
                              <ReactPlayer
                                src={media.url}
                                controls={true}
                                width='100%'
                                height='100%'
                                playing={false}
                                className='react-player-swiper'
                              />
                            </div>
                          </div>
                        ) : (
                          <img
                            src={media.url}
                            alt={`${service.title} - ${i + 1}`}
                            className='max-w-full h-full object-contain'
                            draggable={false}
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Gallery Thumbnails */}
              <div className='border-t border-border px-4 pt-6 pb-12'>
                <div className='swiper-custom-nav'>
                  <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    spaceBetween={12}
                    slidesPerView='auto'
                    className='rounded-lg'
                  >
                    {allMedia.map((media, i) => (
                      <SwiperSlide
                        key={`gallery-thumb-${i}`}
                        style={{ width: '96px' }}
                      >
                        <div
                          className={cn('w-24 h-24 relative border-2', {
                            'border-primary': selectedMediaIndex === i,
                            'border-border ': selectedMediaIndex !== i,
                          })}
                        >
                          <div
                            onClick={handleSelectGalleryMedia(i)}
                            className={cn(
                              'w-full h-full overflow-hidden cursor-pointer transition-transform',
                            )}
                          >
                            {media.type === 'video' ? (
                              <div
                                className={cn(
                                  'w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center relative',
                                  {
                                    'scale-105': selectedMediaIndex === i,
                                  },
                                )}
                              >
                                <svg
                                  width='32'
                                  height='32'
                                  viewBox='0 0 24 24'
                                  fill='white'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path d='M8 5v14l11-7z' />
                                </svg>
                              </div>
                            ) : (
                              <div
                                className={cn(
                                  'w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center relative',
                                  {
                                    'scale-105': selectedMediaIndex === i,
                                  },
                                )}
                              >
                                <img
                                  src={media.url}
                                  alt={`Thumbnail ${i + 1}`}
                                  className='w-full h-full object-cover'
                                  draggable={false}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
