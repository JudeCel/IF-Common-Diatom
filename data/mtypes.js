var mtypes = {
    statusLookup: {
        none: 0,
        active: 1,
        closed: 2
    },
    userType: {
        globalAdministrator: 1,
        facilitator: 2,
        coFacilitator: 3,
        observer: 4
    },
    resourceType: {
        participant: 1,
        facilitator: 2,
        coFacilitator: 3,
        observer: 4,
        image: 16,
        video: 17,
        audio: 18,
        report: 19,
        vote: 20,
        collage: 21,
        tmp: 99
    },
    topicStatus: {
        active: 1,
        closed: 2
    },
    reportType: {
        chat: "chat",
        chat_stars: "chat_stars",
        whiteboard: "whiteboard",
        vote: "vote",
        stats: "stats"
    },
	userPermissions: {
		accountManager: 1,
		facilitator: 2,
		observer: 3,
		participant: 4
    }
}

module.exports = mtypes;