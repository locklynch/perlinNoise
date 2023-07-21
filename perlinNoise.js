// Constants
const ROWS = 10;  // Number of rows in the grid
const COLS = 10;  // Number of columns in the grid
const CELL_SIZE = 40;  // Size of each cell in pixels

// Get the canvas element and context
const canvas = document.getElementById("gridCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size based on the number of rows, columns, and cell size
canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

// Create a SimplexNoise instance
const simplex = new SimplexNoise();

// Function to draw the grid with random distribution of filled white cells and Perlin noise
function drawGrid() {
    // Draw random filled white cells
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;

            // Randomly fill some cells with white (e.g., 20% chance)
            if (Math.random() < 0.2) {
                ctx.fillStyle = "#fff"; // White color
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }

    // Apply Perlin noise to the remaining cells
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const x = col * CELL_SIZE;
            const y = row * CELL_SIZE;

            // Calculate Perlin noise value between 0 and 1
            const noiseValue = (simplex.noise2D(col / 10, row / 10) + 1) / 2;

            // Use the noise value to determine the shade of white for the cell
            const shade = Math.floor(noiseValue * 255);

            // Set the fill style with the shade of white
            ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;

            // Skip cells that were already filled with white in the previous loop
            if (ctx.fillStyle !== "#fff") {
                ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
            }
        }
    }
}

// Call the function to draw the grid
drawGrid();
