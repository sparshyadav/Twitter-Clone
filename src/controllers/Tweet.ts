import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

export const getAllTweets = async (req: any, res: any) => {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            tweets: true
        },
    })

    if (!user) {
        res.send("User Not Found");
    }

    let allTweets = user?.tweets;
    return res.send(allTweets);
}

module.exports = { createTweet, getAllTweets }  