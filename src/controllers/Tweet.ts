import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// import verifyToken from "../utils/auth";

// Creating a New Tweet
export const createTweet = async (req: any, res: any) => {
    try {
        const { title, content } = req.body;
        const id = req.user.id;
        const tweet = await prisma.tweet.create({
            data: {
                title: title,
                content: content,
                userid: id
            },
        })

        await prisma.user.update({
            where: { id: id },
            data: {
                tweets: { connect: { id: tweet.id } },
            },
        });

        console.log("Tweet Created");
        return res.send(tweet);
    }
    catch (err) {
        console.log("An Error Occurred While Creating a New Tweet");
        console.log(err);
        return res.send("An Error Occurred");
    }
}

module.exports = { createTweet }  