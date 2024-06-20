function degreesToDirection(degrees) {
    // Ensure degrees are within 0-360 range
    degrees = (degrees + 360) % 360;

    // Define direction ranges and their corresponding labels
    const directions = ['north', 'north-northeast', 'northeast', 'east-northeast', 'east', 
                        'east-southeast', 'southeast', 'south-southeast', 'south', 
                        'south-southwest', 'southwest', 'west-southwest', 'west', 
                        'west-northwest', 'northwest', 'north-northwest'];

    // Calculate index in the directions array
    const index = Math.round(degrees / 22.5);
    
    // Return the corresponding direction
    return directions[index % 16];
}


const windDirection = degreesToDirection(2);
export default degreesToDirection;

