/**
 * The current level instance.
 * This variable stores the active level configuration.
 * @type {Level}
 */
let level1;
/**
 * Creates an array of background objects for a given set of layers and x-offset.
 * 
 * @param {string[]} layerNames - Array of background layer filenames.
 * @param {number} xOffset - The x-coordinate for positioning the background layers.
 * @returns {BackgroundObject[]} - Array of `BackgroundObject` instances.
 */
const createBackgroundLayer = (layerNames, xOffset) => {
    return layerNames.map(layer => new BackgroundObject(`img/5_background/layers/${layer}`, xOffset));
};

/**
 * Initializes the game level with enemies, clouds, and background objects.
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(), new Chicken(), new Chicken(), new Chicken(),
            new Chicken(), new Chicken(), new Chicken(),
            new Chickenminis(), new Chickenminis(), new Chickenminis(),
            new Chickenminis(), new Chickenminis(), new Chickenminis()
        ],
        [
            new Cloud()
        ],
        [
            ...createBackgroundLayer(['air.png', '3_third_layer/2.png', '2_second_layer/2.png', '1_first_layer/2.png'], -719),
            ...createBackgroundLayer(['air.png', '3_third_layer/1.png', '2_second_layer/1.png', '1_first_layer/1.png'], 0),
            ...createBackgroundLayer(['air.png', '3_third_layer/2.png', '2_second_layer/2.png', '1_first_layer/2.png'], 719),
            ...createBackgroundLayer(['air.png', '3_third_layer/1.png', '2_second_layer/1.png', '1_first_layer/1.png'], 719 * 2),
            ...createBackgroundLayer(['air.png', '3_third_layer/2.png', '2_second_layer/2.png', '1_first_layer/2.png'], 719 * 3),
            ...createBackgroundLayer(['air.png', '3_third_layer/1.png', '2_second_layer/1.png', '1_first_layer/1.png'], 719 * 4),
            ...createBackgroundLayer(['air.png', '3_third_layer/2.png', '2_second_layer/2.png', '1_first_layer/2.png'], 719 * 5)
        ]
    );
}
