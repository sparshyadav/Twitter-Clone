import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addComment = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const userid = req.user.id;
        const body = req.body;

        const comment = await prisma.comment.create({
            data: body
        })

        const updateTweet = await prisma.tweet.update({
            where: {
                id: Number(id)
            },
            data: {
                Comment: { connect: { id: comment.id } },
            },
        })

        console.log("Comment Added");
        return res.send(updateTweet);
    }
    catch (err) {
        console.log("An Error Occurred While Adding Comment");
        console.error(err);
        return res.send("An Error Occurred");
    }
}

module.exports=addComment;