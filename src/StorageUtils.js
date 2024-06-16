// storageUtils.js

/**
 * Get an item from local storage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {any} The parsed value from local storage, or null if not found.
 */
export const getItem = (key) => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error(`Error getting item ${key} from local storage`, error);
        return null;
    }
};

/**
 * Set an item in local storage.
 * @param {string} key - The key under which to store the item.
 * @param {any} value - The value to store. It will be stringified.
 */
export const setItem = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting item ${key} in local storage`, error);
    }
};

/**
 * Remove an item from local storage.
 * @param {string} key - The key of the item to remove.
 */
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item ${key} from local storage`, error);
    }
};

/**
 * Clear all items from local storage.
 */
export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing local storage', error);
    }
};
