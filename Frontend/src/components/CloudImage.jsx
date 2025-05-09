import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const CloudImage = ({ imgPath }) => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dqzm3dvzc' } });

  const img = cld
    .image(imgPath)
    .format('auto') // Apply the auto format transformation
    .quality('auto') // Apply the auto quality transformation
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Resize to 500x500

  return (
    <div className="w-full flex justify-center mb-4">
      <AdvancedImage cldImg={img} className="rounded-xl" />
    </div>
  );
};

export default CloudImage;
