const prisma = require("./prisma/seed");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function deleteReview(userSrNo, characterId) {
    try {
        prisma.$connect;
        const isReviewDeleted = await prisma.tblUserReviews.delete({
            where: {
                characterId_userSrNo: {
                    characterId: characterId,
                    userSrNo: userSrNo,
                },
            },
        });
        prisma.$disconnect;
        return isReviewDeleted;
    } catch (err) {
        console.error(err.message);
    }
}

async function updateReview(userSrNo, characterId, reviewMessage) {
    try {
        prisma.$connect;
        const isReviewUpdated = await prisma.tblUserReviews.update({
            where: {
                characterId_userSrNo: {
                    characterId: characterId,
                    userSrNo: userSrNo,
                },
            },
            data: {
                reviewMessage: reviewMessage,
            },
        });
        prisma.$disconnect;
        return isReviewUpdated;
    } catch (err) {
        console.error(err.message);
    }
}

async function postReview(userSrNo, characterId, reviewMessage) {
    try {
        prisma.$connect;
        const isReviewPosted = await prisma.tblUserReviews.create({
            data: {
                userSrNo: userSrNo,
                characterId: characterId,
                reviewMessage: reviewMessage,
            },
        });
        prisma.$disconnect;
        return isReviewPosted;
    } catch (err) {
        console.error(err.message);
    }
}

async function getReviews(characterId) {
    try {
        prisma.$connect;
        const reviews = await prisma.tblUserReviews.findMany({
            where: {
                characterId: characterId,
            },
            select: {
                srNo: true,
                userSrNo: true,
                reviewMessage: true,
                tblUserDetails: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        prisma.$disconnect;
        return reviews;
    } catch (err) {
        console.error(err.message);
    }
}

async function addUser(name, email, userName, password) {
    try {
        const strongPassword = await hashPass(password);
        prisma.$connect;
        const newUser = await prisma.tblUserDetails.create({
            data: {
                name: name,
                email: email,
                userName: userName,
                password: strongPassword,
            },
        });
        prisma.$disconnect;
        return newUser;
    } catch (err) {
        console.error(err.message);
    }
}

async function getUser(userName, email) {
    try {
        let user;
        prisma.$connect;
        if (typeof userName === "string") {
            user = await prisma.tblUserDetails.findUnique({
                where: {
                    userName: userName,
                },
            });
            if (user) {
                prisma.$disconnect;
                return user;
            }
        }
        if (typeof email === "string") {
            user = await prisma.tblUserDetails.findUnique({
                where: {
                    email: email,
                },
            });
        }
        prisma.$disconnect;
        return user;
    } catch (err) {
        console.log(err.message);
    }
}

// to encrypt the data
async function hashPass(password) {
    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (err) {
        console.error(err.message);
    }
}

// to compare the password
async function comparePass(password, hashPass) {
    try {
        return await bcrypt.compare(password, hashPass);
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    deleteReview,
    updateReview,
    postReview,
    getReviews,
    addUser,
    getUser,
    hashPass,
    comparePass,
};
