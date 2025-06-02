// Access environment variables
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Uploads an image to Cloudinary and returns the image URL
 * @param {File} imageFile - The image file to upload
 * @returns {Promise<{imageUrl: string}>} - The URL of the uploaded image
 */
const uploadImage = async (imageFile) => {
  if (!imageFile) {
    return { imageUrl: "" };
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", uploadPreset);
  formData.append("cloud_name", cloudName);

  try {
    console.log("Starting Cloudinary upload...");

    // Direct upload to Cloudinary (no backend needed)
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Cloudinary upload failed:", errorData);
      throw new Error(errorData.error?.message || "Image upload failed");
    }

    const data = await response.json();
    console.log("Upload successful:", data);

    return {
      imageUrl: data.secure_url,
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

export default uploadImage;
