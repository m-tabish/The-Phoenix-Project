// Utility function to import all images from a specified directory
export function importAll() {
    const images = import.meta.glob('./assets/motivating-quotes/*.{png,jpg,jpeg,svg}', { eager: true });
    let imageMap = {};
    for (const path in images) {
        const key = path.replace('./assets/no-bg-memes/', '');
        imageMap[key] = images[path].default;
    }
    // console.log(JSON.stringify(imageMap) + "map")
    return imageMap;
}

// Load all images from the 'src/assets/no-bg-memes' directory
const images = importAll();

export default images;
