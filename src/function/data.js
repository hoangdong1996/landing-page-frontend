export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export function getImageUrl(image) {
  return `${process.env.VUE_APP_BASE_API}image/${image.id}`
}
