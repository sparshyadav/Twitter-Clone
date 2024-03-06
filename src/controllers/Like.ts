import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addLikes = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const userid = req.user.id;
        let like = await prisma.like.findFirst({
            where: {
                tweetid: Number(id),
                userid: userid
            }
        })

        if (like != null) {
            await prisma.like.delete({
                where: {
                    id: like.id
                }
            })

            await prisma.tweet.update({
                where: {
                    id: Number(id),
                },
                data: {
                    likecount: { decrement: 1 }
                }
            })

            return res.send("Like Removed");
        }

        const newLike = await prisma.like.create({
            data: {
                tweetid: Number(id),
                userid: userid
            },
        })

        await prisma.tweet.update({
            where: {
                id: id
            },
            data: {
                likecount: {
                    increment: 1
                }
            }
        })

        console.log("Like Added");
        return res.send("Like Added");
    }
    catch (err) {
        console.log("An Error Occurred While Adding a Tweet");
        console.log(err);
        return res.send("An Error Occurred");
    }
}

// Make same as comment, and make another route that will give every person that has liked the given tweet