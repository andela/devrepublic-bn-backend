import db from '../models';

const alreadyUnliked = async (req, res, next) => {
  const { user } = req;
  const { id } = req.query;

  const likedFacility = await db.Facilities.findOne({ where: { id } });
  const { unlikesId } = likedFacility;
  const unliked = unlikesId.find((d) => d === user.id);

  const unlikedUserIndex = unlikesId.indexOf(unliked);


  if (unliked === user.id && unlikesId.length <= 1) {
    unlikesId.splice(unlikedUserIndex, 0);
    await db.Facilities.update({ unlikesId }, { where: { id } });
  } else {
    unlikesId.splice(unlikedUserIndex, 1);
    await db.Facilities.update({ unlikesId }, { where: { id } });
  }

  if (user.id === unliked) {
    await db.Facilities.decrement('unlikes', { where: { id } });
  }


  next();
};

export default alreadyUnliked;
