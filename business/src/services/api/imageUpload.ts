interface UploadResponse {
    message: string;
    url: string;
}

export const handleImageUpload = async (imageFile: File) => {
    try {
        const imageData = new FormData();
        imageData.append('file', imageFile);

        const response = await fetch('https://kgcczaero0.execute-api.eu-north-1.amazonaws.com/upload', {
            method: 'POST',
            body: imageData,
        });
        const data: UploadResponse = await response.json();
        return data.url;
    } catch (error) {
        console.error(error);
        return 'https://happymess-images.s3.eu-north-1.amazonaws.com/Image-not-found.png';
    }
};
