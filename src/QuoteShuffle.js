// Utility function to import all images from a specified directory
export function importAll() {
    const images = import.meta.glob('./assets/motivating-quotes/*.{png,jpg,jpeg,svg}', { eager: true });
    let imageMap = {};
    for (const path in images) {
        const key = path.replace('./assets/motivating-quotes/', '');
        imageMap[key] = images[path].default;
    }
    // console.log(JSON.stringify(imageMap) + "map")
    return imageMap;
}

 
const images = importAll();

export default images;
