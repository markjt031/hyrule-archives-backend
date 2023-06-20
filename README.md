# Hyrule Archives Backend

## API

This is the API used as the backend for https://hyrule-archives-frontend.vercel.app/  
Hyrule Archives is a site for creating and posting information about The Legend of Zelda: Tears of the Kingdom.

### Technologies Used
This API uses Express.js and mongoose to interact with MongoDB. Image files are uploaded to AWS S3 with multer and multer-s3.

### Dependencies
    "aws-sdk": "^2.895.0",
    "bcrypt": "^5.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "mongoose": "^7.2.0",
    "multer": "^1.4.4",
    "multer-s3": "^2.10.0"

### MODELS
These are the database models used in this project. The models for creatures, critters, materials, monsters and equipment are based off the in-game information provided in the Hyrule Compendium.

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

