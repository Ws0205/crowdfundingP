const separateCategories = (categoriesStr) => {
    const categories = categoriesStr.match(/,/g) ? (
        categoriesStr
            .split(",")
            .map((categories) => categories.trim())
    ) : [categoriesStr];

    categories.forEach((category) => {
        if (category.length > 15) throw new Error('category tag cannot be greater than 15 characters');
    });

    return categories;
}

export default separateCategories;