const fs = require('node:fs');
const path = require('node:path');

// Entity type should be 'MOD', 'FUNC', etc.
function getNextId(entityType) {
  const registryPath = path.join(process.cwd(), 'registry.json');
  
  if (!fs.existsSync(registryPath)) {
    // Initialize with default values if file doesn't exist
    const initialRegistry = {
      lastIds: {
        "MOD": 0,
        "FUNC": 0,
        "ART": 0,
        "DOC": 0,
        "INIT": 0,
        "ENT": 0,
        "REL": 0
      },
      updated: new Date().toISOString()
    };
    fs.writeFileSync(registryPath, JSON.stringify(initialRegistry, null, 2));
  }
  
  // Read current registry
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  
  // If no entity type is provided, return all current values without incrementing
  if (!entityType) {
    const currentValues = {};
    for (const type in registry.lastIds) {
      currentValues[type] = `${type}-${registry.lastIds[type].toString().padStart(3, '0')}`;
    }
    return currentValues;
  }
  
  // Increment the ID
  registry.lastIds[entityType] += 1;
  registry.updated = new Date().toISOString();
  
  // Write updated registry
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  
  // Format and return the new ID
  return `${entityType}-${registry.lastIds[entityType].toString().padStart(3, '0')}`;
}

// Example usage:
// const newId = getNextId('MOD');
// console.log(newId); // MOD-001

// Handle exports for both ESM and CommonJS
// Use try/catch to avoid errors in either environment
try {
  module.exports = getNextId;
} catch (err) {
  // ESM environment
}

export default getNextId;

// If script is run directly
if (import.meta.main) {
  const entityType = process.argv[2];
  
  const result = getNextId(entityType);
  
  if (typeof result === 'object') {
    // If no parameter was passed, print all values in a formatted way
    console.log('Current ID values:');
    for (const [type, id] of Object.entries(result)) {
      console.log(`${type}: ${id}`);
    }
  } else {
    // If a specific entity type was requested, print the new ID
    console.log(result);
  }
}