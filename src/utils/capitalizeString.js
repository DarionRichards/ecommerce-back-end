const capitalizeString = (string) => {
    const stringArray = string.split(" ");

    const newName = stringArray
        .map((word) => {
            return word[0].toUpperCase() + word.substring(1);
        })
        .join(" ");

    return newName;
};

module.exports = { capitalizeString };