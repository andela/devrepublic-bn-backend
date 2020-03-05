import db from '../models';

const alreadyUnliked = async (req, res, next) => {
  const { user } = req;
  const { id } = req.query;

  const unlikedFacility = await db.Facilities.findOne({ where: { id } });
  const { unlikesId } = unlikedFacility;

  const unliked = unlikesId.find((d) => d === user.id);
  const unlikedUserIndex = unlikesId.indexOf(unliked);

  let unlikedCol;
  if (unliked === user.id && unlikesId.length <= 1) {
    unlikedCol = await unlikesId.splice(unlikedUserIndex, 0);
    await db.Facilities.update({ unlikesId: unlikedCol }, { where: { id } });
  } else {
    unlikedCol = unlikesId.splice(unlikedUserIndex, 1);
    await db.Facilities.update({ unlikedCol }, { where: { id } });
  }

  if (user.id === unliked) {
    await db.Facilities.decrement('unlikes', { where: { id } });
  }


  next();
};

export default alreadyUnliked;
