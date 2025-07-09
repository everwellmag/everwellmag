import imageUrlBuilder from '@sanity/image-url';
import { sanity } from './sanity';

// Định nghĩa interface cho ImageSource
interface ImageSource {
  asset: { _ref: string };
}

const builder = imageUrlBuilder(sanity);

export function urlFor(source: ImageSource) {
  return builder.image(source);
}