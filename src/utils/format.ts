export const userInfoFormat = (age: number, gender: string) => {
  const formatAge = age >= 10 ? `${age.toString().slice(0, 1)}0대` : "아동";
  const formatGender = gender === "M" ? "남성" : "여성";
  return formatAge + " | " + formatGender;
};
