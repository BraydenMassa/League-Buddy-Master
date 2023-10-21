import Image, { StaticImageData } from 'next/image'

interface BackgroundImgProps {
  alt: string
  source: StaticImageData
}

const BackgroundImg = ({ alt, source }: BackgroundImgProps) => {
  return (
    <Image
      alt={alt}
      src={source}
      placeholder='blur'
      quality={100}
      fill
      sizes='100vw'
      style={{ objectFit: 'cover', zIndex: -1 }}
    />
  )
}

export default BackgroundImg
