# Hyrule Archives Backend

## API

This is the API used as the backend for https://hyrule-archives-frontend.vercel.app/

### MODELS

 Creature:  
 * no: {type: Number, unique: true},  
 * name: {type: String, unique: true, required: true},  
 * recoverableMaterials: [{type: String}],  
 * commonLocations: [{type: String}],  
 * description: {type: String},  
 * image: {type: String},  
 * userId: {type: mongoose.Types.ObjectId}  


 Critter:   
 * no: {type: Number, unique: true},  
 * name: {type: String, unique: true, required: true},  
 * fuseAttackPower: {type: Number},  
 * heartsRecovered: {type: Number},  
 * uniqueCookingEffects: [{type: String}],  
 * commonLocations: [{type: String}],  
 * description: {type: String},  
 * image: {type: String},  
 * userId: {type: mongoose.Types.ObjectId}. 

Monster:  
* no: {type: Number, unique: true},  
* name: {type: String, unique: true, required: true},  
* recoverableMaterials: [{type: String}],  
* commonLocations: [{type: String}],  
* description: {type: String},  
* image: {type: String},  
* userId: {type: mongoose.Types.ObjectId} 

Material:  
* no: {type: Number, unique: true},  
* name: {type: String, unique: true, required: true},  
* fuseAttackPower: {type: Number},
* heartsRecovered: {type: Number},
* uniqueCookingEffects: [{type: String}],
* commonLocations: [{type: String}],
* description: {type: String},
* image: {type: String},
* userId: {type: mongoose.Types.ObjectId}

Equipment:
* no: {type: Number, unique: true},  
* name: {type: String, unique: true, required: true},  
* properties: {attack: {type: Number}, defense: {type: Number}, otherProperties:[{type: String}]},  
* commonLocations: [{type: String}],  
* description: {type: String},  
* image: {type: String},  
* userId: {type: mongoose.Types.ObjectId}. 
    
    
Shrine:
* name: {type: String, unique: true, required: true},  
* subtitle: {type: String},  
* region: {type: String},  
* locationImage: {type: String},  
* coordinates: {type:String},  
* bodyText: [{type: String}],  
* images: [{type: String}],  
* userId: {type: mongoose.Types.ObjectId},  
* userName: {type: String}
    
Korok:
* region: {type: String},
* locationDescription: {type: String},
* locationImage: {type: String},
* korokImage: {type: String},
* korokDescription: {type:String},
* userId: {type: mongoose.Types.ObjectId},
* userName: {type: String}
    
User:
* username: { type: String, unique: true, required:true},
* email: { type: String, unique: true, required: true},
* password: {type: String, required: true},
* avatar: {type: String}

### GET Routes
The following GET routes can be used to retrieve information from this API. These will return a JSON response with the requested data

#### Get all
* https://hyrule-archive.herokuapp.com/creatures --Retrieves All Creatures
* https://hyrule-archive.herokuapp.com/critters --Retrieves All Critters
* https://hyrule-archive.herokuapp.com/monsters --Retrieves All Monsters
* https://hyrule-archive.herokuapp.com/items/materials --Retrieves All Materials
* https://hyrule-archive.herokuapp.com/items/equipment --Retrieves All Equipment
* https://hyrule-archive.herokuapp.com/shrines --Retrieves All Shrines
* https://hyrule-archive.herokuapp.com/koroks --Retrieves All Koroks
* https://hyrule-archive.herokuapp.com/search?name= --Empty name in the search retrieves all creatures, critters, monsters, materials and equipment

#### Get one
* https://hyrule-archive.herokuapp.com/creatures/:id --Retrieves creature with id matching the id
* https://hyrule-archive.herokuapp.com/critters/:id --Retrieves critter with id matching the id
* https://hyrule-archive.herokuapp.com/monsters/:id --Retrieves monster with id matching the id
* https://hyrule-archive.herokuapp.com/items/materials/:id --Retrieves material with id matching the id
* https://hyrule-archive.herokuapp.com/items/equipment/:id --Retrieves equipment with id matching the id
* https://hyrule-archive.herokuapp.com/shrines/:id --Retrieves shrine with id matching the id
* https://hyrule-archive.herokuapp.com/koroks/:id --Retrieves korok with id matching the id
* https://hyrule-archive.herokuapp.com/koroks/search?region=regionhere --Replace regionhere with the game region you would like to see korok results for(Korok results are very limited at the moment)
* https://hyrule-archive.herokuapp.com/users/profile/:id --Reteives a public profile for the user with a user id matching id
* https://hyrule-archive.herokuapp.com/search?name=namehere --Replace namehere with the name of the item you are searching for
* https://hyrule-archive.herokuapp.com/users/ --retrieve a list of users(id and username only)

### POST Routes

For post routes for critters, creatures, monsters, materials and equipment, name and no(in-game compendium number) must be unique. For shrines, name must be unique. Returns JSON of created object upon successful creation.

* https://hyrule-archive.herokuapp.com/creatures --Post new creature 
* https://hyrule-archive.herokuapp.com/critters --Post new critter
* https://hyrule-archive.herokuapp.com/monsters --Post new monster
* https://hyrule-archive.herokuapp.com/items/materials --Post new material
* https://hyrule-archive.herokuapp.com/items/equipment --Post new equipment
* https://hyrule-archive.herokuapp.com/shrines --Post new Shrines
* https://hyrule-archive.herokuapp.com/koroks --Post new Korok
* https://hyrule-archive.herokuapp.com/users/register --Registration for users. Username and emails are unique
* https://hyrule-archive.herokuapp.com/users/login --Login for users. Must have accurate user credentials to login


### PUT Routes

For editing already added creatures, critters, monsters, materials, equipment, shrines, and koroks. Returns JSON of updated data if successful

* https://hyrule-archive.herokuapp.com/creatures/:id --Updates creature with id matching the id
* https://hyrule-archive.herokuapp.com/critters/:id --Updates critter with id matching the id
* https://hyrule-archive.herokuapp.com/monsters/:id --Updates monster with id matching the id
* https://hyrule-archive.herokuapp.com/items/materials/:id --Updates material with id matching the id
* https://hyrule-archive.herokuapp.com/items/equipment/:id --Updates equipment with id matching the id
* https://hyrule-archive.herokuapp.com/shrines/:id --Updates shrine with id matching the id
* https://hyrule-archive.herokuapp.com/koroks/:id --Updates korok with id matching the id
* https://hyrule-archive.herokuapp.com/users/profile/:id --Allows a single image to be added as an avatar to user profile


### DELETE Routes

For deleting objects by ID

* https://hyrule-archive.herokuapp.com/creatures/:id --Delete creature with id matching the id
* https://hyrule-archive.herokuapp.com/critters/:id --Deletes critter with id matching the id
* https://hyrule-archive.herokuapp.com/monsters/:id --Deletes monster with id matching the id
* https://hyrule-archive.herokuapp.com/items/materials/:id --Deletes material with id matching the id
* https://hyrule-archive.herokuapp.com/items/equipment/:id --Deletes equipment with id matching the id
* https://hyrule-archive.herokuapp.com/shrines/:id --Deletes shrine with id matching the id
* https://hyrule-archive.herokuapp.com/koroks/:id --Deletes korok with id matching the id
