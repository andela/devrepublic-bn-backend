import { uploader } from 'cloudinary';
import { dataUri } from '../utils/multer';

const uploadImage = async (image, req) => {
  const file = dataUri(req).content;
  const result = await uploader.upload(file);
  image = result.url;
  return image;
};
export default uploadImage;
