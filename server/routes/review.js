const library = require("../library");
const router = require("express").Router();

router.delete("/:userSrNo/:characterId", async (req, res) => {
    try {
        const userSrNo = parseInt(req.params.userSrNo);
        const characterId = BigInt(req.params.characterId);

        const isReviewDeleted = await library.deleteReview(
            userSrNo,
            characterId
        );

        if (isReviewDeleted) {
            return res.status(200).json({
                isReviewDeleted: true,
            });
        } else {
            return res.status(303).json({
                isReviewDeleted: false,
                message: "Review Not Deleted... Please try again...",
            });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .json({ isReviewDeleted: false, message: "Server Error" });
    }
});

router.put("/updateReview", async (req, res) => {
    try {
        const { userSrNo, characterId, reviewMessage } = req.body;

        const characterIdTemp = BigInt(characterId);

        const isReviewUpdated = await library.updateReview(
            userSrNo,
            characterIdTemp,
            reviewMessage
        );

        if (isReviewUpdated) {
            return res.status(200).json({
                isReviewUpdated: true,
                reviewMessage: isReviewUpdated.reviewMessage,
            });
        } else {
            return res.status(303).json({
                isReviewUpdated: false,
                message: "Review Not Updated... Please try again...",
            });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .json({ isReviewUpdated: false, message: "Server Error" });
    }
});

router.post("/postReview", async (req, res) => {
    try {
        const { userSrNo, characterId, reviewMessage } = req.body;

        const characterIdTemp = BigInt(characterId);

        const isReviewPosted = await library.postReview(
            userSrNo,
            characterIdTemp,
            reviewMessage
        );

        console.log(isReviewPosted);

        if (isReviewPosted) {
            return res.status(200).json({
                isReviewAdded: true,
                reviewMessage: isReviewPosted.reviewMessage,
            });
        } else {
            return res.status(303).json({
                isReviewAdded: false,
                message: "Review Not Added... Please try again...",
            });
        }
    } catch (err) {
        console.error(err.message);
        return res
            .status(500)
            .json({ isReviewAdded: false, message: "Server Error" });
    }
});

router.get("/:characterId", async (req, res) => {
    try {
        const characterId = BigInt(req.params.characterId);

        const reviews = await library.getReviews(characterId);
        console.log(reviews);
        reviews.forEach((i) => {
            i.name = i.tblUserDetails.name;
            delete i.tblUserDetails;
        });
        console.log(reviews);
        if (reviews) {
            return res.status(200).json(reviews);
        } else {
            return res.status(200).json([]);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            isReviewsFound: false,
            message: "Something went wrong... Please try again.",
        });
    }
});
module.exports = router;
