const mongoose = require('mongoose');

// Connect to MongoDB
async function connect() {
    mongoose.connect('mongodb://localhost/Practice', {useNewUrlParser: true, useUnifiedTopology: true});
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

const itemSchema = new mongoose.Schema({
    id: Number,
    data: Number,
    count: Number
});

const playerSchema = new mongoose.Schema({
    playerUuid: String,
    lastUsername: String,
    armor: [itemSchema],
    inventory: [itemSchema],
    potionEffects: [String],
    hunger: Number,
    health: Number,
    totalHits: Number,
    longestCombo: Number,
    missedPots: Number,
    ping: Number,
    thrownPots: Number,
    missedDebuffs: Number,
    thrownDebuffs: Number,
    kit: String
});

const teamSchema = new mongoose.Schema({
    allMembers: [String],
    aliveMembers: [String]
});

const locationSchema = new mongoose.Schema({
    world: String,
    x: Number,
    y: Number,
    z: Number,
    yaw: Number,
    pitch: Number
});

const matchSchema = new mongoose.Schema({
    _id: String,
    kitType: String,
    arena: String,
    teams: [teamSchema],
    postMatchPlayers: {
        type: Map,
        of: playerSchema
    },
    spectators: [String],
    winner: Number,
    endReason: String,
    state: String,
    startedAt: Date,
    endedAt: Date,
    ranked: Boolean,
    wins: Object,
    matchAmount: Number,
    threeSecond: Boolean,
    allowRematches: Boolean,
    eloChange: Number,
    placedBlocks: [String],
    potionsThrown: Object,
    lastHit: Object,
    lastHitLocation: locationSchema,
    combos: Object,
    totalHits: Object,
    longestCombo: Object,
    missedPots: Object,
    thrownPots: Object,
    thrownDebuffs: Object,
    missedDebuffs: Object,
    replayableActions: [String],
    allPlayers: [String],
    winningPlayers: [String],
    losingPlayers: [String]
}, { collection: 'matches' });

// Create a model
const PlayerStatistics = mongoose.model('PlayerStatistics', playerStatisticsSchema);

async function readDocument(collectionName, id) {
    await mongoose.connect('mongodb://localhost/Practice', {useNewUrlParser: true, useUnifiedTopology: true});
    const collection = mongoose.connection.collection(collectionName);
    const document = await collection.findOne({_id: id});
    return document;
}

// Retrieve data
async function readPlayerStats(uuid) {
    var stats = {};
    await connect();
    const data = await PlayerStatistics.findOne(
        {_id: `${uuid}`}
    );

    if(data == null) {
        return {};
    }

    stats = data.toObject();
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    return stats;
}

async function readMatch(id) {
    var stats = {};
    await connect();
    const data = await readDocument('matches', id)

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
    const data = await readDocument('kitTypes', id)

    if(data == null) {
        return {};
    }

    stats = data;
    // PlayerStatistics.findOne({_id: `${uuid}`}, function(err,obj) { console.log(obj); }, null)

    return stats;
}


module.exports = {
    readPlayerStats,
    connect,
    readMatch,
    readKit
}
