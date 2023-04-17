/*
For day 24, I decided to use ChatGPT to generate the JS code
which would give the answer. I used the text from Advent of Code 
as the prompt to ChatGPT with some minor modifications, and it 
generated the following code.
*/

function calculateStrongestBridge(input) {
    let components = document.querySelector('pre').innerText.split('\n');
    components = components.map(item => item.split('/').map(i => +i));
    components.pop()

    if (input?.length) components = input; // this is just for testing
    
    const portMap = new Map(); // Map to store component ports
    // Populate the portMap with components and their corresponding ports
    for (const component of components) {
        const [port1, port2] = component;
        if (!portMap.has(port1)) {
            portMap.set(port1, []);
        }
        if (!portMap.has(port2)) {
            portMap.set(port2, []);
        }
        portMap.get(port1).push(component);
        portMap.get(port2).push(component);
    }

    let maxStrength = 0; // Variable to store the maximum strength of the bridge
    console.log(portMap)
    // Recursive helper function to find the strength of the bridge
    function findStrength(currentPort, usedComponents, currentStrength) {
        const candidateComponents = portMap.get(currentPort);
        for (const component of candidateComponents) {
            if (!usedComponents.has(component)) {
                const [port1, port2] = component;
                const nextPort = port1 === currentPort ? port2 : port1;
                const nextStrength = currentStrength + port1 + port2;
                usedComponents.add(component);
                findStrength(nextPort, usedComponents, nextStrength);
                usedComponents.delete(component);
            }
        }

        // If no more components can be used, update the max strength
        maxStrength = Math.max(maxStrength, currentStrength);
    }

    // Start the recursive search from port 0 with an empty set of used components
    findStrength(0, new Set(), 0);

    return maxStrength;
}

function calculateLongestBridgeStrength(input) {
    let components = document.querySelector('pre').innerText.split('\n');
    components = components.map(item => item.split('/').map(i => +i));
    components.pop()

    const portMap = new Map(); // Map to store component ports
    if (input?.length) components = input;

    // Populate the portMap with components and their corresponding ports
    for (const component of components) {
        const [port1, port2] = component;
        if (!portMap.has(port1)) {
            portMap.set(port1, []);
        }
        if (!portMap.has(port2)) {
            portMap.set(port2, []);
        }
        portMap.get(port1).push(component);
        portMap.get(port2).push(component);
    }

    let maxStrength = 0; // Variable to store the maximum strength of the bridge
    let maxLength = 0; // Variable to store the length of the longest bridge
    let strongestBridgeStrength = 0; // Variable to store the strength of the strongest bridge

    // Recursive helper function to find the strength and length of the bridge
    function findStrengthAndLength(currentPort, usedComponents, currentStrength, currentLength) {
        const candidateComponents = portMap.get(currentPort);

        for (const component of candidateComponents) {
            if (!usedComponents.has(component)) {
                const [port1, port2] = component;
                const nextPort = port1 === currentPort ? port2 : port1;
                const nextStrength = currentStrength + port1 + port2;
                const nextLength = currentLength + 1;
                usedComponents.add(component);
                findStrengthAndLength(nextPort, usedComponents, nextStrength, nextLength);
                usedComponents.delete(component);
            }
        }

        // Update max strength and max length if a longer bridge is found
        if (currentLength > maxLength) {
            maxLength = currentLength;
            maxStrength = currentStrength;
            strongestBridgeStrength = currentStrength;
        } else if (currentLength === maxLength) {
            // Update strongest bridge strength if current bridge has higher strength
            strongestBridgeStrength = Math.max(strongestBridgeStrength, currentStrength);
        }
    }

    // Start the recursive search from port 0 with an empty set of used components
    findStrengthAndLength(0, new Set(), 0, 0);

    return strongestBridgeStrength;
}