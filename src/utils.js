// For dynamically importing images to different components

export const getImageURL = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;    
};