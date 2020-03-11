import db from '../models';

const alreadyLiked = async (req, res, next) => {
  const { user } = req;
  const { id } = req.query;

  const likedFacility = await db.Facilities.findOne({ where: { id } });
  const { likesId } = likedFacility;

  const liked = likesId.find((x) => x === user.id);
  const likedUserIndex = likesId.indexOf(liked);

  let likedCol;
  if (liked === user.id && likesId.length <= 1) {
    likedCol = await likesId.splice(likedUserIndex, 0);
    await db.Facilities.update({ likesId: likedCol }, { where: { id } });
  } else {
    likedCol = likesId.splice(likedUserIndex, 1);
    await db.Facilities.update({ likedCol }, { where: { id } });
  }

  if (liked === user.id) {
    await db.Facilities.decrement('likes', { where: { id } });
  }

  next();
};

export default alreadyLiked;
