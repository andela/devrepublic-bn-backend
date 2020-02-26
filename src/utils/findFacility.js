import db from '../models';

const findFacilityHandlder = async (accomodation, destination) => {
  const facility = await db.Facilities.findOne({
    where: {
      id: accomodation,
      location: destination
    }
  });
  return facility;
};
export default findFacilityHandlder;
