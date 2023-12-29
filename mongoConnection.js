import mongoose from "mongoose";

// Connect to MongoDB
async function connect() {
    await mongoose.connect('mongodb://localhost/', {});
    // mongoose.connect('mongodb://localhost/', {});
}


// Define a schema
const playerStatisticsSchema = new mongoose.Schema({
  _id: String,
  GLOBAL: {
    LOSSES: Number,
    WLR: Number,
    KILLS: Number,
    DEATHS: Number,
    WINS: Number,
    KDR: Number
  },
  lastUsername: String,
  nodebuff: {
    LOSSES: Number,
    WLR: Number,
    KILLS: Number,
    DEATHS: Number,
    WINS: Number,
    KDR: Number
  }
}, { collection: 'playerStatistics' }); // specify the collection name


// Create a model
const PlayerStatistics = mongoose.model('PlayerStatistics', playerStatisticsSchema);


async function readDocument(database, collectionName, id) {
    await mongoose.disconnect()
    await mongoose.connect('mongodb://localhost/' + database, {});
    const collection = mongoose.connection.collection(collectionName);
    const document = await collection.findOne({_id: id});
    await mongoose.disconnect()
    return document;
}


async function saveDocument(database, collectionName, document) {
    await mongoose.connect('mongodb://localhost/' + database, {});
    const collection = mongoose.connection.collection(collectionName);
    await collection.insertOne(document);
}

// Retrieve data
async function readPlayerStats(uuid) {
    var stats = {};
    await mongoose.connect('mongodb://localhost/Practice', {});
    const data = await PlayerStatistics.findOne(
        {_id: `${uuid}`}
    );

    if(data == null) {
        return {};
    }

    stats = data.toObject();
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    await mongoose.disconnect();
    return stats;
}


async function readHCTeamsStats(uuid) {
    var stats = {};
    const data = readDocument('HCTeams', 'Players', uuid.replace(/-/g, ''))

    if(data == null) {
        return {};
    }

    stats = data;
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    await mongoose.disconnect();
    return stats;
}

async function readMatch(id) {
    var stats = {};
    await connect();
    const data = await readDocument('Practice', 'matches', id)

    if(data == null) {
        return {};
    }

    stats = data;
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    return stats;
}

async function readKit(id) {
    var stats = {};
    await connect();
    const data = await readDocument('Practice','kitTypes', id)

    if(data == null) {
        return {};
    }

    stats = data;
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    return stats;
}

async function readPost(id) {
    var post = {};
    await connect();
    const data = await readDocument('hqSite', 'forumPosts', id)

    if(data == null) {
        return {};
    }

    post = data;
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    return post;
}


async function readFeaturedPosts() {


    await mongoose.connect('mongodb://localhost/hqSite', {});

    const collection = mongoose.connection.collection('forumPosts');
    const document = collection.find({featured: true});


    const data = await document.toArray();

    if(data == null) {
        return {};
    }

    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    await mongoose.disconnect()
    return data;
}

async function readTopPosts(forum) {

    await mongoose.connect('mongodb://localhost/hqSite', {});

    const collection = mongoose.connection.collection('forumPosts');
    const document = collection.find({forumId: forum}).limit(30);


    const data = await document.toArray();

    if(data == null) {
        return {};
    }

    await mongoose.disconnect()
    return data;
}

async function readPlayerELO(uuid) {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost/Practice', {});

    // Get the collection and find the document
    const collection = mongoose.connection.collection('elo');
    const data = await collection.find({ players: { $in: [uuid] } }).toArray();


    if(data == null) {
        return {};
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();
    delete data[0]._id;


    return data[0];
}

async function readLast10Matches(uuid) {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost/Practice', {});

    // Get the collection and find the document
    const collection = mongoose.connection.collection('matches');
    let data = await collection.find({ allPlayers: { $in: [uuid] } }).toArray();


    if(data == null) {
        return {};
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();

    data.reverse();
    data = data.slice(0, 10);

    for(var i = 0; i < data.length; i++) {
        // delete data[i].postMatchPlayers;
        delete data[i].teams;
    }



    return data;
}

async function readRankedKits() {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost/Practice', {});

    // Get the collection and find the document
    const collection = mongoose.connection.collection('kitTypes');
    let data = await collection.find({ supportsRanked: true }).toArray();


    if(data == null) {
        return {};
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();




    return data;
}

async function readAllKits() {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost/Practice', {});

    // Get the collection and find the document
    const collection = mongoose.connection.collection('kitTypes');
    let data = await collection.find({}).toArray();


    if(data == null) {
        return {};
    }

    // Disconnect from MongoDB
    await mongoose.disconnect();




    return data;
}

async function getTop10EloInCategory(category) {
    await mongoose.connect('mongodb://localhost/Practice', {});
    const collection = mongoose.connection.collection('elo');
    const sortObject = {};
    sortObject[category] = -1;
    const documents = await collection.find().sort(sortObject).limit(10).toArray();

    await mongoose.disconnect();

    for(let i = 0; i < documents.length; i++) {
        // delete data[i].postMatchPlayers;
        delete documents[i]._id;

        const baseURL = 'http://localhost:8080'; // replace with your base URL
        const headers = {'MHQ-Authorization': 'website'};

        const response = await fetch(baseURL + "/lookup/byName", {
            method: 'POST',
            headers: headers,

            body: JSON.stringify({
                names: [documents[i].lastUsername]
            })
        });

        if (response.ok) {
            const json = await response.json();

            documents[i].uuid = json[documents[i].lastUsername].uuid;
        } else {
            console.error('Error:', response.status, await response.text()); // Log the status and response text
        }

    }


    return documents;
}


async function savePost(document) {
    await connect();
    await saveDocument('hqSite', 'forumPosts', document)
}


export default {
    readPlayerStats,
    connect,
    readMatch,
    readKit,
    readPost,
    savePost,
    readFeaturedPosts,
    readDocument,
    saveDocument,
    readTopPosts,
    readHCTeamsStats,
    readPlayerELO,
    readLast10Matches,
    readRankedKits,
    getTop10EloInCategory,
    readAllKits
}

// module.exports = {
//     readPlayerStats,
//     connect,
//     readMatch,
//     readKit,
//     readPost,
//     savePost,
//     readFeaturedPosts,
//     readDocument,
//     saveDocument,
//     readTopPosts,
//     readHCTeamsStats
// }
