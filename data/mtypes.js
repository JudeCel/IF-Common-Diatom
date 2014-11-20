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
    },
	accountStatus: {
		none: 0,
		active: 127000100,
		cancelled: 127000700,
		nonPayment: 127000200,
		trialExpired: 127000500
	},
	sessStatus: {
		none: 0,
		invalid: 123000200,
		valid: 123000100
	},
	billingIntervalType: {
		none: 0,
		annual: 165000200,
		annualInvoiced: 165000300,
		monthly: 165000100
	}
}

module.exports = mtypes;