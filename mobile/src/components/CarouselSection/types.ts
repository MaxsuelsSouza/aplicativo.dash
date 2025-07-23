export interface CarouselItem {
  id: string;
  title: string;
  image: string;
}

export interface CarouselSectionProps {
  title: string;
  data: CarouselItem[];
  isLargeCarousel?: boolean;
}
