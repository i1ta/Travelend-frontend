// filterFunctions.js

import Axios from "@/apis";

export default async function onClickFilterFind (
  selectedDestination,
  tripDate,
  selectedNum,
  keyword,
  setFindCardList,
  setFindCardFilter,
  router
) {

//   const router = useRouter();

  const requestData = {
    continentId: selectedDestination.continent.id,
    endDate: tripDate[1],
    keyWord: keyword,
    nationId: selectedDestination.country.id,
    regionId: selectedDestination.city.id,
    startDate: tripDate[0],
    totalPeopleNum: selectedNum,
  };

  try {
    const res = await Axios.post(`/tripyler/list?isRecruiting=1&option=1`, requestData);
    const arr = res.data.data;
    setFindCardList(res.data.data);

    const query = {
      continent: JSON.stringify(selectedDestination.continent.name),
      continentId: selectedDestination.continent.id,
      country: JSON.stringify(selectedDestination.country.name),
      countryId: selectedDestination.country.id,
      city: JSON.stringify(selectedDestination.city.name),
      cityId: selectedDestination.city.id,
      startDate: JSON.stringify(tripDate[0] || ""),
      endDate: JSON.stringify(tripDate[1] || ""),
      num: selectedNum,
      keyword: JSON.stringify(keyword),
    };

    router.push("/findTripyler");
    console.log(query);
    setFindCardFilter(query);
  } catch (error) {
    console.log(error);
  }
};
